import React, { useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const RED   = "#e05252";
const GREEN = "#4caf82";

function fmtCardNumber(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})(?=.)/g, "$1 ");
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

type PlanKey =
  | "starter" | "pro" | "express"
  | "storage-personal" | "storage-family" | "storage-professional";

interface PlanInfo {
  name: string;
  price: number;
  priceLabel: string;
  type: "membership" | "storage";
  features: string[];
  terms: string;
}

const PLANS: Record<PlanKey, PlanInfo> = {
  starter: {
    name: "Docsy+ Starter",
    price: 15,
    priceLabel: "$15/mo",
    type: "membership",
    features: [
      "1 free notarization/month (RON or mobile)",
      "10% off all additional services",
      "Priority hours — 7am–9am & 9pm–midnight",
      "No after-hours or late-night surcharges",
      "30-day rollover on unused notarization",
      "20% off Docsy Safe+ subscription",
    ],
    terms: "Your membership renews automatically each month. Cancel any time before your next billing date to avoid renewal charges.",
  },
  pro: {
    name: "Docsy+ Pro",
    price: 30,
    priceLabel: "$30/mo",
    type: "membership",
    features: [
      "2 free notarizations/month",
      "15% off all services",
      "50% off travel fees",
      "Priority hours — 7am–9am & 9pm–midnight",
      "No after-hours or late-night surcharges",
      "Transcript deposit waived",
      "35% off Safe+ subscription",
    ],
    terms: "Your membership renews automatically each month. Cancel any time before your next billing date to avoid renewal charges.",
  },
  express: {
    name: "Docsy Express Pass™",
    price: 49,
    priceLabel: "$49/mo",
    type: "membership",
    features: [
      "Unlimited RON (fair use)",
      "Priority hours — 7am–9am & 9pm–midnight",
      "No after-hours or late-night surcharges",
      "1 free mobile travel/month",
      "Best value for frequent RON signers",
    ],
    terms: "Your membership renews automatically each month. Cancel any time before your next billing date to avoid renewal charges.",
  },
  "storage-personal": {
    name: "Safe+ Personal",
    price: 7,
    priceLabel: "$7/mo",
    type: "storage",
    features: [
      "Up to 50 files",
      "Encrypted document vault",
      "Auto-uploads from every Docsy appointment",
      "Access from any device, any time",
    ],
    terms: "Your Safe+ subscription renews automatically each month. You will receive a receipt at enrollment and at each renewal. Cancel any time before your next billing date.",
  },
  "storage-family": {
    name: "Safe+ Family",
    price: 18,
    priceLabel: "$18/mo",
    type: "storage",
    features: [
      "Up to 150 files",
      "4 member accounts",
      "Encrypted document vault",
      "Auto-uploads from every Docsy appointment",
      "Access from any device, any time",
    ],
    terms: "Your Safe+ subscription renews automatically each month. You will receive a receipt at enrollment and at each renewal. Cancel any time before your next billing date.",
  },
  "storage-professional": {
    name: "Safe+ Professional",
    price: 29,
    priceLabel: "$29/mo",
    type: "storage",
    features: [
      "Up to 500 files",
      "Encrypted document vault",
      "Auto-uploads from every Docsy appointment",
      "Priority file retrieval",
      "Access from any device, any time",
    ],
    terms: "Your Safe+ subscription renews automatically each month. You will receive a receipt at enrollment and at each renewal. Cancel any time before your next billing date.",
  },
};

