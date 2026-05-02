import { Router, type Request, type Response } from "express";
import multer from "multer";
import OpenAI from "openai";
import type { ChatCompletionContentPart } from "openai/resources/chat/completions";
import crypto from "node:crypto";
import { pdfToPng } from "pdf-to-png-converter";
import {
  DocumentCheckResponse,
  type DocumentCheckResult,
  type DocumentCheckRecommendation,
  type DocumentCheckSuggestedService,
} from "@workspace/api-zod";
import {
  saveBuffer,
  opportunisticCleanup,
  deleteByRelativeKey,
  readBuffer,
  copyObject,
} from "../lib/objectStorage.js";
import { VAULT_FILES, requireAuth, type VaultFile } from "./vault.js";

const router = Router();

/* ── OpenAI client (Replit AI Integrations proxy) ────────────────────
   Env vars are auto-provisioned by setupReplitAIIntegrations.
   We instantiate lazily so the route module doesn't crash the server
   if the integration isn't configured — instead the request returns
   a clear 503 the user can act on. */
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  if (_openai) return _openai;
  const baseURL = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
  const apiKey  = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];
  if (!baseURL || !apiKey) return null;
  _openai = new OpenAI({ baseURL, apiKey });
  return _openai;
}

/* ── Multer: in-memory, 25MB cap, image/PDF only ────────────────── */
const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype === "application/pdf" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"  ||
      file.mimetype === "image/png";
    if (!ok) {
      cb(new Error("Only PDF, JPG, or PNG files are accepted."));
      return;
    }
    cb(null, true);
  },
});

/* ── Vision prompt — strict JSON output ────────────────────────── */
const SYSTEM_PROMPT = `You are Docsy's pre-flight document inspector for a Texas notary services company. A user has uploaded a document they intend to notarize. Your job is to spot the common errors that get documents rejected at the closing table or by the Texas Secretary of State.

You must respond with a single JSON object matching this exact TypeScript shape — no prose, no markdown fences:

{
  "documentType": string,                                    // best guess: "Power of Attorney", "Warranty Deed", "Affidavit", "Diploma", "Birth Certificate (certified copy)", "Loan Closing Package", "Articles of Incorporation", etc. Use "Unknown / unable to identify" if you cannot tell.
  "notarialBlockPresent": { "present": boolean, "location": string | null }, // location like "page 2, bottom" or null
  "signaturePresent": boolean,
  "dateField": "present" | "missing" | "unknown",
  "redFlags": string[],                                      // human-readable warnings, each one short and actionable. Examples: "Signer name on signature line does not match name typed in body of document.", "Notarial certificate uses California wording (\\"on this day personally appeared\\" + jurat) — needs Texas-style acknowledgment or jurat.", "Document appears to be a personal photocopy, not a certified copy — apostille will be rejected.", "Page 3 is blank or scanned upside down.", "Signature line is blank.", "Notary block is missing the commission expiration date." Keep each warning under 25 words. If there are no red flags, return an empty array.
  "recommendation": "ready_to_notarize" | "fix_first" | "needs_review",
  "recommendationRationale": string,                         // 1-2 sentences explaining the recommendation.
  "suggestedService": "ron" | "mobile" | "in-office" | "apostille" | "loan-signing"
}

Recommendation rules:
- "ready_to_notarize" = no red flags, notarial block present (or it's a doc that doesn't need one like a vital record being apostilled), signature line is present (signature itself can be blank — that's what the notary witnesses).
- "fix_first" = there are issues the user must correct before booking (missing notary block on a doc that requires one, wrong-state notarial wording, photocopy instead of certified copy for apostille, missing date field, illegible scan).
- "needs_review" = ambiguous — the document is unusual or you can't be confident either way; recommend a free Pre-Check call with Docsy.

Suggested service rules:
- Apostille destination words ("for use in", country name, "Hague") OR vital record / diploma / FBI background → "apostille".
- Loan / refinance / closing / mortgage / deed of trust / closing disclosure → "loan-signing".
- Otherwise default to "mobile" for in-person convenience, or "ron" if the user is clearly out-of-state context.
- "in-office" only if the doc is a single page that explicitly references a notary office visit.

Be specific and concrete. The user needs to know exactly what to fix.`;

