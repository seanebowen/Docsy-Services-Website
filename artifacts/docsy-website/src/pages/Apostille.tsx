import React from "react";
import { ArrowRight, Globe, CheckCircle2, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

export default function Apostille() {
  React.useEffect(() => {
    document.title = "Apostille Services | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Apostille · International Document Authentication</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Your document needs to work in another country.{" "}<span style={{ color: CAROLINA }}>We make that happen.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                All-inclusive Texas apostille services — state filing fee, digital scan, and shipping prep included. Personal documents starting at $150. No hidden fees.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-order-apostille">
                  Order Apostille <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-precheck-apostille">
                  Free Pre-Check
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: CLOUD }}>What is an apostille?</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                    An apostille is an official certificate that authenticates a document for use in another country — specifically in countries that are part of the 1961 Hague Convention (which is most of them). It's essentially the government saying: 'Yes, this document is real, and the signature and seal on it are legitimate.'
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                    If you're moving abroad, applying for dual citizenship, getting married internationally, sending your diploma to a foreign employer, or adopting internationally — you probably need an apostille.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: CLOUD }}>What Docsy handles</h2>
                  <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                    Everything. You send us the original certified document, we review it before filing (our free Pre-Check makes sure it qualifies before we submit anything), file it at the Texas Secretary of State, email you a digital certified scan the moment it's done, and send the original back to you.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="rounded-xl p-6 md:p-8 flex items-start gap-4" style={{ backgroundColor: "#1a1500", border: `1px solid rgba(245,158,11,0.3)` }}>
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Important</p>
                    <p className="text-sm text-amber-300 leading-relaxed">
                      Texas apostilles can only be placed on Texas-origin documents or documents notarized by a Texas notary. Originals only — photocopies, scans, and laminated documents cannot be apostilled.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="lg:col-span-1">
              <div className="rounded-xl overflow-hidden sticky top-24" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                <div className="px-6 py-4" style={{ backgroundColor: CAROLINA }}>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: CLOUD }}>Pricing</p>
                  <p className="text-xs mt-1" style={{ color: `${CLOUD}99` }}>All-inclusive. No surprise agency fees.</p>
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
                  <div key={row.l} className="flex flex-col px-6 py-3" style={{ borderBottom: `1px solid ${CLOUD}0d` }}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: `${CLOUD}cc` }}>{row.l}</span>
                      <span className="font-bold text-xs" style={{ color: CAROLINA }}>{row.p}</span>
                    </div>
                    {row.note && <span className="text-xs mt-0.5" style={{ color: `${CLOUD}4d` }}>{row.note}</span>}
                  </div>
                ))}
                <div className="px-6 py-4" style={{ borderTop: `1px solid ${CLOUD}1a`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${CLOUD}66` }}>Included in every order</p>
                  {["Texas SOS state filing fee", "Digital certified scan", "Return shipping prep", "Free Pre-Check", "90-day Safe+ vault trial"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs mb-2" style={{ color: `${CLOUD}b3` }}>
                      <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: CAROLINA }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Not sure if your document qualifies?</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Free Pre-Check before we file anything. No guessing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-ask-apostille">
                Free Pre-Check <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }}>
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
