import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const IVORY = "#F5EFE6";

type Tab = "dashboard" | "bulk" | "roster" | "invoices";

interface FirmCounts { jobsScheduled: number; jobsCompleted: number; invoicesOpen: number; rosterActive: number; }
interface FirmContact { name: string; email: string; phone: string; }
interface Firm {
  id: string; name: string; type: string; address: string;
  primaryContact: FirmContact; expectedMonthlyVolume: number;
  serviceMix: string[]; status: "pending" | "approved" | "denied";
}
interface FirmJob {
  id: string; signerName: string; signerEmail: string; address: string;
  serviceType: string; documentType: string; requestedWindow: string;
  status: string; notes: string; createdAt: string; createdByUserId: string;
}
interface FirmInvoice {
  id: string; number: string; periodStart: string; periodEnd: string;
  total: number; status: string; dueDate: string; issuedDate: string; paidDate: string | null;
  lineItems: { description: string; qty: number; unitPrice: number; total: number }[];
}
interface FirmMember { id: string; name: string; email: string; role: "firm_admin" | "firm_member"; status: string; invitedAt: string; }

const SERVICE_LABELS: Record<string, string> = {
  "loan-signing": "Loan Signing",
  "ron":          "RON",
  "mobile":       "Mobile / GNW",
  "apostille":    "Apostille",
  "court":        "Court Reporting",
};
const STATUS_COLORS: Record<string, string> = {
  scheduled:    BLUE,
  "in-progress": "#f0c97a",
  completed:    "#7ec8a0",
  invoiced:     "#c8a0d4",
  cancelled:    "#e07a7a",
  open:         "#f0c97a",
  paid:         "#7ec8a0",
  overdue:      "#e07a7a",
};

export default function FirmPortal() {
  const [, setLocation] = useLocation();
  const { user, token, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");

  const [firm,     setFirm]     = useState<Firm | null>(null);
  const [counts,   setCounts]   = useState<FirmCounts | null>(null);
  const [jobs,     setJobs]     = useState<FirmJob[]>([]);
  const [invoices, setInvoices] = useState<FirmInvoice[]>([]);
  const [roster,   setRoster]   = useState<FirmMember[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    document.title = "Firm Portal | Docsy Services";
  }, []);

  /* Auth guard. Wait for AuthContext to settle before redirecting; the
     /api/auth/me roundtrip in AuthContext can hydrate role/firmId after
     the initial render. */
  useEffect(() => {
    if (!token) { setLocation("/login?next=/firm/portal"); return; }
    if (user && user.role !== "firm_admin" && user.role !== "firm_member") {
      setError("This account isn't attached to a firm. Apply for a firm account or contact your firm admin.");
      setLoading(false);
    }
  }, [token, user, setLocation]);

  useEffect(() => {
    if (!token || !user) return;
    if (user.role !== "firm_admin" && user.role !== "firm_member") return;
    void fetchAll();
  }, [token, user?.role]);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [meRes, jobsRes, invRes, rosterRes] = await Promise.all([
        fetch("/api/firms/me",       { headers }),
        fetch("/api/firms/jobs",     { headers }),
        fetch("/api/firms/invoices", { headers }),
        fetch("/api/firms/roster",   { headers }),
      ]);
      const me     = await meRes.json()     as { ok: boolean; firm?: Firm; counts?: FirmCounts; error?: string };
      const j      = await jobsRes.json()   as { ok: boolean; jobs?: FirmJob[];     error?: string };
      const inv    = await invRes.json()    as { ok: boolean; invoices?: FirmInvoice[]; error?: string };
      const ro     = await rosterRes.json() as { ok: boolean; members?: FirmMember[]; error?: string };
      if (!me.ok) {
        setError(me.error ?? "Could not load firm data.");
        if (meRes.status === 401) { signOut(); setLocation("/login?next=/firm/portal"); }
        return;
      }
      setFirm(me.firm ?? null);
      setCounts(me.counts ?? null);
      setJobs(j.jobs ?? []);
      setInvoices(inv.invoices ?? []);
      setRoster(ro.members ?? []);
    } catch {
      setError("Network error loading firm data. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = user?.role === "firm_admin";

  if (!user) return null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BG }}>
        <p className="text-white/30 text-sm animate-pulse">Loading firm portal…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: BG }}>
        <div className="border p-10 max-w-md w-full text-center" style={{ borderColor: DIV }}>
          <p className="text-sm mb-4" style={{ color: "#e07a7a" }}>{error}</p>
          <Link href="/business#apply" className="text-sm underline" style={{ color: BLUE }}>Apply for a firm account →</Link>
        </div>
      </div>
    );
  }
  if (!firm) return null;

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: BG }}>
      {/* ── Header ── */}
      <section className="px-5 pt-12 pb-8 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-4" style={{ borderColor: BLUE, color: BLUE }}>
                  ◆ FIRM PORTAL · {isAdmin ? "ADMIN" : "MEMBER"}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                  {firm.name}
                </h1>
                <p className="text-white/40 text-sm">
                  Signed in as <span className="text-white/65">{user.name}</span> · {user.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/calculate" className="px-5 py-2.5 text-xs font-bold text-white" style={{ backgroundColor: "#000" }}>
                  Single booking →
                </Link>
                <button
                  onClick={() => { signOut(); setLocation("/"); }}
                  className="px-5 py-2.5 text-xs font-bold border"
                  style={{ borderColor: DIV, color: "rgba(255,255,255,0.45)" }}
                  data-testid="btn-firm-signout"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="border-b sticky top-0 z-10 backdrop-blur-md" style={{ borderColor: DIV, backgroundColor: "rgba(19,25,41,0.92)" }}>
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap gap-1">
          {([
            ["dashboard", "Dashboard"],
            ["bulk",      "Bulk Book"],
            ["roster",    "Roster"],
            ["invoices",  "Invoices"],
          ] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              data-testid={`tab-${id}`}
              className="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{
                color: tab === id ? IVORY : "rgba(255,255,255,0.4)",
                borderBottom: tab === id ? `2px solid ${BLUE}` : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tab content ── */}
      <section className="px-5 py-10">
        <div className="max-w-5xl mx-auto">
          {tab === "dashboard" && <DashboardTab firm={firm} counts={counts} jobs={jobs} invoices={invoices} setTab={setTab} />}
          {tab === "bulk"      && <BulkBookTab token={token!} onCreated={fetchAll} />}
          {tab === "roster"    && <RosterTab token={token!} roster={roster} isAdmin={isAdmin} currentUserId={user.id} onChange={fetchAll} />}
          {tab === "invoices"  && <InvoicesTab token={token!} invoices={invoices} />}
        </div>
      </section>
    </div>
  );
}

