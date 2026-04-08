import { Router } from "express";
import { getAvailableSlots } from "../lib/getAvailableSlots.js";
import { inferServiceKey } from "../lib/serviceConfig.js";

const router = Router();

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
    // If secrets aren't configured yet, return an empty but valid response
    // rather than a 500 — the UI can handle empty gracefully.
    if (msg.includes("secret is not set")) {
      res.json({ ok: true, date, serviceKey, slots: [], warning: msg });
    } else {
      res.status(500).json({ ok: false, error: msg });
    }
  }
});

export default router;
