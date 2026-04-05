import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";
const BLUE = "#4D9FDB";
const DIV = "#1e2a3a";

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

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Memberships & Storage | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Memberships.<br />
              <HI>Storage.</HI><br />
              Two different things.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Docsy+ is a membership — you get perks, discounts, and priority booking. Docsy Safe+ is a storage subscription — your documents, secured and accessible forever. One is a plan. The other is a vault.
            </p>
          </FadeIn>
          <FadeIn delay={260}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#memberships" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                View Memberships
              </Link>
              <Link href="#storage" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black">
                View Storage Plans
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Membership explainer ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn delay={0}>
            <Label icon="⊟" text="MEMBERSHIP" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              Use Docsy regularly?<br />There's a tier for that.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Docsy+ memberships give you real perks — free notarizations every month, priority scheduling, and discounts across every service. The more you use Docsy, the more you save. Docsy Express Pass™ is built for anyone who runs RON sessions frequently.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Membership Plans ── */}
      <section id="memberships" className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="⊟" text="DOCSY+ MEMBERSHIPS" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Docsy+ Membership Tiers</h2>
              <p className="text-base text-white/40 mt-3">Perks included. Cancel any time.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-4xl mx-auto" style={{ backgroundColor: DIV }}>
            {[
              {
                name: "Docsy+ Starter",
                price: "$15/mo",
                features: [
                  "1 free notarization/month (RON or mobile)",
                  "10% off all additional services",
                  "Priority booking queue",
                  "30-day rollover on unused notarization",
                  "20% off Docsy Safe+ subscription",
                ],
              },
              {
                name: "Docsy+ Pro",
                price: "$30/mo",
                features: [
                  "2 free notarizations/month",
                  "15% off all services",
                  "50% off travel fees",
                  "Priority everything — all divisions",
                  "Transcript deposit waived",
                  "35% off Safe+ subscription",
                ],
              },
              {
                name: "Docsy Express Pass™",
                price: "$49/mo",
                features: [
                  "Unlimited RON (fair use)",
                  "Priority scheduling queue",
                  "1 free mobile travel/month",
                  "Best value for frequent RON signers",
                ],
              },
            ].map((tier) => (
              <FadeIn key={tier.name} delay={80} threshold={0.05}>
                <div className="h-full" style={{ backgroundColor: BG }}>
                  <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                    <p className="text-base font-black text-white mb-1">{tier.name}</p>
                    <p className="text-2xl font-black" style={{ color: IVORY }}>{tier.price}</p>
                  </div>
                  <ul className="px-8 py-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="text-sm text-white/50 flex items-start gap-2">
                        <span className="text-white/20 mt-0.5">—</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* HonorPass */}
          <FadeIn delay={0} threshold={0.05}>
            <div className="mt-px" style={{ backgroundColor: DIV }}>
              <div className="px-8 py-6" style={{ backgroundColor: BG }}>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-base font-black text-white">HonorPass™</p>
                  <p className="text-sm font-bold" style={{ color: IVORY }}>10% off — always</p>
                </div>
                <p className="text-sm text-white/40">For those who have served in the US military. No monthly fee. Valid ID or DD-214 required. Applies to base service fees.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Storage explainer ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn delay={0}>
            <Label icon="◎" text="STORAGE SUBSCRIPTION" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              No more lost documents.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Docsy Safe+ is an encrypted file vault that stores every deliverable from every Docsy appointment — notarized documents, apostille packages, loan signing files, court reporting transcripts, and audio recordings. Everything uploads automatically. Access it from any device, any time. This is a storage subscription — not a membership. No perks attached, just your files, always there.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Storage Plans ── */}
      <section id="storage" className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="◎" text="DOCSY SAFE+" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Safe+ Storage Plans</h2>
              <p className="text-base text-white/40 mt-3">Subscription. Storage only. No perks.</p>
            </div>
          </FadeIn>
          <FadeIn delay={80} threshold={0.05}>
            <div className="border max-w-xl mx-auto divide-y" style={{ borderColor: DIV, "--tw-divide-opacity": 1 } as React.CSSProperties}>
              {[
                { l: "Free Tier", p: "Free", note: "Up to 5 files" },
                { l: "Personal", p: "$7/mo", note: "Up to 50 files" },
                { l: "Family", p: "$18/mo", note: "Up to 150 files · 4 members" },
                { l: "Professional", p: "$29/mo", note: "Up to 500 files" },
                { l: "Business / Enterprise", p: "Custom", note: "Contact us" },
              ].map((row) => (
                <div key={row.l} className="flex justify-between items-center px-6 py-5" style={{ borderColor: DIV }}>
                  <div>
                    <p className="text-sm font-semibold text-white">{row.l}</p>
                    <p className="text-xs text-white/30">{row.note}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{row.p}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0} threshold={0.05}>
            <div className="mt-10 max-w-xl mx-auto border px-6 py-5" style={{ borderColor: DIV }}>
              <p className="text-sm font-bold text-white mb-1">Free 30-day trial — auto-starts with your first service</p>
              <p className="text-sm text-white/40">No signup. No credit card. Docsy Safe+ activates automatically when your first service completes — unless you opt out. 30 days free, then $7/month if you choose to continue.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV, backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Start with a free<br />30-day Safe+ trial.
            </h2>
            <p className="text-lg text-black/60 mb-8">No signup ever needed. Auto-starts with your first service with Docsy — unless you opt out.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimate" className="px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                Get an Estimate
              </Link>
              <Link href="/promos" className="px-10 py-4 text-base font-bold text-black border-2 border-black text-center">
                View Promotions
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
