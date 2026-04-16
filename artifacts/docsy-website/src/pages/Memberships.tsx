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

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const TIERS = [
  {
    name: "Docsy+ Starter",
    price: "$15/mo",
    planKey: "starter",
    features: [
      "Auto-applied 5% discount on every booking",
      "Fee-free priority bookings",
      "50% off 1 notarization/month (RON or mobile)",
      "10% off mobile fees",
      "30-day rollover on unused notarization credit",
    ],
  },
  {
    name: "Docsy+ Pro",
    price: "$30/mo",
    planKey: "pro",
    features: [
      "Auto-applied 10% discount on every booking",
      "Fee-free priority bookings",
      "1 free notarization/month (RON or mobile)",
      "15% off mobile fees",
      "30-day rollover on unused notarization",
      "Birthday notarization — 1 bonus free notarization in your birth month",
    ],
  },
  {
    name: "Docsy+ Elite",
    price: "$49/mo",
    planKey: "elite",
    features: [
      "Auto-applied 15% discount on every booking",
      "Fee-free priority bookings",
      "2 free notarizations/month (RON or mobile)",
      "20% off mobile fees",
      "30-day rollover on unused notarizations",
      "Birthday notarization — 1 bonus free notarization in your birth month",
      "1 free mobile travel waiver/month",
    ],
  },
];

const TC_SECTIONS = [
  {
    heading: "Billing & Payment",
    body: `Memberships are billed on a monthly or annual basis depending on the plan selected at enrollment. Annual plans receive a 15% discount applied to the total annual rate at checkout and are billed in full at the start of the billing cycle.

Annual plans are refundable if cancellation is requested more than 30 days prior to the contract end date. Refunds are prorated based on remaining unused full months at the time of the cancellation request. Cancellations made within 30 days of the contract end date are non-refundable.

Monthly plans auto-renew on the same date each month unless cancelled prior to the renewal date. Monthly fees are non-refundable once a billing cycle has begun.

Docsy Services reserves the right to update membership pricing with 30 days written notice. Price changes take effect at the next renewal cycle. Continued membership after notice constitutes acceptance of the new rate.`,
  },
  {
    heading: "Cancellation",
    body: `Members may cancel at any time via written notice to Docsy Services. Upon cancellation, access to membership perks — priority booking, member discounts, free/discounted notarizations, and travel-fee waivers — remains active through the end of the current billing cycle. Safe+ access is unaffected by cancellation; it remains free for every Docsy client. No extensions, credits, or prorations are issued beyond what is outlined in the annual refund policy above.

Docsy Services reserves the right to cancel any membership immediately and without refund in cases of abuse, fraud, misuse of perks, or violation of these terms.`,
  },
  {
    heading: "Notarization Credits",
    body: `Monthly notarization credits are issued at the start of each billing cycle as follows:`,
    table: [
      ["Tier", "Monthly Credit"],
      ["Starter", "50% off 1 notarization"],
      ["Pro", "1 free notarization"],
      ["Elite", "2 free notarizations"],
    ],
    bodyAfterTable: `Credits apply to RON or mobile notarization base fees only. They do not apply to loan signings, apostille services, court reporting, interpreter services, travel fees, after-hours fees, or any other add-on charges.

Credits are valid for 30 days from issuance and roll over one time only. Rolled-over credits expire at the end of the following cycle with no further extension. Unused credits at expiration are forfeited with no compensation. Credits have no cash value and cannot be redeemed for refunds or account credits.

Starter members: the 50% discount applies to the base notarization fee only. All other applicable fees are billed at standard rates.

All RON or mobile sessions beyond the monthly credit allotment are billed at standard rates regardless of tier.`,
  },
  {
    heading: "Mobile Fee Discounts",
    body: `Mobile fee discounts apply to the mobile travel fee only — not to the base notarization fee or any other service charge. Discounts are applied at time of invoicing and are not retroactive. Discounts may not be combined with any other promotion, coupon, or offer unless explicitly stated by Docsy Services.`,
  },
  {
    heading: "Mobile Travel Waiver — Elite Only",
    body: `Elite members receive one free mobile travel waiver per billing cycle, applicable to one appointment within Docsy Services' standard service area. The waiver covers the base travel fee only. Extended travel, toll reimbursement, and after-hours fees are not included unless otherwise specified. Unused waivers do not roll over and expire at the end of each billing cycle.`,
  },
  {
    heading: "Birthday Notarization — Pro & Elite",
    body: `Pro and Elite members receive one bonus free notarization during their birth month, issued as a standalone benefit separate from monthly credits. Member must hold an active membership in good standing during their birth month to qualify. Birthday notarization applies to the RON or mobile base fee only. Travel, add-ons, and surcharges are billed separately. Birthday notarization does not stack with monthly credits and cannot be carried over if unused. Proof of birth month may be required upon redemption.`,
  },
  {
    heading: "Priority Booking & Fee Waiver",
    body: `All members receive fee-free priority booking across all service divisions. Priority booking places members ahead of non-member scheduling requests. It does not guarantee same-day or next-day availability. Priority status is tied to the active membership account and is non-transferable unless approved under the Transfer Policy below.`,
  },
  {
    heading: "Safe+ Access",
    body: `Safe+ is included free with every Docsy service for every client — members and non-members alike. Docsy+ members receive extended retention windows and priority support on vault issues. Vault access is tied to your registered Docsy account and remains available as long as the account is in good standing.`,
  },
  {
    heading: "Transfer Policy",
    body: `Membership perks are non-transferable by default and are tied to the registered account holder. Transfers may be approved on a case-by-case basis with written request to Docsy Services. Approval is at Docsy Services' sole discretion. Approved transfers are one-time only per membership term. The original account holder relinquishes all perks upon transfer. Transfers do not reset billing cycles or notarization credits.`,
  },
  {
    heading: "General Provisions",
    body: `Docsy Services reserves the right to modify, suspend, or discontinue any membership perk or tier with 30 days written notice to active members. Membership does not guarantee service availability. All appointments remain subject to scheduling availability, geographic service area, and applicable legal requirements.

Membership perks apply to services performed directly by Docsy Services LLC only. They do not apply to third-party services, platform-based bookings outside of direct Docsy channels, or any service not explicitly listed under the applicable tier.

Abuse of membership perks — including but not limited to fraudulent credit redemption, misrepresentation of account holder identity, or violation of any provision of these terms — will result in immediate membership termination without refund.

These terms are governed by the laws of the State of Texas. Any disputes arising from membership shall be resolved in the jurisdiction of Docsy Services' principal place of business.`,
  },
];

