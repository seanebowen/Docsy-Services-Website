import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const IVORY = "#F5EFE6";

const TIER_LABELS: Record<string, string> = {
  personal:     "Safe+ Personal",
  family:       "Safe+ Family",
  professional: "Safe+ Professional",
};
const MEMBERSHIP_LABELS: Record<string, string> = {
  starter: "Docsy+ Starter",
  pro:     "Docsy+ Pro",
  express: "Docsy Express Pass™",
};
const SERVICE_COLORS: Record<string, string> = {
  ron:       "#4D9FDB",
  mobile:    "#7ec8a0",
  loan:      "#f0c97a",
  apostille: "#c8a0d4",
  court:     "#e07a7a",
};
const SERVICE_LABELS: Record<string, string> = {
  ron:       "RON",
  mobile:    "Mobile / GNW",
  loan:      "Loan Signing",
  apostille: "Apostille",
  court:     "Court Reporting",
};

interface VaultFile {
  id:           string;
  name:         string;
  serviceType:  string;
  serviceLabel: string;
  date:         string;
  size:         string;
}

export default function SafeVault() {
  const [, setLocation] = useLocation();
  const { user, token, signOut } = useAuth();

  const [files,    setFiles]    = useState<VaultFile[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "My Safe+ Vault | Docsy Services";
    if (!token) { setLocation("/vault-info"); return; }
    fetchVault();
  }, [token]);

  async function fetchVault() {
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch("/api/vault", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json() as { ok: boolean; files?: VaultFile[]; error?: string };
      if (data.ok) {
        setFiles(data.files ?? []);
      } else {
        setApiError(data.error ?? "Failed to load vault.");
        if (res.status === 401) { signOut(); setLocation("/login"); }
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: BG }}>

      {/* ── Header ── */}
      <section className="px-5 pt-16 pb-10 sm:pt-20 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-4" style={{ borderColor: BLUE, color: BLUE }}>
                  ◎ DOCSY SAFE+
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                  {firstName}'s Vault
                </h1>
                <p className="text-white/40 text-sm">
                  {user.email}
                  {user.safePlusTier && (
                    <span className="ml-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.2)", color: BLUE }}>
                      {TIER_LABELS[user.safePlusTier]}
                    </span>
                  )}
                  {user.membership && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                      {MEMBERSHIP_LABELS[user.membership]}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/estimate" className="px-5 py-2.5 text-xs font-bold text-white" style={{ backgroundColor: "#000" }}>
                  Book a Service →
                </Link>
                <button
                  onClick={() => { signOut(); setLocation("/"); }}
                  className="px-5 py-2.5 text-xs font-bold border transition-colors"
                  style={{ borderColor: DIV, color: "rgba(255,255,255,0.35)" }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Files ── */}
      <section className="px-5 py-10">
        <div className="max-w-5xl mx-auto">

          {loading && (
            <div className="py-20 text-center">
              <p className="text-white/30 text-sm animate-pulse">Loading your vault…</p>
            </div>
          )}

          {!loading && apiError && (
            <div className="py-12 text-center">
              <p className="text-sm mb-4" style={{ color: "#e05252" }}>{apiError}</p>
              <button onClick={fetchVault} className="text-sm underline" style={{ color: BLUE }}>Try again</button>
            </div>
          )}

          {!loading && !apiError && files.length === 0 && (
            <FadeIn delay={0}>
              <div className="py-20 text-center border" style={{ borderColor: DIV }}>
                <p className="text-3xl mb-4" style={{ color: "rgba(255,255,255,0.08)" }}>◎</p>
                <p className="text-white/40 text-sm mb-6">No documents yet. Files upload automatically after each completed service.</p>
                <Link href="/estimate" className="inline-block px-8 py-3 text-sm font-bold text-white" style={{ backgroundColor: "#000" }}>
                  Book Your First Service →
                </Link>
              </div>
            </FadeIn>
          )}

          {!loading && !apiError && files.length > 0 && (
            <FadeIn delay={0}>
              {/* Summary bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {files.length} document{files.length !== 1 ? "s" : ""} stored
                </p>
                <div className="flex items-center gap-3">
                  {Array.from(new Set(files.map(f => f.serviceType))).map(type => (
                    <span key={type} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5" style={{ backgroundColor: `${SERVICE_COLORS[type]}22`, color: SERVICE_COLORS[type] }}>
                      {SERVICE_LABELS[type]}
                    </span>
                  ))}
                </div>
              </div>

              {/* File list */}
              <div className="border overflow-hidden" style={{ borderColor: DIV }}>
                {/* Header row */}
                <div className="grid grid-cols-[1fr_140px_80px_80px] gap-4 px-5 py-3 border-b" style={{ borderColor: DIV, backgroundColor: "rgba(0,0,0,0.3)" }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Document</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Service</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Date</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-right" style={{ color: "rgba(255,255,255,0.2)" }}>Size</span>
                </div>

                {files.map((file, idx) => (
                  <div
                    key={file.id}
                    className="grid grid-cols-[1fr_140px_80px_80px] gap-4 items-center px-5 py-4 border-b last:border-b-0 transition-colors hover:bg-white/[0.03]"
                    style={{ borderColor: DIV }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 w-1 h-8 rounded-full" style={{ backgroundColor: SERVICE_COLORS[file.serviceType] ?? BLUE }} />
                      <span className="text-sm font-medium text-white truncate" title={file.name}>{file.name}</span>
                    </div>
                    <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.4)" }}>{file.serviceLabel}</span>
                    <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {new Date(file.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-xs font-bold text-right" style={{ color: "rgba(255,255,255,0.25)" }}>{file.size}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

    </div>
  );
}
