import { Router, type Request, type Response } from "express";
import crypto from "node:crypto";
import {
  USERS,
  SESSION_STORE,
  indexUser,
  type MockUser,
} from "./auth.js";

const router = Router();

/* ─────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────── */

export type PartnerStatus  = "pending" | "approved";
export type PrimaryService = "real-estate" | "legal" | "title" | "immigration" | "financial" | "other";

export interface Partner {
  id:             string;
  name:           string;
  business:       string;
  email:          string;
  phone:          string;
  primaryService: PrimaryService;
  refCode:        string;
  status:         PartnerStatus;
  userId:         string;
  clickCount:     number;
  createdAt:      string;
}

export interface PartnerReferral {
  id:           string;
  partnerId:    string;
  refCode:      string;
  bookingRef:   string;
  services:     string[];
  bookingValue: number;
  creditRate:   number;
  creditEarned: number;
  status:       "pending" | "confirmed";
  createdAt:    string;
}

/* ─────────────────────────────────────────────────────────
   In-memory stores
   ───────────────────────────────────────────────────────── */

export const PARTNERS:          Map<string, Partner>              = new Map();
export const PARTNER_REFERRALS: Map<string, PartnerReferral[]>   = new Map();
export const PARTNERS_BY_CODE:  Map<string, Partner>              = new Map();

/* ─────────────────────────────────────────────────────────
   Seed: one demo approved partner with referrals
   ───────────────────────────────────────────────────────── */

(function seed() {
  const partner: Partner = {
    id:             "p1",
    name:           "Sandra Kim",
    business:       "Kim Real Estate Group",
    email:          "sandra@realty.test",
    phone:          "2105554001",
    primaryService: "real-estate",
    refCode:        "REF-K9M2X1",
    status:         "approved",
    userId:         "pa1",
    clickCount:     14,
    createdAt:      "2026-03-01T10:00:00.000Z",
  };
  PARTNERS.set(partner.id, partner);
  PARTNERS_BY_CODE.set(partner.refCode, partner);

  PARTNER_REFERRALS.set("p1", [
    {
      id: "pr1", partnerId: "p1", refCode: "REF-K9M2X1",
      bookingRef: "BK-2026-0312", services: ["RON"],
      bookingValue: 25, creditRate: 0.10, creditEarned: 2.50,
      status: "confirmed", createdAt: "2026-03-12T14:30:00.000Z",
    },
    {
      id: "pr2", partnerId: "p1", refCode: "REF-K9M2X1",
      bookingRef: "BK-2026-0319", services: ["Mobile Notary"],
      bookingValue: 75, creditRate: 0.10, creditEarned: 7.50,
      status: "confirmed", createdAt: "2026-03-19T09:15:00.000Z",
    },
    {
      id: "pr3", partnerId: "p1", refCode: "REF-K9M2X1",
      bookingRef: "BK-2026-0401", services: ["Loan Signing"],
      bookingValue: 175, creditRate: 0.10, creditEarned: 17.50,
      status: "pending", createdAt: "2026-04-01T11:00:00.000Z",
    },
  ]);
})();

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function newPartnerId():  string { return "p"  + crypto.randomUUID().slice(0, 8); }
function newReferralId(): string { return "pr" + crypto.randomUUID().slice(0, 8); }

