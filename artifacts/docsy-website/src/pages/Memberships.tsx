import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Shield, Lock, Star, Zap, Building2, BadgeCheck } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Docsy Safe+ & Memberships | Docsy Notary Services";
  }, []);

  const membershipTiers = [
    {
      name: "Docsy+ Starter",
      price: "$15",
      period: "/month",
      icon: <Star className="h-6 w-6" />,
      features: [
        "1 free notarization/month (RON or mobile)",
        "10% off all additional services",
        "Priority booking queue",
        "30-day rollover on unused notarization",
        "20% off Docsy Safe+ storage",
      ],
    },
    {
      name: "Docsy+ Pro",
      price: "$30",
      period: "/month",
      icon: <Zap className="h-6 w-6" />,
      highlight: true,
      features: [
        "2 free notarizations/month",
        "15% off all services",
        "50% off travel fees",
        "Priority everything — all divisions",
        "Transcript deposit waived",
        "35% off Safe+",
      ],
    },
    {
      name: "Docsy Express Pass™",
      price: "$49",
      period: "/month",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Unlimited RON (fair use)",
        "Priority queue",
        "1 free mobile travel/month",
        "Best value for frequent signers",
      ],
    },
  ];

  const otherTiers = [
    {
      name: "BrokerLink™",
      price: "$35/month",
      desc: "For real estate agents and brokers. Preferred flat rates, fast-track scheduling, transaction coordinator integration.",
      icon: <Building2 className="h-5 w-5 text-primary" />,
    },
    {
      name: "HonorPass™",
      price: "10% off always",
      desc: "Military, first responders, teachers, and seniors. No monthly fee. Always applied.",
      icon: <BadgeCheck className="h-5 w-5 text-primary" />,
    },
    {
      name: "Enterprise / AuthorityLink™",
      price: "Custom pricing",
      desc: "For law firms, HR departments, and organizations with ongoing bulk notarization needs.",
      icon: <Building2 className="h-5 w-5 text-primary" />,
    },
  ];

  const safePlans = [
    { label: "Free Tier", price: "Free", detail: "Up to 5 documents" },
    { label: "Personal", price: "$7/mo", detail: "Up to 50 documents" },
    { label: "Family", price: "$18/mo", detail: "Up to 150 documents, 4 members" },
    { label: "Professional", price: "$29/mo", detail: "Up to 500 documents" },
    { label: "Business/Enterprise", price: "Custom", detail: "Contact us for pricing" },
  ];

  return (
    <div className="w-full pb-24">
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-8 w-8 text-primary-foreground/70" />
              <span className="text-primary-foreground/70 font-medium uppercase tracking-widest text-sm">Docsy Safe+</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your documents, stored securely. Accessible whenever you need them. For the rest of your life.
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Encrypted document storage built for notarized and legally signed documents. Every Docsy appointment uploads automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16" {...fadeIn}>
              <div>
                <h2 className="text-2xl font-bold mb-4">What is Docsy Safe+?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Docsy Safe+ is an encrypted, secure document vault built specifically for notarized, apostilled, and legally signed documents. Every document from every Docsy appointment is uploaded automatically. You can access it from any device, any time, forever.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  No more "where is that power of attorney we did two years ago." No more "I know I had a certified copy of that birth certificate somewhere." It's in your vault. It's always in your vault.
                </p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="font-bold text-lg">Free 90-day trial — automatically</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every first apostille or loan signing order comes with a free 90-day Docsy Safe+ trial. No signup required. No credit card. It activates automatically.
                </p>
                <p className="text-muted-foreground text-sm">
                  After 90 days, continue for $7/month — or don't. No automatic charge.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeIn}>
              <h3 className="text-xl font-bold mb-6">Safe+ Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {safePlans.map((plan) => (
                  <Card key={plan.label} className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-primary mb-1">{plan.price}</div>
                      <div className="text-sm font-medium mb-2">{plan.label}</div>
                      <div className="text-xs text-muted-foreground">{plan.detail}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Docsy more than once? There's a tier for that.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Membership plans built for clients who've realized this isn't going to be a one-time thing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className={`h-full flex flex-col ${tier.highlight ? "border-primary shadow-lg ring-1 ring-primary/20" : ""}`}>
                  {tier.highlight && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest text-center py-2 rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      {tier.icon}
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold text-primary">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl mx-auto" {...fadeIn}>
            <h2 className="text-2xl font-bold mb-8">Other membership programs</h2>
            <div className="space-y-4">
              {otherTiers.map((tier) => (
                <Card key={tier.name}>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="flex-shrink-0 mt-0.5">{tier.icon}</div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <span className="font-bold">{tier.name}</span>
                        <span className="text-primary font-medium text-sm">{tier.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{tier.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
