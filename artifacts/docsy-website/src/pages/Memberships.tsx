import React from "react";
import { ArrowRight, CheckCircle2, Shield, Lock, Star, Zap, Building2, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Docsy Safe+ & Memberships | Docsy Notary Services";
  }, []);

  const membershipTiers = [
    { name: "Docsy+ Starter", price: "$15", period: "/month", icon: Star, features: ["1 free notarization/month (RON or mobile)", "10% off all additional services", "Priority booking queue", "30-day rollover on unused notarization", "20% off Docsy Safe+ storage"] },
    { name: "Docsy+ Pro", price: "$30", period: "/month", icon: Zap, highlight: true, features: ["2 free notarizations/month", "15% off all services", "50% off travel fees", "Priority everything — all divisions", "Transcript deposit waived", "35% off Safe+"] },
    { name: "Docsy Express Pass™", price: "$49", period: "/month", icon: Zap, features: ["Unlimited RON (fair use)", "Priority queue", "1 free mobile travel/month", "Best value for frequent signers"] },
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
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6 flex items-center justify-center gap-2" style={{ color: SIGNAL }}>
                <Lock className="h-4 w-4" /> Docsy Safe+ · Memberships
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Your documents, stored securely.{" "}<span style={{ color: CAROLINA }}>For the rest of your life.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Encrypted document storage built for notarized and legally signed documents. Every Docsy appointment uploads automatically.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>What is Docsy Safe+?</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Reveal>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                  Docsy Safe+ is an encrypted, secure document vault built specifically for notarized, apostilled, and legally signed documents. Every document from every Docsy appointment is uploaded automatically. You can access it from any device, any time, forever.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>
                  No more "where is that power of attorney we did two years ago." No more "I know I had a certified copy of that birth certificate somewhere." It's in your vault. It's always in your vault.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6" style={{ color: CAROLINA }} />
                  <h3 className="text-lg font-bold" style={{ color: CLOUD }}>Free 90-day trial — automatically</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLOUD}b3` }}>
                  Every first apostille or loan signing order comes with a free 90-day Docsy Safe+ trial. No signup required. No credit card. It activates automatically.
                </p>
                <p className="text-sm" style={{ color: `${CLOUD}66` }}>After 90 days, continue for $7/month — or don't. No automatic charge.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <h3 className="text-lg font-bold mb-5 text-center" style={{ color: CLOUD }}>Safe+ Plans</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {safePlans.map((plan) => (
                <div key={plan.label} className="rounded-xl p-6 text-center" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
                  <div className="text-xl font-bold" style={{ color: CAROLINA }}>{plan.price}</div>
                  <div className="text-xs font-semibold mt-1 mb-1" style={{ color: `${CLOUD}cc` }}>{plan.label}</div>
                  <div className="text-xs" style={{ color: `${CLOUD}4d` }}>{plan.detail}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                Use Docsy more than once?{" "}<span style={{ color: CAROLINA }}>There's a tier for that.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Membership plans built for clients who've realized this isn't going to be a one-time thing.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {membershipTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl p-8 relative"
                  style={{
                    backgroundColor: tier.highlight ? "#000F0A" : TERMINAL,
                    border: `1px solid ${tier.highlight ? CAROLINA : EMERALD}`,
                  }}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ backgroundColor: CAROLINA }} />
                  )}
                  <tier.icon className="h-5 w-5 mb-4" style={{ color: CAROLINA }} />
                  <div className="text-xl font-bold mb-1" style={{ color: CLOUD }}>{tier.name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold" style={{ color: CAROLINA }}>{tier.price}</span>
                    <span className="text-sm" style={{ color: `${CLOUD}66` }}>{tier.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: `${CLOUD}b3` }}>
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: CAROLINA }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="text-lg font-bold mb-6 text-center" style={{ color: CLOUD }}>Other membership programs</h3>
            <div className="space-y-4 max-w-4xl mx-auto">
              {otherTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-start gap-4 p-6 rounded-xl"
                  style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}
                >
                  <tier.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: CAROLINA }} />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className="text-lg font-bold" style={{ color: CLOUD }}>{tier.name}</span>
                      <span className="text-sm font-semibold" style={{ color: CAROLINA }}>{tier.price}</span>
                    </div>
                    <p className="text-sm" style={{ color: `${CLOUD}66` }}>{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Start with a free 90-day Safe+ trial today.</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>No credit card. No signup. Activates on your first apostille or loan signing.</p>
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}>
              See Membership Options <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
