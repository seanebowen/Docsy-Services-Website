import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

interface Promo {
  name: string;
  tag: string;
  window: string;
  rule: string;
}

const divisions: { label: string; service: string; promos: Promo[] }[] = [
  {
    label: "01",
    service: "Remote Online Notarization",
    promos: [
      {
        name: "Early Bird Seal™",
        tag: "$10 OFF",
        window: "8:00 AM – 10:00 AM · Any day",
        rule: "Book and confirm by 10 AM. Appointment must start between 8–10 AM. Valid on RON sessions including General Notary Work. Applies to the base RON service fee only — does not apply to additional document seals. Cannot combine with other time-window promos. Auto-applied — no code needed.",
      },
      {
        name: "Lunch Break Seal™",
        tag: "$10 OFF",
        window: "11:00 AM – 1:00 PM · Any day",
        rule: "Midday RON window. Valid on Remote Online Notarization including GNW. Book in advance or same-hour. Applies to the base RON service fee only — does not apply to additional document seals. Cannot combine with other time-window promos. Auto-applied — no code needed.",
      },
      {
        name: "Night Shift Seal™",
        tag: "$10 OFF",
        window: "9:00 PM – Midnight · Any day",
        rule: "Late-night RON window. Remote Online Notarization only. Applies to the base RON service fee only — does not apply to additional document seals. Cannot combine with other time-window promos. Auto-applied — no code needed.",
      },
    ],
  },
  {
    label: "02",
    service: "Mobile Notary",
    promos: [
      {
        name: "Midday Miles™",
        tag: "$10 OFF",
        window: "12:00 PM – 6:00 PM · Mon – Fri",
        rule: "Weekday midday mobile notary visits only. Applies to the base mobile notary service fee. Does not apply to travel fee, timing surcharges, or additional services. Auto-applied — no code needed.",
      },
    ],
  },
  {
    label: "03",
    service: "Loan Signing",
    promos: [
      {
        name: "Weekend Warrior™",
        tag: "20% OFF",
        window: "Sat & Sun · Any loan signing booked for the weekend",
        rule: "20% off the standard loan signing service fee for any appointment scheduled on Saturday or Sunday. No advance booking deadline — auto-applies whenever a weekend loan signing is quoted. Does not apply to travel fee or timing surcharges. Auto-applied — no code needed.",
      },
    ],
  },
  {
    label: "04",
    service: "Apostille Services",
    promos: [
      {
        name: "Bundle 5+ Apostilles",
        tag: "$90/DOC",
        window: "5 or more documents · Single filing batch",
        rule: "Flat rate of $90 per document when 5 or more apostilles are submitted in a single order. All documents must be submitted at once. Cannot be split across multiple orders. Contact Docsy for corporate apostille packages with higher volume. Auto-applied — no code needed.",
      },
    ],
  },
];

