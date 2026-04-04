import React from "react";
import { ArrowRight, CheckCircle2, XCircle, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

const included = [
  "Word index", "Certified PDF", "E-transcript ASCII file",
  "Digital delivery via Docsy portal", "Oath administration",
  "Exhibit marking and logging", "Pre-deposition tech check for remote sessions",
];

const agencyExtra = [
  "Word index (10–15 pages at full rate elsewhere)",
  "Litigation package ($40–$150 elsewhere)",
  "E-transcript formats ($25–$75 elsewhere)",
  "E-delivery fee", "Deposition officer fee",
];

export default function CourtReporting() {
  React.useEffect(() => {
    document.title = "Digital Court Reporting | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Court Reporting · Digital Deposition</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Court reporting without{" "}<span style={{ color: CAROLINA }}>the agency invoice that requires a decoder ring.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                Digital court reporting for depositions and legal proceedings. Soniclear certified. Below agency rates. Word index, certified PDF, and delivery included — always.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-schedule-depo">
                  Schedule a Deposition <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-request-estimate">
                  Request Estimate
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
            <div className="space-y-6">
              <Reveal>
                <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: CLOUD }}>What agencies don't want you to compare</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: `${CLOUD}b3` }}>
                    Agencies charge $5–$7.50+ per page for ordinary transcripts, then add word index fees, litigation package fees, e-delivery surcharges, vault hosting, and 'administrative processing' charges on top.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-xl p-8 text-center" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                  <div className="text-5xl font-bold mb-2" style={{ color: CAROLINA }}>$4.25</div>
                  <div className="text-base font-semibold mb-3" style={{ color: CLOUD }}>per page — standard rate</div>
                  <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}99` }}>
                    Word index, certified PDF, e-transcript, and digital delivery all included. That's not a promotional rate. That's the standard rate.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal delay={80}>
                <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: CLOUD }}>Who shows up to your deposition</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: `${CLOUD}b3` }}>
                    With an agency, you find out at the door. With Docsy, you already know — it's the same certified reporter who took your booking, confirmed your details, and is familiar with your case.
                  </p>
                  <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: `${CLOUD}08` }}>
                    <Shield className="h-5 w-5 shrink-0 mt-0.5" style={{ color: CAROLINA }} />
                    <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                      Soniclear certified. Every session recorded with professional-grade audio for transcript accuracy.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-xl p-6" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: CAROLINA }}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Always included
                    </h3>
                    <ul className="space-y-2">
                      {included.map((item) => (
                        <li key={item} className="text-xs flex items-start gap-2" style={{ color: `${CLOUD}b3` }}>
                          <span style={{ color: `${CLOUD}4d` }}>—</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-6" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-amber-500">
                      <XCircle className="h-3.5 w-3.5" /> Agencies charge extra for
                    </h3>
                    <ul className="space-y-2">
                      {agencyExtra.map((item) => (
                        <li key={item} className="text-xs flex items-start gap-2" style={{ color: `${CLOUD}b3` }}>
                          <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5" style={{ color: CAROLINA }} />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Appearance fees &amp; transcript rates.</h2>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-6">
              {[
                { title: "Appearance Fees", items: [
                  { l: "2-Hour Minimum", p: "$275" }, { l: "Half-Day (up to 4 hrs)", p: "$325" },
                  { l: "Full-Day (up to 8 hrs)", p: "$550" }, { l: "Remote Half-Day", p: "$250" },
                  { l: "Remote Full-Day", p: "$450" }, { l: "Overtime per 30 min", p: "$45" },
                  { l: "After-hours surcharge", p: "+$100" },
                ]},
                { title: "Transcript Page Rates", items: [
                  { l: "Ordinary (30 days)", p: "$4.25/pg" }, { l: "14-Day", p: "$5.00/pg" },
                  { l: "7-Day Expedited", p: "$5.75/pg" }, { l: "3-Day Rush (prepaid)", p: "$6.50/pg" },
                  { l: "24-Hour Rush (prepaid)", p: "$7.75/pg" }, { l: "Same-Day (prepaid)", p: "$9.50/pg" },
                ]},
              ].map((col) => (
                <div key={col.title} className="rounded-xl overflow-hidden" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                  <div className="px-6 py-4" style={{ borderBottom: `1px solid ${CLOUD}0d`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: `${CLOUD}66` }}>{col.title}</p>
                  </div>
                  {col.items.map((r, i) => (
                    <div key={r.l} className="flex justify-between items-center px-6 py-3" style={{ borderBottom: i < col.items.length - 1 ? `1px solid ${CLOUD}0d` : "none" }}>
                      <span className="text-sm" style={{ color: `${CLOUD}b3` }}>{r.l}</span>
                      <span className="font-bold text-sm" style={{ color: CAROLINA }}>{r.p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-center max-w-xl mx-auto" style={{ color: `${CLOUD}66` }}>
              50% deposit required at scheduling for all transcript orders. Appearance-only: NET 14, no deposit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Book a deposition or request a written cost estimate</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Same certified reporter every time. No decoder ring required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }} data-testid="btn-schedule-depo-cta">
                Schedule a Deposition <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-estimate-cta">
                Request Estimate
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