export default function MembershipCheckout() {
  React.useEffect(() => { document.title = "Checkout | Docsy Notary Services"; }, []);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const rawPlan = params.get("plan") ?? "";
  const plan: PlanInfo | null = PLANS[rawPlan as PlanKey] ?? null;

  const [name,    setName]    = useState("");
  const [number,  setNumber]  = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [cvv,     setCvv]     = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);

  const nameOk = name.trim().length > 2;
  const numOk  = number.replace(/\s/g, "").length === 16;
  const expOk  = /^\d{2}\/\d{2}$/.test(expiry);
  const cvvOk  = cvv.length >= 3;
  const formOk = nameOk && numOk && expOk && cvvOk;

  const handlePay = useCallback(() => {
    if (!formOk) { setTouched(true); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 900);
  }, [formOk]);

  const fieldBorder = (ok: boolean) => touched && !ok ? RED : DIV;
  const fieldColor  = (ok: boolean) => touched && !ok ? RED : IVORY;

  if (!plan) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-5" style={{ backgroundColor: IVORY }}>
        <p className="text-2xl font-black text-black mb-4">Plan not found.</p>
        <Link href="/memberships" className="text-sm font-bold underline" style={{ color: BLUE }}>
          ← Back to Memberships
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full min-h-screen" style={{ backgroundColor: IVORY }}>
        <section className="px-5 pt-20 pb-24 sm:pt-28">
          <div className="max-w-xl mx-auto">
            <FadeIn delay={0}>
              <div className="w-12 h-12 flex items-center justify-center mb-8 text-2xl" style={{ backgroundColor: GREEN }}>✓</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6" style={{ borderColor: BLUE, color: BLUE }}>
                Subscription Confirmed
              </div>
              <h1 className="text-[2.8rem] sm:text-[4rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
                You're subscribed.
              </h1>
              <p className="text-lg text-black/60 mb-10 font-medium">
                <strong>{plan.name}</strong> is now active. You'll receive a confirmation and receipt by email. Your subscription renews monthly — cancel any time.
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="border-2 border-black p-8 mb-8" style={{ backgroundColor: BG }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>What's Included</p>
                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-white/60 flex items-start gap-2">
                      <span style={{ color: GREEN }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t flex justify-between items-baseline" style={{ borderColor: DIV }}>
                  <span className="text-sm font-bold text-white">{plan.name}</span>
                  <span className="text-xl font-black" style={{ color: BLUE }}>{plan.priceLabel}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                  Book a Service →
                </Link>
                <Link href="/" className="px-8 py-4 text-base font-bold text-black border-2 border-black text-center">
                  Back to Home
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: IVORY }}>

      <section className="px-5 pt-20 pb-10 sm:pt-28 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Link href="/memberships" className="text-xs font-bold uppercase tracking-widest mb-8 inline-block" style={{ color: "rgba(0,0,0,0.35)" }}>
              ← Back to Memberships
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6 block" style={{ borderColor: BLUE, color: BLUE }}>
              {plan.type === "membership" ? "Membership Checkout" : "Storage Checkout"}
            </div>
            <h1 className="text-[2.8rem] sm:text-[4rem] font-black leading-none text-black mb-2" style={{ letterSpacing: "-0.03em" }}>
              Subscribe & go.
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* ── Plan Summary ── */}
          <FadeIn delay={0}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {plan.type === "membership" ? "Docsy+ Membership" : "Docsy Safe+ Storage"}
                </p>
                <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.2)", color: BLUE }}>
                  Monthly Subscription
                </span>
              </div>
              <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                <div className="flex justify-between items-baseline mb-4">
                  <p className="text-base font-black text-white">{plan.name}</p>
                  <p className="text-2xl font-black" style={{ color: BLUE }}>{plan.priceLabel}</p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-white/50 flex items-start gap-2">
                      <span className="text-white/20 mt-0.5">—</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 py-5">
                <p className="text-xs leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.35)" }}>{plan.terms}</p>
              </div>
            </div>
          </FadeIn>

          {/* ── Payment Form ── */}
          <FadeIn delay={80}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Card Details</p>
                <div className="flex items-center gap-2">
                  {["VISA", "MC", "AMEX", "DISC"].map(b => (
                    <span key={b} className="text-[9px] font-black px-1.5 py-0.5 border" style={{ borderColor: DIV, color: "rgba(255,255,255,0.2)" }}>{b}</span>
                  ))}
                </div>
              </div>

              <div className="px-8 py-6 space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Name on Card</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="cc-name"
                    className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                    style={{ borderColor: fieldBorder(nameOk), color: fieldColor(nameOk), caretColor: BLUE } as React.CSSProperties}
                  />
                  {touched && !nameOk && <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the name as it appears on your card.</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Card Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={number}
                    onChange={e => setNumber(fmtCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    autoComplete="cc-number"
                    className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                    style={{ borderColor: fieldBorder(numOk), color: fieldColor(numOk), caretColor: BLUE } as React.CSSProperties}
                  />
                  {touched && !numOk && <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid 16-digit card number.</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={e => setExpiry(fmtExpiry(e.target.value))}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                      style={{ borderColor: fieldBorder(expOk), color: fieldColor(expOk), caretColor: BLUE } as React.CSSProperties}
                    />
                    {touched && !expOk && <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid expiry (MM/YY).</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      autoComplete="cc-csc"
                      className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                      style={{ borderColor: fieldBorder(cvvOk), color: fieldColor(cvvOk), caretColor: BLUE } as React.CSSProperties}
                    />
                    {touched && !cvvOk && <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the 3- or 4-digit security code.</p>}
                  </div>
                </div>

                <div className="pt-2 border-t" style={{ borderColor: DIV }}>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-sm font-bold text-white">First month due today</span>
                    <span className="text-2xl font-black" style={{ color: BLUE }}>${plan.price}</span>
                  </div>
                  <button
                    onClick={handlePay}
                    disabled={submitting}
                    className="w-full py-4 text-base font-bold text-white transition-opacity"
                    style={{ backgroundColor: "#000", opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}
                  >
                    {submitting ? "Processing…" : `Subscribe — $${plan.price}/mo`}
                  </button>
                  <p className="text-[10px] mt-4 leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Your payment is processed securely. Docsy does not store your card details.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
