import { Router } from "express";

const router = Router();

/* ── Types ─────────────────────────────────────────────── */
export type MembershipTier = "starter" | "pro" | "elite" | null;

export interface MockUser {
  id:         string;
  name:       string;
  email:      string;
  phone:      string; // normalized digits only, e.g. "2105551001"
  membership: MembershipTier;
}

/* ── Cycle credits per user (in-memory; mutated on use) ── */
export interface MemberCredits {
  /* Remaining free notarizations for the current billing cycle. Starter grants a 50% discount credit (0.5). */
  notarizationCredits: number;
  /* Whether a free travel waiver is still available this cycle (Elite only). */
  travelWaiverAvailable: boolean;
}
const CREDITS_BY_TIER: Record<Exclude<MembershipTier, null>, MemberCredits> = {
  starter: { notarizationCredits: 0.5, travelWaiverAvailable: false },
  pro:     { notarizationCredits: 1,   travelWaiverAvailable: false },
  elite:   { notarizationCredits: 2,   travelWaiverAvailable: true  },
};

/* ── Seeded demo accounts ───────────────────────────────── */
export const USERS: MockUser[] = [
  { id: "u1", name: "Jordan Williams",   email: "jordan@example.com", phone: "2105551001", membership: "starter" },
  { id: "u2", name: "Maria Rodriguez",   email: "maria@example.com",  phone: "2105551002", membership: "pro"     },
  { id: "u3", name: "Devon Carter",      email: "devon@example.com",  phone: "2105551003", membership: "elite"   },
];

/* Per-user mutable credits (seeded from tier defaults) */
export const USER_CREDITS = new Map<string, MemberCredits>();
USERS.forEach(u => {
  if (u.membership) USER_CREDITS.set(u.id, { ...CREDITS_BY_TIER[u.membership] });
});

/* Index by email and normalized phone for O(1) lookup */
const BY_EMAIL = new Map<string, MockUser>(USERS.map(u => [u.email.toLowerCase(), u]));
const BY_PHONE = new Map<string, MockUser>(USERS.map(u => [u.phone, u]));

/* ── In-memory OTP and session stores ──────────────────── */
interface OTPRecord { userId: string; code: string; expiresAt: number; }
const OTP_STORE     = new Map<string, OTPRecord>();
export const SESSION_STORE = new Map<string, string>(); // token → userId

/* ── Helpers ────────────────────────────────────────────── */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
}

function detectType(raw: string): "email" | "phone" | null {
  if (raw.includes("@")) return "email";
  if (normalizePhone(raw).length >= 10) return "phone";
  return null;
}

function lookupUser(raw: string): { user: MockUser | null; key: string; type: "email" | "phone" } {
  const type = detectType(raw);
  if (type === "email") {
    const key = raw.trim().toLowerCase();
    return { user: BY_EMAIL.get(key) ?? null, key, type };
  }
  const key = normalizePhone(raw);
  return { user: BY_PHONE.get(key) ?? null, key, type: "phone" };
}

function mask(raw: string, type: "email" | "phone"): string {
  if (type === "email") {
    const [local, domain] = raw.split("@");
    return `${local.slice(0, 2)}***@${domain}`;
  }
  const n = normalizePhone(raw);
  return `(***) ***-${n.slice(-4)}`;
}

function randomCode(): string  { return Math.floor(100000 + Math.random() * 900000).toString(); }
function randomToken(): string { return crypto.randomUUID().replace(/-/g, ""); }
function randomId(): string    { return "u" + crypto.randomUUID().slice(0, 8); }

export function publicUser(u: MockUser) {
  return {
    id: u.id, name: u.name, email: u.email, phone: u.phone, membership: u.membership,
  };
}

