import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const RED   = "#e05252";

/* ── Payment Terms copy (one block per division) ── */
const TERMS: Record<string, { heading: string; body: string[] }> = {
  ron: {
    heading: "Remote Online Notarization",
    body: [
      "Payment is required in full at the time of booking. Your appointment is not confirmed until payment is received. No session will be initiated without a completed payment.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
    ],
  },
  mobile: {
    heading: "Mobile Notary / General Notary Work",
    body: [
      "Payment is required in full at the time of booking. Travel and scheduling are committed the moment your appointment is confirmed, and no appointment is confirmed without completed payment.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
    ],
  },
  loan: {
    heading: "Loan Signing",
    body: [
      "Payment is required in full at the time of booking for all clients scheduling directly through Docsy Services. Your signing appointment is not confirmed until payment is received.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
      "Signing agency partners are subject to the net terms established in their individual service agreements.",
    ],
  },
  apostille: {
    heading: "Apostille Services",
    body: [
      "Payment is required in full at the time of submission. Work on your file, including state submission and any associated processing, begins upon receipt of payment. No file will be submitted or processed without completed payment.",
      "Upon successful payment, you will receive an automatic confirmation and receipt.",
    ],
  },
  safeplus: {
    heading: "Docsy Safe+",
    body: [
      "Payment is collected at the time of enrollment via automatic subscription billing. Your subscription renews automatically on your billing cycle date. You will receive a receipt at enrollment and at each renewal.",
      "Cancellation must be submitted prior to the next billing date to avoid renewal charges.",
    ],
  },
  court: {
    heading: "Court Reporting",
    body: [
      "Docsy Services invoices all court reporting work after the deposition is complete. There is no upfront payment required for court reporting services. Billing is structured based on what was ordered at the time of the deposition.",
      "Appearance Only: If no transcript is ordered, an invoice for the appearance fee is generated on the day of the deposition and sent to the ordering party the same day. Payment is due within 14 days of the date of service.",
      "Appearance and Transcript: If a transcript is ordered, the appearance fee and transcript fee are combined into a single invoice. That invoice is generated when the transcript is complete and ready for delivery. The full balance — appearance and transcript together — is due within 7 days of the date the transcript is marked ready. The transcript will not be released, delivered, or made accessible until payment is received in full. No exceptions.",
      "Multi-Counsel Billing: When multiple attorneys order copies from the same deposition, each attorney receives their own individual invoice generated when their copy is ready. Each invoice carries its own Net-7 window and is subject to the same hold-until-paid policy.",
      "Add-On Services: Realtime feed charges, audio and transcript sync, and any other add-on services are bundled into the applicable invoice and follow the same payment terms.",
      "Late Payments: Invoices not paid within the applicable payment window are subject to a late fee of 1.5% per month on the outstanding balance. Docsy Services reserves the right to withhold transcript delivery on any account with an outstanding past-due balance until that balance is resolved.",
    ],
  },
};

interface ServiceLine { name: string; amount: number; }
interface PromoResult  { label: string; amount: number; }
interface BookingData {
  date:             string;
  time:             string;
  note:             string;
  promoCode?:       string;
  promoDiscount?:   PromoResult | null;
  autoPromos?:      { label: string; amount: number }[];
  discountedTotal?: number;
  estimate:         { services: ServiceLine[]; total: number; hasRON: boolean; } | null;
  safePlusOptIn?:   boolean;
}

/* ── Card helpers ── */
function fmtCardNumber(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})(?=.)/g, "$1 ");
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
function detectTermKeys(booking: BookingData): string[] {
  const keys: string[] = [];
  const svcs = booking.estimate?.services ?? [];
  if (svcs.some(s => s.name.toLowerCase().includes("remote online")))  keys.push("ron");
  if (svcs.some(s => s.name.toLowerCase().includes("mobile notary")))  keys.push("mobile");
  if (svcs.some(s => s.name.toLowerCase().includes("loan signing")))   keys.push("loan");
  if (svcs.some(s => s.name.toLowerCase().includes("apostille")))      keys.push("apostille");
  if (svcs.some(s => s.name.toLowerCase().includes("court reporting"))) keys.push("court");
  if (booking.safePlusOptIn === true)                                    keys.push("safeplus");
  return keys;
}
function needsUpfrontPayment(keys: string[]) {
  return keys.some(k => k !== "court" && k !== "safeplus");
}

