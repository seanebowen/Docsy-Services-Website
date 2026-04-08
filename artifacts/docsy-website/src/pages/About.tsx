import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
      {icon} {text}
    </span>
  </div>
);

export default function About() {
  React.useEffect(() => {
    document.title = "About | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              About Docsy.
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-xl sm:text-2xl text-black/50 max-w-2xl font-medium leading-snug">
              Short for document sanity — and yes, we named it that on purpose.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="OUR STORY" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-8" style={{ letterSpacing: "-0.02em" }}>
              Show up. Do the work right.<br />Make it feel less like a nightmare.
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Docsy exists because legal and professional documents are stressful enough without adding confusion, delays, or a notary who ghosts you. We built a multi-division document services operation around one idea: show up, do the work right, and make the whole thing feel less like a nightmare.
            </p>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              We handle Remote Online Notarization, mobile notary and general notary work, loan signings, apostille processing, and digital court reporting — all under one roof, all with the same standard of care.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Who's Behind It ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="WHO'S BEHIND IT" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-8" style={{ letterSpacing: "-0.02em" }}>
              One operator.<br />A real business behind it.
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Sean Bowen is the owner and sole operator of Docsy LLC, a Texas-based professional services company. He holds a Texas notary commission, AAERT CER certification as a digital court reporter, and operates as a licensed loan signing agent and apostille specialist.
            </p>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Docsy is structured as a professional services brand — not a one-off freelancer. That means documented processes, consistent pricing, and accountability baked into how the business runs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Why It's Built This Way ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="WHY WE'RE BUILT THIS WAY" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-8" style={{ letterSpacing: "-0.02em" }}>
              Our clients deserve more<br />than improvisation.
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Most document professionals are solo operators with no infrastructure behind them. Docsy was built differently — with a formal operating structure, defined service divisions, and professional-grade systems — because the clients we serve (title companies, attorneys, lenders, and individuals navigating serious legal matters) deserve more than improvisation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Service Area ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="SERVICE AREA" />
            <h2 className="text-[5rem] sm:text-[8rem] font-black leading-none text-white mb-4" style={{ letterSpacing: "-0.04em" }}>
              Texas.
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
              Based in Texas. RON services available nationwide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-8" style={{ letterSpacing: "-0.02em" }}>
              Ready to hand off<br />the documents?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/estimate"
                className="px-8 py-4 text-base font-bold text-white text-center"
                style={{ backgroundColor: "#000" }}
              >
                Book a service →
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black"
              >
                Contact us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