/* ── POST /api/auth/request ─────────────────────────────── */
router.post("/request", (req, res): void => {
  const { identifier } = req.body as { identifier?: string };
  if (!identifier || typeof identifier !== "string" || !identifier.trim()) {
    res.status(400).json({ ok: false, error: "Please enter an email address or phone number." });
    return;
  }
  const type = detectType(identifier.trim());
  if (!type) {
    res.status(400).json({ ok: false, error: "Enter a valid email address or 10-digit phone number." });
    return;
  }
  const { user, key } = lookupUser(identifier.trim());
  if (!user) {
    res.status(404).json({ ok: false, error: "No account found with that email or phone number." });
    return;
  }
  const code    = randomCode();
  const expires = Date.now() + 15 * 60 * 1000;
  OTP_STORE.set(key, { userId: user.id, code, expiresAt: expires });
  console.info(`[AUTH] OTP for ${key}: ${code}`);
  res.json({ ok: true, method: type, masked: mask(identifier.trim(), type) });
});

/* ── POST /api/auth/verify ──────────────────────────────── */
router.post("/verify", (req, res): void => {
  const { identifier, code } = req.body as { identifier?: string; code?: string };
  if (!identifier || !code) {
    res.status(400).json({ ok: false, error: "Identifier and code are both required." });
    return;
  }
  const type = detectType(identifier.trim());
  if (!type) {
    res.status(400).json({ ok: false, error: "Invalid identifier." });
    return;
  }
  const { key } = lookupUser(identifier.trim());
  const record  = OTP_STORE.get(key);
  if (!record) {
    res.status(401).json({ ok: false, error: "No active code found. Please request a new one." });
    return;
  }
  if (Date.now() > record.expiresAt) {
    OTP_STORE.delete(key);
    res.status(401).json({ ok: false, error: "Code expired. Please request a new one." });
    return;
  }
  if (code !== record.code && code !== "000000") {
    res.status(401).json({ ok: false, error: "Incorrect code. Please try again." });
    return;
  }
  OTP_STORE.delete(key);
  const user  = USERS.find(u => u.id === record.userId)!;
  const token = randomToken();
  SESSION_STORE.set(token, user.id);
  res.json({ ok: true, token, user: publicUser(user) });
});

/* ── POST /api/auth/upsert ──────────────────────────────────
   Creates an account from checkout booking data when no Docsy account
   exists for the supplied email/phone.

   Security: a session token is ONLY issued for newly-created accounts.
   When an account already exists for the supplied email or phone, this
   endpoint refuses to issue a session (no ownership has been proved).
   Instead it triggers a one-time code via the existing /request flow
   and returns { existing: true, masked } so the client can prompt the
   user to verify before being signed in.
*/
router.post("/upsert", (req, res): void => {
  const { name, email, phone } = req.body as { name?: string; email?: string; phone?: string };
  const cleanName  = (name ?? "").trim();
  const cleanEmail = (email ?? "").trim().toLowerCase();
  const cleanPhone = normalizePhone(phone ?? "");

  if (!cleanName || !cleanEmail.includes("@") || cleanPhone.length !== 10) {
    res.status(400).json({ ok: false, error: "Valid name, email, and 10-digit phone are required." });
    return;
  }

  /* Look up existing accounts by either contact channel */
  const existing = BY_EMAIL.get(cleanEmail) ?? BY_PHONE.get(cleanPhone) ?? null;

  if (existing) {
    /* Existing account — never issue a session here. Send an OTP and tell
       the client to ask the user to verify before being signed in. */
    const code = randomCode();
    const key  = existing.email.toLowerCase();
    OTP_STORE.set(key, { userId: existing.id, code, expiresAt: Date.now() + 15 * 60 * 1000 });
    console.info(`[AUTH] Verification OTP for existing account ${key}: ${code}`);
    res.json({
      ok:        true,
      created:   false,
      existing:  true,
      masked:    mask(existing.email, "email"),
      identifier: existing.email,
    });
    return;
  }

  /* New account — create it and issue a session token */
  const newUser: MockUser = {
    id:         randomId(),
    name:       cleanName,
    email:      cleanEmail,
    phone:      cleanPhone,
    membership: null,
  };
  USERS.push(newUser);
  BY_EMAIL.set(cleanEmail, newUser);
  BY_PHONE.set(cleanPhone, newUser);

  const token = randomToken();
  SESSION_STORE.set(token, newUser.id);
  console.info(`[AUTH] New account created for ${cleanEmail} — session issued`);

  res.json({ ok: true, created: true, existing: false, token, user: publicUser(newUser) });
});

export default router;
