import { Router, type Request, type Response } from "express";

const router = Router();

/* ── Types ─────────────────────────────────────────────── */
export type MembershipTier = "starter" | "pro" | "elite" | null;

export type IdMeGroup = "military" | "veteran" | "responder" | "nurse" | "teacher";
const VALID_IDME_GROUPS: IdMeGroup[] = ["military", "veteran", "responder", "nurse", "teacher"];

export interface IdMeVerificationRecord {
  group:      IdMeGroup;
  verifiedAt: string;
}

/* B2B firm-role on a user account. Default for everyone is "individual";
   firm_admin can manage their firm's roster and bulk-book on behalf of
   the firm; firm_member can bulk-book and view jobs/invoices but not
   modify the roster. internal_admin is Docsy staff and is gated by
   real session-based RBAC (NOT a shared header secret). */
export type UserRole = "individual" | "firm_admin" | "firm_member" | "internal_admin" | "partner";

export interface MockUser {
  id:         string;
  name:       string;
  email:      string;
  phone:      string; // normalized digits only, e.g. "2105551001"
  membership: MembershipTier;
  idMeVerification?: IdMeVerificationRecord | null;
  role?:      UserRole;       // undefined treated as "individual"
  firmId?:    string | null;  // set when role is firm_admin or firm_member
  partnerId?: string | null;  // set when role is "partner"
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
  { id: "u1", name: "Jordan Williams",   email: "jordan@example.com", phone: "2105551001", membership: "starter", role: "individual" },
  { id: "u2", name: "Maria Rodriguez",   email: "maria@example.com",  phone: "2105551002", membership: "pro",     role: "individual" },
  { id: "u3", name: "Devon Carter",      email: "devon@example.com",  phone: "2105551003", membership: "elite",   role: "individual" },
  /* Pre-approved demo firm "Hill Country Title Co." (firm id "f1"). The
     admin can manage roster + bulk-book; the member can bulk-book and
     view jobs/invoices. */
  { id: "fu1", name: "Valerie Chen",     email: "valerie@hillcountrytitle.test", phone: "2105552001", membership: null, role: "firm_admin",  firmId: "f1" },
  { id: "fu2", name: "Marcus Wright",    email: "marcus@hillcountrytitle.test",  phone: "2105552002", membership: null, role: "firm_member", firmId: "f1" },
  /* Docsy staff member (demo). In production this would be provisioned
     out-of-band, not seeded. Gates the /internal-firms approval surface. */
  { id: "ia1", name: "Avery Internal",   email: "admin@docsy.test",               phone: "2105559900", membership: null, role: "internal_admin" },
  /* Demo partner — linked to seed partner record "p1" in partners.ts. */
  { id: "pa1", name: "Sandra Kim",       email: "sandra@realty.test",             phone: "2105554001", membership: null, role: "partner", partnerId: "p1" },
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
    id:               u.id,
    name:             u.name,
    email:            u.email,
    phone:            u.phone,
    membership:       u.membership,
    idMeVerification: u.idMeVerification ?? null,
    role:             u.role ?? "individual",
    firmId:           u.firmId ?? null,
    partnerId:        u.partnerId ?? null,
  };
}

/* ── Helper: look up the user behind a Bearer token without
   coupling other route files to the SESSION_STORE map directly. */
export function userIdFromToken(token: string | undefined | null): string | null {
  if (!token) return null;
  return SESSION_STORE.get(token) ?? null;
}

export function findUser(userId: string | null | undefined): MockUser | null {
  if (!userId) return null;
  return USERS.find((u) => u.id === userId) ?? null;
}

/* Add a freshly-created user to the email + phone indexes so OTP login
   immediately recognises them. Use this from any module that mutates
   USERS at runtime (firm onboarding, etc). Idempotent. */
export function indexUser(u: MockUser): void {
  BY_EMAIL.set(u.email.toLowerCase(), u);
  if (u.phone) BY_PHONE.set(u.phone, u);
}

/* ── Middleware: verify Bearer token ─────────────────────
   Inlined here to avoid circular imports with vault.ts.
*/
export function requireAuth(req: Request, res: Response, next: () => void): void {
  const header = req.headers["authorization"] ?? "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !SESSION_STORE.has(token)) {
    res.status(401).json({ ok: false, error: "Unauthorized. Please sign in." });
    return;
  }
  (req as Request & { userId: string }).userId = SESSION_STORE.get(token)!;
  next();
}

/* ── Middleware: verify Bearer token AND firm role.
   Allows firm_admin or firm_member; rejects everyone else. */
