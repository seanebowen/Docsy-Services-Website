import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

interface Firm {
  id: string; name: string; ein: string; type: string; address: string;
  primaryContact: { name: string; email: string; phone: string };
  expectedMonthlyVolume: number; serviceMix: string[]; notes: string;
  status: "pending" | "approved" | "denied"; createdAt: string; approvedAt: string | null;
}

const TYPE_LABELS: Record<string, string> = {
  "title-company": "Title Company",
  "law-firm":      "Law Firm",
  "lender":        "Lender",
  "corporate":     "Corporate Legal",
  "other":         "Other",
};
const STATUS_COLORS: Record<string, string> = {
  pending:  "#f0c97a",
  approved: "#7ec8a0",
  denied:   "#e07a7a",
};

export default function InternalFirms() {
  const { user, token } = useAuth();
  const [, setLocation] = useLocation();

  const [firms,   setFirms]   = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [busyId,  setBusyId]  = useState<string | null>(null);
  const [filter,  setFilter]  = useState<"all" | "pending" | "approved" | "denied">("pending");

  const isAuthorized = !!token && user?.role === "internal_admin";

  useEffect(() => {
    document.title = "Internal — Firm Applications | Docsy";
    if (!token) {
      setLocation("/login?next=/internal-firms");
      return;
    }
    if (user && user.role !== "internal_admin") {
      setLoading(false);
      setError("This page is restricted to Docsy staff.");
      return;
    }
    if (isAuthorized) void load();
  }, [token, user?.role, isAuthorized]);

  async function authedFetch(input: string, init: RequestInit = {}) {
    return fetch(input, {
      ...init,
      headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token ?? ""}` },
    });
  }

  async function load() {
    setLoading(true); setError(null);
    try {
      const res  = await authedFetch("/api/firms/applications");
      const data = await res.json() as { ok: boolean; firms?: Firm[]; error?: string };
      if (!data.ok) { setError(data.error ?? "Could not load firms."); return; }
      setFirms(data.firms ?? []);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function action(firmId: string, kind: "approve" | "deny") {
    setBusyId(firmId);
    try {
      const res = await authedFetch(`/api/firms/applications/${firmId}/${kind}`, { method: "POST" });
      const data = await res.json() as { ok: boolean; adminEmail?: string; error?: string };
      if (!data.ok) { alert(data.error ?? "Action failed."); return; }
      if (kind === "approve" && data.adminEmail) {
        alert(`Firm approved. Admin user provisioned for ${data.adminEmail}. They can sign in at /login (demo OTP: 000000).`);
      }
      await load();
    } catch {
      alert("Network error.");
    } finally {
      setBusyId(null);
    }
  }

  if (!token) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center px-5" style={{ backgroundColor: BG }}>
        <p className="text-sm text-white/45">Redirecting to sign in…</p>
      </div>
    );
  }

  if (user && user.role !== "internal_admin") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 text-center" style={{ backgroundColor: BG }}>
        <h1 className="text-3xl font-black text-white mb-3">Staff only</h1>
        <p className="text-sm text-white/45 mb-6 max-w-md">
          This Docsy admin surface is restricted to internal staff accounts. If you reached this page by mistake, head back to your portal.
        </p>
        <div className="flex gap-3">
          <Link href="/" className="text-sm underline text-white/60 hover:text-white">← Home</Link>
          <Link href="/firm/portal" className="text-sm underline text-white/60 hover:text-white">Firm portal →</Link>
        </div>
      </div>
    );
  }

  const filtered = firms.filter(f => filter === "all" || f.status === filter);
  const counts = {
    all:      firms.length,
    pending:  firms.filter(f => f.status === "pending").length,
    approved: firms.filter(f => f.status === "approved").length,
    denied:   firms.filter(f => f.status === "denied").length,
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: BG }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: DIV, backgroundColor: "#0b1220" }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border" style={{ borderColor: BLUE, color: BLUE }}>
            ⊙ Internal — Firm Applications · Staff Only
          </span>
          <Link href="/internal-book" className="text-xs underline text-white/45">/internal-book →</Link>
          <span className="text-[10px] text-white/35 ml-auto">Signed in as {user?.email}</span>
        </div>
      </div>

      <section className="px-5 pt-12 pb-8 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
          Firm applications
        </h1>
        <p className="text-sm text-white/45 mb-6">Approve or deny incoming firm portal requests. Approving auto-provisions the primary contact as a firm_admin user.</p>

        <div className="flex gap-1 flex-wrap mb-8">
          {(["all", "pending", "approved", "denied"] as const).map(k => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border"
              style={{
                borderColor: filter === k ? BLUE : DIV,
                color:       filter === k ? BLUE : "rgba(255,255,255,0.45)",
                backgroundColor: filter === k ? "rgba(77,159,219,0.07)" : "transparent",
              }}
              data-testid={`filter-${k}`}
            >
              {k} ({counts[k]})
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-white/30 animate-pulse text-center py-12">Loading…</p>}
        {error   && <p className="text-sm text-red-400 text-center py-12">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-white/30 text-center py-12">No firms in this filter.</p>
        )}

        <div className="space-y-4">
          {filtered.map(f => (
            <div key={f.id} className="border p-6" style={{ borderColor: DIV }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-white">{f.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1" style={{ backgroundColor: `${STATUS_COLORS[f.status]}22`, color: STATUS_COLORS[f.status] }}>
                      {f.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/45">{TYPE_LABELS[f.type] ?? f.type} · {f.ein || "EIN n/a"} · applied {new Date(f.createdAt).toLocaleString()}</p>
                </div>
                {f.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => action(f.id, "approve")}
                      disabled={busyId === f.id}
                      className="px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
                      style={{ backgroundColor: "#7ec8a0" }}
                      data-testid={`btn-approve-${f.id}`}
                    >
                      {busyId === f.id ? "Approving…" : "✓ Approve"}
                    </button>
                    <button
                      onClick={() => action(f.id, "deny")}
                      disabled={busyId === f.id}
                      className="px-4 py-2 text-xs font-bold border disabled:opacity-40"
                      style={{ borderColor: "#e07a7a", color: "#e07a7a" }}
                      data-testid={`btn-deny-${f.id}`}
                    >
                      ✕ Deny
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Address</p>
                  <p className="text-white/65">{f.address}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Primary Contact</p>
                  <p className="text-white/65">{f.primaryContact.name} · {f.primaryContact.email} · {f.primaryContact.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Volume / Services</p>
                  <p className="text-white/65">{f.expectedMonthlyVolume}/mo · {f.serviceMix.join(", ")}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Notes</p>
                  <p className="text-white/65">{f.notes || "—"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