export default function Promos() {
  React.useEffect(() => {
    document.title = "Promotions | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <HI>Real discounts.</HI>
              <br />
              Not gimmicks.
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Every promotion has a plain rule, listed in full. No asterisks. No surprises. All active promos apply automatically at booking — nothing to remember or enter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Auto-apply notice ── */}
      <FadeIn delay={0} threshold={0.05}>
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: DIV }}>
          <div className="max-w-5xl mx-auto w-full flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest shrink-0" style={{ color: BLUE }}>⊙ Auto-Applied</span>
            <span className="text-xs text-white/35">All promotions below are applied automatically when eligibility is met. No codes. No reminders.</span>
            <span className="text-xs text-white/20 ml-auto shrink-0">Discounts apply to base service fees only. Add-ons, travel, surcharges, and optional services are not discounted.</span>
          </div>
        </div>
      </FadeIn>

      {/* ── Divisions ── */}
      {divisions.map((div, di) => (
        <section key={div.label} className="py-14 px-5 border-b" style={{ borderColor: DIV }}>
          <div className="max-w-5xl mx-auto">

            <FadeIn delay={0} threshold={0.05}>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>{div.label}</span>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{div.service}</p>
              </div>
            </FadeIn>

            <div className={`grid gap-px ${div.promos.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`} style={{ backgroundColor: DIV }}>
              {div.promos.map((promo, i) => (
                <FadeIn key={promo.name} delay={di * 40 + i * 60} threshold={0.04}>
                  <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-black text-white leading-tight">{promo.name}</h3>
                      <span
                        className="shrink-0 px-2 py-1 text-xs font-bold tracking-wider border"
                        style={{ borderColor: BLUE, color: BLUE }}
                      >{promo.tag}</span>
                    </div>
                    <p className="text-sm font-semibold mb-4" style={{ color: IVORY }}>{promo.window}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{promo.rule}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </section>
      ))}

      {/* ── HonorPass (separate — verification required) ── */}
      <section className="py-14 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} threshold={0.05}>
            <div className="flex items-center gap-4 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Standing Discount</p>
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.3)" }}
              >Verification Required</span>
            </div>
            <p className="text-[11px] text-white/20 mb-8 max-w-xl">
              HonorPass is not a promotion — it is a permanent discount for those who have served. It does not expire and is not time-limited. Verification is required once per client account.
            </p>
          </FadeIn>

          <FadeIn delay={60} threshold={0.05}>
            <div className="max-w-2xl border p-8" style={{ borderColor: DIV, backgroundColor: BG }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-black text-white leading-tight">HonorPass™</h3>
                <span
                  className="shrink-0 px-2 py-1 text-xs font-bold tracking-wider border"
                  style={{ borderColor: IVORY, color: IVORY }}
                >10% OFF</span>
              </div>
              <p className="text-sm font-semibold mb-4" style={{ color: IVORY }}>Military & Those Who Served · All services</p>
              <p className="text-sm text-white/40 leading-relaxed">
                For those who have served in the US military. Valid military ID or DD-214 required — verified once, applied permanently to your account. Applies to base service fees on any Docsy service. Cannot combine with time-window promos (Early Bird Seal, Lunch Break Seal, Night Shift Seal, Midday Miles) or any other discount on the same appointment. One discount per appointment.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Safe+ Trial ── */}
      <section className="py-14 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} threshold={0.05}>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Included With Every First Deliverable Service</p>
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.3)" }}
              >RON · Mobile · Loan Signing · Apostille</span>
            </div>
          </FadeIn>
          <FadeIn delay={60} threshold={0.05}>
            <div className="max-w-2xl border p-8" style={{ borderColor: DIV, backgroundColor: BG }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-black text-white leading-tight">Docsy Safe+ Trial</h3>
                <span
                  className="shrink-0 px-2 py-1 text-xs font-bold tracking-wider border"
                  style={{ borderColor: BLUE, color: BLUE }}
                >FREE 30 DAYS</span>
              </div>
              <p className="text-sm font-semibold mb-4" style={{ color: IVORY }}>Offered at booking — services with deliverables only</p>
              <p className="text-sm text-white/40 leading-relaxed">
                Encrypted file vault that stores every deliverable from every appointment automatically — notarized documents, apostilled files, and signed loan packages. Activated through the booking flow when your appointment includes a service that produces deliverables. No card. No signup. After 30 days, continue for $7/month or stop — no automatic charge.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stacking rules ── */}
      <section className="py-20 sm:py-24 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0} threshold={0.05}>
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Stacking Rules</p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              One time-window promo<br />per appointment.
            </h2>
            <p className="text-lg font-light text-white/50 leading-relaxed">
              Time-window promos (Early Bird Seal, Lunch Break Seal, Night Shift Seal, Midday Miles) are mutually exclusive — only one applies per appointment. Weekend Warrior is a separate category and does not interact with time-window promos. HonorPass does not stack with time-window promos or any other discount — it applies alone, one discount per appointment. Apostille Bundle pricing replaces per-document rates — it does not combine with other apostille discounts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Know your price before you book.
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 mb-8">
              Eligible promos are reflected in your estimate. No surprises at the door.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <Link href="/estimate" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
              Calculate Your Price
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
