import React from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

export default function RON() {
  React.useEffect(() => {
    document.title = "Remote Online Notarization (RON) | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>RON · Remote Online Notarization</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Get notarized without{" "}<span style={{ color: CAROLINA }}>leaving the couch.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-2" style={{ color: `${CLOUD}b3` }}>
                Remote Online Notarization — legally binding, secure, done in under 15 minutes. Available same-hour, 7 days a week, anywhere in the US.
              </p>
              <p className="text-sm italic mb-10" style={{ color: `${CLOUD}66` }}>
                (We're serious. That's a feature, not a bug.)
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-ron">
                  Book RON <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-text-ron">
                  Text to Schedule
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                What is RON — and when can you use it?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                You get notarized online, via live video, without being in the same room as the notary. Fully legal in Texas and about 45 other US states.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: CAROLINA }}>
                  <Check className="h-4 w-4" /> Good for RON
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: `${CLOUD}b3` }}>
                  {["Powers of attorney", "Affidavits and sworn statements", "Real estate documents (most)", "Business agreements", "Medical authorizations", "Vehicle titles (many types)"].map((i) => (
                    <li key={i} className="flex items-start gap-2"><span style={{ color: `${CLOUD}4d` }}>—</span>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: `${CLOUD}66` }}>
                  <X className="h-4 w-4" /> Requires in-person
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: `${CLOUD}b3` }}>
                  {["Texas HELOC (must be at title/lender)", "Some court-filed documents", "Documents requiring physical witness", "Documents requiring physical embossed seal only"].map((i) => (
                    <li key={i} className="flex items-start gap-2"><span style={{ color: `${CLOUD}4d` }}>—</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                Pricing — all in, no surprises.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="max-w-xl mx-auto rounded-xl overflow-hidden" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
              {[
                { label: "First notarization", price: "$25" },
                { label: "Each additional signature (same session)", price: "$10" },
                { label: "Same-hour availability", price: "Included" },
                { label: "Docsy Safe+ 90-day trial", price: "Included" },
                { label: "Digital certified copy", price: "Included" },
              ].map((row, i) => (
                <div key={row.label} className="flex justify-between items-center px-6 py-4" style={{ borderBottom: i < 4 ? `1px solid ${CLOUD}0d` : "none", backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent" }}>
                  <span className="text-sm" style={{ color: `${CLOUD}cc` }}>{row.label}</span>
                  <span className="font-bold text-sm" style={{ color: CAROLINA }}>{row.price}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-sm max-w-xl mx-auto text-center mt-6 leading-relaxed" style={{ color: `${CLOUD}66` }}>
              Written estimate before every appointment. If it wasn't in the estimate, it's not on the invoice. That's not a policy — that's just how it works.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Ready to get notarized right now?</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Same-hour available. You'll be done before lunch.</p>
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-ron-cta">
              Book RON <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
