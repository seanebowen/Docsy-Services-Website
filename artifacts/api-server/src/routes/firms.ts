import { Router, type Request, type Response } from "express";
import crypto from "node:crypto";
import {
  USERS,
  SESSION_STORE,
  publicUser,
  requireFirmAuth,
  requireInternalAdmin,
  indexUser,
  type MockUser,
} from "./auth.js";

const router = Router();

/* ─────────────────────────────────────────────────────────
   Types & in-memory stores
   ───────────────────────────────────────────────────────── */

export type FirmStatus = "pending" | "approved" | "denied";

export interface Firm {
  id:                    string;
  name:                  string;
  ein:                   string;
  type:                  "title-company" | "law-firm" | "lender" | "corporate" | "other";
  address:               string;
  primaryContact:        { name: string; email: string; phone: string };
  expectedMonthlyVolume: number;
  serviceMix:            string[]; // e.g. ["loan-signing", "ron", "mobile"]
  notes:                 string;
  status:                FirmStatus;
  createdAt:             string;
  approvedAt:            string | null;
}

export interface FirmJob {
  id:               string;
  firmId:           string;
  signerName:       string;
  signerEmail:      string;
  address:          string;        // empty for RON
  serviceType:      "loan-signing" | "ron" | "mobile" | "apostille" | "court";
  documentType:     string;
  requestedWindow:  string;        // human-readable, e.g. "2026-05-08 14:00-16:00"
  status:           "scheduled" | "in-progress" | "completed" | "invoiced" | "cancelled";
  notes:            string;
  createdAt:        string;
  createdByUserId:  string;
}

export interface FirmInvoiceLineItem {
  description: string;
  qty:         number;
  unitPrice:   number;            // in dollars
  total:       number;
}

export interface FirmInvoice {
  id:          string;
  firmId:      string;
  number:      string;            // human-readable, e.g. "INV-2026-001"
  periodStart: string;            // YYYY-MM-DD
  periodEnd:   string;
  lineItems:   FirmInvoiceLineItem[];
  total:       number;
  status:      "open" | "paid" | "overdue";
  dueDate:     string;
  issuedDate:  string;
  paidDate:    string | null;
}

export interface FirmRosterMember {
  id:        string;            // mirrors USERS.id for active members; "inv_*" for pending invites
  firmId:    string;
  name:      string;
  email:     string;
  role:      "firm_admin" | "firm_member";
  status:    "invited" | "active";
  invitedAt: string;
  invitedBy: string;            // user id
}

/* In-memory stores (reset on server restart, like the rest of this demo). */
export const FIRMS:     Map<string, Firm>             = new Map();
export const FIRM_JOBS:    Map<string, FirmJob[]>     = new Map();
export const FIRM_INVOICES: Map<string, FirmInvoice[]> = new Map();
export const FIRM_ROSTER:   Map<string, FirmRosterMember[]> = new Map();

/* ─────────────────────────────────────────────────────────
   Seed: one approved firm + jobs + invoices + roster
   ───────────────────────────────────────────────────────── */

