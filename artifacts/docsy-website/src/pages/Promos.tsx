import React from "react";
import { Link } from "wouter";

const BEIGE = "#D4B896";
const BG = "#0d1b3e";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: BEIGE, color: "#000" }}>
      {icon} {text}
    </span>
  </div>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(239, 68, 68, 0.4)", color: "#fff", padding: "0 5px" }}>{children}</span>
);

const promos = [
  { name: "Early Bird Seal™", tag: "$10 OFF", desc: "Available 8–10 AM · RON or Mobile", rule: "Book and confirm before 10 AM. Appointment starts between 8–10 AM. Can be stacked with HonorPass™. Cannot be combined with other time discounts." },
  { name: "Lunch Break Seal™", tag: "$10 OFF", desc: "Available 11 AM–1 PM · RON", rule: "Midday window, RON only. Book in advance or same-hour. Stack with HonorPass™. Cannot combine with other time discounts." },
  { name: "Night Shift Seal™", tag: "$10 OFF", desc: "Available 7–9 PM · RON or Mobile", rule: "Evening availability window. After-hours surcharge not applied during this window. Cannot combine with other time discounts." },
  { name: "Early Route™", tag: "$10 OFF TRAVEL", desc: "Mobile visits · 8–10 AM only", rule: "$10 off travel tier. Route efficiency discount — Docsy passes the savings to you." },
  { name: "Midday Miles™", tag: "$10 OFF TRAVEL", desc: "Mobile visits · 1–3 PM only", rule: "$10 off travel tier. Same concept as Early Route™. Midday window only." },
  { name: "HonorPass™", tag: "10% OFF", desc: "Military · First Responders · Teachers · Seniors", rule: "Valid ID or documentation required. Applies to base service fees. Stackable with time discounts. One discount per appointment." },
  { name: "Bundle 5+ Apostilles", tag: "$90/DOC", desc: "Flat rate per document · 5+ in single order", rule: "Same filing batch. All documents must be submitted at once. Contact Docsy for corporate apostille packages." },
  { name: "Docsy Safe+ Trial", tag: "FREE 90 DAYS", desc: "With every apostille or loan signing", rule: "No card required. No auto-charge. Activates on first apostille or loan signing order." },
];

export default function Promos() {
  React.useEffect(() => {
    document.title = "Promotions & Discounts | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            <HI>Real discounts.</HI><br />Not gimmicks.
          </h1>
          <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
            Every promotion has a real rule, listed plainly. No asterisks. If it's listed here, it applies exactly as written.
          </p>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-[#162040]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊙" text="CURRENT PROMOS" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>All active promotions.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#162040]">
            {promos.map((promo) => (
              <div key={promo.name} className="p-8" style={{ backgroundColor: BG }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-black text-white leading-tight">{promo.name}</h3>
                  <span className="ml-4 px-2 py-1 text-xs font-bold tracking-wider shrink-0" style={{ backgroundColor: BEIGE, color: "#000" }}>{promo.tag}</span>
                </div>
                <p className="text-sm font-semibold mb-4" style={{ color: BEIGE }}>{promo.desc}</p>
                <p className="text-sm text-white/40 leading-relaxed">{promo.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊟" text="STACKING RULES" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            One time discount at a time.<br />HonorPass™ stacks.
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Time-window discounts are mutually exclusive — apply one per appointment. HonorPass™ stacks with any time-window discount. All rules are plainly listed above and applied exactly as written.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>Book with a discount applied.</h2>
          <p className="text-lg text-black/60 mb-8">Mention the promotion at booking. It'll be in your written estimate.</p>
          <Link href="/" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>Book a Service</Link>
        </div>
      </section>

    </div>
  );
}