export default function Memberships() {
  React.useEffect(() => {
    document.title = "Docsy+ Memberships | Docsy Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Docsy+ membership.<br />
              <HI>Real perks.</HI> Real savings.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Docsy+ is a membership — free notarizations every month, priority scheduling, and discounts across every service. The more you use Docsy, the more you save. Looking for document storage? <Link href="/vault-info" className="underline font-bold text-black">See Safe+ →</Link>
            </p>
          </FadeIn>
          <FadeIn delay={260}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#memberships" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                View Membership Plans
              </Link>
              <Link href="/vault-info" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black">
                Visit Safe+ →
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
              Docsy+ memberships give you real perks — free notarizations every month, priority scheduling, and discounts across every service. The more you use Docsy, the more you save.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Membership Plans ── */}
      <section id="memberships" className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="⊟" text="PLANS" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Docsy+ Membership</h2>
              <p className="text-base text-white/40 mt-3">Perks included. Cancel any time.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-4xl mx-auto" style={{ backgroundColor: DIV }}>
            {TIERS.map((tier) => (
              <FadeIn key={tier.name} delay={80} threshold={0.05}>
                <div className="h-full flex flex-col" style={{ backgroundColor: BG }}>
                  <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                    <p className="text-base font-black text-white mb-1">{tier.name}</p>
                    <p className="text-2xl font-black" style={{ color: IVORY }}>{tier.price}</p>
                  </div>
                  <ul className="px-8 py-6 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="text-sm text-white/50 flex items-start gap-2">
                        <span className="text-white/20 mt-0.5 shrink-0">—</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="px-8 pb-6">
                    <Link
                      href={`/membership-checkout?plan=${tier.planKey}`}
                      className="block w-full py-3 text-sm font-bold text-center text-white"
                      style={{ backgroundColor: "#000" }}
                    >
                      Get Started →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0} threshold={0.05}>
            <p className="text-center text-sm text-white/35 mt-6">
              Annual plans available at 15% off. All tiers cancel any time.
            </p>
          </FadeIn>

          {/* HonorPass */}
          <FadeIn delay={0} threshold={0.05}>
            <div className="mt-6" style={{ backgroundColor: DIV }}>
              <div className="px-8 py-6" style={{ backgroundColor: BG }}>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-base font-black text-white">HonorPass™</p>
                  <p className="text-sm font-bold" style={{ color: IVORY }}>10% off — always</p>
                </div>
                <p className="text-sm text-white/40 mb-3">For those who have served in the US military. No monthly fee. Valid ID or DD-214 required. Applies to base service fees.</p>
                <p className="text-xs font-bold" style={{ color: BLUE }}>★ Stacks with all promos. Verified members and Safe+ holders have it saved and auto-applied — no code needed.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Terms & Conditions ── */}
      <section className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Label icon="⊟" text="TERMS & CONDITIONS" />
              <h2 className="text-3xl sm:text-4xl font-black text-white text-center" style={{ letterSpacing: "-0.02em" }}>Membership Terms</h2>
            </div>
          </FadeIn>

          <div className="space-y-10">
            {TC_SECTIONS.map((sec) => (
              <FadeIn key={sec.heading} delay={0} threshold={0.05}>
                <div className="border-t pt-8" style={{ borderColor: DIV }}>
                  <h3 className="text-base font-black text-white mb-4 uppercase tracking-wide">{sec.heading}</h3>
                  {sec.body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm text-white/45 leading-relaxed mb-3">{para}</p>
                  ))}
                  {sec.table && (
                    <div className="my-5 border" style={{ borderColor: DIV }}>
                      {sec.table.map((row, ri) => (
                        <div
                          key={ri}
                          className="flex border-b last:border-b-0"
                          style={{ borderColor: DIV, backgroundColor: ri === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}
                        >
                          <div className="flex-1 px-5 py-3 text-sm font-semibold" style={{ color: ri === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.4)" }}>{row[0]}</div>
                          <div className="flex-1 px-5 py-3 text-sm border-l" style={{ borderColor: DIV, color: ri === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.4)" }}>{row[1]}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.bodyAfterTable && sec.bodyAfterTable.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm text-white/45 leading-relaxed mb-3">{para}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV, backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Ready to join Docsy+?
            </h2>
            <p className="text-lg text-black/60 mb-8">Pick a tier above, or check out the calculator first to see how memberships change your price.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/calculate" className="px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: BLUE }}>
                Get Your Price →
              </Link>
              <Link href="/promos" className="px-10 py-4 text-base font-bold text-center border" style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.60)" }}>
                View Promotions
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── (Storage section removed — now lives on /vault-info) ── */}

    </div>
  );
}
