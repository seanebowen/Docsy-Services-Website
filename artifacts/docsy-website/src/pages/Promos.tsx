import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";
const BLUE = "#4D9FDB";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
      {icon} {text}
    </span>
  </div>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const promos = [
  {
    name: "Early Bird Seal™",
    tag: "$10 OFF",
    desc: "8–10 AM · RON sessions incl. GNW",
    rule: "Book and confirm before 10 AM. Appointment starts between 8–10 AM. Valid on Remote Online Notarization including General Notary Work sessions. Cannot be combined with other time-window discounts.",
  },
  {
    name: "Lunch Break Seal™",
    tag: "$10 OFF",
    desc: "11 AM–1 PM · RON sessions incl. GNW",
    rule: "Midday window. Valid on Remote Online Notarization including General Notary Work. Book in advance or same-hour. Cannot be combined with other time-window discounts.",
  },
  {
    name: "Night Shift Seal™",
    tag: "$10 OFF",
    desc: "9 PM–Midnight · RON sessions incl. GNW",
    rule: "Late-night RON window including General Notary Work. Remote Online Notarization only. Cannot be combined with other time-window discounts.",
  },
  {
    name: "HonorPass™",
    tag: "10% OFF",
    desc: "Military · Those Who Served",
    rule: "For those who have served in the US military. Valid ID or DD-214 required. Applies to base service fees. One discount per appointment.",
  },
  {
    name: "Bundle 5+ Apostilles",
    tag: "$90/DOC",
    desc: "Flat rate per document · 5+ in single order",
    rule: "Same filing batch. All documents must be submitted at once. Contact Docsy for corporate apostille packages.",
  },
  {
    name: "Docsy Safe+ Trial",
    tag: "FREE 30 DAYS",
    desc: "Auto-starts with your first Docsy service",
    rule: "No card. No signup. Auto-setup when your first service with Docsy completes — unless you opt out. Activates on any service. Cancel anytime.",
  },
];

export default function Promos() {
  React.useEffect(() => {
    document.title = "Promotions & Discounts | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <HI>Real discounts.</HI><br />Not gimmicks.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Every promotion has a real rule, listed plainly. No asterisks. If it's listed here, it applies exactly as written.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="⊙" text="CURRENT PROMOS" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>All active promotions.</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            {promos.map((promo, i) => (
              <FadeIn key={promo.name} delay={i * 60} threshold={0.05}>
                <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-black text-white leading-tight">{promo.name}</h3>
                    <span className="ml-4 px-2 py-1 text-xs font-bold tracking-wider shrink-0 border" style={{ borderColor: BLUE, color: BLUE }}>{promo.tag}</span>
                  </div>
                  <p className="text-sm font-semibold mb-4" style={{ color: IVORY }}>{promo.desc}</p>
                  <p className="text-sm text-white/40 leading-relaxed">{promo.rule}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊟" text="STACKING RULES" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              One time discount<br />per appointment.
            </h2>
            <p className="text-lg font-light text-white/50 leading-relaxed">
              Time-window discounts (Early Bird, Lunch Break, Night Shift) are mutually exclusive — only one applies per appointment. HonorPass™ is a separate standing discount and does not interact with time-window promos. All rules listed above apply exactly as written.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>Book with a discount applied.</h2>
            <p className="text-lg text-black/60 mb-8">Mention the promotion at booking. You'll know your exact price before you confirm.</p>
            <Link href="/estimate" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>Get an Estimate</Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
