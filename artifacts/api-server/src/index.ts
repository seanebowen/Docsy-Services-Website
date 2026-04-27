import app from "./app";
import { logger } from "./lib/logger";
import { ensureLifecyclePolicy } from "./lib/objectStorage";

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
     Failures are logged but do not crash startup. */
  ensureLifecyclePolicy((msg, extra) => {
    if (extra) logger.warn({ extra }, msg);
    else       logger.info(msg);
  }).catch((err) => logger.warn({ err }, "ensureLifecyclePolicy threw"));
});
