import { Router, type Request, type Response } from "express";
import crypto from "node:crypto";
import { stampReferral, type StampReferralResult } from "./partners.js";

const router = Router();

/* ─────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────── */

export interface Booking {
  bookingRef:   string;
  date:         string;
  time:         string;
  services:     string[];
  bookingValue: number;
  clientName:   string;
  clientEmail:  string;
  referredBy?:  string;
  createdAt:    string;
}

/* ─────────────────────────────────────────────────────────
   In-memory store
   ───────────────────────────────────────────────────────── */

export const BOOKINGS: Map<string, Booking> = new Map();

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function generateBookingRef(): string {
  const now = new Date();
  const y   = now.getFullYear();
  const m   = String(now.getMonth() + 1).padStart(2, "0");
  const d   = String(now.getDate()).padStart(2, "0");
  const rnd = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `BK-${y}${m}${d}-${rnd}`;
}

/* ─────────────────────────────────────────────────────────
   POST /api/bookings
   Authoritative booking creation endpoint. Reads the signed
   docsy_ref attribution cookie and stamps a referral record
   atomically — no separate record-booking call required.
   ───────────────────────────────────────────────────────── */

router.post("/", (req: Request, res: Response): void => {
  const { date, time, services, bookingValue, clientName, clientEmail } = req.body as {
    date?:         string;
    time?:         string;
    services?:     string[];
    bookingValue?: number;
    clientName?:   string;
    clientEmail?:  string;
  };

  if (!date || !time) {
    res.status(400).json({ ok: false, error: "date and time are required." });
    return;
  }

  /* Cap booking value to a reasonable ceiling */
  const MAX_BOOKING_VALUE = 2000;
  const value = typeof bookingValue === "number" && bookingValue > 0
    ? Math.min(bookingValue, MAX_BOOKING_VALUE)
    : 0;

  /* Generate a stable, server-side booking reference */
  const bookingRef = generateBookingRef();

  /* Read the SIGNED attribution cookie — tampered values resolve to false */
  const signedCookies = req.signedCookies as Record<string, string | false>;
  const refCode = (typeof signedCookies["docsy_ref"] === "string"
    ? signedCookies["docsy_ref"]
    : ""
  ).toUpperCase();

  /* Stamp referral atomically while creating the booking */
  const referral: StampReferralResult = refCode
    ? stampReferral({
        bookingRef,
        refCode,
        services: Array.isArray(services) ? services : [],
        bookingValue: value,
      })
    : { attributed: false, creditEarned: 0 };

  /* Persist the booking record */
  const booking: Booking = {
    bookingRef,
    date:         date,
    time:         time,
    services:     Array.isArray(services) ? services : [],
    bookingValue: value,
    clientName:   (clientName ?? "").trim(),
    clientEmail:  (clientEmail ?? "").trim(),
    createdAt:    new Date().toISOString(),
    ...(referral.attributed && referral.partnerId
      ? { referredBy: referral.partnerId }
      : {}),
  };
  BOOKINGS.set(bookingRef, booking);

  req.log.info(
    {
      bookingRef,
      clientEmail:        booking.clientEmail,
      referralAttributed: referral.attributed,
      ...(referral.attributed ? { creditEarned: referral.creditEarned } : {}),
    },
    "booking created",
  );

  res.json({
    ok:                 true,
    bookingRef,
    referralAttributed: referral.attributed,
    creditEarned:       referral.creditEarned,
  });
});

export default router;
