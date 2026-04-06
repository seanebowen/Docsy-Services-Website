import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

interface ServiceLine { name: string; amount: number; }
interface PromoResult { label: string; amount: number; }
interface BookingData {
  date:             string;
  time:             string;
  note:             string;
  promoCode?:       string;
  promoDiscount?:   PromoResult | null;
  autoPromos?:      { label: string; amount: number; rateOnly?: boolean }[];
  discountedTotal?: number;
  estimate:         { services: ServiceLine[]; total: number; hasRON: boolean; } | null;
  safePlusOptIn?:   boolean;
}

export default function BookingConfirmation() {
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    document.title = "Booking Submitted | Docsy Notary Services";
    try {
      const stored = sessionStorage.getItem("docsy_booking");
      if (stored) setBooking(JSON.parse(stored));
    } catch {}
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
    } catch { return "—"; }
  };

  const isRON        = !!booking?.estimate?.hasRON;
  const hasCourtRep  = booking?.estimate?.services?.some(s =>
    s.name.toLowerCase().includes("court reporting")
  ) ?? false;

  return (
    <div className="w-full" style={{ backgroundColor: IVORY }}>

      {/* ── Success header ── */}
      <section className="px-5 pt-20 pb-14 sm:pt-28 sm:pb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-8" style={{ borderColor: BLUE, color: BLUE }}>
              ✓ REQUEST RECEIVED
            </div>
            <h1 className="text-[3rem] sm:text-[4.5rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              You're on<br />the schedule.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg text-black/60 max-w-lg mx-auto font-medium">
              {isRON
                ? "Docsy will confirm your request and send a secure video link to your email for your RON session."
                : "Docsy will confirm your request and send a confirmation email with your appointment details."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Summary card ── */}
      <section className="pb-20 px-5">
        <FadeIn delay={0}>
          <div className="max-w-lg mx-auto border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>

            {/* Appointment */}
            {booking && (
              <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Preferred Appointment</p>
                <p className="text-base font-black text-white">{formatDate(booking.date)}</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{booking.time}</p>
                {booking.note && (
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Note: {booking.note}
                  </p>
                )}
                {booking.promoCode && (
                  <p className="text-xs mt-2 font-bold uppercase tracking-widest" style={{ color: BLUE }}>
                    Promo: {booking.promoCode}
                  </p>
                )}
              </div>
            )}

            {/* Estimate summary */}
            {booking?.estimate && booking.estimate.services.length > 0 && (
              <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Estimate Summary</p>
                {booking.estimate.services.map(s => (
                  <div key={s.name} className="flex justify-between py-2.5 border-b text-sm" style={{ borderColor: DIV }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                    <span className="font-bold" style={{ color: IVORY }}>${s.amount.toFixed(2)}</span>
                  </div>
                ))}
                {(booking.autoPromos ?? []).map((p: { label: string; amount: number; rateOnly?: boolean }) => (
                  <div key={p.label} className="flex justify-between py-2.5 border-b text-sm" style={{ borderColor: DIV }}>
                    <span className="flex items-center gap-2" style={{ color: p.amount > 0 ? "#F5A623" : BLUE }}>
                      ↳ {p.label}
                      <span className="text-[8px] font-black uppercase tracking-widest px-1 py-0.5" style={{ backgroundColor: p.amount > 0 ? "rgba(245,166,35,0.15)" : "rgba(77,159,219,0.15)", color: p.amount > 0 ? "#F5A623" : BLUE }}>Auto</span>
                    </span>
                    {p.rateOnly
                      ? <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>Applied</span>
                      : <span className="font-bold" style={{ color: p.amount > 0 ? "#F5A623" : BLUE }}>
                          {p.amount > 0 ? `+$${p.amount.toFixed(2)}` : `−$${Math.abs(p.amount).toFixed(2)}`}
                        </span>
                    }
                  </div>
                ))}
                {booking.promoDiscount && (
                  <div className="flex justify-between py-2.5 border-b text-sm" style={{ borderColor: DIV }}>
                    <span style={{ color: BLUE }}>↳ {booking.promoDiscount.label}</span>
                    <span className="font-bold" style={{ color: BLUE }}>−${Math.abs(booking.promoDiscount.amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-sm font-bold text-white">Estimated Total</span>
                  <div className="text-right">
                    {((booking.autoPromos?.length ?? 0) > 0 || booking.promoDiscount) && (
                      <span className="text-sm line-through mr-2" style={{ color: "rgba(255,255,255,0.3)" }}>${booking.estimate.total.toLocaleString()}</span>
                    )}
                    <span className="text-2xl font-black" style={{ color: BLUE }}>
                      ${((booking.autoPromos?.length ?? 0) > 0 || booking.promoDiscount) && booking.discountedTotal != null
                        ? booking.discountedTotal.toLocaleString()
                        : booking.estimate.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Safe+ status */}
            {booking && (
              <div className="px-8 py-5 border-b flex items-start gap-4" style={{ borderColor: DIV }}>
                <div
                  className="mt-0.5 w-5 h-5 shrink-0 border-2 flex items-center justify-center"
                  style={{
                    borderColor:     booking.safePlusOptIn !== false ? BLUE : "rgba(255,255,255,0.2)",
                    backgroundColor: booking.safePlusOptIn !== false ? BLUE : "transparent",
                  }}
                >
                  {booking.safePlusOptIn !== false && (
                    <span className="text-black text-[11px] font-black leading-none">✓</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">
                    Docsy Safe+{booking.safePlusOptIn !== false ? " — 30-Day Free Trial Enrolled" : " — Opted Out"}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {booking.safePlusOptIn !== false
                      ? "All your appointment files — documents, transcripts, and recordings — will upload automatically. No charge for 30 days. Cancel anytime."
                      : "You opted out of Safe+. You can enroll at any time through your account or on your next booking."}
                  </p>
                </div>
              </div>
            )}

            {/* Next steps */}
            <div className="px-8 py-6 border-b" style={{ borderColor: DIV }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>What happens next</p>
              <div className="space-y-4">
                {([
                  "Docsy reviews your request and confirms availability for your preferred time.",
                  isRON
                    ? "You'll receive an email with your secure RON video session link to join your appointment."
                    : "You'll receive a confirmation email with appointment details and any prep instructions.",
                  hasCourtRep
                    ? "For your court reporting appointment: reply to the confirmation email with the deposition notice. It has everything Docsy needs — venue address, case name, witness names, and start time."
                    : null,
                  "Your price is confirmed before the appointment starts. You know what you owe before anyone shows up.",
                ] as (string | null)[]).filter(Boolean).map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-black shrink-0 mt-0.5" style={{ color: BLUE }}>0{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="px-8 py-5">
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
                Preferred time is not guaranteed until confirmed by Docsy. Pricing is an estimate — final cost confirmed in writing before your appointment.
              </p>
            </div>

          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-8 py-3 text-sm font-bold text-black border-2 border-black text-center">
              Back to Home
            </Link>
            <Link href="/estimate" className="px-8 py-3 text-sm font-bold text-black/40 text-center">
              New Estimate →
            </Link>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
