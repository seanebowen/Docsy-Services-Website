import React from "react";
import { ArrowRight, Check, X, MapPin } from "lucide-react";

const BLUE = "#4A6FA8";
const DARK = "#141414";
const CREAM = "#f2f0e3";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-0.5">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
};

export default function MobileNotary() {
  React.useEffect(() => {
    document.title = "Mobile Notary | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
          Mobile Notary · We Come to You
        </p>
        <h1 style={{ ...hdStyle, fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }} className="text-white mb-8">
          We come to you.<br />Not the other way around.
        </h1>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-10">
          Home. Office. Hospital. Nursing home. Wherever you are — Docsy mobile notary comes to you. <HL>7 days, early morning to midnight.</HL>
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-book-mobile"
          >
            Book Mobile Visit <ArrowRight className="h-4 w-4" />
          </button>
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors"
            data-testid="btn-estimate-mobile"
          >
            Get an Estimate
          </button>
        </div>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Where We Go & What We Do</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">01</span>
      </div>

      {/* ── SECTION 1 ────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col md:flex-row">
        <div className="hidden md:flex items-start justify-center w-28 py-16 shrink-0" style={{ backgroundColor: DARK }}>
          <span style={{ ...hdStyle, fontSize: "3rem" }} className="text-white">1:</span>
        </div>
        <div className="flex-1 px-8 sm:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
            <div>
              <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: BLUE }} /> Where we go
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed mb-6">
                Home. Your office. A coffee shop. A law firm. A title company. <HL>A hospital bedside. A nursing home. An assisted living facility.</HL> Anywhere you need a document notarized — we'll meet you there.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed mb-6">
                Bedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide. If someone you love needs documents signed and can't leave a care facility, we handle it.
              </p>

              <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="mb-4 mt-8">
                What we can notarize
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Powers of attorney. Wills and trusts. Real estate documents. Affidavits. Vehicle titles. Medical authorizations. Business agreements. Immigration documents. <HL>Anything that needs a notary seal — if it's legal to notarize, we can do it.</HL>
              </p>

              <div className="mt-8 border-l-4 border-neutral-300 pl-6">
                <p className="text-sm text-neutral-500 leading-relaxed">
                  <strong className="text-neutral-700">What we can't do:</strong> We can't give you legal advice. We can't draft your documents. We can't tell you if your document will be accepted by a third party. Those things require an attorney.
                </p>
              </div>
            </div>

            <div>
              {/* DO / DON'T */}
              <div className="grid grid-cols-2 gap-0 border border-neutral-300 mb-8">
                <div className="p-6 border-r border-neutral-300">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={{ color: BLUE }}>
                    <Check className="h-3.5 w-3.5" /> DO
                  </h4>
                  <ul className="space-y-2.5 text-xs text-neutral-600">
                    {["Valid unexpired govt photo ID", "Original document (not a copy)", "All co-signers present with their own ID", "Payment ready"].map((i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-neutral-400">—</span>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-red-500">
                    <X className="h-3.5 w-3.5" /> DON'T
                  </h4>
                  <ul className="space-y-2.5 text-xs text-neutral-600">
                    {["Sign before we arrive", "Fill in dates", "Bring incomplete documents"].map((i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-neutral-400">—</span>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER 2 ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Pricing</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">02</span>
      </div>

      {/* ── SECTION 2: Pricing ───────────────────────── */}
      <section style={{ backgroundColor: "#f8f7f0" }} className="flex flex-col md:flex-row">
        <div className="hidden md:flex items-start justify-center w-28 py-16 shrink-0" style={{ backgroundColor: BLUE }}>
          <span style={{ ...hdStyle, fontSize: "3rem" }} className="text-white">2:</span>
        </div>
        <div className="flex-1 px-8 sm:px-16 py-16">
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} className="mb-8">
            Pricing — all-in, written up front.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-300 max-w-4xl mb-8">
            <div className="border-b md:border-b-0 md:border-r border-neutral-300">
              <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Notarization Fees</p>
              </div>
              {[{ l: "First notarization", p: "$10" }, { l: "Each additional (same doc)", p: "$1" }].map((r) => (
                <div key={r.l} className="flex justify-between px-6 py-4 border-b border-neutral-200 last:border-b-0">
                  <span className="text-sm text-neutral-600">{r.l}</span>
                  <span className="font-bold text-sm" style={{ color: BLUE }}>{r.p}</span>
                </div>
              ))}
            </div>
            <div className="border-b md:border-b-0 md:border-r border-neutral-300">
              <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Travel Fees</p>
              </div>
              {[{ l: "Tier 1 (0–10 mi)", p: "$30" }, { l: "Tier 2 (11–25 mi)", p: "$45" }, { l: "Tier 3 (26–40 mi)", p: "$65" }, { l: "Tier 4 (40+ mi)", p: "$85+" }].map((r) => (
                <div key={r.l} className="flex justify-between px-6 py-4 border-b border-neutral-200 last:border-b-0">
                  <span className="text-sm text-neutral-600">{r.l}</span>
                  <span className="font-bold text-sm" style={{ color: BLUE }}>{r.p}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Timing Add-Ons</p>
              </div>
              {[{ l: "Rush within 2 hours", p: "+$35" }, { l: "After-hours (after 6 PM)", p: "+$20" }, { l: "Late night (10 PM–midnight)", p: "+$35" }, { l: "Weekend / holiday", p: "+$25" }].map((r) => (
                <div key={r.l} className="flex justify-between px-6 py-4 border-b border-neutral-200 last:border-b-0">
                  <span className="text-sm text-neutral-600">{r.l}</span>
                  <span className="font-bold text-sm" style={{ color: BLUE }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
            <HL>Early Route™ (8–10 AM) or Midday Miles™ (1–3 PM):</HL> $10 off your travel fee. Written estimate before every appointment.
          </p>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
            Tell us where you are. We'll be there.
          </h2>
          <p className="text-white/50 text-sm">7 days · 7 AM to midnight · Written estimate before we start.</p>
        </div>
        <button
          className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: BLUE }}
          data-testid="btn-book-mobile-cta"
        >
          Book Mobile Visit <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
