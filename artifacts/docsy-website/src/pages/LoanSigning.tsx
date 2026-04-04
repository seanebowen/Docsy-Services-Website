import React from "react";
import { ArrowRight, AlertTriangle, CheckCircle2, Users, Building2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

export default function LoanSigning() {
  React.useEffect(() => {
    document.title = "Loan Signing Agent | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Loan Signing · Certified Agent</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Loan signings done right.{" "}<span style={{ color: CAROLINA }}>Flat rates. No surprises.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                Certified loan signing agent for refinance, buyer, seller, HELOC, reverse mortgage, and commercial packages. Texas-compliant. Reliable.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-signing">
                  Book a Signing <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-brokerlink">
                  BrokerLink™ Info
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5" style={{ color: CAROLINA }} />
                  <h2 className="text-xl font-bold" style={{ color: CLOUD }}>For borrowers</h2>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                  Closing on a home is stressful enough without having to worry about whether the signing agent is going to show up, know what they're doing, and return the documents on time. Docsy handles the signing side so your closing team can focus on funding.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                  Docsy sends every borrower a pre-appointment guide before every signing — what ID to bring, what not to sign early, what to have ready. Prepared borrowers mean cleaner signings and faster fundings.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5" style={{ color: CAROLINA }} />
                  <h2 className="text-xl font-bold" style={{ color: CLOUD }}>For title companies & agents</h2>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                  Published flat rates. No negotiating every assignment. Scanbacks included with refinance and buyer packages and returned immediately on completion — not hours later.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                  Texas HELOC law compliance handled proactively on every qualifying assignment. And if a re-sign is needed because of a lender or title error — that gets billed to the party at fault, not automatically to you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="rounded-xl p-6 md:p-8 flex items-start gap-6" style={{ backgroundColor: "#1a1500", border: `1px solid rgba(245,158,11,0.3)` }}>
              <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-3 text-amber-200">Texas HELOC — the one nobody warns you about</h2>
                <p className="text-base leading-relaxed text-amber-300">
                  Texas law prohibits home equity loan signings at the borrower's residence. Docsy flags every HELOC assignment and confirms a compliant signing location (title company, lender branch, or attorney office) before accepting it. If your signing agent doesn't know this, your closing is at risk.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Flat rates. Published. Non-negotiable.</h2>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
              {[
                { l: "Refinance Package", p: "$175" },
                { l: "Buyer Purchase Package", p: "$200" },
                { l: "Seller Package", p: "$125" },
                { l: "HELOC / Home Equity", p: "$175" },
                { l: "Reverse Mortgage", p: "$225" },
                { l: "Loan Modification", p: "$100" },
              ].map((item) => (
                <div key={item.l} className="rounded-xl p-6 text-center" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: CAROLINA }}>{item.p}</div>
                  <div className="text-xs uppercase tracking-wider font-medium" style={{ color: `${CLOUD}66` }}>{item.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="max-w-xl mx-auto space-y-3">
              {[
                "Scanbacks included with refinance and buyer packages",
                "90-day Docsy Safe+ vault trial included with every signing",
                "BrokerLink™ preferred pricing for real estate agents and title companies — $35/month",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: CAROLINA }} />
                  <span className="text-sm" style={{ color: `${CLOUD}b3` }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Book a loan signing or ask about BrokerLink™</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Written estimate before every appointment. All fees disclosed before you start.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-book-signing-cta">
                Book a Signing <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-brokerlink-cta">
                BrokerLink™ Info
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