export default function BookingPayment() {
  const [, setLocation] = useLocation();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [termKeys, setTermKeys] = useState<string[]>([]);
  const [upfront, setUpfront]   = useState(false);

  /* card form state */
  const [name,    setName]    = useState("");
  const [number,  setNumber]  = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [cvv,     setCvv]     = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Payment | Docsy Notary Services";
    try {
      const stored = sessionStorage.getItem("docsy_booking");
      if (stored) {
        const b: BookingData = JSON.parse(stored);
        setBooking(b);
        const keys = detectTermKeys(b);
        setTermKeys(keys);
        setUpfront(needsUpfrontPayment(keys));
      }
    } catch {}
  }, []);

  const hasDiscount  = (booking?.autoPromos?.length ?? 0) > 0 || !!booking?.promoDiscount;
  const displayTotal = hasDiscount
    ? (booking?.discountedTotal ?? booking?.estimate?.total ?? 0)
    : (booking?.estimate?.total ?? 0);

  /* Validation */
  const nameOk   = name.trim().length > 2;
  const numOk    = number.replace(/\s/g, "").length === 16;
  const expOk    = /^\d{2}\/\d{2}$/.test(expiry);
  const cvvOk    = cvv.length >= 3;
  const formOk   = nameOk && numOk && expOk && cvvOk;

  const handlePay = useCallback(() => {
    if (upfront && !formOk) { setTouched(true); return; }
    setSubmitting(true);
    setTimeout(() => {
      try {
        const current = JSON.parse(sessionStorage.getItem("docsy_booking") || "{}");
        sessionStorage.setItem("docsy_booking", JSON.stringify({
          ...current,
          paymentCompleted: true,
          cardLast4: upfront ? number.replace(/\s/g, "").slice(-4) : null,
        }));
      } catch {}
      setLocation("/booking/confirmation");
    }, 900);
  }, [upfront, formOk, number, setLocation]);

  const fieldBorder = (ok: boolean) =>
    touched && !ok ? RED : DIV;
  const fieldColor  = (ok: boolean) =>
    touched && !ok ? RED : IVORY;

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: IVORY }}>

      {/* ── Header ── */}
      <section className="px-5 pt-20 pb-10 sm:pt-28 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Link href="/booking" className="text-xs font-bold uppercase tracking-widest mb-8 inline-block" style={{ color: "rgba(0,0,0,0.35)" }}>
              ← Back to Booking
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6 ml-0 block" style={{ borderColor: BLUE, color: BLUE }}>
              Step 3 of 3 — Payment
            </div>
            <h1 className="text-[2.8rem] sm:text-[4rem] font-black leading-none text-black" style={{ letterSpacing: "-0.03em" }}>
              {upfront ? "Review & pay." : "Review & confirm."}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* ── Payment Terms ── */}
          <FadeIn delay={0}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Payment Terms</p>
              </div>
              {termKeys.map((key, idx) => {
                const t = TERMS[key];
                if (!t) return null;
                return (
                  <div key={key} className={idx < termKeys.length - 1 ? "px-8 py-6 border-b" : "px-8 py-6"} style={{ borderColor: DIV }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>{t.heading}</p>
                    <div className="space-y-3">
                      {t.body.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.55)" }}>{para}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
              {termKeys.length === 0 && (
                <div className="px-8 py-6">
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No payment terms applicable.</p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* ── Card form or court-only message ── */}
          <FadeIn delay={80}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              {upfront ? (
                <>
                  <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Card Details</p>
                    <div className="flex items-center gap-2">
                      {["VISA", "MC", "AMEX", "DISC"].map(b => (
                        <span key={b} className="text-[9px] font-black px-1.5 py-0.5 border" style={{ borderColor: DIV, color: "rgba(255,255,255,0.2)" }}>{b}</span>
                      ))}
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-5">
                    {/* Name on card */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jane Smith"
                        autoComplete="cc-name"
                        className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                        style={{ borderColor: fieldBorder(nameOk), color: fieldColor(nameOk), caretColor: BLUE } as React.CSSProperties}
                      />
                      {touched && !nameOk && (
                        <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the name as it appears on your card.</p>
                      )}
                    </div>

                    {/* Card number */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Card Number
                      </label>
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
                      {touched && !numOk && (
                        <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid 16-digit card number.</p>
                      )}
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          Expiry
                        </label>
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
                        {touched && !expOk && (
                          <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid expiry (MM/YY).</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          CVV
                        </label>
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
                        {touched && !cvvOk && (
                          <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the 3- or 4-digit security code.</p>
                        )}
                      </div>
                    </div>

                    {/* Amount + Pay button */}
                    <div className="pt-2 border-t" style={{ borderColor: DIV }}>
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-sm font-bold text-white">Amount due today</span>
                        <div className="text-right">
                          {hasDiscount && (
                            <span className="text-sm line-through mr-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                              ${booking?.estimate?.total.toLocaleString()}
                            </span>
                          )}
                          <span className="text-2xl font-black" style={{ color: BLUE }}>
                            ${displayTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handlePay}
                        disabled={submitting}
                        className="w-full py-4 text-base font-bold text-white transition-opacity"
                        style={{ backgroundColor: "#000", opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}
                      >
                        {submitting ? "Processing…" : `Pay $${displayTotal.toLocaleString()}`}
                      </button>
                      <p className="text-[10px] mt-4 leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                        Your payment is processed securely. Docsy does not store your card details.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Court reporting only — no upfront payment */
                <div className="px-8 py-8">
                  <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>No Upfront Payment Required</p>
                  <p className="text-sm leading-relaxed font-light mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Court reporting services are billed after the deposition is complete. You will receive an invoice per the terms above — no card is required to confirm this booking.
                  </p>
                  <button
                    onClick={handlePay}
                    disabled={submitting}
                    className="w-full py-4 text-base font-bold text-white transition-opacity"
                    style={{ backgroundColor: "#000", opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}
                  >
                    {submitting ? "Confirming…" : "Complete Booking"}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
