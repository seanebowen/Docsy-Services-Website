import { Router, type Request, type Response } from "express";
import { SESSION_STORE, USERS } from "./auth.js";

const router = Router();

interface VaultFile {
  id:           string;
  name:         string;
  serviceType:  "ron" | "mobile" | "loan" | "apostille" | "court";
  serviceLabel: string;
  date:         string;
  size:         string;
}

/* ── Seeded demo vault files per user ───────────────────── */
const VAULT_FILES: Record<string, VaultFile[]> = {
  u1: [
    { id: "f1", name: "Power of Attorney — 03-15-2025.pdf",     serviceType: "mobile",    serviceLabel: "General Notary Work",         date: "2025-03-15", size: "247 KB" },
    { id: "f2", name: "Affidavit of Support — 02-28-2025.pdf",  serviceType: "ron",       serviceLabel: "Remote Online Notarization",  date: "2025-02-28", size: "183 KB" },
    { id: "f3", name: "Medical Directive — 01-12-2025.pdf",     serviceType: "mobile",    serviceLabel: "General Notary Work",         date: "2025-01-12", size: "302 KB" },
  ],
  u2: [
    { id: "f4", name: "Refinance Closing Package — 04-02-2025.pdf", serviceType: "loan",  serviceLabel: "Loan Signing",               date: "2025-04-02", size: "1.2 MB" },
    { id: "f5", name: "HELOC Documents — 02-14-2025.pdf",           serviceType: "loan",  serviceLabel: "Loan Signing",               date: "2025-02-14", size: "890 KB" },
    { id: "f6", name: "RON Session — LLC Agreement — 01-30-2025.pdf", serviceType: "ron", serviceLabel: "Remote Online Notarization", date: "2025-01-30", size: "421 KB" },
  ],
  u3: [
    { id: "f7",  name: "Personal Apostille — Birth Certificate — 03-22-2025.pdf", serviceType: "apostille", serviceLabel: "Apostille Services",          date: "2025-03-22", size: "539 KB" },
    { id: "f8",  name: "Deposition Transcript — March 18, 2025.pdf",              serviceType: "court",     serviceLabel: "Court Reporting",             date: "2025-03-18", size: "2.1 MB" },
    { id: "f9",  name: "RON Session — Trust Document — 02-05-2025.pdf",           serviceType: "ron",       serviceLabel: "Remote Online Notarization",  date: "2025-02-05", size: "674 KB" },
    { id: "f10", name: "Business Apostille — Articles of Incorporation.pdf",       serviceType: "apostille", serviceLabel: "Apostille Services",          date: "2025-01-22", size: "318 KB" },
  ],
};

/* ── Middleware: verify Bearer token ────────────────────── */
function requireAuth(req: Request, res: Response, next: () => void): void {
  const header = req.headers["authorization"] ?? "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || !SESSION_STORE.has(token)) {
    res.status(401).json({ ok: false, error: "Unauthorized. Please sign in." });
    return;
  }

  (req as Request & { userId: string }).userId = SESSION_STORE.get(token)!;
  next();
}

/* ── GET /api/vault ─────────────────────────────────────── */
router.get("/", requireAuth as never, (req: Request, res: Response): void => {
  const userId = (req as Request & { userId: string }).userId;
  const user   = USERS.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ ok: false, error: "Account not found." });
    return;
  }

  res.json({
    ok:    true,
    user: {
      id:           user.id,
      name:         user.name,
      email:        user.email,
      safePlusTier: user.safePlusTier,
      membership:   user.membership,
    },
    files: VAULT_FILES[userId] ?? [],
  });
});

export default router;
