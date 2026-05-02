/**
 * Replit App Storage helper. Authenticates against the Replit sidecar
 * which proxies Google Cloud Storage credentials, then exposes a
 * `saveBuffer` function that writes opaque bytes under
 * `${PRIVATE_OBJECT_DIR}/<key>` with custom metadata.
 *
 * Used by the document-check route to retain anonymous uploads for 24
 * hours so the user can revisit a result via a stable URL. The 24-hour
 * expiry is enforced bucket-side via a lifecycle rule installed once
 * by `ensureLifecyclePolicy`.
 */
import { Storage, type Bucket } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

/* The Replit sidecar exposes external-account credentials at a local
 * URL. The `@google-cloud/storage` types require a strict
 * StorageOptions shape; we cast the literal so TS accepts the
 * `external_account` discriminator without us having to depend on
 * `google-auth-library`'s internal types directly. */
const storage: Storage = new Storage({
  credentials: {
    audience:           "replit",
    subject_token_type: "access_token",
    token_url:          `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type:               "external_account",
    credential_source:  {
      url:    `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

function getPrivateObjectDir(): string {
  const dir = process.env["PRIVATE_OBJECT_DIR"];
  if (!dir) throw new Error("PRIVATE_OBJECT_DIR is not configured.");
  return dir.endsWith("/") ? dir.slice(0, -1) : dir;
}

function parseBucketAndObject(fullPath: string): { bucketName: string; objectName: string } {
  const parts = fullPath.startsWith("/") ? fullPath.slice(1).split("/") : fullPath.split("/");
  if (parts.length < 2) {
    throw new Error(`Invalid object path: ${fullPath}`);
  }
  return { bucketName: parts[0]!, objectName: parts.slice(1).join("/") };
}

export interface SavedObject {
  /** Stable application path, e.g. "/objects/document-checks/<uuid>". */
  objectPath: string;
  /** ISO timestamp at which the bucket lifecycle rule will purge it. */
  expiresAt: string;
}

/** Save a buffer under PRIVATE_OBJECT_DIR/<relativeKey> with custom
 *  metadata. The object is encrypted at rest by GCS by default. */
export async function saveBuffer(
  relativeKey: string,
  buffer:      Buffer,
  contentType: string,
  metadata:    Record<string, string>,
): Promise<SavedObject> {
  const privateDir = getPrivateObjectDir();
  const fullPath   = `${privateDir}/${relativeKey}`;
  const { bucketName, objectName } = parseBucketAndObject(fullPath);

  const bucket: Bucket = storage.bucket(bucketName);
  const file = bucket.file(objectName);

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await file.save(buffer, {
    contentType,
    resumable: false,
    metadata: {
      metadata: { ...metadata, expiresAt },
    },
  });

  return {
    objectPath: `/objects/${relativeKey}`,
    expiresAt,
  };
}

/** Delete a single object addressed by its relative key (the same key
 *  passed to `saveBuffer`). Used by the route to roll back a partial
 *  save when a follow-up write fails. */
export async function deleteByRelativeKey(relativeKey: string): Promise<void> {
  const privateDir = getPrivateObjectDir();
  const fullPath   = `${privateDir}/${relativeKey}`;
  const { bucketName, objectName } = parseBucketAndObject(fullPath);
  await storage.bucket(bucketName).file(objectName).delete({ ignoreNotFound: true });
}

/** Best-effort: list objects under `${PRIVATE_OBJECT_DIR}/<prefix>` and
 *  delete any whose `updated` timestamp is older than `maxAgeMs`. This
 *  is the fallback enforcement for the 24-hour retention promise when
 *  the proxy service account doesn't have bucket-admin permissions to
 *  install a real lifecycle rule.
 *
 *  Failures are logged and swallowed — the user-facing request must
 *  not depend on cleanup succeeding. */
export async function opportunisticCleanup(
  relativePrefix: string,
  maxAgeMs:       number,
  log:            (msg: string, extra?: unknown) => void,
): Promise<void> {
  try {
    const privateDir = getPrivateObjectDir();
    const fullPrefixPath = `${privateDir}/${relativePrefix}`;
    const { bucketName, objectName: prefix } = parseBucketAndObject(fullPrefixPath);
    const bucket = storage.bucket(bucketName);

    const [files] = await bucket.getFiles({ prefix });
    const cutoff = Date.now() - maxAgeMs;

    let deleted = 0;
    for (const file of files) {
      const updatedRaw = file.metadata.updated;
      if (!updatedRaw) continue;
      const ts = new Date(String(updatedRaw)).getTime();
      if (Number.isFinite(ts) && ts < cutoff) {
        try {
          await file.delete({ ignoreNotFound: true });
          deleted++;
        } catch (err) {
          log("objectStorage: failed to delete expired object", { name: file.name, err });
        }
      }
    }
    if (deleted > 0) log(`objectStorage: opportunistic cleanup deleted ${deleted} expired object(s)`);
  } catch (err) {
    log("objectStorage: opportunisticCleanup failed (non-fatal)", err);
  }
}

/** Schedule a periodic cleanup sweep so the 24-hour TTL is enforced
 *  even on days with little or no document-check traffic (the
 *  request-driven `opportunisticCleanup` only fires after a
 *  successful save). Runs every `intervalMs` while the process is
 *  alive; the timer is `unref`'d so it doesn't keep the event loop
 *  busy. Returns the timer so callers (e.g. tests) can cancel it. */
export function startBackgroundCleanup(
  prefix:     string,
  maxAgeMs:   number,
  intervalMs: number,
  log:        (msg: string, extra?: unknown) => void,
): NodeJS.Timeout {
  const tick = (): void => {
    opportunisticCleanup(prefix, maxAgeMs, log).catch((err) =>
      log("objectStorage: background cleanup tick threw", err),
    );
  };
  /* Fire one immediately so a freshly-restarted server reaps stale
     objects without waiting for the first interval. */
  setImmediate(tick);
  const timer = setInterval(tick, intervalMs);
  timer.unref();
  return timer;
}

/** Install a 1-day lifecycle rule on the default bucket if one isn't
 *  already present. Called once on server startup; failures are
 *  logged but do not crash the server — `opportunisticCleanup` and
 *  `startBackgroundCleanup` are the actual enforcement when bucket
 *  admin is unavailable. */
export async function ensureLifecyclePolicy(log: (msg: string, extra?: unknown) => void): Promise<void> {
  try {
    const privateDir = getPrivateObjectDir();
    const { bucketName } = parseBucketAndObject(`${privateDir}/probe`);
    const bucket = storage.bucket(bucketName);

    const [meta] = await bucket.getMetadata();
    const existing = (meta.lifecycle?.rule ?? []) as Array<{ action?: { type?: string }; condition?: { age?: number } }>;

    const alreadyHasIt = existing.some(
      (r) => r.action?.type === "Delete" && r.condition?.age === 1,
    );

    if (alreadyHasIt) {
      log("objectStorage: lifecycle rule already in place (1-day delete)");
      return;
    }

    const wanted = { action: { type: "Delete" as const }, condition: { age: 1 } };
    await bucket.setMetadata({
      lifecycle: { rule: [...existing, wanted] },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    log("objectStorage: installed 1-day delete lifecycle rule");
  } catch (err) {
    log("objectStorage: ensureLifecyclePolicy failed (non-fatal)", err);
  }
}