/* ───────────────────── Dashboard ───────────────────── */

function DashboardTab({ firm, counts, jobs, invoices, setTab }: {
  firm: Firm; counts: FirmCounts | null; jobs: FirmJob[]; invoices: FirmInvoice[]; setTab: (t: Tab) => void;
}) {
  const upcoming = jobs.filter(j => j.status === "scheduled" || j.status === "in-progress").slice(0, 5);
  const openInv  = invoices.find(i => i.status === "open" || i.status === "overdue");

  return (
    <FadeIn delay={0}>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10" style={{ backgroundColor: DIV }}>
        {[
          { stat: counts?.jobsScheduled ?? 0, label: "Scheduled jobs",  emp: BLUE },
          { stat: counts?.jobsCompleted ?? 0, label: "Completed jobs",  emp: "#7ec8a0" },
          { stat: counts?.invoicesOpen  ?? 0, label: "Open invoices",   emp: "#f0c97a" },
          { stat: counts?.rosterActive  ?? 0, label: "Active roster",   emp: IVORY },
        ].map((c) => (
          <div key={c.label} className="px-6 py-8" style={{ backgroundColor: BG }}>
            <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: c.emp, letterSpacing: "-0.02em" }}>{c.stat}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
        {/* Upcoming jobs */}
        <div>
          <div className="flex items-end justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">Upcoming Jobs</p>
            <button onClick={() => setTab("bulk")} className="text-xs font-bold underline" style={{ color: BLUE }}>+ Bulk book →</button>
          </div>
          {upcoming.length === 0 ? (
            <div className="border p-8 text-center text-sm text-white/35" style={{ borderColor: DIV }}>
              No upcoming jobs. Use Bulk Book to schedule a batch.
            </div>
          ) : (
            <div className="border" style={{ borderColor: DIV }}>
              {upcoming.map((j) => (
                <div key={j.id} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 border-b last:border-b-0" style={{ borderColor: DIV }}>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{j.signerName}</p>
                    <p className="text-xs text-white/45 truncate">{j.documentType} · {SERVICE_LABELS[j.serviceType] ?? j.serviceType}</p>
                    <p className="text-[11px] text-white/30 mt-1">{j.requestedWindow}{j.address ? ` · ${j.address}` : " · RON"}</p>
                  </div>
                  <span className="self-start text-[10px] font-bold uppercase tracking-widest px-2 py-1" style={{ backgroundColor: `${STATUS_COLORS[j.status] ?? BLUE}22`, color: STATUS_COLORS[j.status] ?? BLUE }}>
                    {j.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <div className="border p-6" style={{ borderColor: DIV }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>◆ Firm</p>
            <p className="text-sm font-bold text-white mb-1">{firm.name}</p>
            <p className="text-xs text-white/45 mb-3">{firm.address}</p>
            <p className="text-[11px] text-white/35">Volume target: <span className="text-white/65 font-bold">{firm.expectedMonthlyVolume}/mo</span></p>
            <p className="text-[11px] text-white/35 mt-1">Services: <span className="text-white/65">{firm.serviceMix.map(s => SERVICE_LABELS[s] ?? s).join(", ")}</span></p>
          </div>

          {openInv ? (
            <div className="border p-6" style={{ borderColor: DIV, borderTop: `3px solid ${STATUS_COLORS[openInv.status] ?? BLUE}` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: STATUS_COLORS[openInv.status] ?? BLUE }}>◆ Open Invoice</p>
              <p className="text-2xl font-black text-white mb-1">${openInv.total.toFixed(2)}</p>
              <p className="text-xs text-white/45 mb-3">{openInv.number} · due {openInv.dueDate}</p>
              <button onClick={() => setTab("invoices")} className="text-xs font-bold underline" style={{ color: BLUE }}>View invoices →</button>
            </div>
          ) : (
            <div className="border p-6" style={{ borderColor: DIV }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#7ec8a0" }}>✓ All paid</p>
              <p className="text-sm text-white/55">No open invoices.</p>
            </div>
          )}

          <div className="border p-6" style={{ borderColor: DIV }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>◆ Account Manager</p>
            <p className="text-sm font-bold text-white">Sean Bowen</p>
            <p className="text-xs text-white/45 mt-1">(512) 555-0190</p>
            <p className="text-xs text-white/45">firms@docsynotary.com</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ───────────────────── Bulk Book ───────────────────── */

const BULK_PLACEHOLDER = `Henderson Refi, ahenderson@example.com, 8765 N New Braunfels Ave SATX, loan-signing, Conv. Refi Package, 2026-05-04 10:00–11:30, Pull credit packet ahead
Wexler POA, kwexler@example.com, , ron, Durable Power of Attorney, 2026-05-02 09:00–09:30, Single signer
Tate Affidavit, rtate@example.com, 1100 Broadway SATX 78215, mobile, Affidavit of Support, 2026-04-22 11:00–12:00, `;

function parseRow(line: string): Record<string, string> | null {
  const cells = line.split(",").map(c => c.trim());
  if (cells.length < 6) return null;
  const [signerName, signerEmail, address, serviceType, documentType, requestedWindow, ...notesParts] = cells;
  const notes = notesParts.join(",").trim();
  return {
    signerName:      signerName ?? "",
    signerEmail:     signerEmail ?? "",
    address:         address ?? "",
    serviceType:     serviceType ?? "",
    documentType:    documentType ?? "",
    requestedWindow: requestedWindow ?? "",
    notes,
  };
}

function BulkBookTab({ token, onCreated }: { token: string; onCreated: () => void }) {
  const [csv,        setCsv]        = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState<{ ok: true; count: number } | { ok: false; error: string; rows?: { row: number; error: string }[] } | null>(null);

  const parsedRows = useMemo(() => {
    return csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(parseRow);
  }, [csv]);
  const validRows = parsedRows.filter(r => r !== null) as Record<string, string>[];

  async function submit() {
    setResult(null);
    if (validRows.length === 0) {
      setResult({ ok: false, error: "Add at least one valid row." });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/firms/bulk-book", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ jobs: validRows }),
      });
      const data = await res.json() as { ok: boolean; created?: unknown[]; error?: string; errors?: { row: number; error: string }[] };
      if (data.ok) {
        setResult({ ok: true, count: data.created?.length ?? 0 });
        setCsv("");
        onCreated();
      } else {
        setResult({ ok: false, error: data.error ?? "Bulk book failed.", rows: data.errors });
      }
    } catch {
      setResult({ ok: false, error: "Network error. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FadeIn delay={0}>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Bulk Book Jobs</p>
        <p className="text-sm text-white/45 max-w-2xl">
          Paste up to 100 rows. One job per line, comma-separated, in this order:
          <span className="font-mono text-white/75"> signerName, signerEmail, address, serviceType, documentType, requestedWindow, notes</span>.
          Use service types: <span className="font-mono text-white/65">loan-signing · ron · mobile · apostille · court</span>. Address can be blank for RON.
        </p>
      </div>

      <textarea
        value={csv}
        onChange={e => setCsv(e.target.value)}
        placeholder={BULK_PLACEHOLDER}
        className="w-full min-h-[260px] p-4 text-xs font-mono leading-relaxed border focus:outline-none"
        style={{ backgroundColor: "#0d1521", borderColor: DIV, color: IVORY }}
        data-testid="input-bulk-csv"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mt-3 mb-6">
        <p className="text-xs text-white/40">
          <span className="text-white/70 font-bold">{validRows.length}</span> valid row{validRows.length === 1 ? "" : "s"} parsed
          {parsedRows.length !== validRows.length && (
            <span className="text-red-400 ml-2">· {parsedRows.length - validRows.length} malformed (need ≥6 commas)</span>
          )}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setCsv(BULK_PLACEHOLDER)}
            className="px-4 py-2 text-xs font-bold border"
            style={{ borderColor: DIV, color: "rgba(255,255,255,0.55)" }}
            data-testid="btn-load-sample"
          >
            Load sample
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={submitting || validRows.length === 0}
            className="px-6 py-2.5 text-xs font-bold text-white disabled:opacity-40"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-submit-bulk"
          >
            {submitting ? "Submitting…" : `Schedule ${validRows.length} job${validRows.length === 1 ? "" : "s"} →`}
          </button>
        </div>
      </div>

      {result?.ok && (
        <div className="border p-5" style={{ borderColor: "#7ec8a0", backgroundColor: "rgba(126,200,160,0.07)" }}>
          <p className="text-sm font-bold" style={{ color: "#7ec8a0" }} data-testid="bulk-success">
            ✓ Scheduled {result.count} job{result.count === 1 ? "" : "s"}. They're now visible on your Dashboard and Jobs view.
          </p>
        </div>
      )}
      {result && !result.ok && (
        <div className="border p-5" style={{ borderColor: "#e07a7a", backgroundColor: "rgba(224,122,122,0.07)" }}>
          <p className="text-sm font-bold mb-2" style={{ color: "#e07a7a" }}>{result.error}</p>
          {result.rows && result.rows.length > 0 && (
            <ul className="text-xs text-white/55 space-y-1 list-disc pl-5">
              {result.rows.map(e => <li key={e.row}>Row {e.row}: {e.error}</li>)}
            </ul>
          )}
        </div>
      )}
    </FadeIn>
  );
}

/* ───────────────────── Roster ───────────────────── */

function RosterTab({ token, roster, isAdmin, currentUserId, onChange }: {
  token: string; roster: FirmMember[]; isAdmin: boolean; currentUserId: string; onChange: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"firm_admin" | "firm_member">("firm_member");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invited, setInvited] = useState<string | null>(null);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setInvited(null); setBusy(true);
    try {
      const res = await fetch("/api/firms/roster/invite", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ name: name.trim(), email: email.trim(), role }),
      });
      const data = await res.json() as { ok: boolean; member?: FirmMember; error?: string };
      if (!data.ok) { setError(data.error ?? "Invite failed."); return; }
      setInvited(data.member?.email ?? email.trim());
      setName(""); setEmail("");
      onChange();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, displayName: string) {
    if (!confirm(`Remove ${displayName} from the firm?`)) return;
    try {
      const res = await fetch(`/api/firms/roster/${id}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json() as { ok: boolean; error?: string };
      if (!data.ok) { alert(data.error ?? "Remove failed."); return; }
      onChange();
    } catch {
      alert("Network error.");
    }
  }

  return (
    <FadeIn delay={0}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Active Roster</p>
          <div className="border" style={{ borderColor: DIV }}>
            {roster.length === 0 && <p className="px-5 py-8 text-sm text-white/35 text-center">No teammates yet.</p>}
            {roster.map(m => (
              <div key={m.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-5 py-4 border-b last:border-b-0" style={{ borderColor: DIV }}>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{m.name}{m.id === currentUserId && <span className="text-[10px] text-white/40 font-medium ml-2">(you)</span>}</p>
                  <p className="text-xs text-white/45 truncate">{m.email}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1" style={{ backgroundColor: m.role === "firm_admin" ? `${BLUE}22` : "rgba(255,255,255,0.05)", color: m.role === "firm_admin" ? BLUE : "rgba(255,255,255,0.55)" }}>
                  {m.role === "firm_admin" ? "Admin" : "Member"}
                </span>
                {isAdmin && m.id !== currentUserId ? (
                  <button onClick={() => remove(m.id, m.name)} className="text-[11px] font-bold text-white/40 hover:text-red-400" data-testid={`btn-remove-${m.id}`}>Remove</button>
                ) : <span />}
              </div>
            ))}
          </div>
        </div>

        {isAdmin ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Invite Teammate</p>
            <form onSubmit={invite} className="border p-5 space-y-3" style={{ borderColor: DIV }}>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="Full name" className="firm-input" data-testid="input-invite-name" />
              <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="Email" className="firm-input" data-testid="input-invite-email" />
              <select value={role} onChange={e => setRole(e.target.value as "firm_admin" | "firm_member")} className="firm-input" data-testid="input-invite-role">
                <option value="firm_member">Member</option>
                <option value="firm_admin">Admin</option>
              </select>
              <button type="submit" disabled={busy} className="w-full px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40" style={{ backgroundColor: BLUE }} data-testid="btn-invite-submit">
                {busy ? "Inviting…" : "Send invite →"}
              </button>
              {error   && <p className="text-xs text-red-400">{error}</p>}
              {invited && <p className="text-xs" style={{ color: "#7ec8a0" }} data-testid="invite-success">✓ {invited} added. Sign-in code: <span className="font-mono">000000</span> (demo).</p>}
            </form>
          </div>
        ) : (
          <div className="border p-5 text-xs text-white/45 leading-relaxed" style={{ borderColor: DIV }}>
            Only firm admins can invite or remove teammates. Ask your admin to manage the roster.
          </div>
        )}
      </div>
      <style>{`
        .firm-input {
          display: block; width: 100%;
          background-color: #0d1521;
          border: 1px solid ${DIV};
          padding: 9px 11px;
          font-size: 13px;
          color: ${IVORY};
        }
        .firm-input:focus { outline: none; border-color: ${BLUE}; }
        .firm-input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </FadeIn>
  );
}

/* ───────────────────── Invoices ───────────────────── */

function InvoicesTab({ token, invoices }: { token: string; invoices: FirmInvoice[] }) {
  const [openId, setOpenId] = useState<string | null>(invoices[0]?.id ?? null);

  async function downloadInvoice(id: string, number: string) {
    try {
      const res = await fetch(`/api/firms/invoices/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { alert("Could not download invoice."); return; }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      a.download = `${number}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Network error.");
    }
  }

  if (invoices.length === 0) {
    return <p className="text-sm text-white/40 text-center py-12">No invoices yet. Once your firm has booked work, monthly invoices will appear here.</p>;
  }

  return (
    <FadeIn delay={0}>
      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Invoices</p>
      <div className="border" style={{ borderColor: DIV }}>
        {invoices.map((inv, idx) => {
          const open = openId === inv.id;
          return (
            <div key={inv.id} className="border-b last:border-b-0" style={{ borderColor: DIV }}>
              <button
                onClick={() => setOpenId(open ? null : inv.id)}
                className="w-full grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 text-left hover:bg-white/[0.03]"
                data-testid={`invoice-row-${idx}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">{inv.number}</p>
                  <p className="text-[11px] text-white/40">{inv.periodStart} → {inv.periodEnd}</p>
                </div>
                <span className="text-sm font-bold text-right" style={{ color: IVORY }}>${inv.total.toFixed(2)}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1" style={{ backgroundColor: `${STATUS_COLORS[inv.status] ?? BLUE}22`, color: STATUS_COLORS[inv.status] ?? BLUE }}>
                  {inv.status}
                </span>
                <span className="text-xs text-white/35">{open ? "▾" : "▸"}</span>
              </button>
              {open && (
                <div className="px-5 pb-5 -mt-1">
                  <div className="border" style={{ borderColor: DIV }}>
                    {inv.lineItems.map((li, i) => (
                      <div key={i} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-b last:border-b-0 text-xs" style={{ borderColor: DIV }}>
                        <span className="text-white/55">{li.description}</span>
                        <span className="font-bold" style={{ color: IVORY }}>${li.total.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 bg-white/[0.03]">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60">Total</span>
                      <span className="text-sm font-black" style={{ color: IVORY }}>${inv.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4 text-xs text-white/40">
                    <span>Issued <span className="text-white/65">{inv.issuedDate}</span></span>
                    <span>· Due <span className="text-white/65">{inv.dueDate}</span></span>
                    {inv.paidDate && <span>· Paid <span className="text-white/65">{inv.paidDate}</span></span>}
                    <button
                      onClick={() => downloadInvoice(inv.id, inv.number)}
                      className="ml-auto px-3 py-1 text-xs font-bold border"
                      style={{ borderColor: BLUE, color: BLUE }}
                      data-testid={`btn-download-${inv.id}`}
                    >
                      Download →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FadeIn>
  );
}