function generateRefCode(): string {
  return "REF-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function normalizePhone(p: string): string {
  const d = p.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

/* Simple IP-based rate limiter for apply endpoint */
const APPLY_RATE = new Map<string, number[]>();
function applyRateCheck(ip: string): boolean {
  const now    = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const hits   = (APPLY_RATE.get(ip) ?? []).filter(t => now - t < window);
  if (hits.length >= 5) return false;
  hits.push(now);
  APPLY_RATE.set(ip, hits);
  return true;
}

const VALID_SERVICES: PrimaryService[] = ["real-estate", "legal", "title", "immigration", "financial", "other"];

/* ─────────────────────────────────────────────────────────
   POST /api/partners/apply  (public)
   ───────────────────────────────────────────────────────── */

router.post("/apply", (req: Request, res: Response): void => {
  const ip = req.ip ?? "unknown";
  if (!applyRateCheck(ip)) {
    res.status(429).json({ ok: false, error: "Too many applications from this IP. Please try again later." });
    return;
  }

  const { name, business, email, phone, primaryService } = req.body as {
    name?: string; business?: string; email?: string; phone?: string; primaryService?: string;
  };

  const cleanName    = (name           ?? "").trim();
  const cleanBiz     = (business       ?? "").trim();
  const cleanEmail   = (email          ?? "").trim().toLowerCase();
  const cleanPhone   = normalizePhone(phone ?? "");
  const cleanService = (primaryService ?? "").trim() as PrimaryService;

  if (!cleanName || !cleanBiz) {
    res.status(400).json({ ok: false, error: "Full name and business name are required." });
    return;
  }
  if (!isValidEmail(cleanEmail)) {
    res.status(400).json({ ok: false, error: "A valid email address is required." });
    return;
  }
  if (cleanPhone.length !== 10) {
    res.status(400).json({ ok: false, error: "A valid 10-digit US phone number is required." });
    return;
  }
  if (!VALID_SERVICES.includes(cleanService)) {
    res.status(400).json({ ok: false, error: "Please select a valid primary service category." });
    return;
  }

  /* Duplicate check */
  const dup = [...PARTNERS.values()].find(p => p.email === cleanEmail);
  if (dup) {
    res.status(409).json({
      ok:       false,
      error:    "An application for this email already exists.",
      refCode:  dup.refCode,
      existing: true,
    });
    return;
  }

  /* Unique ref code */
  let refCode = generateRefCode();
  while (PARTNERS_BY_CODE.has(refCode)) refCode = generateRefCode();

  /* Create or upgrade user account */
  let user = USERS.find(u => u.email === cleanEmail) ?? null;
  if (!user) {
    user = {
      id:         "pa" + crypto.randomUUID().slice(0, 8),
      name:       cleanName,
      email:      cleanEmail,
      phone:      cleanPhone,
      membership: null,
      role:       "partner",
    } as MockUser;
    USERS.push(user);
    indexUser(user);
  } else {
    user.role = "partner";
  }

  const partnerId = newPartnerId();
  (user as MockUser & { partnerId?: string }).partnerId = partnerId;

  const partner: Partner = {
    id:             partnerId,
    name:           cleanName,
    business:       cleanBiz,
    email:          cleanEmail,
    phone:          cleanPhone,
    primaryService: cleanService,
    refCode,
    status:         "approved",
    userId:         user.id,
    clickCount:     0,
    createdAt:      new Date().toISOString(),
  };

  PARTNERS.set(partner.id, partner);
  PARTNERS_BY_CODE.set(refCode, partner);
  PARTNER_REFERRALS.set(partnerId, []);

  res.json({
    ok:          true,
    partnerId,
    refCode,
    trackedLink: `/?ref=${refCode}`,
    portalUrl:   "/partners/portal",
    message:     "Welcome to the Docsy Partner Program. Sign in with your email to access your portal.",
  });
});

/* ─────────────────────────────────────────────────────────
   GET /api/partners/track?ref=XYZ  (public pixel tracker)
   Sets a 30-day attribution cookie and returns a transparent 1×1 GIF.
   ───────────────────────────────────────────────────────── */

router.get("/track", (req: Request, res: Response): void => {
  const ref = ((req.query["ref"] as string) ?? "").trim().toUpperCase();

  if (ref) {
    const partner = PARTNERS_BY_CODE.get(ref);
    if (partner) {
      partner.clickCount += 1;
      res.cookie("docsy_ref", ref, {
        maxAge:   30 * 24 * 60 * 60 * 1000,
        path:     "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }
  }

  const GIF1x1 = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64",
  );
  res.set("Content-Type",  "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.end(GIF1x1);
});

/* ─────────────────────────────────────────────────────────
   GET /api/partners/me  (auth-gated: partner role)
   ───────────────────────────────────────────────────────── */

router.get("/me", (req: Request, res: Response): void => {
  const header = req.headers["authorization"] ?? "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !SESSION_STORE.has(token)) {
    res.status(401).json({ ok: false, error: "Unauthorized. Please sign in." });
    return;
  }
  const userId = SESSION_STORE.get(token)!;
  const user   = USERS.find(u => u.id === userId);
  if (!user || user.role !== "partner") {
    res.status(403).json({ ok: false, error: "Partner access required." });
    return;
  }

  const partnerId = (user as MockUser & { partnerId?: string }).partnerId;
  const partner   = partnerId
    ? PARTNERS.get(partnerId)
    : [...PARTNERS.values()].find(p => p.userId === userId);

  if (!partner) {
    res.status(404).json({ ok: false, error: "Partner record not found. Contact support." });
    return;
  }

  const referrals     = PARTNER_REFERRALS.get(partner.id) ?? [];
  const totalEarned   = referrals.reduce((s, r) => s + r.creditEarned, 0);
  const pendingEarned = referrals.filter(r => r.status === "pending").reduce((s, r) => s + r.creditEarned, 0);

  res.json({
    ok:       true,
    partner,
    referrals,
    earnings: {
      total:     Math.round(totalEarned   * 100) / 100,
      pending:   Math.round(pendingEarned * 100) / 100,
      confirmed: Math.round((totalEarned - pendingEarned) * 100) / 100,
    },
  });
});

/* ─────────────────────────────────────────────────────────
   POST /api/partners/record-booking  (public, reads cookie)
   Called by BookingConfirmation to stamp a referral record when
   a docsy_ref attribution cookie is present.
   ───────────────────────────────────────────────────────── */

router.post("/record-booking", (req: Request, res: Response): void => {
  const cookies = req.cookies as Record<string, string>;
  const refCode = (cookies["docsy_ref"] ?? "").toUpperCase();

  if (!refCode) {
    res.json({ ok: true, attributed: false });
    return;
  }

  const partner = PARTNERS_BY_CODE.get(refCode);
  if (!partner) {
    res.json({ ok: true, attributed: false });
    return;
  }

  const { bookingRef, services, bookingValue } = req.body as {
    bookingRef?:   string;
    services?:     string[];
    bookingValue?: number;
  };

  const value       = typeof bookingValue === "number" && bookingValue > 0 ? bookingValue : 0;
  const creditRate  = 0.10;
  const creditEarned = Math.round(value * creditRate * 100) / 100;

  const referral: PartnerReferral = {
    id:           newReferralId(),
    partnerId:    partner.id,
    refCode,
    bookingRef:   bookingRef ?? ("BK-" + Date.now()),
    services:     Array.isArray(services) ? services : [],
    bookingValue: value,
    creditRate,
    creditEarned,
    status:       "pending",
    createdAt:    new Date().toISOString(),
  };

  const existing = PARTNER_REFERRALS.get(partner.id) ?? [];
  existing.push(referral);
  PARTNER_REFERRALS.set(partner.id, existing);

  res.json({ ok: true, attributed: true, partnerId: partner.id, creditEarned });
});

export default router;
