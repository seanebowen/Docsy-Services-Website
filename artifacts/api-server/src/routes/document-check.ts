import { Router, type Request, type Response } from "express";
import multer from "multer";
import OpenAI from "openai";

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

export type Recommendation = "ready_to_notarize" | "fix_first" | "needs_review";
export type SuggestedService = "ron" | "mobile" | "in-office" | "apostille" | "loan-signing";

export interface DocumentCheckResult {
  documentType:           string;
  notarialBlockPresent:   { present: boolean; location: string | null };
  signaturePresent:       boolean;
  dateField:              "present" | "missing" | "unknown";
  redFlags:               string[];
  recommendation:         Recommendation;
  recommendationRationale: string;
  suggestedService:       SuggestedService;
  /* Returned for the result UI thumbnail — base64 of the original
     upload. Cleared from server memory after the response is sent. */
  thumbnailDataUrl:       string;
}

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

router.post("/", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
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

    /* Build the data URL — OpenAI vision accepts data URLs for images.
       For PDFs we send as a base64 file via the input_image content type
       (the model will OCR the first page). */
    const base64    = file.buffer.toString("base64");
    const mime      = file.mimetype;
    const isPdf     = mime === "application/pdf";
    /* GPT vision currently does not accept PDF directly — convert PDF to
       a textual prompt-only request that asks the model to respond based
       on the filename + structural analysis only. For PDFs we instead
       send the first ~50KB as text-extractable hints. To avoid a heavy
       PDF parser dep, we simply tell the model "the user uploaded a PDF"
       and ask it to provide a structured needs_review result if it cannot
       analyze it. The image path is the primary supported flow. */
    const dataUrl   = isPdf
      ? null
      : `data:${mime};base64,${base64}`;

    let parsed: Omit<DocumentCheckResult, "thumbnailDataUrl"> | null = null;

    if (dataUrl) {
      const completion = await client.chat.completions.create({
        model: "gpt-5.4",
        max_completion_tokens: 1500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Inspect the attached document image and respond with the JSON object only." },
              { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
            ],
          },
        ],
      });
      const raw = completion.choices[0]?.message?.content ?? "";
      try {
        parsed = JSON.parse(raw);
      } catch {
        req.log.warn({ raw: raw.slice(0, 500) }, "document-check: failed to parse JSON");
      }
    } else {
      /* PDF path — return a "needs_review" result with the filename and a
         clear note that the user should re-upload as an image (or call
         for the free Pre-Check). This avoids shipping a PDF parser and a
         second model call just for this MVP. */
      parsed = {
        documentType:           "PDF document (unable to auto-inspect)",
        notarialBlockPresent:   { present: false, location: null },
        signaturePresent:       false,
        dateField:              "unknown",
        redFlags:               [
          "PDF auto-inspection isn't enabled yet. Re-upload the page as a JPG or PNG, or book a free Pre-Check and Docsy will eyeball it.",
        ],
        recommendation:         "needs_review",
        recommendationRationale: "Docsy's automated inspector currently scans images. PDFs go straight to a human Pre-Check call.",
        suggestedService:       "mobile",
      };
    }

    if (!parsed) {
      res.status(502).json({ ok: false, error: "The inspector returned an unexpected response. Please try again, or book a free Pre-Check." });
      return;
    }

    /* Defensive shape coercion — the model SHOULD obey response_format,
       but we guard the fields we render so a malformed value can't crash
       the result UI. */
    const safe: DocumentCheckResult = {
      documentType:            String(parsed.documentType ?? "Unknown"),
      notarialBlockPresent: {
        present:  Boolean(parsed.notarialBlockPresent?.present),
        location: parsed.notarialBlockPresent?.location ?? null,
      },
      signaturePresent:        Boolean(parsed.signaturePresent),
      dateField:               (["present", "missing", "unknown"].includes(parsed.dateField as string)
                                 ? parsed.dateField
                                 : "unknown") as DocumentCheckResult["dateField"],
      redFlags:                Array.isArray(parsed.redFlags)
                                 ? parsed.redFlags.slice(0, 12).map((f: unknown) => String(f).slice(0, 240))
                                 : [],
      recommendation:          (["ready_to_notarize", "fix_first", "needs_review"].includes(parsed.recommendation as string)
                                 ? parsed.recommendation
                                 : "needs_review") as Recommendation,
      recommendationRationale: String(parsed.recommendationRationale ?? "").slice(0, 600),
      suggestedService:        (["ron", "mobile", "in-office", "apostille", "loan-signing"].includes(parsed.suggestedService as string)
                                 ? parsed.suggestedService
                                 : "mobile") as SuggestedService,
      thumbnailDataUrl:        isPdf ? "" : `data:${mime};base64,${base64}`,
    };

    res.json({ ok: true, result: safe });
  } catch (err) {
    req.log.error({ err }, "document-check: unhandled error");
    res.status(500).json({ ok: false, error: "Document check failed. Please try again." });
  }
});

export default router;
