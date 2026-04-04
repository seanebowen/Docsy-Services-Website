import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#4D9FDB", color: "#4D9FDB" }}>
      {icon} {text}
    </span>
  </div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "#000", padding: "0 5px" }}>{children}</span>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

export default function CourtReporting() {
  React.useEffect(() => {
    document.title = "Digital Court Reporting | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              We record it.
              <br />
              You get a bill
              <br />
              <HI>you can actually read.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Digital court reporting for depositions and legal proceedings. Soniclear certified. <strong className="text-black">Below agency rates.</strong> Word index, certified PDF, and delivery always included.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-schedule-depo">
                Schedule a Deposition
              </Link>
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-request-estimate">
                Request Estimate
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="THE PROBLEM" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What agencies don't want
            <br />
            you to <H>compare.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Agencies charge $5–$7.50+ per page for ordinary transcripts, then add <H>word index fees</H>, litigation package fees, e-delivery surcharges, vault hosting, and "administrative processing" charges on top. By the time the invoice arrives, you're paying <H>2–3× the advertised page rate.</H>
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="DOCSY RATE" />
          <h2 className="text-[5rem] sm:text-[8rem] font-black leading-none text-white mb-4" style={{ letterSpacing: "-0.04em" }}>
            <H>$4.75</H>
          </h2>
          <p className="text-xl font-bold text-white/50 mb-6">per page — standard rate</p>
          <p className="text-lg text-white/40">
            Word index, certified PDF, e-transcript, and digital delivery all included. That's not a promotional rate. <H>That's the standard rate.</H>
          </p>
        </div>
      </section>

      <section className="border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: IVORY }}>✓ Always included at Docsy</p>
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

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊟" text="RATES" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              Appearance & <H>transcript rates.</H>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a] max-w-3xl mx-auto">
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1e2a3a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Appearance Fees</p>
              </div>
              {[
                { l: "2-Hour Minimum", p: "$225" }, { l: "Half-Day (up to 4 hrs)", p: "$325" },
                { l: "Full-Day (up to 8 hrs)", p: "$550" }, { l: "Remote Half-Day", p: "$250" },
                { l: "Remote Full-Day", p: "$450" }, { l: "Overtime per 30 min", p: "$45" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1e2a3a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Transcript Rates (per page)</p>
              </div>
              {[
                { l: "Ordinary (30 days)", p: "$4.75" }, { l: "14-Day", p: "$5.50" },
                { l: "7-Day Expedited", p: "$5.75" }, { l: "3-Day Rush", p: "$6.50" },
                { l: "24-Hour Rush", p: "$7.75" }, { l: "Same-Day", p: "$9.50" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/30 text-center mt-6">50% deposit required at scheduling for all transcript orders. Appearance-only: NET 14, no deposit.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Book a deposition.
            <br />
            <HI>Know your price first.</HI>
          </h2>
          <p className="text-lg text-black/60 mb-8">Same certified reporter every time. The price you see is the price you pay.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/estimate" className="px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-schedule-depo-cta">Schedule a Deposition</Link>
            <Link href="/estimate" className="px-10 py-4 text-base font-bold text-black border-2 border-black text-center" data-testid="btn-estimate-cta">Request Estimate</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
