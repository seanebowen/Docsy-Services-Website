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
import { Storage, type Bucket, type StorageOptions } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

/* The Replit sidecar exposes external-account workload-identity
 * credentials at a local URL. We model that exact shape here so the
 * Storage constructor receives a well-typed object without
 * resorting to `any`. The single `as unknown as StorageOptions[...]`
 * narrowing is necessary because `@google-cloud/storage`'s public
 * `CredentialBody` type only describes service-account shapes; the
 * `external_account` shape comes from `google-auth-library`'s
 * internal types which aren't re-exported. */
interface ReplitExternalAccountCredentials {
  type:               "external_account";
  audience:           string;
  subject_token_type: string;
  token_url:          string;
  credential_source:  {
    url:    string;
    format: { type: "json"; subject_token_field_name: string };
  };
  universe_domain:    string;
}

const replitCredentials: ReplitExternalAccountCredentials = {
  type:               "external_account",
  audience:           "replit",
  subject_token_type: "access_token",
  token_url:          `${REPLIT_SIDECAR_ENDPOINT}/token`,
  credential_source:  {
    url:    `${REPLIT_SIDECAR_ENDPOINT}/credential`,
    format: { type: "json", subject_token_field_name: "access_token" },
  },
  universe_domain: "googleapis.com",
};

const storage: Storage = new Storage({
  credentials: replitCredentials as unknown as StorageOptions["credentials"],
  projectId:   "",
});

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

/** Read an object's contents as a Buffer. Throws if the object does
 *  not exist or the read fails — callers handle that explicitly. */
export async function readBuffer(relativeKey: string): Promise<Buffer> {
  const privateDir = getPrivateObjectDir();
  const fullPath   = `${privateDir}/${relativeKey}`;
  const { bucketName, objectName } = parseBucketAndObject(fullPath);
  const [buf] = await storage.bucket(bucketName).file(objectName).download();
  return buf;
}

/** Copy an object from one relative key to another within the
 *  configured bucket. Used to promote a 24-hour anonymous scan into
 *  a permanent vault entry by relocating it under a different
 *  prefix (where the cleanup sweep won't touch it). Custom metadata
 *  is preserved by GCS. */
export async function copyObject(fromRelativeKey: string, toRelativeKey: string): Promise<void> {
  const privateDir = getPrivateObjectDir();
  const fromFull   = `${privateDir}/${fromRelativeKey}`;
  const toFull     = `${privateDir}/${toRelativeKey}`;
  const { bucketName, objectName: fromObj } = parseBucketAndObject(fromFull);
  const { bucketName: toBucketName, objectName: toObj } = parseBucketAndObject(toFull);

  const fromFile = storage.bucket(bucketName).file(fromObj);
  const toFile   = storage.bucket(toBucketName).file(toObj);
  await fromFile.copy(toFile);
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

    interface LifecycleRuleShape {
      action?:    { type?: string };
      condition?: { age?:  number };
    }
    interface LifecycleShape {
      rule?: LifecycleRuleShape[];
    }
    interface BucketMetadataShape {
      lifecycle?: LifecycleShape;
    }
    type SetMetadataPayload = Parameters<Bucket["setMetadata"]>[0];

    const [meta] = await bucket.getMetadata() as [BucketMetadataShape, unknown];
    const existing: LifecycleRuleShape[] = meta.lifecycle?.rule ?? [];

    const alreadyHasIt = existing.some(
      (r) => r.action?.type === "Delete" && r.condition?.age === 1,
    );

    if (alreadyHasIt) {
      log("objectStorage: lifecycle rule already in place (1-day delete)");
      return;
    }

    const wanted: LifecycleRuleShape = { action: { type: "Delete" }, condition: { age: 1 } };
    const payload: BucketMetadataShape = {
      lifecycle: { rule: [...existing, wanted] },
    };
    await bucket.setMetadata(payload as unknown as SetMetadataPayload);
    log("objectStorage: installed 1-day delete lifecycle rule");
  } catch (err) {
    log("objectStorage: ensureLifecyclePolicy failed (non-fatal)", err);
  }
}