/* Multer wrapper that converts thrown errors (oversize, wrong MIME) into
   JSON 4xx responses so the frontend always receives a parseable payload.
   Without this, multer errors bubble to Express's default HTML error
   handler and the client's res.json() throws on parse. */
function uploadSingle(req: Request, res: Response, next: () => void): void {
  upload.single("file")(req, res, (err: unknown) => {
    if (!err) { next(); return; }
    if (err instanceof multer.MulterError) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? "File is too large. The limit is 25 MB — re-export at lower resolution or split into pages."
          : `Upload failed: ${err.message}`;
      res.status(413).json({ ok: false, error: msg });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ ok: false, error: err.message });
      return;
    }
    res.status(400).json({ ok: false, error: "Upload failed." });
  });
}

/* Render a PDF to one or more PNG buffers (one per page, max 3 pages
   so we stay under reasonable token limits). The Replit AI Integrations
   proxy doesn't expose OpenAI's `/files` endpoint, so we can't use the
   "file_id" content type — vision is the only available path for
   reading scanned content. */
async function rasterizePdf(buffer: Buffer, log: Request["log"]): Promise<Buffer[]> {
  try {
    const pages = await pdfToPng(buffer, {
      viewportScale:   1.5,        // 1.5× CSS pixels — good for OCR-quality text without blowing up payload
      outputFolder:    undefined,  // keep in memory
      disableFontFace: true,
    });
    return pages
      .slice(0, 3)
      .map((p) => p.content)
      .filter((b): b is Buffer => Boolean(b));
  } catch (err) {
    log.warn({ err }, "document-check: PDF rasterization failed");
    return [];
  }
}

/* ── Run the inspection.
   - Images: send as a base64 data URL via the vision content type.
   - PDFs: rasterize the first up-to-3 pages to PNG and send each as a
     vision image. If rasterization fails (corrupt PDF, encrypted), fall
     back to a "needs_review" stub so the user still gets actionable
     next steps. */
async function runInspection(
  client:   OpenAI,
  buffer:   Buffer,
  mime:     string,
  log:      Request["log"],
): Promise<Omit<DocumentCheckResult, "thumbnailDataUrl" | "storedObjectPath" | "storedExpiresAt"> | null> {
  const isPdf = mime === "application/pdf";

  try {
    const userContent: ChatCompletionContentPart[] = [
      { type: "text", text: "Inspect the attached document and respond with the JSON object only." },
    ];

    if (isPdf) {
      const pages = await rasterizePdf(buffer, log);
      if (pages.length === 0) {
        return {
          documentType:           "PDF document (couldn't render)",
          notarialBlockPresent:   { present: false, location: null },
          signaturePresent:       false,
          dateField:              "unknown",
          redFlags:               [
            "Couldn't render this PDF — it may be encrypted, corrupted, or scanned at very low quality. Re-export it or book a free Pre-Check and Docsy will eyeball it.",
          ],
          recommendation:         "needs_review",
          recommendationRationale: "Docsy's inspector couldn't read this PDF. A human Pre-Check will confirm whether it's ready.",
          suggestedService:       "mobile",
        };
      }
      for (const png of pages) {
        userContent.push({
          type: "image_url",
          image_url: { url: `data:image/png;base64,${png.toString("base64")}`, detail: "high" },
        });
      }
    } else {
      const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
      userContent.push({ type: "image_url", image_url: { url: dataUrl, detail: "high" } });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userContent },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    try {
      return JSON.parse(raw);
    } catch {
      /* Do NOT log `raw` itself — the model's output may include
         extracted document text (PII). Log only non-content
         diagnostics so we can debug without leaking what the user
         uploaded. */
      log.warn(
        { rawLength: raw.length, rawPreviewSafe: raw.length > 0 ? raw[0] : "" },
        "document-check: failed to parse model JSON",
      );
      return null;
    }
  } catch (err) {
    log.warn({ err }, "document-check: inspection call failed");
    return null;
  }
}

