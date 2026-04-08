import { Router } from "express";
import { getAvailableSlots } from "../lib/getAvailableSlots.js";
import { inferServiceKey } from "../lib/serviceConfig.js";

const router = Router();

/**
 * Realistic demo slots used when Google Calendar secrets are not yet configured.
 * 15-minute increments, 08:00–17:30, with a lunch gap (12:00–12:45) and a
 * couple of natural-looking gaps (10:00, 14:15) so the grid isn't perfectly uniform.
 */
const DEMO_SLOTS: string[] = [
  "08:00","08:15","08:30","08:45",
  "09:00","09:15","09:30","09:45",
  /* 10:00 intentionally absent */
  "10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45",
  /* 12:00–12:45 lunch gap */
  "13:00","13:15","13:30","13:45",
  "14:00",
  /* 14:15 intentionally absent */
  "14:30","14:45",
  "15:00","15:15","15:30","15:45",
  "16:00","16:15","16:30","16:45",
  "17:00","17:15","17:30",
];

/**
 * GET /api/slots
 *
 * Query params:
 *   date      — YYYY-MM-DD  (required)
 *   service   — SERVICE_CONFIG key (optional; can also pass serviceNames[])
 *   serviceNames — comma-separated service labels for auto-inference (optional)
 *   isMember  — "true"|"false"  (optional, default false)
 */
router.get("/", async (req, res): Promise<void> => {
  const { date, service, serviceNames, isMember } = req.query as Record<string, string>;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ ok: false, error: "date is required (YYYY-MM-DD)." });
    return;
  }

  /* Resolve service key: explicit > inferred from names */
  let serviceKey = service;
  if (!serviceKey && serviceNames) {
    const names = serviceNames.split(",").map(s => s.trim()).filter(Boolean);
    serviceKey  = inferServiceKey(names);
  }
  if (!serviceKey) serviceKey = "RON"; // fallback

  const member = isMember === "true";

  try {
    const slots = await getAvailableSlots(date, serviceKey, member);
    res.json({ ok: true, date, serviceKey, slots });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // If secrets aren't configured yet, return demo slots so the booking
    // flow is fully demoable without any Google Calendar credentials.
    if (msg.includes("secret is not set")) {
      res.json({ ok: true, date, serviceKey, slots: DEMO_SLOTS, warning: msg, demo: true });
    } else {
      res.status(500).json({ ok: false, error: msg });
    }
  }
});

export default router;
