import React from "react";

const CAROLINA = "#4B9CD3";
const BG = "#0a0a0a";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: CAROLINA, color: "#000" }}>
      {icon} {text}
    </span>
  </div>
);

export default function CourtReporting() {
  React.useEffect(() => {
    document.title = "Digital Court Reporting | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: CAROLINA }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            Court reporting without
            <br />
            the decoder ring
            <br />
            invoice.
          </h1>
          <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
            Digital court reporting for depositions and legal proceedings. Soniclear certified. Below agency rates. Word index, certified PDF, and delivery always included.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-schedule-depo">
              Schedule a Deposition
            </button>
            <button className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-request-estimate">
              Request Estimate
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="THE PROBLEM" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What agencies don't want you to compare.
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Agencies charge $5–$7.50+ per page for ordinary transcripts, then add word index fees, litigation package fees, e-delivery surcharges, vault hosting, and "administrative processing" charges on top. By the time the invoice arrives, you're paying 2–3× the advertised page rate.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="DOCSY RATE" />
          <h2 className="text-[5rem] sm:text-[8rem] font-black leading-none text-white mb-4" style={{ letterSpacing: "-0.04em" }}>
            $4.25
          </h2>
          <p className="text-xl font-bold text-white/50 mb-6">per page — standard rate</p>
          <p className="text-lg text-white/40">
            Word index, certified PDF, e-transcript, and digital delivery all included. That's not a promotional rate. That's the standard rate.
          </p>
        </div>
      </section>

      <section className="border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]">
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: CAROLINA }}>✓ Always included at Docsy</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Word index", "Certified PDF", "E-transcript ASCII file", "Digital delivery via portal", "Oath administration", "Exhibit marking and logging", "Pre-deposition tech check (remote)"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-white/20">—</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40">✕ Agencies charge extra for</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Word index (10–15 pages at full rate)", "Litigation package ($40–$150 elsewhere)", "E-transcript formats ($25–$75 elsewhere)", "E-delivery fee", "Deposition officer fee", "Vault hosting"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-white/20">—</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊟" text="RATES" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Appearance & transcript rates.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a] max-w-3xl mx-auto">
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1a1a1a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Appearance Fees</p>
              </div>
              {[
                { l: "2-Hour Minimum", p: "$275" }, { l: "Half-Day (up to 4 hrs)", p: "$325" },
                { l: "Full-Day (up to 8 hrs)", p: "$550" }, { l: "Remote Half-Day", p: "$250" },
                { l: "Remote Full-Day", p: "$450" }, { l: "Overtime per 30 min", p: "$45" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between px-8 py-4 border-b border-[#1a1a1a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: CAROLINA }}>{r.p}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1a1a1a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Transcript Rates (per page)</p>
              </div>
              {[
                { l: "Ordinary (30 days)", p: "$4.25" }, { l: "14-Day", p: "$5.00" },
                { l: "7-Day Expedited", p: "$5.75" }, { l: "3-Day Rush", p: "$6.50" },
                { l: "24-Hour Rush", p: "$7.75" }, { l: "Same-Day", p: "$9.50" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between px-8 py-4 border-b border-[#1a1a1a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: CAROLINA }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/30 text-center mt-6">50% deposit required at scheduling for all transcript orders. Appearance-only: NET 14, no deposit.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: CAROLINA }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Book a deposition or request a written cost estimate.
          </h2>
          <p className="text-lg text-black/60 mb-8">Same certified reporter every time. No decoder ring required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }} data-testid="btn-schedule-depo-cta">Schedule a Deposition</button>
            <button className="px-10 py-4 text-base font-bold text-black border-2 border-black" data-testid="btn-estimate-cta">Request Estimate</button>
          </div>
        </div>
      </section>

    </div>
  );
}
