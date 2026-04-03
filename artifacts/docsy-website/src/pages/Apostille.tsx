import React from "react";
import { ArrowRight, Globe, CheckCircle2, AlertTriangle } from "lucide-react";

const BLUE = "#4A6FA8";
const DARK = "#141414";
const CREAM = "#f2f0e3";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-1 whitespace-nowrap">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
};

export default function Apostille() {
  React.useEffect(() => {
    document.title = "Apostille Services | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
          Apostille · International Document Authentication
        </p>
        <h1 style={{ ...hdStyle, fontSize: "clamp(2.5rem, 5vw, 5rem)" }} className="text-white mb-8 max-w-4xl">
          Your document needs to work<br />in another country.<br />We make that happen.
        </h1>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-10">
          All-inclusive Texas apostille services — <HL>state filing fee, digital scan, and shipping prep included</HL>. Personal documents starting at $150. No hidden fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-order-apostille"
          >
            Order Apostille <ArrowRight className="h-4 w-4" />
          </button>
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors"
            data-testid="btn-precheck-apostille"
          >
            Free Pre-Check
          </button>
        </div>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">What an Apostille Is</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">01</span>
      </div>

      {/* ── SECTION 1 ────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col md:flex-row">
        <div className="hidden md:flex items-start justify-center w-28 py-16 shrink-0" style={{ backgroundColor: DARK }}>
          <span style={{ ...hdStyle, fontSize: "3rem" }} className="text-white">1:</span>
        </div>
        <div className="flex-1 px-8 sm:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="mb-4">
                  What is an apostille?
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  An apostille is an official certificate that <HL>authenticates a document for use in another country</HL> — specifically in countries that are part of the 1961 Hague Convention (which is most of them). It's essentially the government saying: 'Yes, this document is real, and the signature and seal on it are legitimate.' If you're moving abroad, applying for dual citizenship, getting married internationally, sending your diploma to a foreign employer, or adopting internationally — <HL>you probably need an apostille.</HL>
                </p>
              </div>
              <div>
                <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="mb-4">
                  What Docsy handles
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  <HL>Everything.</HL> You send us the original certified document, we review it before filing (our free Pre-Check makes sure it qualifies before we submit anything), file it at the Texas Secretary of State, email you a digital certified scan the moment it's done, and send the original back to you.
                </p>
              </div>
              <div className="border-l-4 border-amber-400 pl-6 bg-amber-50 py-4 pr-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 mb-1">Important</p>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Texas apostilles can only be placed on Texas-origin documents or documents notarized by a Texas notary. Originals only — photocopies, scans, and laminated documents cannot be apostilled.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-neutral-300 sticky top-24">
                <div className="px-6 py-4 border-b border-neutral-300" style={{ backgroundColor: BLUE }}>
                  <p className="text-white text-xs font-bold uppercase tracking-[0.2em]">Pricing</p>
                  <p className="text-white/60 text-xs mt-1">All-inclusive. No surprise agency fees.</p>
                </div>
                {[
                  { l: "Apostille Pre-Check", p: "$25", note: "Free for retainer clients" },
                  { l: "Standard Personal Documents", p: "$150" },
                  { l: "Standard Business Documents", p: "$175" },
                  { l: "Next-Day", p: "$190" },
                  { l: "Same-Day Rush (before 10 AM)", p: "$225" },
                  { l: "Federal / USDOS", p: "$275" },
                  { l: "Each additional (same order)", p: "$100" },
                  { l: "Bundle of 5 or more", p: "$90 each" },
                ].map((row) => (
                  <div key={row.l} className="flex flex-col px-6 py-3 border-b border-neutral-200 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-neutral-700">{row.l}</span>
                      <span className="font-bold text-xs" style={{ color: BLUE }}>{row.p}</span>
                    </div>
                    {row.note && <span className="text-xs text-neutral-400 mt-0.5">{row.note}</span>}
                  </div>
                ))}
                <div className="px-6 py-4 border-t border-neutral-300 bg-neutral-50">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">Included in every order</p>
                  {["Texas SOS state filing fee", "Digital certified scan", "Return shipping prep", "Free Pre-Check", "90-day Safe+ vault trial"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
                      <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: BLUE }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
            Not sure if your document qualifies?
          </h2>
          <p className="text-white/50 text-sm">Free Pre-Check before we file anything. No guessing.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-ask-apostille"
          >
            Free Pre-Check <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors">
            Ask a Question
          </button>
        </div>
      </section>
    </div>
  );
}