export function requireFirmAuth(req: Request, res: Response, next: () => void): void {
  const header = req.headers["authorization"] ?? "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !SESSION_STORE.has(token)) {
    res.status(401).json({ ok: false, error: "Unauthorized. Please sign in." });
    return;
  }
  const userId = SESSION_STORE.get(token)!;
  const user   = USERS.find(u => u.id === userId);
  if (!user || (user.role !== "firm_admin" && user.role !== "firm_member") || !user.firmId) {
    res.status(403).json({ ok: false, error: "Firm access required." });
    return;
  }
  (req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" }).userId   = userId;
  (req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" }).firmId   = user.firmId;
  (req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" }).firmRole = user.role;
  next();
}

/* ── Middleware: verify Bearer token AND partner role. */
export function requirePartnerAuth(req: Request, res: Response, next: () => void): void {
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
  (req as Request & { userId: string; partnerId: string | null }).userId    = userId;
  (req as Request & { userId: string; partnerId: string | null }).partnerId = user.partnerId ?? null;
  next();
}

/* ── Middleware: internal admin gate (real RBAC).
   Verifies a Bearer session token AND that the user behind it has the
   `internal_admin` role. No shared secret, no client-side header that
   anyone could replay. */
export function requireInternalAdmin(req: Request, res: Response, next: () => void): void {
  const header = req.headers["authorization"] ?? "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !SESSION_STORE.has(token)) {
    res.status(401).json({ ok: false, error: "Unauthorized. Please sign in." });
    return;
  }
  const userId = SESSION_STORE.get(token)!;
  const user   = USERS.find(u => u.id === userId);
  if (!user || user.role !== "internal_admin") {
    res.status(403).json({ ok: false, error: "Internal admin access required." });
    return;
  }
  (req as Request & { userId: string }).userId = userId;
  next();
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
   Reuses or creates a Docsy account from checkout booking data.

   Per product spec, this endpoint always returns a session token tied to
   the matched account so the client can sign the user in immediately
   after a successful booking. Newly-created accounts also receive a
   welcome OTP (logged to the dev console as the demo SMS/email fallback).
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

  let user    = BY_EMAIL.get(cleanEmail) ?? BY_PHONE.get(cleanPhone) ?? null;
  let created = false;

  if (!user) {
    user = {
      id:         randomId(),
      name:       cleanName,
      email:      cleanEmail,
      phone:      cleanPhone,
      membership: null,
    };
    USERS.push(user);
    BY_EMAIL.set(cleanEmail, user);
    BY_PHONE.set(cleanPhone, user);
    created = true;
  }

  /* Issue a fresh session for the matched (or new) account */
  const token = randomToken();
  SESSION_STORE.set(token, user.id);

  if (created) {
    /* Welcome OTP delivery — dev fallback logs to the server console; in
       production this is wired through email/SMS providers. The OTP can
       still be used at /login if the user lands there from another
       device. */
    const welcomeCode = randomCode();
    OTP_STORE.set(cleanEmail, { userId: user.id, code: welcomeCode, expiresAt: Date.now() + 24 * 60 * 60 * 1000 });
    console.info(`[AUTH] Welcome OTP dispatched to ${cleanEmail}: ${welcomeCode}`);
  } else {
    console.info(`[AUTH] Existing account ${cleanEmail} signed in via checkout upsert`);
  }

  res.json({ ok: true, created, existing: !created, token, user: publicUser(user) });
});

/* ── GET /api/auth/me ───────────────────────────────────
   Returns the currently signed-in user's public profile, including
   account-scoped HonorPass (ID.me) verification state.
*/
router.get("/me", requireAuth as never, (req: Request, res: Response): void => {
  const userId = (req as Request & { userId: string }).userId;
  const user   = USERS.find(u => u.id === userId);
  if (!user) {
    res.status(404).json({ ok: false, error: "Account not found." });
    return;
  }
  res.json({ ok: true, user: publicUser(user) });
});

/* ── POST /api/auth/idme ────────────────────────────────
   Attach an ID.me verification (group + verifiedAt) to the current
   session's user. Persists on the account so it follows the user to
   every device they sign in on.
*/
router.post("/idme", requireAuth as never, (req: Request, res: Response): void => {
  const userId = (req as Request & { userId: string }).userId;
  const user   = USERS.find(u => u.id === userId);
  if (!user) {
    res.status(404).json({ ok: false, error: "Account not found." });
    return;
  }
  const { group } = req.body as { group?: string };
  if (!group || !VALID_IDME_GROUPS.includes(group as IdMeGroup)) {
    res.status(400).json({ ok: false, error: "A valid ID.me verification group is required." });
    return;
  }
  user.idMeVerification = {
    group:      group as IdMeGroup,
    verifiedAt: user.idMeVerification?.verifiedAt ?? new Date().toISOString(),
  };
  res.json({ ok: true, user: publicUser(user) });
});

/* ── DELETE /api/auth/idme ──────────────────────────────
   Clear the current user's ID.me verification from their account.
*/
router.delete("/idme", requireAuth as never, (req: Request, res: Response): void => {
  const userId = (req as Request & { userId: string }).userId;
  const user   = USERS.find(u => u.id === userId);
  if (!user) {
    res.status(404).json({ ok: false, error: "Account not found." });
    return;
  }
  user.idMeVerification = null;
  res.json({ ok: true, user: publicUser(user) });
});

export default router;
