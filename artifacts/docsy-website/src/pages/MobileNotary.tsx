import React from "react";
import { ArrowRight, Check, X, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

export default function MobileNotary() {
  React.useEffect(() => {
    document.title = "Mobile Notary | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Mobile Notary · We Come to You</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                We come to you.{" "}<span style={{ color: CAROLINA }}>Not the other way around.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                Home. Office. Hospital. Nursing home. Wherever you are — Docsy mobile notary comes to you. 7 days, early morning to midnight.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-mobile">
                  Book Mobile Visit <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-estimate-mobile">
                  Get an Estimate
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5" style={{ color: CAROLINA }} />
                  <h2 className="text-xl font-bold" style={{ color: CLOUD }}>Where we go</h2>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                  Home. Your office. A coffee shop. A law firm. A title company. A hospital bedside. A nursing home. An assisted living facility. Anywhere you need a document notarized — we'll meet you there.
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: `${CLOUD}b3` }}>
                  Bedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide.
                </p>
                <h3 className="text-lg font-bold mb-3" style={{ color: CLOUD }}>What we can notarize</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                  Powers of attorney. Wills and trusts. Real estate documents. Affidavits. Vehicle titles. Medical authorizations. Business agreements. Immigration documents. Anything that needs a notary seal — if it's legal to notarize, we can do it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="rounded-xl p-6" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: CAROLINA }}>
                    <Check className="h-3.5 w-3.5" /> DO
                  </h4>
                  <ul className="space-y-2.5 text-xs" style={{ color: `${CLOUD}b3` }}>
                    {["Valid unexpired govt photo ID", "Original document (not a copy)", "All co-signers present with their own ID", "Payment ready"].map((i) => (
                      <li key={i} className="flex items-start gap-2"><span style={{ color: `${CLOUD}4d` }}>—</span>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-6" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-red-400">
                    <X className="h-3.5 w-3.5" /> DON'T
                  </h4>
                  <ul className="space-y-2.5 text-xs" style={{ color: `${CLOUD}b3` }}>
                    {["Sign before we arrive", "Fill in dates", "Bring incomplete documents"].map((i) => (
                      <li key={i} className="flex items-start gap-2"><span style={{ color: `${CLOUD}4d` }}>—</span>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-xl p-6" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}99` }}>
                  <strong style={{ color: `${CLOUD}cc` }}>What we can't do:</strong> We can't give you legal advice. We can't draft your documents. We can't tell you if your document will be accepted by a third party. Those things require an attorney.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Pricing — all-in, written up front.</h2>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {[
                { title: "Notarization Fees", items: [{ l: "First notarization", p: "$10" }, { l: "Each additional (same doc)", p: "$1" }] },
                { title: "Travel Fees", items: [{ l: "Tier 1 (0–10 mi)", p: "$30" }, { l: "Tier 2 (11–25 mi)", p: "$45" }, { l: "Tier 3 (26–40 mi)", p: "$65" }, { l: "Tier 4 (40+ mi)", p: "$85+" }] },
                { title: "Timing Add-Ons", items: [{ l: "Rush within 2 hours", p: "+$35" }, { l: "After-hours (after 6 PM)", p: "+$20" }, { l: "Late night (10 PM–midnight)", p: "+$35" }, { l: "Weekend / holiday", p: "+$25" }] },
              ].map((col) => (
                <div key={col.title} className="rounded-xl overflow-hidden" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                  <div className="px-6 py-4" style={{ borderBottom: `1px solid ${CLOUD}0d`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: `${CLOUD}66` }}>{col.title}</p>
                  </div>
                  {col.items.map((r, i) => (
                    <div key={r.l} className="flex justify-between px-6 py-3" style={{ borderBottom: i < col.items.length - 1 ? `1px solid ${CLOUD}0d` : "none" }}>
                      <span className="text-sm" style={{ color: `${CLOUD}b3` }}>{r.l}</span>
                      <span className="font-bold text-sm" style={{ color: CAROLINA }}>{r.p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-sm max-w-xl mx-auto text-center leading-relaxed" style={{ color: `${CLOUD}66` }}>
              Early Route™ (8–10 AM) or Midday Miles™ (1–3 PM): $10 off your travel fee. Written estimate before every appointment.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Tell us where you are. We'll be there.</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>7 days · 7 AM to midnight · Written estimate before we start.</p>
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-mobile-cta">
              Book Mobile Visit <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
