import app from "./app";
import { logger } from "./lib/logger";
import { ensureLifecyclePolicy, startBackgroundCleanup } from "./lib/objectStorage";

/* SESSION_SECRET is required to sign attribution cookies securely.
   Fail fast in production; warn loudly in development. */
if (!process.env["SESSION_SECRET"]) {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error(
      "SESSION_SECRET environment variable must be set in production " +
      "to sign attribution cookies. Set it as a Replit secret before deploying.",
    );
  }
  logger.warn(
    "SESSION_SECRET is not set — attribution cookies will use the dev fallback secret. " +
    "Set SESSION_SECRET before deploying to production.",
  );
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  /* Best-effort: install the 24-hour TTL lifecycle rule on the App
     Storage bucket so anonymous document-check uploads auto-purge.
     Failures are logged but do not crash startup — the periodic
     cleanup below is the actual enforcement when bucket-admin is
     unavailable. */
  const log = (msg: string, extra?: unknown): void => {
    if (extra) logger.warn({ extra }, msg);
    else       logger.info(msg);
  };
  ensureLifecyclePolicy(log).catch((err) =>
    logger.warn({ err }, "ensureLifecyclePolicy threw"),
  );

  /* Sweep expired document-check uploads every hour (also fires
     immediately on startup). Combined with the per-request
     opportunisticCleanup in the route, this keeps the 24-hour
     retention SLA honest even during low-traffic periods. */
  startBackgroundCleanup(
    "document-checks/",
    24 * 60 * 60 * 1000,  // maxAge: 24 hours
    60 * 60 * 1000,       // every hour
    log,
  );
});
