import { Router } from "express";

const router = Router();

/* ── Types ─────────────────────────────────────────────── */
interface MockUser {
  id:             string;
  name:           string;
  email:          string;
  phone:          string; // normalized digits only, e.g. "2105551001"
  safePlusActive: boolean;
  safePlusTier:   "personal" | "family" | "professional" | null;
  membership:     "starter" | "pro" | "express" | null;
}

/* ── Seeded demo accounts ───────────────────────────────── */
const USERS: MockUser[] = [
  {
    id: "u1", name: "Jordan Williams",
    email: "jordan@example.com", phone: "2105551001",
    safePlusActive: true, safePlusTier: "personal", membership: "starter",
  },
  {
    id: "u2", name: "Maria Rodriguez",
    email: "maria@example.com", phone: "2105551002",
    safePlusActive: true, safePlusTier: "family", membership: "pro",
  },
  {
    id: "u3", name: "Devon Carter",
    email: "devon@example.com", phone: "2105551003",
    safePlusActive: true, safePlusTier: "professional", membership: "express",
  },
];

/* Index by email and normalized phone for O(1) lookup */
const BY_EMAIL = new Map(USERS.map(u => [u.email.toLowerCase(), u]));
const BY_PHONE = new Map(USERS.map(u => [u.phone, u]));

/* ── In-memory OTP and session stores ──────────────────── */
interface OTPRecord { userId: string; code: string; expiresAt: number; }
const OTP_STORE     = new Map<string, OTPRecord>();   // key: normalized identifier
const SESSION_STORE = new Map<string, string>();       // token → userId

/* ── Helpers ────────────────────────────────────────────── */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // strip leading country code 1 if present and result is 11 digits
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

function randomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function randomToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
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
    // Return same-shape response to prevent account enumeration in production.
    // For the demo we surface a clear message.
    res.status(404).json({ ok: false, error: "No account found with that email or phone number." });
    return;
  }

  const code    = randomCode();
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  OTP_STORE.set(key, { userId: user.id, code, expiresAt: expires });

  // In production: send real email / SMS here.
  // For the demo we log the code so it's visible in the server console.
  console.info(`[AUTH] OTP for ${key}: ${code}`);

  res.json({
    ok:     true,
    method: type,
    masked: mask(identifier.trim(), type),
  });
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

  // Accept the exact code OR "000000" as a universal demo fallback
  if (code !== record.code && code !== "000000") {
    res.status(401).json({ ok: false, error: "Incorrect code. Please try again." });
    return;
  }

  OTP_STORE.delete(key);

  const user  = USERS.find(u => u.id === record.userId)!;
  const token = randomToken();
  SESSION_STORE.set(token, user.id);

  res.json({
    ok:    true,
    token,
    user: {
      id:             user.id,
      name:           user.name,
      email:          user.email,
      phone:          user.phone,
      safePlusActive: user.safePlusActive,
      safePlusTier:   user.safePlusTier,
      membership:     user.membership,
    },
  });
});

/* ── Export session store (used by vault route) ─────────── */
export { SESSION_STORE, USERS };
export default router;
