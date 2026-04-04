import React from "react";
import { ArrowRight, CheckCircle2, XCircle, Shield } from "lucide-react";
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

const included = [
  "Word index",
  "Certified PDF",
  "E-transcript ASCII file",
  "Digital delivery via Docsy portal",
  "Oath administration",
  "Exhibit marking and logging",
  "Pre-deposition tech check for remote sessions",
];

const agencyExtra = [
  "Word index (10–15 pages at full rate elsewhere)",
  "Litigation package ($40–$150 elsewhere)",
  "E-transcript formats ($25–$75 elsewhere)",
  "E-delivery fee",
  "Deposition officer fee",
];

export default function CourtReporting() {
  React.useEffect(() => {
    document.title = "Digital Court Reporting | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-20 lg:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
            Court Reporting · Digital Deposition
          </p>
          <h1 style={{ ...hdStyle, fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }} className="text-white mb-8 max-w-4xl">
            Court reporting without the agency invoice<br />that requires a decoder ring.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-10">
            Digital court reporting for depositions and legal proceedings. Soniclear certified. <HL>Below agency rates.</HL> Word index, certified PDF, and delivery included — always.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: BLUE }}
              data-testid="btn-schedule-depo"
            >
              Schedule a Deposition <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors"
              data-testid="btn-request-estimate"
            >
              Request Estimate
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">What Agencies Don't Want You to Compare</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">[01]</span>
      </div>

      {/* ── SECTION 1 ────────────────────────────────── */}
      <section style={{ backgroundColor: SURFACE }} className="px-8 sm:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <div>
            <Reveal>
              <span className="font-mono text-xs text-[#555] tracking-wider">[01]</span>
              <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-6 mt-2">
                What agencies don't want you to compare
              </h2>
              <p className="text-base text-[#999] leading-relaxed mb-8">
                Agencies charge <HL>$5–$7.50+ per page</HL> for ordinary transcripts, then add word index fees, litigation package fees, e-delivery surcharges, vault hosting, and 'administrative processing' charges on top.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="border border-[#222] p-8 text-center">
                <div style={{ ...hdStyle, fontSize: "4rem", color: BLUE }}>$4.25</div>
                <div className="text-base font-semibold text-white mb-3">per page — standard rate</div>
                <p className="text-sm text-[#777] leading-relaxed">
                  <HL>Word index, certified PDF, e-transcript, and digital delivery all included.</HL> That's not a promotional rate. That's the standard rate.
                </p>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={80}>
              <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-6">
                Who shows up to your deposition
              </h2>
              <p className="text-base text-[#999] leading-relaxed mb-6">
                With an agency, you find out at the door. <HL>With Docsy, you already know</HL> — it's the same certified reporter who took your booking, confirmed your details, and is familiar with your case. Not whoever was available last minute.
              </p>
              <div className="border-l-4 pl-6 py-2 border-[#333] flex items-start gap-3">
                <Shield className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <p className="text-sm text-[#999] leading-relaxed">
                  Soniclear certified. Every session recorded with professional-grade audio for transcript accuracy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#222] mt-8">
                <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#222]">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: BLUE }}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Always included
                  </h3>
                  <ul className="space-y-2">
                    {included.map((item) => (
                      <li key={item} className="text-xs text-[#999] flex items-start gap-2">
                        <span className="text-[#555] mt-0.5">—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2 text-amber-500">
                    <XCircle className="h-3.5 w-3.5" /> Agencies charge extra for
                  </h3>
                  <ul className="space-y-2">
                    {agencyExtra.map((item) => (
                      <li key={item} className="text-xs text-[#999] flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5" style={{ color: BLUE }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
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
            Appearance fees &amp; transcript rates.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222] max-w-3xl mb-6">
            <div className="border-b md:border-b-0 md:border-r border-[#222]">
              <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#161616]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#777]">Appearance Fees</p>
              </div>
              {[
                { l: "2-Hour Minimum", p: "$275" }, { l: "Half-Day (up to 4 hrs)", p: "$325" },
                { l: "Full-Day (up to 8 hrs)", p: "$550" }, { l: "Remote Half-Day", p: "$250" },
                { l: "Remote Full-Day", p: "$450" }, { l: "Overtime per 30 min", p: "$45" },
                { l: "After-hours surcharge", p: "+$100" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center px-6 py-3 border-b border-[#1a1a1a] last:border-b-0">
                  <span className="text-sm text-[#999]">{r.l}</span>
                  <span className="font-bold text-sm" style={{ color: BLUE }}>{r.p}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#161616]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#777]">Transcript Page Rates</p>
              </div>
              {[
                { l: "Ordinary (30 days)", p: "$4.25/pg" }, { l: "14-Day", p: "$5.00/pg" },
                { l: "7-Day Expedited", p: "$5.75/pg" }, { l: "3-Day Rush (prepaid)", p: "$6.50/pg" },
                { l: "24-Hour Rush (prepaid)", p: "$7.75/pg" }, { l: "Same-Day (prepaid)", p: "$9.50/pg" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center px-6 py-3 border-b border-[#1a1a1a] last:border-b-0">
                  <span className="text-sm text-[#999]">{r.l}</span>
                  <span className="font-bold text-sm" style={{ color: BLUE }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-[#777] max-w-xl">
            50% deposit required at scheduling for all transcript orders. Appearance-only: NET 14, no deposit.
          </p>
        </Reveal>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <Reveal>
          <div>
            <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
              Book a deposition or request a written cost estimate
            </h2>
            <p className="text-white/50 text-sm">Same certified reporter every time. No decoder ring required.</p>
          </div>
        </Reveal>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-schedule-depo-cta"
          >
            Schedule a Deposition <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors" data-testid="btn-estimate-cta">
            Request Estimate
          </button>
        </div>
      </section>
    </div>
  );
}
