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

const TIERS = [
  {
    label: "Tier 1 — Spanish",
    langs: null,
    prices: { 15: 32, 30: 62, 60: 125 },
  },
  {
    label: "Tier 2 — Common Languages",
    langs: "French, Portuguese, Vietnamese, Tagalog, Korean, German, Italian, Russian",
    prices: { 15: 45, 30: 88, 60: 175 },
  },
  {
    label: "Tier 3 — Premium Languages",
    langs: "Mandarin, Cantonese, Arabic, Japanese, Hindi, and all others",
    prices: { 15: 68, 30: 135, 60: 275 },
  },
];

const TC_SECTIONS = [
  {
    title: "Availability",
    body: "Interpreter services are facilitated through Language Line Solutions, a third-party provider. Docsy will make every reasonable effort to connect clients with the requested language. In rare cases, availability cannot be guaranteed for highly specialized or low-demand languages.",
  },
  {
    title: "No Refunds for Unused Block Time",
    body: "Interpreter services are sold in fixed increments of 15, 30, or 60 minutes. Once a block is purchased, the full block rate applies regardless of actual usage. If your session concludes before the purchased block expires, no refund or credit is issued for the remaining time.",
  },
  {
    title: "Cancellations",
    body: "Cancelled before service begins: full interpreter fee refunded. No-show or same-day cancellation after interpreter has been connected: interpreter fee forfeited. Base service cancellation policy applies separately.",
  },
  {
    title: "Scope of Service",
    body: "Language Line interpreters are provided solely to facilitate communication during the notarial, signing, or reporting session. Docsy is not responsible for the accuracy, completeness, or legal sufficiency of any interpretation provided by a third-party interpreter.",
  },
  {
    title: "Client Responsibility",
    body: "It is the client's responsibility to accurately identify the language needed. If an incorrect language is requested and the session cannot proceed as a result, the interpreter fee is non-refundable.",
  },
];

export default function LanguageLine() {
  React.useEffect(() => {
    document.title = "Language Line Interpreter Services | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              Need an interpreter?
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xl sm:text-2xl text-black/55 max-w-2xl font-medium leading-snug mb-10">
              We've got you covered. Docsy provides real-time interpreter support via Language Line Solutions — available on demand across all service divisions. Spanish, Mandarin, Arabic, Vietnamese, and hundreds more.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <Link
              href="/estimate"
              className="px-8 py-4 text-base font-bold text-white text-center inline-block"
              style={{ backgroundColor: BLUE }}
            >
              Add to your booking →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="HOW IT WORKS" />
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Interpreter services are available across all six service divisions, on demand, at time of service. No advance notice required. Just let us know the language needed and we'll connect you.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Interpreter fees are collected at booking alongside your service fee. Minimum 15 minutes. Available in 15, 30, and 60-minute blocks.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Rate Schedule ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
                ⊙ RATE SCHEDULE
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e2a3a]">
              {TIERS.map((tier, i) => (
                <div key={i} className="flex flex-col" style={{ backgroundColor: BG }}>
                  <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                    <p className="text-base font-black text-white mb-1">{tier.label}</p>
                    {tier.langs && (
                      <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{tier.langs}</p>
                    )}
                  </div>
                  <div className="divide-y flex-1" style={{ borderColor: DIV }}>
                    {([15, 30, 60] as const).map(min => (
                      <div key={min} className="flex justify-between items-center px-8 py-4" style={{ borderColor: DIV }}>
                        <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>{min} minutes</span>
                        <span className="text-sm font-bold" style={{ color: IVORY }}>${tier.prices[min]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="text-center text-sm font-light mt-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              Minimum booking: 15 minutes. Partial blocks are not available. Overage: If your session exceeds the purchased block, additional time is billed in 15-minute increments at the applicable tier rate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Booking Policy ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="BOOKING POLICY" />
          </FadeIn>
          <FadeIn delay={80}>
            <ul className="text-left space-y-4">
              {[
                "Interpreter services are available on demand — no advance notice required.",
                "Language must be specified at the time of service.",
                "Interpreter fees are collected upfront along with the base service fee.",
                "If Language Line is unable to fulfill the requested language, the interpreter fee will be refunded in full. The base service fee remains non-refundable if the appointment proceeds without interpretation.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BLUE }} />
                  <span className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── Terms & Conditions ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Label icon="⊙" text="TERMS & CONDITIONS" />
          </FadeIn>
          <div className="text-left space-y-8">
            {TC_SECTIONS.map((section, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div>
                  <p className="text-sm font-black text-white mb-2 uppercase tracking-wider">{section.title}</p>
                  <p className="text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{section.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-8" style={{ letterSpacing: "-0.02em" }}>
              Ready to book with an interpreter?
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/estimate"
                className="px-8 py-4 text-base font-bold text-white text-center"
                style={{ backgroundColor: "#000" }}
              >
                Book a service →
              </Link>
              <Link
                href="/"
                className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black"
              >
                View services →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
