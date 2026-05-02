import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const IVORY = "#F5EFE6";

interface Partner {
  id:             string;
  name:           string;
  business:       string;
  email:          string;
  refCode:        string;
  primaryService: string;
  clickCount:     number;
  status:         string;
  createdAt:      string;
}

interface PartnerReferral {
  id:           string;
  bookingRef:   string;
  services:     string[];
  bookingValue: number;
  creditEarned: number;
  status:       "pending" | "confirmed";
  createdAt:    string;
}

interface Earnings {
  total:     number;
  pending:   number;
  confirmed: number;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "#f0c97a",
  confirmed: "#7ec8a0",
};

const PRIMARY_SERVICE_LABELS: Record<string, string> = {
  "real-estate":  "Real Estate",
  "legal":        "Legal",
  "title":        "Title Company",
  "immigration":  "Immigration",
  "financial":    "Financial",
  "other":        "Other",
};

export default function PartnerPortal() {
  const [, setLocation] = useLocation();
  const { user, token, signOut } = useAuth();

  const [partner,    setPartner]    = useState<Partner | null>(null);
  const [referrals,  setReferrals]  = useState<PartnerReferral[]>([]);
  const [earnings,   setEarnings]   = useState<Earnings | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [copied,     setCopied]     = useState(false);

  useEffect(() => { document.title = "Partner Portal | Docsy Services"; }, []);

  /* Auth guard */
  useEffect(() => {
    if (!token) { setLocation("/login?next=/partners/portal"); return; }
    if (user && user.role !== "partner") {
      setError("This account isn't registered as a Docsy partner. Apply at /partners to get started.");
      setLoading(false);
    }
  }, [token, user, setLocation]);

  /* Fetch partner data */
  useEffect(() => {
    if (!token || !user) return;
    if (user.role !== "partner") return;

    fetch("/api/partners/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json() as Promise<{ ok: boolean; partner?: Partner; referrals?: PartnerReferral[]; earnings?: Earnings; error?: string }>)
      .then(data => {
        if (data.ok && data.partner) {
          setPartner(data.partner);
          setReferrals(data.referrals ?? []);
          setEarnings(data.earnings ?? null);
        } else {
          setError(data.error ?? "Failed to load partner data.");
        }
      })
      .catch(() => setError("Network error. Please try again."))
      .finally(() => setLoading(false));
  }, [token, user]);

  function copyLink() {
    if (!partner) return;
    const link = `${window.location.origin}/?ref=${partner.refCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function fmt(iso: string) {
    try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch { return "—"; }
  }

  /* Loading */
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: BG }}>
        <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.35)" }}>Loading your portal…</p>
      </div>
    );
  }

  /* Error / not a partner */
  if (error) {
    return (
      <div className="w-full" style={{ backgroundColor: BG }}>
        <div className="max-w-2xl mx-auto px-5 py-24 text-center">
          <p className="text-sm font-light mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/partners" className="inline-block px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-80" style={{ backgroundColor: BLUE }}>
              Apply to become a partner
            </Link>
            <button onClick={signOut} className="inline-block px-6 py-3 text-sm font-bold border transition-colors hover:bg-white/5" style={{ borderColor: DIV, color: "rgba(255,255,255,0.5)" }}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!partner) return null;

  const trackedLink = `${typeof window !== "undefined" ? window.location.origin : "https://docsyservices.com"}/?ref=${partner.refCode}`;

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: BG }}>

      {/* ── Header ── */}
      <section className="px-5 pt-16 pb-12 border-b" style={{ borderColor: DIV, backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <FadeIn delay={0}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(0,0,0,0.35)" }}>Partner Portal</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black leading-none" style={{ letterSpacing: "-0.02em" }}>
              {partner.business}
            </h1>
            <p className="text-sm text-black/50 mt-1">{partner.name} · {PRIMARY_SERVICE_LABELS[partner.primaryService] ?? partner.primaryService}</p>
          </FadeIn>
          <FadeIn delay={80}>
            <button
              onClick={signOut}
              className="text-sm font-medium transition-colors hover:text-black"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              Sign out
            </button>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-10">

        {/* ── Stats ── */}
        <FadeIn delay={0}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border" style={{ borderColor: DIV, backgroundColor: DIV }}>
            {[
              { label: "Total Earned",   value: `$${earnings?.total.toFixed(2) ?? "0.00"}`, sub: "all time" },
              { label: "Confirmed",      value: `$${earnings?.confirmed.toFixed(2) ?? "0.00"}`, sub: "paid out eligible" },
              { label: "Pending",        value: `$${earnings?.pending.toFixed(2) ?? "0.00"}`, sub: "in review" },
              { label: "Link Clicks",    value: partner.clickCount.toString(), sub: "unique tracked hits" },
            ].map((stat, i) => (
              <div key={i} className="p-6" style={{ backgroundColor: BG }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Tracked link ── */}
        <FadeIn delay={60}>
          <div className="border p-6" style={{ borderColor: DIV }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Your Tracked Link</p>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div
                className="flex-1 border px-4 py-3 text-sm font-mono break-all select-all"
                style={{ borderColor: DIV, color: "rgba(255,255,255,0.6)", backgroundColor: "#0e1520" }}
              >
                {trackedLink}
              </div>
              <button
                onClick={copyLink}
                className="shrink-0 px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: copied ? "#7ec8a0" : BLUE }}
              >
                {copied ? "Copied ✓" : "Copy Link"}
              </button>
            </div>
            <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              Referral code: <span className="font-bold text-white/50 tracking-wider">{partner.refCode}</span> · Attribution cookie lasts 30 days from click
            </p>
          </div>
        </FadeIn>

        {/* ── Referrals table ── */}
        <FadeIn delay={100}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Referred Bookings</p>
            {referrals.length === 0 ? (
              <div className="border p-10 text-center" style={{ borderColor: DIV }}>
                <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
                  No referred bookings yet. Share your tracked link to start earning.
                </p>
              </div>
            ) : (
              <div className="border overflow-hidden" style={{ borderColor: DIV }}>
                {/* Header */}
                <div
                  className="hidden sm:grid text-[10px] font-bold uppercase tracking-widest px-5 py-3 border-b"
                  style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr", borderColor: DIV, color: "rgba(255,255,255,0.25)" }}
                >
                  <span>Date</span>
                  <span>Services</span>
                  <span>Booking Value</span>
                  <span>Credit (10%)</span>
                  <span>Status</span>
                </div>
                {referrals.map(ref => (
                  <div
                    key={ref.id}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-y-1 px-5 py-4 border-b text-sm last:border-b-0"
                    style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr", borderColor: DIV }}
                  >
                    <span className="font-light" style={{ color: "rgba(255,255,255,0.5)" }}>{fmt(ref.createdAt)}</span>
                    <span className="font-medium text-white">{ref.services.join(", ") || "Notary Service"}</span>
                    <span className="font-light" style={{ color: "rgba(255,255,255,0.5)" }}>${ref.bookingValue.toFixed(2)}</span>
                    <span className="font-bold text-white">${ref.creditEarned.toFixed(2)}</span>
                    <span>
                      <span
                        className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: (STATUS_COLORS[ref.status] ?? "#aaa") + "22",
                          color: STATUS_COLORS[ref.status] ?? "#aaa",
                        }}
                      >
                        {ref.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* ── Payout note ── */}
        <FadeIn delay={120}>
          <div className="border p-6" style={{ borderColor: DIV }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Payouts</p>
            <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Confirmed credits are paid out monthly via ACH or check. Minimum payout is $25.
              Pending credits are reviewed within 7 days of booking completion.
              Questions? Email <span className="text-white/60 underline">partners@docsyservices.com</span>.
            </p>
          </div>
        </FadeIn>

        {/* ── Apply / invite ── */}
        <FadeIn delay={140}>
          <div className="text-center border-t pt-8" style={{ borderColor: DIV }}>
            <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
              Know someone who should be a Docsy partner?{" "}
              <Link href="/partners" className="underline hover:text-white" style={{ color: BLUE }}>
                Share the program page →
              </Link>
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