router.post("/", uploadSingle, async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ ok: false, error: "No file received. Please attach a PDF, JPG, or PNG." });
      return;
    }

    const client = getOpenAI();
    if (!client) {
      res.status(503).json({ ok: false, error: "Document check is temporarily unavailable. Please try again or book a free Pre-Check call." });
      return;
    }

    const isPdf  = file.mimetype === "application/pdf";
    const parsed = await runInspection(client, file.buffer, file.mimetype, req.log);

    if (!parsed) {
      res.status(502).json({ ok: false, error: "The inspector returned an unexpected response. Please try again, or book a free Pre-Check." });
      return;
    }

    /* Defensive shape coercion — the model SHOULD obey response_format,
       but we guard the fields we render so a malformed value can't crash
       the result UI. */
    const enums = {
      date:    new Set(["present", "missing", "unknown"]),
      reco:    new Set(["ready_to_notarize", "fix_first", "needs_review"]),
      service: new Set(["ron", "mobile", "in-office", "apostille", "loan-signing"]),
    };
    const recommendation: DocumentCheckRecommendation =
      enums.reco.has(String(parsed.recommendation))
        ? (parsed.recommendation as DocumentCheckRecommendation)
        : "needs_review";
    const suggestedService: DocumentCheckSuggestedService =
      enums.service.has(String(parsed.suggestedService))
        ? (parsed.suggestedService as DocumentCheckSuggestedService)
        : "mobile";

    /* Store the original upload AND the structured result in App
       Storage under document-checks/<uuid>. The two writes are
       treated as a single unit: if either fails, we attempt to
       remove whatever was already written and report
       storedObjectPath=null. That way the privacy footer never
       claims an upload was retained when only half the artifact
       made it to disk. Failures are non-fatal — the user still
       gets their inspection back. */
    let storedObjectPath: string | null = null;
    let storedExpiresAt:  string | null = null;
    let scanId:           string | null = null;
    {
      const id          = crypto.randomUUID();
      const originalKey = `document-checks/${id}/original`;
      const resultKey   = `document-checks/${id}/result.json`;
      const meta = {
        docType:        String(parsed.documentType ?? "").slice(0, 200),
        recommendation: recommendation,
        source:         "document-check",
        originalName:   file.originalname.slice(0, 200),
      };

      try {
        const savedOriginal = await saveBuffer(originalKey, file.buffer, file.mimetype, meta);
        try {
          await saveBuffer(
            resultKey,
            Buffer.from(JSON.stringify(parsed, null, 2)),
            "application/json",
            { docType: meta.docType, source: meta.source },
          );
          storedObjectPath = savedOriginal.objectPath;
          storedExpiresAt  = savedOriginal.expiresAt;
          scanId           = id;
        } catch (err) {
          req.log.warn({ err }, "document-check: result.json save failed; rolling back original");
          await deleteByRelativeKey(originalKey).catch((e) =>
            req.log.warn({ err: e }, "document-check: rollback delete failed"),
          );
        }
      } catch (err) {
        req.log.warn({ err }, "document-check: original save failed (non-fatal)");
      }

      /* Fire-and-forget cleanup of any document-check objects past
         their advertised 24-hour TTL. We can't install a
         bucket-level lifecycle rule (the proxy account 403s on
         bucket admin), so this object-level sweep is the actual
         enforcement of the retention SLA. A separate periodic
         interval (see startBackgroundCleanup) covers low-traffic
         windows. setImmediate so the response isn't blocked. */
      setImmediate(() => {
        opportunisticCleanup("document-checks/", 24 * 60 * 60 * 1000, (msg, extra) => {
          if (extra) req.log.warn({ extra }, msg);
          else       req.log.info(msg);
        }).catch((err) => req.log.warn({ err }, "opportunisticCleanup threw"));
      });
    }

    const safe: DocumentCheckResult = {
      documentType: String(parsed.documentType ?? "Unknown"),
      notarialBlockPresent: {
        present:  Boolean(parsed.notarialBlockPresent?.present),
        location: parsed.notarialBlockPresent?.location ?? null,
      },
      signaturePresent: Boolean(parsed.signaturePresent),
      dateField: (enums.date.has(String(parsed.dateField))
        ? parsed.dateField
        : "unknown") as DocumentCheckResult["dateField"],
      redFlags: Array.isArray(parsed.redFlags)
        ? parsed.redFlags.slice(0, 12).map((f: unknown) => String(f).slice(0, 240))
        : [],
      recommendation,
      recommendationRationale: String(parsed.recommendationRationale ?? "").slice(0, 600),
      suggestedService,
      thumbnailDataUrl: isPdf ? "" : `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      storedObjectPath,
      storedExpiresAt:  storedExpiresAt ? new Date(storedExpiresAt) : null,
      scanId,
    };

    /* Validate against the OpenAPI-generated zod schema so any drift
       between this route and the typed contract is caught immediately
       in development rather than surfacing as an undefined field on
       the frontend. */
    const validated = DocumentCheckResponse.safeParse({ ok: true, result: safe });
    if (!validated.success) {
      req.log.error({ issues: validated.error.issues }, "document-check: response failed schema validation");
      res.status(500).json({ ok: false, error: "Inspection returned in an unexpected shape. Please try again." });
      return;
    }

    res.json(validated.data);
  } catch (err) {
    req.log.error({ err }, "document-check: unhandled error");
    res.status(500).json({ ok: false, error: "Document check failed. Please try again." });
  }
});

/* ── POST /api/document-check/save-to-vault ──────────────────────────
   Auth-only. Promotes a 24-hour anonymous scan into a permanent entry
   in the signed-in user's Safe+ vault.

   The request body carries the `scanId` returned by the previous
   /document-check call. We then:
     1. Read the original + result.json from `document-checks/<id>/`.
     2. Copy both into `vault/<userId>/<id>/` so the cleanup sweep
        (which only walks the `document-checks/` prefix) can no
        longer reach them.
     3. Best-effort delete the originals from `document-checks/`.
     4. Append a VaultFile entry to that user's vault list.

   The whole flow is treated as a single transaction from the user's
   perspective: if the copy fails, no vault entry is added and the
   anonymous-storage objects remain in place to be cleaned up at TTL. */
const SERVICE_TO_VAULT_TYPE: Record<DocumentCheckSuggestedService, VaultFile["serviceType"]> = {
  "ron":          "ron",
  "mobile":       "mobile",
  "in-office":    "mobile",
  "apostille":    "apostille",
  "loan-signing": "loan",
};
const VAULT_TYPE_LABEL: Record<VaultFile["serviceType"], string> = {
  ron:       "Remote Online Notarization",
  mobile:    "General Notary Work",
  loan:      "Loan Signing",
  apostille: "Apostille Services",
  court:     "Court Reporting",
};

function humanSize(bytes: number): string {
  if (bytes < 1024)               return `${bytes} B`;
  if (bytes < 1024 * 1024)        return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const SCAN_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

router.post("/save-to-vault", requireAuth as never, async (req: Request, res: Response): Promise<void> => {
  const userId       = (req as Request & { userId: string }).userId;
  const { scanId }   = (req.body ?? {}) as { scanId?: string };

  if (!scanId || typeof scanId !== "string" || !SCAN_ID_PATTERN.test(scanId)) {
    res.status(400).json({ ok: false, error: "A valid scanId from a recent inspection is required." });
    return;
  }

  const fromOriginal = `document-checks/${scanId}/original`;
  const fromResult   = `document-checks/${scanId}/result.json`;
  const toOriginal   = `vault/${userId}/${scanId}/original`;
  const toResult     = `vault/${userId}/${scanId}/result.json`;

  try {
    /* True idempotency short-circuit: if this user already has a vault
       entry for this scanId, return success immediately. This handles
       the common "user clicked save twice" or "client retried after
       a flaky network" case without us having to re-read storage —
       and it prevents a 404 once the anonymous-prefix copy has been
       cleaned up by the previous successful save. */
    const existingList  = VAULT_FILES[userId] ?? [];
    const existingEntry = existingList.find((f) => f.id === scanId);
    if (existingEntry) {
      res.json({ ok: true, file: existingEntry });
      return;
    }

    /* No vault entry yet — read the source artifacts. Try the
       anonymous prefix first (the common path for first-time saves),
       then fall back to the user's own vault prefix in the rare case
       where the copy succeeded but the vault-entry append got
       interrupted (server crash mid-request). If both reads fail,
       the scan is genuinely gone. */
    let resultJson: Record<string, unknown>;
    let originalSize: number;
    let sourcePrefix: "anonymous" | "vault";
    try {
      const [origBuf, resultBuf] = await Promise.all([
        readBuffer(fromOriginal),
        readBuffer(fromResult),
      ]);
      originalSize = origBuf.length;
      resultJson   = JSON.parse(resultBuf.toString("utf-8")) as Record<string, unknown>;
      sourcePrefix = "anonymous";
    } catch {
      try {
        const [origBuf, resultBuf] = await Promise.all([
          readBuffer(toOriginal),
          readBuffer(toResult),
        ]);
        originalSize = origBuf.length;
        resultJson   = JSON.parse(resultBuf.toString("utf-8")) as Record<string, unknown>;
        sourcePrefix = "vault";
      } catch {
        res.status(404).json({
          ok:    false,
          error: "This scan is no longer available. It may have been cleaned up — please re-run the check.",
        });
        return;
      }
    }

    /* Only copy when the source is the anonymous prefix; if it's
       already in the vault prefix we just need to (re-)create the
       VAULT_FILES entry. Both copies must succeed before we add the
       vault entry; if the second copy fails, undo the first so we
       don't leak an orphan. */
    if (sourcePrefix === "anonymous") {
      await copyObject(fromOriginal, toOriginal);
      try {
        await copyObject(fromResult, toResult);
      } catch (err) {
        req.log.warn({ err }, "save-to-vault: result.json copy failed; rolling back original");
        await deleteByRelativeKey(toOriginal).catch((e) =>
          req.log.warn({ err: e }, "save-to-vault: rollback delete failed"),
        );
        throw err;
      }

      /* Best-effort delete from the anonymous prefix so the same
         artifact isn't sitting in two places (and so the periodic
         sweep doesn't waste cycles on it). */
      await Promise.all([
        deleteByRelativeKey(fromOriginal).catch(() => {}),
        deleteByRelativeKey(fromResult).catch(() => {}),
      ]);
    }

    /* Build the vault entry. The model's docType / suggestedService
       are coerced through known enums so an unexpected value can't
       create an undisplayable row. */
    const docType: string = typeof resultJson["documentType"] === "string"
      ? (resultJson["documentType"] as string).slice(0, 200)
      : "Document";
    const rawService = String(resultJson["suggestedService"] ?? "mobile") as DocumentCheckSuggestedService;
    const serviceType  = SERVICE_TO_VAULT_TYPE[rawService] ?? "mobile";
    const serviceLabel = VAULT_TYPE_LABEL[serviceType];
    const today        = new Date().toISOString().slice(0, 10);

    const entry: VaultFile = {
      id:           scanId,
      name:         `${docType} — Pre-Check ${today}`,
      serviceType,
      serviceLabel,
      date:         today,
      size:         humanSize(originalSize),
    };

    /* The short-circuit above already handled the
       "entry-exists" path, so at this point we know the list does
       not yet contain `scanId`. Prepend the new entry. */
    const list = VAULT_FILES[userId] ?? [];
    list.unshift(entry);
    VAULT_FILES[userId] = list;

    res.json({ ok: true, file: entry });
  } catch (err) {
    req.log.error({ err }, "save-to-vault: unexpected failure");
    res.status(500).json({
      ok:    false,
      error: "Couldn't save this scan to your Safe+ vault. Please try again.",
    });
  }
});

export default router;