(function seed() {
  const firm: Firm = {
    id:    "f1",
    name:  "Hill Country Title Co.",
    ein:   "74-2345678",
    type:  "title-company",
    address: "8765 N New Braunfels Ave, San Antonio, TX 78217",
    primaryContact: { name: "Valerie Chen", email: "valerie@hillcountrytitle.test", phone: "2105552001" },
    expectedMonthlyVolume: 25,
    serviceMix: ["loan-signing", "mobile", "ron"],
    notes:      "Pre-approved demo firm.",
    status:     "approved",
    createdAt:  "2026-01-04T18:30:00.000Z",
    approvedAt: "2026-01-05T15:00:00.000Z",
  };
  FIRMS.set(firm.id, firm);

  /* Pending demo application — visible to internal-firms */
  const pending: Firm = {
    id:    "f2",
    name:  "Alamo Law Group PLLC",
    ein:   "82-9988776",
    type:  "law-firm",
    address: "200 E Houston St Suite 400, San Antonio, TX 78205",
    primaryContact: { name: "Diego Romero", email: "diego@alamolawgroup.test", phone: "2105553001" },
    expectedMonthlyVolume: 12,
    serviceMix: ["mobile", "ron", "apostille"],
    notes:      "Heavy estate-planning practice; need bedside notary support for elderly clients on short notice.",
    status:     "pending",
    createdAt:  new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    approvedAt: null,
  };
  FIRMS.set(pending.id, pending);

  FIRM_JOBS.set("f1", [
    { id: "j1", firmId: "f1", signerName: "Henderson — Refinance", signerEmail: "ahenderson@example.com", address: "8765 N New Braunfels Ave, SATX",  serviceType: "loan-signing", documentType: "Conv. Refi Package", requestedWindow: "2026-05-04 10:00–11:30", status: "scheduled", notes: "Pull credit packet ahead of session.", createdAt: "2026-04-29T15:00:00.000Z", createdByUserId: "fu1" },
    { id: "j2", firmId: "f1", signerName: "Ortiz — HELOC",         signerEmail: "lortiz@example.com",      address: "8765 N New Braunfels Ave, SATX",  serviceType: "loan-signing", documentType: "HELOC closing",      requestedWindow: "2026-05-05 14:00–15:30", status: "scheduled", notes: "Spouse signing remote via co-signer call-in.", createdAt: "2026-04-29T15:05:00.000Z", createdByUserId: "fu1" },
    { id: "j3", firmId: "f1", signerName: "Wexler — POA",          signerEmail: "kwexler@example.com",     address: "",                                serviceType: "ron",          documentType: "Durable Power of Attorney", requestedWindow: "2026-05-02 09:00–09:30", status: "completed", notes: "RON session, single signer.", createdAt: "2026-04-25T12:00:00.000Z", createdByUserId: "fu2" },
    { id: "j4", firmId: "f1", signerName: "Tate — Affidavit",       signerEmail: "rtate@example.com",       address: "1100 Broadway, SATX 78215",      serviceType: "mobile",       documentType: "Affidavit of Support",     requestedWindow: "2026-04-22 11:00–12:00", status: "invoiced", notes: "", createdAt: "2026-04-15T10:00:00.000Z", createdByUserId: "fu1" },
  ]);

  FIRM_INVOICES.set("f1", [
    {
      id: "inv1", firmId: "f1", number: "INV-2026-014",
      periodStart: "2026-04-01", periodEnd: "2026-04-30",
      lineItems: [
        { description: "Loan signings (3 @ $125)",      qty: 3, unitPrice: 125, total: 375 },
        { description: "RON sessions (4 @ $35)",         qty: 4, unitPrice: 35,  total: 140 },
        { description: "Mobile / GNW (5 @ $45)",         qty: 5, unitPrice: 45,  total: 225 },
        { description: "Apostille processing (2 @ $95)", qty: 2, unitPrice: 95,  total: 190 },
      ],
      total:      930,
      status:     "open",
      dueDate:    "2026-05-30",
      issuedDate: "2026-04-30",
      paidDate:   null,
    },
    {
      id: "inv2", firmId: "f1", number: "INV-2026-008",
      periodStart: "2026-03-01", periodEnd: "2026-03-31",
      lineItems: [
        { description: "Loan signings (4 @ $125)", qty: 4, unitPrice: 125, total: 500 },
        { description: "RON sessions (2 @ $35)",   qty: 2, unitPrice: 35,  total:  70 },
        { description: "Mobile / GNW (3 @ $45)",   qty: 3, unitPrice: 45,  total: 135 },
      ],
      total:      705,
      status:     "paid",
      dueDate:    "2026-04-30",
      issuedDate: "2026-03-31",
      paidDate:   "2026-04-18",
    },
  ]);

  FIRM_ROSTER.set("f1", [
    { id: "fu1", firmId: "f1", name: "Valerie Chen",  email: "valerie@hillcountrytitle.test", role: "firm_admin",  status: "active", invitedAt: "2026-01-05T15:00:00.000Z", invitedBy: "fu1" },
    { id: "fu2", firmId: "f1", name: "Marcus Wright", email: "marcus@hillcountrytitle.test",  role: "firm_member", status: "active", invitedAt: "2026-01-12T10:00:00.000Z", invitedBy: "fu1" },
  ]);
})();

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function newId(prefix: string): string {
  return prefix + crypto.randomUUID().slice(0, 8);
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function normalizePhone(p: string): string {
  const d = p.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

function publicFirm(f: Firm) {
  return { ...f };
}

/* ─────────────────────────────────────────────────────────
   POST /api/firms/apply  (public)
   ───────────────────────────────────────────────────────── */

router.post("/apply", (req: Request, res: Response): void => {
  const body = req.body as Partial<Firm> & {
    contactName?:  string;
    contactEmail?: string;
    contactPhone?: string;
  };

  const firmName = (body.name ?? "").trim();
  const ein      = (body.ein ?? "").trim();
  const address  = (body.address ?? "").trim();
  const type     = (body.type ?? "").trim() as Firm["type"];
  const contactName  = (body.primaryContact?.name  ?? body.contactName  ?? "").trim();
  const contactEmail = (body.primaryContact?.email ?? body.contactEmail ?? "").trim().toLowerCase();
  const contactPhone = normalizePhone(body.primaryContact?.phone ?? body.contactPhone ?? "");
  const volume       = Number(body.expectedMonthlyVolume ?? 0);
  const mix          = Array.isArray(body.serviceMix) ? body.serviceMix.filter(s => typeof s === "string") : [];
  const notes        = (body.notes ?? "").trim().slice(0, 2000);

  if (!firmName)                      { res.status(400).json({ ok: false, error: "Firm name is required." }); return; }
  if (!type)                          { res.status(400).json({ ok: false, error: "Firm type is required." }); return; }
  if (!address)                       { res.status(400).json({ ok: false, error: "Firm address is required." }); return; }
  if (!contactName)                   { res.status(400).json({ ok: false, error: "Primary contact name is required." }); return; }
  if (!isValidEmail(contactEmail))    { res.status(400).json({ ok: false, error: "Valid contact email is required." }); return; }
  if (contactPhone.length !== 10)     { res.status(400).json({ ok: false, error: "10-digit contact phone is required." }); return; }
  if (!Number.isFinite(volume) || volume < 1) { res.status(400).json({ ok: false, error: "Expected monthly volume must be at least 1." }); return; }
  if (mix.length === 0)               { res.status(400).json({ ok: false, error: "Select at least one service." }); return; }

  const firm: Firm = {
    id:    newId("f_"),
    name:  firmName,
    ein,
    type,
    address,
    primaryContact: { name: contactName, email: contactEmail, phone: contactPhone },
    expectedMonthlyVolume: Math.round(volume),
    serviceMix: mix,
    notes,
    status:     "pending",
    createdAt:  new Date().toISOString(),
    approvedAt: null,
  };
  FIRMS.set(firm.id, firm);
  console.info(`[FIRMS] New application from ${firm.name} (${firm.id}); pending internal review.`);
  res.json({ ok: true, firm: publicFirm(firm) });
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/me  (firm-auth)
   ───────────────────────────────────────────────────────── */

router.get("/me", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r = req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" };
  const firm = FIRMS.get(r.firmId);
  const user = USERS.find(u => u.id === r.userId);
  if (!firm || !user) { res.status(404).json({ ok: false, error: "Firm not found." }); return; }

  const jobs     = FIRM_JOBS.get(r.firmId)     ?? [];
  const invoices = FIRM_INVOICES.get(r.firmId) ?? [];
  const roster   = FIRM_ROSTER.get(r.firmId)   ?? [];

  res.json({
    ok: true,
    user:        publicUser(user),
    firm:        publicFirm(firm),
    counts: {
      jobsScheduled: jobs.filter(j => j.status === "scheduled" || j.status === "in-progress").length,
      jobsCompleted: jobs.filter(j => j.status === "completed" || j.status === "invoiced").length,
      invoicesOpen:  invoices.filter(i => i.status === "open" || i.status === "overdue").length,
      rosterActive:  roster.filter(m => m.status === "active").length,
    },
  });
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/jobs  (firm-auth)
   ───────────────────────────────────────────────────────── */

router.get("/jobs", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r = req as Request & { firmId: string };
  const jobs = FIRM_JOBS.get(r.firmId) ?? [];
  /* Newest first */
  res.json({ ok: true, jobs: [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

/* ─────────────────────────────────────────────────────────
   POST /api/firms/bulk-book  (firm-auth)
   Body: { jobs: Array<{signerName, signerEmail?, address?, serviceType, documentType, requestedWindow, notes?}> }
   ───────────────────────────────────────────────────────── */

router.post("/bulk-book", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r    = req as Request & { userId: string; firmId: string };
  const body = req.body as { jobs?: Array<Partial<FirmJob>> };
  const incoming = Array.isArray(body.jobs) ? body.jobs : [];
  /* All 400 responses include errors[] (possibly empty) so generated
     clients can rely on a single shape per the OpenAPI contract. */
  if (incoming.length === 0) {
    res.status(400).json({ ok: false, error: "At least one job is required.", errors: [] });
    return;
  }
  if (incoming.length > 100) {
    res.status(400).json({ ok: false, error: "Bulk-book is limited to 100 jobs per submission.", errors: [] });
    return;
  }

  const validServices: FirmJob["serviceType"][] = ["loan-signing", "ron", "mobile", "apostille", "court"];
  const created: FirmJob[] = [];
  const errors: { row: number; error: string }[] = [];

  incoming.forEach((j, i) => {
    const signerName    = (j.signerName ?? "").toString().trim();
    const serviceType   = (j.serviceType ?? "").toString().trim() as FirmJob["serviceType"];
    const documentType  = (j.documentType ?? "").toString().trim();
    const requestedWindow = (j.requestedWindow ?? "").toString().trim();
    const address       = (j.address ?? "").toString().trim();
    const signerEmail   = (j.signerEmail ?? "").toString().trim().toLowerCase();
    const notes         = (j.notes ?? "").toString().trim().slice(0, 1000);

    if (!signerName)    { errors.push({ row: i + 1, error: "signerName is required" }); return; }
    if (!validServices.includes(serviceType)) { errors.push({ row: i + 1, error: `serviceType must be one of ${validServices.join(", ")}` }); return; }
    if (!documentType)  { errors.push({ row: i + 1, error: "documentType is required" }); return; }
    if (!requestedWindow) { errors.push({ row: i + 1, error: "requestedWindow is required" }); return; }
    if (serviceType !== "ron" && !address) { errors.push({ row: i + 1, error: "address is required for non-RON services" }); return; }

    const job: FirmJob = {
      id:              newId("j_"),
      firmId:          r.firmId,
      signerName,
      signerEmail,
      address,
      serviceType,
      documentType,
      requestedWindow,
      status:          "scheduled",
      notes,
      createdAt:       new Date().toISOString(),
      createdByUserId: r.userId,
    };
    created.push(job);
  });

  /* All-or-nothing: if any row failed validation, reject the whole batch
     so the firm doesn't end up with a half-booked spreadsheet. */
  if (errors.length > 0) {
    res.status(400).json({ ok: false, error: "One or more rows are invalid.", errors });
    return;
  }

  const existing = FIRM_JOBS.get(r.firmId) ?? [];
  FIRM_JOBS.set(r.firmId, [...existing, ...created]);

  res.json({ ok: true, created });
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/invoices  (firm-auth)
   ───────────────────────────────────────────────────────── */

router.get("/invoices", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r = req as Request & { firmId: string };
  const invoices = FIRM_INVOICES.get(r.firmId) ?? [];
  res.json({ ok: true, invoices: [...invoices].sort((a, b) => b.issuedDate.localeCompare(a.issuedDate)) });
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/invoices/:id/pdf  (firm-auth)
   Returns a placeholder text/plain "PDF" — production would render
   a real PDF; keeping this as a stub keeps the demo offline-friendly.
   ───────────────────────────────────────────────────────── */

router.get("/invoices/:id/pdf", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r        = req as Request & { firmId: string };
  const invoices = FIRM_INVOICES.get(r.firmId) ?? [];
  const inv      = invoices.find(i => i.id === req.params.id);
  if (!inv) { res.status(404).json({ ok: false, error: "Invoice not found." }); return; }

  const firm = FIRMS.get(r.firmId)!;
  const lines: string[] = [];
  lines.push(`DOCSY SERVICES — INVOICE ${inv.number}`);
  lines.push(`Bill To: ${firm.name}`);
  lines.push(`         ${firm.address}`);
  lines.push(`Period:  ${inv.periodStart} → ${inv.periodEnd}`);
  lines.push(`Issued:  ${inv.issuedDate}`);
  lines.push(`Due:     ${inv.dueDate}    Status: ${inv.status.toUpperCase()}`);
  lines.push("");
  lines.push("LINE ITEMS");
  lines.push("─".repeat(60));
  inv.lineItems.forEach(li => {
    lines.push(`  ${li.description.padEnd(46)} $${li.total.toFixed(2)}`);
  });
  lines.push("─".repeat(60));
  lines.push(`  ${"TOTAL".padEnd(46)} $${inv.total.toFixed(2)}`);
  lines.push("");
  lines.push("Pay by ACH, check, wire, or card. NET 30 from issue date.");
  lines.push("Questions: hello@docsynotary.com  ·  (512) 555-0190");

  const body = lines.join("\n") + "\n";
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${inv.number}.txt"`);
  res.send(body);
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/roster  (firm-auth)
   ───────────────────────────────────────────────────────── */

router.get("/roster", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r       = req as Request & { firmId: string };
  const members = FIRM_ROSTER.get(r.firmId) ?? [];
  res.json({ ok: true, members });
});

/* ─────────────────────────────────────────────────────────
   POST /api/firms/roster/invite  (firm_admin only)
   Body: { name, email, role }
   ───────────────────────────────────────────────────────── */

router.post("/roster/invite", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r = req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" };
  if (r.firmRole !== "firm_admin") {
    res.status(403).json({ ok: false, error: "Only firm admins can invite teammates." });
    return;
  }
  const body = req.body as { name?: string; email?: string; role?: string };
  const name  = (body.name  ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const role  = body.role === "firm_admin" ? "firm_admin" : "firm_member";
  if (!name)  { res.status(400).json({ ok: false, error: "Name is required." });  return; }
  if (!isValidEmail(email)) { res.status(400).json({ ok: false, error: "Valid email is required." }); return; }

  const existing = FIRM_ROSTER.get(r.firmId) ?? [];
  if (existing.some(m => m.email === email)) {
    res.status(409).json({ ok: false, error: "That email is already on your roster." });
    return;
  }

  /* Reject if a Docsy account with this email already exists ANYWHERE.
     This prevents the invite from clobbering the global BY_EMAIL index
     and accidentally re-routing OTP login for an unrelated user (e.g.
     stealing an individual customer's account or moving a teammate
     between firms silently). In production this would prompt a
     "claim-your-existing-account" flow. */
  if (USERS.some(u => u.email.toLowerCase() === email)) {
    res.status(409).json({
      ok:    false,
      error: "A Docsy account already exists for that email. Ask the account holder to contact support to be added to your firm.",
    });
    return;
  }

  /* Auto-create the underlying Docsy account so the invite can sign in
     immediately with the demo OTP "000000". In production this would
     send an email invite with a per-account invite token. Phone is
     left blank so the global phone index is never overwritten. */
  const newUser: MockUser = {
    id:         newId("fu_"),
    name,
    email,
    phone:      "",
    membership: null,
    role,
    firmId:     r.firmId,
  };
  USERS.push(newUser);
  indexUser(newUser);

  const member: FirmRosterMember = {
    id:        newUser.id,
    firmId:    r.firmId,
    name,
    email,
    role,
    status:    "active",
    invitedAt: new Date().toISOString(),
    invitedBy: r.userId,
  };
  FIRM_ROSTER.set(r.firmId, [...existing, member]);
  console.info(`[FIRMS] ${name} (${email}) added to firm ${r.firmId} as ${role}`);
  res.json({ ok: true, member });
});

/* ─────────────────────────────────────────────────────────
   DELETE /api/firms/roster/:memberId  (firm_admin only)
   ───────────────────────────────────────────────────────── */

router.delete("/roster/:memberId", requireFirmAuth as never, (req: Request, res: Response): void => {
  const r = req as Request & { userId: string; firmId: string; firmRole: "firm_admin" | "firm_member" };
  if (r.firmRole !== "firm_admin") {
    res.status(403).json({ ok: false, error: "Only firm admins can remove teammates." });
    return;
  }
  if (req.params.memberId === r.userId) {
    res.status(400).json({ ok: false, error: "You can't remove yourself from the roster." });
    return;
  }
  const existing = FIRM_ROSTER.get(r.firmId) ?? [];
  const member   = existing.find(m => m.id === req.params.memberId);
  if (!member) { res.status(404).json({ ok: false, error: "Member not found." }); return; }

  FIRM_ROSTER.set(r.firmId, existing.filter(m => m.id !== member.id));

  /* Detach the user from the firm but keep the account so they can keep
     accessing /vault and any individual data. Also revoke their active
     sessions so the portal kicks them out immediately. */
  const userIdx = USERS.findIndex(u => u.id === member.id);
  if (userIdx >= 0) {
    USERS[userIdx]!.role   = "individual";
    USERS[userIdx]!.firmId = null;
  }
  for (const [token, uid] of SESSION_STORE.entries()) {
    if (uid === member.id) SESSION_STORE.delete(token);
  }
  res.json({ ok: true });
});

/* ─────────────────────────────────────────────────────────
   GET /api/firms/applications  (internal admin)
   ───────────────────────────────────────────────────────── */

router.get("/applications", requireInternalAdmin as never, (_req: Request, res: Response): void => {
  const all = Array.from(FIRMS.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json({ ok: true, firms: all });
});

/* ─────────────────────────────────────────────────────────
   POST /api/firms/applications/:id/approve  (internal admin)
   Approves a pending firm AND creates a starter firm-admin user from
   the application's primaryContact, so the firm can sign in.
   Idempotent: re-approving already-approved firm returns its current
   state without creating duplicate users.
   ───────────────────────────────────────────────────────── */

router.post("/applications/:id/approve", requireInternalAdmin as never, (req: Request, res: Response): void => {
  const firm = FIRMS.get(String(req.params.id));
  if (!firm) { res.status(404).json({ ok: false, error: "Application not found." }); return; }

  if (firm.status === "approved") {
    res.json({ ok: true, firm: publicFirm(firm), alreadyApproved: true });
    return;
  }

  firm.status     = "approved";
  firm.approvedAt = new Date().toISOString();

  /* Provision a firm_admin account if one doesn't already exist for the
     primary contact email. */
  const email = firm.primaryContact.email.toLowerCase();
  const existing = USERS.find(u => u.email.toLowerCase() === email);
  let adminUser: MockUser;
  if (existing) {
    existing.role   = "firm_admin";
    existing.firmId = firm.id;
    adminUser = existing;
    /* Re-index in case email/phone changed since initial registration. */
    indexUser(existing);
  } else {
    adminUser = {
      id:         newId("fu_"),
      name:       firm.primaryContact.name,
      email,
      phone:      firm.primaryContact.phone,
      membership: null,
      role:       "firm_admin",
      firmId:     firm.id,
    };
    USERS.push(adminUser);
    indexUser(adminUser);
  }

  const member: FirmRosterMember = {
    id:        adminUser.id,
    firmId:    firm.id,
    name:      adminUser.name,
    email:     adminUser.email,
    role:      "firm_admin",
    status:    "active",
    invitedAt: firm.approvedAt,
    invitedBy: adminUser.id,
  };
  FIRM_ROSTER.set(firm.id, [member]);
  FIRM_JOBS.set(firm.id, []);
  FIRM_INVOICES.set(firm.id, []);

  console.info(`[FIRMS] Application ${firm.id} approved; admin ${adminUser.email} provisioned.`);
  res.json({ ok: true, firm: publicFirm(firm), adminEmail: adminUser.email });
});

/* ─────────────────────────────────────────────────────────
   POST /api/firms/applications/:id/deny  (internal admin)
   ───────────────────────────────────────────────────────── */

router.post("/applications/:id/deny", requireInternalAdmin as never, (req: Request, res: Response): void => {
  const firm = FIRMS.get(String(req.params.id));
  if (!firm) { res.status(404).json({ ok: false, error: "Application not found." }); return; }
  firm.status = "denied";
  res.json({ ok: true, firm: publicFirm(firm) });
});

export default router;
