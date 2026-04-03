import React from "react";
import { ArrowRight, CheckCircle2, Shield, Lock, Star, Zap, Building2, BadgeCheck } from "lucide-react";

const BLUE = "#4A6FA8";
const DARK = "#141414";
const CREAM = "#f2f0e3";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-1 whitespace-nowrap">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
};

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Docsy Safe+ & Memberships | Docsy Notary Services";
  }, []);

  const membershipTiers = [
    {
      name: "Docsy+ Starter", price: "$15", period: "/month", icon: Star,
      features: ["1 free notarization/month (RON or mobile)", "10% off all additional services", "Priority booking queue", "30-day rollover on unused notarization", "20% off Docsy Safe+ storage"],
    },
    {
      name: "Docsy+ Pro", price: "$30", period: "/month", icon: Zap, highlight: true,
      features: ["2 free notarizations/month", "15% off all services", "50% off travel fees", "Priority everything — all divisions", "Transcript deposit waived", "35% off Safe+"],
    },
    {
      name: "Docsy Express Pass™", price: "$49", period: "/month", icon: Zap,
      features: ["Unlimited RON (fair use)", "Priority queue", "1 free mobile travel/month", "Best value for frequent signers"],
    },
  ];

  const otherTiers = [
    { name: "BrokerLink™", price: "$35/month", desc: "For real estate agents and brokers. Preferred flat rates, fast-track scheduling, transaction coordinator integration.", icon: Building2 },
    { name: "HonorPass™", price: "10% off always", desc: "Military, first responders, teachers, and seniors. No monthly fee. Always applied.", icon: BadgeCheck },
    { name: "Enterprise / AuthorityLink™", price: "Custom pricing", desc: "For law firms, HR departments, and organizations with ongoing bulk notarization needs.", icon: Building2 },
  ];

  const safePlans = [
    { label: "Free Tier", price: "Free", detail: "Up to 5 documents" },
    { label: "Personal", price: "$7/mo", detail: "Up to 50 documents" },
    { label: "Family", price: "$18/mo", detail: "Up to 150 docs, 4 members" },
    { label: "Professional", price: "$29/mo", detail: "Up to 500 documents" },
    { label: "Business / Enterprise", price: "Custom", detail: "Contact us for pricing" },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6 flex items-center gap-2">
          <Lock className="h-4 w-4" /> Docsy Safe+ · Memberships
        </p>
        <h1 style={{ ...hdStyle, fontSize: "clamp(2.5rem, 5vw, 5rem)" }} className="text-white mb-8 max-w-4xl">
          Your documents, stored securely.<br />
          Accessible whenever you need them.<br />
          For the rest of your life.
        </h1>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl">
          Encrypted document storage built for notarized and legally signed documents. <HL>Every Docsy appointment uploads automatically.</HL>
        </p>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Docsy Safe+</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">01</span>
      </div>

      {/* ── SECTION 1: Safe+ ─────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col md:flex-row">
        <div className="hidden md:flex items-start justify-center w-28 py-16 shrink-0" style={{ backgroundColor: DARK }}>
          <span style={{ ...hdStyle, fontSize: "3rem" }} className="text-white">1:</span>
        </div>
        <div className="flex-1 px-8 sm:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mb-12">
            <div>
              <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="mb-4">
                What is Docsy Safe+?
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                Docsy Safe+ is an <HL>encrypted, secure document vault</HL> built specifically for notarized, apostilled, and legally signed documents. Every document from every Docsy appointment is uploaded automatically. You can access it from any device, any time, forever.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                <HL>No more "where is that power of attorney we did two years ago."</HL> No more "I know I had a certified copy of that birth certificate somewhere." It's in your vault. It's always in your vault.
              </p>
            </div>
            <div className="border border-neutral-300 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6" style={{ color: BLUE }} />
                <h3 style={{ ...hdStyle, fontSize: "1.4rem" }}>Free 90-day trial — automatically</h3>
              </div>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                Every first apostille or loan signing order comes with a free 90-day Docsy Safe+ trial. <HL>No signup required. No credit card.</HL> It activates automatically.
              </p>
              <p className="text-sm text-neutral-500">After 90 days, continue for $7/month — or don't. No automatic charge.</p>
            </div>
          </div>

          <h3 style={{ ...hdStyle, fontSize: "1.4rem" }} className="mb-5">Safe+ Plans</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border border-neutral-300 max-w-3xl">
            {safePlans.map((plan, i) => (
              <div key={plan.label} className={`p-6 text-center ${i < 4 ? "border-r border-neutral-300" : ""}`}>
                <div style={{ ...hdStyle, fontSize: "1.5rem", color: BLUE }}>{plan.price}</div>
                <div className="text-xs font-semibold text-neutral-700 mt-1 mb-1">{plan.label}</div>
                <div className="text-xs text-neutral-400">{plan.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER 2 ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Membership Plans</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">02</span>
      </div>

      {/* ── SECTION 2: Memberships ───────────────────── */}
      <section style={{ backgroundColor: "#f8f7f0" }} className="flex flex-col md:flex-row">
        <div className="hidden md:flex items-start justify-center w-28 py-16 shrink-0" style={{ backgroundColor: BLUE }}>
          <span style={{ ...hdStyle, fontSize: "3rem" }} className="text-white">2:</span>
        </div>
        <div className="flex-1 px-8 sm:px-16 py-16">
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} className="mb-4">
            Use Docsy more than once? There's a tier for that.
          </h2>
          <p className="text-base text-neutral-600 mb-10 max-w-2xl">
            <HL>Membership plans built for clients who've realized this isn't going to be a one-time thing.</HL>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-300 max-w-4xl mb-12">
            {membershipTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`p-8 ${i < 2 ? "border-b md:border-b-0 md:border-r border-neutral-300" : ""} ${tier.highlight ? "bg-white relative" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: BLUE }} />
                )}
                <tier.icon className="h-5 w-5 mb-4" style={{ color: BLUE }} />
                <div style={{ ...hdStyle, fontSize: "1.5rem" }} className="mb-1">{tier.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span style={{ ...hdStyle, fontSize: "2.5rem", color: BLUE }}>{tier.price}</span>
                  <span className="text-neutral-500 text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: BLUE }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 style={{ ...hdStyle, fontSize: "1.5rem" }} className="mb-6">Other membership programs</h3>
          <div className="space-y-0 border border-neutral-300 max-w-4xl">
            {otherTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`flex items-start gap-4 p-6 ${i < 2 ? "border-b border-neutral-300" : ""}`}
              >
                <tier.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <span style={{ ...hdStyle, fontSize: "1.1rem" }}>{tier.name}</span>
                    <span className="text-sm font-semibold" style={{ color: BLUE }}>{tier.price}</span>
                  </div>
                  <p className="text-sm text-neutral-500">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
            Start with a free 90-day Safe+ trial today.
          </h2>
          <p className="text-white/50 text-sm">No credit card. No signup. Activates on your first apostille or loan signing.</p>
        </div>
        <button
          className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: BLUE }}
        >
          See Membership Options <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
