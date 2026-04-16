import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import courtImg from "@/assets/images/court-reporting-mic.png";

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
    document.title = "Electronic Reporting | Docsy Services";
  }, []);


  return (
    <div className="w-full" style={{ backgroundColor: BG }}>


      <section className="px-5 pt-10 pb-14 sm:pt-12 sm:pb-16" style={{ backgroundColor: IVORY }}>
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
              <strong className="text-black">Electronic Reporting</strong> for depositions, examinations under oath (EUOs), board meetings, arbitrations, and legal proceedings. AAERT certified. Below agency rates. Word index, certified PDF, and digital delivery always included.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/calculate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-court">
                Get Your Price →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={courtImg} alt="Court reporting conference table with microphone" />

      {/* ── Testimonial ── */}
      <section className="py-12 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border border-[#1e2a3a]">
            <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
              &ldquo;Every court reporter I've used charges extra for the word index. Docsy just includes it. The invoice was exactly what I expected.&rdquo;
            </p>
            <p className="text-xs font-bold text-white">T. Perkins</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>San Antonio, TX</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="WHAT WE COVER" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            One reporter. <H>Every kind of proceeding.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Depositions, examinations under oath (EUOs), board and shareholder meetings, arbitrations, mediations, public hearings, and corporate proceedings — in person or remote. AAERT certified reporters. Verbatim record produced under oath, with the same legal weight as a traditional stenographic transcript.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="THE ISSUE" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What agencies don't want
            <br />
            you to <H>compare.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Agencies charge $8.50–$12+ per page for ordinary transcripts, then add <H>word index fees</H>, litigation package fees, e-delivery surcharges, vault hosting, and "administrative processing" charges on top. By the time the invoice arrives, you're paying <H>2–3× the advertised page rate.</H>
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="PRICING" />
          <h2 className="text-[5rem] sm:text-[8rem] font-black leading-none text-white mb-4" style={{ letterSpacing: "-0.04em" }}>
            <H>$8.50</H>
          </h2>
          <p className="text-xl font-bold text-white/50 mb-6">per page — Standard transcript</p>
          <p className="text-lg text-white/40">
            Word index, certified PDF, e-transcript, and digital delivery all included. That's not a promotional rate. <H>That's the standard rate.</H> PDF-only delivery is always free.
          </p>
        </div>
      </section>

      <section className="border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: IVORY }}>✓ Always included at Docsy</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Word index", "Certified PDF", "PDF delivery (always included)", "E-transcript ASCII file", "Digital delivery via portal", "Oath administration", "Exhibit marking and logging", "Pre-deposition tech check (remote)"].map((item) => (
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
                { l: "2-Hour Minimum (In-Person)", p: "$225" }, { l: "Half-Day (up to 4 hrs)", p: "$325" },
                { l: "Full-Day (up to 8 hrs)", p: "$550" }, { l: "2-Hour Minimum (Remote)", p: "$150" },
                { l: "Remote Half-Day", p: "$250" }, { l: "Remote Full-Day", p: "$450" },
                { l: "Overtime per 30 min", p: "$45" },
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
                { l: "Rough Draft (uncertified)", p: "$0.75" },
                { l: "Expedited (15+ business days)", p: "$7.50" },
                { l: "Standard (10 business days)", p: "$8.50" },
                { l: "Rush (next business day)", p: "$12.00" },
                { l: "Certified Copy (per copy/page)", p: "$2.50" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-white/40 text-center mt-6 max-w-2xl mx-auto leading-relaxed space-y-1">
            <p><strong className="text-white/70">All payments: NET-14.</strong></p>
            <p>Appearance-only orders: NET-14 from the date of appearance.</p>
            <p>Transcript orders: 50% deposit required at scheduling; balance due upon transcript delivery. <strong className="text-white/60">Transcripts are not released until payment is complete.</strong></p>
          </div>
        </div>
      </section>

      {/* ── Office Space Rentals ── */}
      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Label icon="⊞" text="OFFICE SPACE" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              Need a room?<br />
              <H>We have one.</H>
            </h2>
            <p className="text-base text-white/40 mt-4 max-w-lg mx-auto">
              Conference space available for your deposition, EUO, mediation, or arbitration — fully equipped for in-person and hybrid proceedings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4D9FDB" }}>Half-Day</p>
              <p className="text-4xl font-black text-white mb-1">$150<span className="text-base font-medium text-white/40 ml-2">starting</span></p>
              <p className="text-sm text-white/40">Up to 4 hours. Conference table, AV, secure Wi-Fi, exhibit display, and refreshments included.</p>
            </div>
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4D9FDB" }}>Full-Day</p>
              <p className="text-4xl font-black text-white mb-1">$175<span className="text-base font-medium text-white/40 ml-2">starting</span></p>
              <p className="text-sm text-white/40">Up to 8 hours. All half-day amenities plus extended setup, lunch coordination, and on-site tech support.</p>
            </div>
          </div>
          <p className="text-xs text-white/30 text-center mt-4">★ Starting rates. Final pricing depends on group size, AV needs, hybrid setup, and add-ons — confirmed at booking.</p>
        </div>
      </section>

      <section className="py-16 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              Below agency rates.<br />
              <span style={{ color: "#4D9FDB" }}>The price you see is the price you pay.</span>
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["AAERT certified", "Word index always included", "Certified PDF delivery"].map(t => (
                <span key={t} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <span style={{ color: "#4D9FDB" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href="/calculate" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-court-cta">
              Get Your Price →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
