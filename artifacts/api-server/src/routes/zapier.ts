import { Router } from "express";
import { logger } from "../lib/logger.js";

const router = Router();

export interface BookingWebhookPayload {
  client_name:        string;
  client_email:       string;
  client_phone:       string;
  division:           string;
  service_type:       string;
  job_date:           string;
  job_time:           string;
  duration_min:       number;
  location_type:      string;
  location_address:   string;
  amount_charged:     number;
  stripe_payment_id:  string;
  booking_source:     "Replit Form";
  night_shift_seal:   boolean;
  honor_pass:         boolean;
}

/**
 * POST /api/zapier/booking-confirmed
 *
 * Called by the frontend after a successful payment to relay the
 * booking data to Zapier for downstream automation (CRM, calendar, etc.).
 */
router.post("/booking-confirmed", async (req, res): Promise<void> => {
  const payload = req.body as BookingWebhookPayload;

  /* Basic validation */
  if (!payload.client_email || !payload.service_type || !payload.job_date) {
    res.status(400).json({ ok: false, error: "client_email, service_type, and job_date are required." });
    return;
  }

  const zapierUrl = process.env["ZAPIER_WEBHOOK_URL"];
  if (!zapierUrl) {
    logger.warn("ZAPIER_WEBHOOK_URL is not set — booking data logged but not forwarded.");
    logger.info(
      {
        payload,
        client:         payload.client_email,
        service:        payload.service_type,
        amount_charged: payload.amount_charged,
        honor_pass:     payload.honor_pass,
      },
      "Booking confirmed (Zapier not configured)",
    );
    res.json({ ok: true, forwarded: false, warning: "ZAPIER_WEBHOOK_URL is not set." });
    return;
  }

  try {
    const zapRes = await fetch(zapierUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ...payload, booking_source: "Replit Form" }),
    });

    if (!zapRes.ok) {
      const body = await zapRes.text().catch(() => "");
      logger.error({ status: zapRes.status, body }, "Zapier webhook returned an error");
      res.status(502).json({ ok: false, error: `Zapier returned ${zapRes.status}` });
      return;
    }

    logger.info({ client: payload.client_email, service: payload.service_type }, "Zapier webhook fired");
    res.json({ ok: true, forwarded: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error({ err: msg }, "Failed to POST to Zapier");
    res.status(500).json({ ok: false, error: msg });
  }
});

export default router;
