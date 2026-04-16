import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { Lock, Upload, Clock, ShieldCheck, Archive } from "lucide-react";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const IVORY = "#F5EFE6";

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const TIERS = [
  {
    name: "30-Day Trial",
    price: "Free",
    sub: "Included with every first service",
    highlight: true,
    features: [
      "Auto-upload after every appointment",
      "All service types supported",
      "Secure encrypted storage",
      "Download anytime",
      "No credit card required",
    ],
  },
  {
    name: "Personal",
    price: "$5",
    sub: "per month",
    highlight: false,
    features: [
      "Everything in the trial",
      "Unlimited document storage",
      "Single account holder",
      "Email delivery receipts",
      "Cancel anytime",
    ],
  },
  {
    name: "Family",
    price: "$15",
    sub: "per month",
    highlight: false,
    features: [
      "Everything in Personal",
      "Up to 5 account members",
      "Shared document access",
      "Named beneficiary access",
      "Priority vault support",
    ],
  },
  {
    name: "Professional",
    price: "$25",
    sub: "per month",
    highlight: false,
    features: [
      "Everything in Family",
      "Business entity documents",
      "NET-14 invoice portal",
      "Dedicated account contact",
      "API access (coming soon)",
    ],
  },
];

const FEATURES = [
  {
    icon: Lock,
    title: "End-to-end encrypted",
    body: "Every file stored in your vault is encrypted at rest and in transit. Docsy staff cannot read your documents — only you and people you authorize can access them.",
  },
  {
    icon: Upload,
    title: "Auto-uploads after every appointment",
    body: "You don't do anything. After every completed service — RON, mobile notary, loan signing, apostille, or court reporting — your deliverables upload to your vault automatically.",
  },
  {
    icon: Clock,
    title: "Starts the day of your first service",
    body: "Your 30-day free trial begins on the date of your first Docsy service. No signup, no card, no action required. It just starts.",
  },
  {
    icon: ShieldCheck,
    title: "Your documents, forever accessible",
    body: "Need your apostille certificate six months later? Your signed loan package? Your deposition transcript? Log in and download it — no calls, no waiting.",
  },
];

export default function VaultInfo() {
  React.useEffect(() => {
    document.title = "Docsy Safe+ Vault | Docsy Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="flex justify-start mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.40)" }}>
                <Archive className="h-3 w-3" /> Docsy Safe+
              </span>
            </div>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Your documents,<br />
              <H>always there.</H>
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium mb-10">
              Docsy Safe+ is an encrypted file vault that automatically receives every deliverable from every Docsy appointment — notarized documents, apostille certificates, loan packages, transcripts, and recordings.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="px-8 py-4 text-base font-bold text-white text-center"
                style={{ backgroundColor: "#000" }}
              >
                Sign In to Your Vault →
              </Link>
              <Link
                href="/calculate"
                className="px-8 py-4 text-base font-bold text-center border"
                style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.60)" }}
              >
                Book a Service — Vault Included Free
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>⊙ How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
                Nothing to set up.<br />
                <span className="font-light text-white/40">Nothing to forget.</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {FEATURES.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 60} threshold={0.04}>
                <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                  <feat.icon className="h-5 w-5 mb-5" style={{ color: BLUE }} />
                  <h3 className="text-base font-black text-white mb-3 leading-snug">{feat.title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{feat.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>⊞ Storage Plans</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
                Start free. Stay as long as you need.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: DIV }}>
            {TIERS.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 60} threshold={0.04}>
                <div
                  className="p-8 h-full flex flex-col"
                  style={{
                    backgroundColor: tier.highlight ? `${BLUE}18` : BG,
                    outline: tier.highlight ? `1px solid ${BLUE}44` : "none",
                  }}
                >
                  {tier.highlight && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: BLUE }}>
                      ★ Included with every service
                    </span>
                  )}
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {tier.name}
                  </p>
                  <div className="mb-1">
                    <span className="text-4xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>{tier.price}</span>
                  </div>
                  <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.30)" }}>{tier.sub}</p>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                        <span className="mt-0.5 shrink-0 text-xs" style={{ color: BLUE }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.highlight ? (
                    <Link
                      href="/calculate"
                      className="block text-center py-3 text-xs font-bold text-white"
                      style={{ backgroundColor: BLUE }}
                    >
                      Book a Service →
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="block text-center py-3 text-xs font-bold border transition-colors"
                      style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}
                    >
                      Sign In to Upgrade →
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0} threshold={0.05}>
            <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.25)" }}>
              All plans billed monthly. Cancel anytime — your documents are always downloadable before cancellation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── What gets stored ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BLUE }}>⊟ What Gets Stored</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8" style={{ letterSpacing: "-0.02em" }}>
              Every deliverable from every appointment.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px max-w-xl mx-auto" style={{ backgroundColor: DIV }}>
            {[
              { svc: "RON", items: "Notarized document, digital certified copy, session recording" },
              { svc: "Mobile Notary", items: "Notarized document, executed copy" },
              { svc: "Loan Signing", items: "Signed loan package, scanback confirmation" },
              { svc: "Apostille", items: "Apostille certificate, document scan" },
              { svc: "Electronic Reporting", items: "Certified transcript, word index, e-transcript ASCII" },
            ].map((row) => (
              <FadeIn key={row.svc} delay={0} threshold={0.04}>
                <div className="p-6 text-left" style={{ backgroundColor: BG }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>{row.svc}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{row.items}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Already have a vault?
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 mb-10">
              Sign in to access your encrypted documents, recordings, and transcripts.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-block px-10 py-4 text-base font-bold text-white"
                style={{ backgroundColor: "#000" }}
              >
                Sign In to Your Vault →
              </Link>
              <Link
                href="/calculate"
                className="inline-block px-10 py-4 text-base font-bold text-black border border-black"
              >
                Book a Service — Vault Included Free
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
