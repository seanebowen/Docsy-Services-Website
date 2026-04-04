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

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "#22c55e", color: "#000", padding: "0 5px" }}>{children}</span>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "#ef4444", color: "#fff", padding: "0 5px" }}>{children}</span>
);

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Docsy Safe+ & Memberships | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            Your documents,
            <br />
            <HI>stored securely.</HI>
            <br />
            For the rest of your life.
          </h1>
          <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
            Encrypted document storage built for notarized and legally signed documents. Every Docsy appointment uploads automatically. Free 90-day trial with your first apostille or loan signing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/login" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
              Start Free Trial
            </Link>
            <button className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black">
              View All Plans
            </button>
          </div>
        </div>
      </section>

      {[
        {
          icon: "◎", label: "DOCSY SAFE+",
          heading: "No more lost documents.",
          body: "Docsy Safe+ is an encrypted, secure document vault built specifically for notarized, apostilled, and legally signed documents. Every document from every Docsy appointment is uploaded automatically. You can access it from any device, any time, forever.\n\nNo more 'where is that power of attorney we did two years ago.' No more 'I know I had a certified copy of that birth certificate somewhere.' It's in your vault. It's always in your vault.",
        },
        {
          icon: "⊙", label: "FREE TRIAL",
          heading: "90 days free.\nNo card needed.",
          body: "Every first apostille or loan signing order comes with a free 90-day Docsy Safe+ trial. No signup required. No credit card. It activates automatically when your order is complete. After 90 days, continue for $7/month — or don't. No automatic charge.",
        },
        {
          icon: "⊛", label: "REMOVE THE METER",
          heading: "Use Docsy more than once?\nThere's a tier for that.",
          body: "Docsy+ memberships start at $15/month. Free notarizations, priority scheduling, and discounts across every service division. The Docsy Express Pass™ gives you unlimited RON for $49/month. BrokerLink™ is built for real estate agents who need preferred rates without negotiating every assignment.",
        },
      ].map((feat, i) => (
        <section key={i} className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
          <div className="max-w-2xl mx-auto">
            <Label icon={feat.icon} text={feat.label} />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
              {feat.heading}
            </h2>
            <p className="text-lg text-white/50 leading-relaxed whitespace-pre-line">{feat.body}</p>
          </div>
        </section>
      ))}

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊞" text="PLANS" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Safe+ Storage Plans</h2>
          </div>
          <div className="border border-[#162040] divide-y divide-[#162040] max-w-xl mx-auto mb-16">
            {[
              { l: "Free Tier", p: "Free", note: "Up to 5 documents" },
              { l: "Personal", p: "$7/mo", note: "Up to 50 documents" },
              { l: "Family", p: "$18/mo", note: "Up to 150 docs · 4 members" },
              { l: "Professional", p: "$29/mo", note: "Up to 500 documents" },
              { l: "Business / Enterprise", p: "Custom", note: "Contact us" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-5">
                <div>
                  <p className="text-sm font-semibold text-white">{row.l}</p>
                  <p className="text-xs text-white/30">{row.note}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: BEIGE }}>{row.p}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-14">
            <Label icon="⊟" text="MEMBERSHIP PLANS" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>Docsy+ Tiers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#162040] max-w-4xl mx-auto">
            {[
              { name: "Docsy+ Starter", price: "$15/mo", features: ["1 free notarization/month (RON or mobile)", "10% off all additional services", "Priority booking queue", "30-day rollover on unused notarization", "20% off Docsy Safe+"] },
              { name: "Docsy+ Pro", price: "$30/mo", features: ["2 free notarizations/month", "15% off all services", "50% off travel fees", "Priority everything — all divisions", "Transcript deposit waived", "35% off Safe+"] },
              { name: "Docsy Express Pass™", price: "$49/mo", features: ["Unlimited RON (fair use)", "Priority queue", "1 free mobile travel/month", "Best value for frequent signers"] },
            ].map((tier) => (
              <div key={tier.name} style={{ backgroundColor: BG }}>
                <div className="px-8 py-6 border-b border-[#162040]">
                  <p className="text-base font-black text-white mb-1">{tier.name}</p>
                  <p className="text-2xl font-black" style={{ color: BEIGE }}>{tier.price}</p>
                </div>
                <ul className="px-8 py-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-white/50 flex items-start gap-2">
                      <span className="text-white/20 mt-0.5">—</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-px bg-[#162040]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              {[
                { name: "BrokerLink™", price: "$35/month", desc: "For real estate agents and brokers. Preferred flat rates, fast-track scheduling." },
                { name: "HonorPass™", price: "10% off always", desc: "Military, first responders, teachers, seniors. No monthly fee." },
              ].map((tier) => (
                <div key={tier.name} className="px-8 py-6" style={{ backgroundColor: BG }}>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-base font-black text-white">{tier.name}</p>
                    <p className="text-sm font-bold" style={{ color: BEIGE }}>{tier.price}</p>
                  </div>
                  <p className="text-sm text-white/40">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Start with a free 90-day Safe+ trial today.
          </h2>
          <p className="text-lg text-black/60 mb-8">No credit card. No signup. Activates on your first apostille or loan signing.</p>
          <button className="px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
            See All Plans
          </button>
        </div>
      </section>

    </div>
  );
}
