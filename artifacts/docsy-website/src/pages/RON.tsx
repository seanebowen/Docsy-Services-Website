import React from "react";
import { Link } from "wouter";
import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";
const SURFACE = "#111";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-1 whitespace-nowrap">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

export default function RON() {
  React.useEffect(() => {
    document.title = "Remote Online Notarization (RON) | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-20 lg:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
            RON · Remote Online Notarization
          </p>
          <h1 style={{ ...hdStyle, fontSize: "clamp(2rem, 4vw, 3.6rem)" }} className="text-white mb-6">
            Get notarized without<br />leaving the couch.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/50 text-xl italic mb-6 max-w-lg">
            (We're serious. That's a feature, not a bug.)
          </p>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-10">
            Remote Online Notarization — legally binding, secure, done in under 15 minutes. Available same-hour, 7 days a week, anywhere in the US.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE }}
              data-testid="btn-book-ron"
            >
              Book RON <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors"
              data-testid="btn-text-ron"
            >
              Text to Schedule
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">What RON Is</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">[01]</span>
      </div>

      {/* ── SECTION 1: What is RON ───────────────────── */}
      <section style={{ backgroundColor: SURFACE }} className="px-8 sm:px-16 py-20">
        <Reveal>
          <span className="font-mono text-xs text-[#555] tracking-wider">[01]</span>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} className="text-white mb-6 mt-2">
            What is RON — and when can you use it?
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-base text-[#999] leading-relaxed mb-6 max-w-3xl">
            RON is exactly what it sounds like: <HL>you get notarized online, via live video</HL>, without being in the same room as the notary. It's fully legal in Texas and about 45 other US states. <HL>The notarized document is legally identical</HL> to one signed in person — same seal, same validity, same enforceability.
          </p>
          <p className="text-base text-[#999] leading-relaxed mb-10 max-w-3xl">
            You'll need a device with a camera and microphone (phone, tablet, or computer), a stable internet connection, and a valid government-issued photo ID. That's it. The notary does the rest.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#222] max-w-3xl">
            <div className="p-8 border-b sm:border-b-0 sm:border-r border-[#222]">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 flex items-center gap-2" style={{ color: BLUE }}>
                <Check className="h-4 w-4" /> Good for RON
              </h3>
              <ul className="space-y-3 text-sm text-[#999]">
                {["Powers of attorney", "Affidavits and sworn statements", "Real estate documents (most)", "Business agreements", "Medical authorizations", "Vehicle titles (many types)"].map((i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-[#555] mt-0.5">—</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-[#777]">
                <X className="h-4 w-4" /> Requires in-person
              </h3>
              <ul className="space-y-3 text-sm text-[#999]">
                {["Texas HELOC (must be at title/lender)", "Some court-filed documents", "Documents requiring physical witness", "Documents requiring physical embossed seal only"].map((i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-[#555] mt-0.5">—</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER 2 ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Pricing</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">[02]</span>
      </div>

      {/* ── SECTION 2: Pricing ───────────────────────── */}
      <section style={{ backgroundColor: "#0e0e0e" }} className="px-8 sm:px-16 py-20">
        <Reveal>
          <span className="font-mono text-xs text-[#555] tracking-wider">[02]</span>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} className="text-white mb-8 mt-2">
            Pricing — all in, no surprises.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-[#222] max-w-xl mb-10">
            {[
              { label: "First notarization", price: "$25" },
              { label: "Each additional signature (same session)", price: "$10" },
              { label: "Same-hour availability", price: "Included" },
              { label: "Docsy Safe+ 90-day trial", price: "Included" },
              { label: "Digital certified copy", price: "Included" },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between items-center px-6 py-4 ${i % 2 === 0 ? "bg-[#161616]" : ""} border-b border-[#1a1a1a] last:border-b-0`}>
                <span className="text-sm text-[#ccc]">{row.label}</span>
                <span className="font-bold text-sm" style={{ color: BLUE }}>{row.price}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#777] max-w-xl leading-relaxed">
            Written estimate before every appointment. <HL>If it wasn't in the estimate, it's not on the invoice.</HL> That's not a policy — that's just how it works.
          </p>
        </Reveal>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <Reveal>
          <div>
            <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
              Ready to get notarized right now?
            </h2>
            <p className="text-white/50 text-sm">Same-hour available. You'll be done before lunch.</p>
          </div>
        </Reveal>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-book-ron-cta"
          >
            Book RON <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
