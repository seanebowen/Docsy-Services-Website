import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";
import { HonorPassUpsell } from "@/components/ui/HonorPassUpsell";
import { resolveIdMeVerification, isHonorPassEligible } from "@/lib/idme";

const MEMBERSHIP_LABELS: Record<string, string> = {
  starter: "Business+ Solo",
  pro:     "Business+ Pro",
  elite:   "Business+ Elite",
};
const MEMBER_DISCOUNT_PCT: Record<string, number> = {
  starter: 0.05, // modest auto-applied discount on eligible base fees
  pro:     0.10,
  elite:   0.15,
};

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

interface ServiceLine { name: string; amount: number; }
interface EstimateSummary { services: ServiceLine[]; total: number; baseTotal?: number; hasRON: boolean; }
type PromoResult = { label: string; amount: number } | null;

/* Returns true if the given date falls on a US federal holiday (or its observed substitute). */
function isFederalHoliday(date: Date): boolean {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const obs = (hm: number, hd: number): [number, number] => {
    const hw = new Date(y, hm, hd).getDay();
    if (hw === 0) { const n = new Date(y, hm, hd + 1); return [n.getMonth(), n.getDate()]; }
    if (hw === 6) { const n = new Date(y, hm, hd - 1); return [n.getMonth(), n.getDate()]; }
    return [hm, hd];
  };
  const nthW = (hm: number, wday: number, n: number): [number, number] => {
    const firstDow = new Date(y, hm, 1).getDay();
    return [hm, 1 + (wday - firstDow + 7) % 7 + (n - 1) * 7];
  };
  const lastW = (hm: number, wday: number): [number, number] => {
    const last = new Date(y, hm + 1, 0);
    return [hm, last.getDate() - (last.getDay() - wday + 7) % 7];
  };
  const ck = ([hm, hd]: [number, number]) => m === hm && d === hd;
  /* Fixed-date holidays: match the actual date OR the observed substitute weekday */
  const ckFixed = (hm: number, hd: number) => (m === hm && d === hd) || ck(obs(hm, hd));
  return (
    ckFixed(0, 1)      || ck(nthW(0, 1, 3))  || ck(nthW(1, 1, 3))  ||
    ck(lastW(4, 1))    || ckFixed(6, 4)       || ck(nthW(8, 1, 1))  ||
    ck(nthW(9, 1, 2))  || ck(nthW(10, 4, 4)) || ckFixed(11, 25)
  );
}

function parseHour(timeStr: string): number {
  const [clock, period] = timeStr.split(" ");
  let h = parseInt(clock.split(":")[0], 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h;
}

function applyPromoCode(code: string, estimate: EstimateSummary | null, appliedAuto: { label: string; amount: number }[] = [], day: number = -1): PromoResult {
  if (!estimate || !code.trim()) return null;
  const n = code.trim().toUpperCase();
  const { services, baseTotal, total } = estimate;
  const base = baseTotal ?? total;
  const has    = (kw: string) => services.some(s => s.name.toLowerCase().includes(kw.toLowerCase()));
  const autoHas = (kw: string) => appliedAuto.some(p => p.label.toLowerCase().includes(kw.toLowerCase()));
  const isWeekday = day === -1 || (day >= 1 && day <= 5);
  switch (n) {
    case "HONORPASS":
      /* Block manual code if HonorPass is already auto-applied (via verified
         ID.me) or already present as a service line — prevents double-discount. */
      if (autoHas("honorpass") || has("honorpass")) return null;
      return { label: "HonorPass — 10% Off Base Service Fee", amount: -(Math.round(base * 0.10 * 100) / 100) };
    case "WEEKENDWARRIOR": {
      if (autoHas("weekend warrior")) return null;
      const ln = services.find(s => s.name.toLowerCase().includes("loan signing"));
      return ln ? { label: "Weekend Warrior™ — 20% Off Loan Signing", amount: -(Math.round(ln.amount * 0.20 * 100) / 100) } : null;
    }
    case "NIGHTSHIFTSEAL":
      if (autoHas("night shift")) return null;
      if (!isWeekday) return null;
      return has("remote online") ? { label: "Night Shift Seal™ — $10 Off Base RON Fee", amount: -10 } : null;
    case "MIDDAYMILES":
      if (autoHas("midday miles")) return null;
      if (!isWeekday) return null;
      return (has("general notary work") && !has("remote online")) ? { label: "Midday Miles™ — $10 Off Base Notary Fee", amount: -10 } : null;
    default:
      return null;
  }
}

const MONTHS   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDayOf(y: number, m: number)  { return new Date(y, m, 1).getDay(); }

/* Build a labelled slot. hour is 0-23. Priority = outside 9am-9pm general window. */
function makeSlotLabel(h24: number): string {
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${h12}:00 ${h24 >= 12 && h24 < 24 ? "PM" : "AM"}`;
}
/* Standard consumer hours: 9 AM – 9 PM (last bookable start is 8 PM). Extended priority hours
   (24/7 RON, 6 AM – Midnight mobile) are reserved for Docsy Business+ Firm accounts and handled
   through the firm portal, not the public booking grid. */

/* ── Terms modal ── */
function BookingModal({
  onConfirm,
  onCancel,
  hasDeliverables,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  hasDeliverables: boolean;
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
    >
      <div
        className="w-full max-w-lg border overflow-hidden"
        style={{ backgroundColor: BG, borderColor: DIV }}
      >
        {/* Header */}
        <div className="px-7 py-5 border-b" style={{ borderColor: DIV }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: BLUE }}>
            Before You Confirm
          </p>
          <h2 className="text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
            Two quick things.
          </h2>
        </div>

        <div className="px-7 py-6 space-y-7">

          {/* ── 1. Terms ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              01 — Rates, Fees & Terms
            </p>
            <div className="border p-4 mb-4 text-xs leading-relaxed" style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}>
              <p className="mb-2">
                Your calculated price is final once your confirmation email is sent and received. Any variation in document count, session duration, or additional services is always disclosed before you confirm — never applied without your knowledge.
              </p>
              <p className="mb-2">
                Travel fees (mobile only) are based on your distance tier. Federal holiday surcharges, when applicable, are disclosed at booking. Statutory notary fees ($10 first signature, $1 each additional) are set by Texas law and itemized separately on every invoice.
              </p>
              <p>
                By proceeding you agree that Docsy may contact you to confirm your appointment, discuss document requirements, and send your invoice. You may cancel or reschedule at any time before confirmation, subject to the cancellation policy in our Terms of Service.
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group" onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) return;
              setTermsAgreed(v => !v);
            }}>
              <div
                className="mt-0.5 w-5 h-5 shrink-0 border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor:     termsAgreed ? BLUE : "rgba(255,255,255,0.2)",
                  backgroundColor: termsAgreed ? BLUE : "transparent",
                }}
                role="checkbox"
                aria-checked={termsAgreed}
              >
                {termsAgreed && <span className="text-black text-[11px] font-black leading-none">✓</span>}
              </div>
              <span className="text-sm font-medium leading-snug" style={{ color: termsAgreed ? IVORY : "rgba(255,255,255,0.5)" }}>
                I have read and agree to the rates, fees, and booking terms above, and to Docsy's{" "}
                <Link href="/terms" className="underline hover:text-white" style={{ color: BLUE }} onClick={(e) => e.stopPropagation()}>
                  Terms of Service
                </Link>
                {", including the "}
                <Link href="/terms#cancellation" className="underline hover:text-white" style={{ color: BLUE }} onClick={(e) => e.stopPropagation()}>
                  cancellation
                </Link>
                {", "}
                <Link href="/terms#refunds" className="underline hover:text-white" style={{ color: BLUE }} onClick={(e) => e.stopPropagation()}>
                  refund
                </Link>
                {", "}
                <Link href="/terms#privacy" className="underline hover:text-white" style={{ color: BLUE }} onClick={(e) => e.stopPropagation()}>
                  privacy
                </Link>
                {", and "}
                <Link href="/terms#arbitration" className="underline hover:text-white" style={{ color: BLUE }} onClick={(e) => e.stopPropagation()}>
                  dispute resolution
                </Link>
                {" terms."}
              </span>
            </label>
          </div>

          {/* ── 2. Safe+ note (auto-included, no opt-in) ── */}
          {hasDeliverables && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                02 — Safe+ Included
              </p>
              <div className="border p-4 text-xs leading-relaxed" style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}>
                Every deliverable from this appointment — notarized documents, apostille certificates, signed loan packages, transcripts, recordings — uploads automatically to your Safe+. <strong className="text-white/60">Free for everyone, no signup required.</strong> Your Safe+ is ready when your appointment is confirmed.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: DIV }}>
          <button
            onClick={() => onConfirm()}
            disabled={!termsAgreed}
            className="flex-1 py-3.5 text-sm font-bold text-white transition-opacity"
            style={{ backgroundColor: "#000", opacity: termsAgreed ? 1 : 0.3, cursor: termsAgreed ? "pointer" : "not-allowed" }}
          >
            {termsAgreed ? "Complete Booking Request" : "Please agree to continue"}
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-3.5 text-sm font-bold border transition-colors"
            style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Slot formatting helpers ──────────────────────────────── */
function hhmm24to12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function slotHour(hhmm: string): number { return Number(hhmm.split(":")[0]); }

/* ── Main page ── */
export default function Booking() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const isMember     = !!user?.membership;
  const memberTier   = user?.membership ?? null;
  const memberLabel  = memberTier ? MEMBERSHIP_LABELS[memberTier] : null;
  const [estimate, setEstimate]       = useState<EstimateSummary | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote]               = useState("");
  const [promoCode, setPromoCode]     = useState("");
  const [showModal, setShowModal]     = useState(false);

  /* ── Live slot state (fetched from API) ── */
  const [apiSlots,     setApiSlots]     = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError,   setSlotsError]   = useState<string | null>(null);

  /* Services with deliverables — gates Safe+ trial offer */
  const hasDeliverables = estimate
    ? estimate.services.some(s => {
        const n = s.name.toLowerCase();
        return n.includes("remote online") || n.includes("general notary work") ||
               n.includes("loan signing")  || n.includes("apostille") ||
               n.includes("court reporting");
      })
    : false;

  /* Auto-promos: computed from the selected appointment date + time */
  const autoPromos = useMemo((): { label: string; amount: number; rateOnly?: boolean }[] => {
    if (!selectedDate || !selectedTime || !estimate) {
      return [];
    }
    const day  = selectedDate.getDay();
    const isWeekend = day === 0 || day === 6;
    const isWeekday = day >= 1 && day <= 5;
    const isHoliday = isFederalHoliday(selectedDate);
    const hour = parseHour(selectedTime);
    const has  = (kw: string) => estimate.services.some(s => s.name.toLowerCase().includes(kw.toLowerCase()));
    const result: { label: string; amount: number; rateOnly?: boolean }[] = [];

    if (isHoliday) result.push({ label: "Federal Holiday Surcharge", amount: 20 });

    /* Timing surcharges removed: standard booking is 9 AM – 9 PM
       for every individual customer (members and non-members alike).
       Hours after 9 PM are reserved for Firm accounts and arranged
       through the firm portal — they don't appear in the public
       booking grid below. */

    if (has("remote online") && isWeekday && hour >= 18 && hour < 21) {
      result.push({ label: "Night Shift Seal™ — $10 Off", amount: -10 });
    }
    if (has("general notary work") && !has("remote online") && isWeekday && hour >= 12 && hour < 16)
      result.push({ label: "Midday Miles™ — $10 Off", amount: -10 });
    if (has("loan signing") && isWeekend) {
      const ln = estimate.services.find(s => s.name.toLowerCase().includes("loan signing"));
      if (ln) result.push({ label: "Weekend Warrior™ — 20% Off Loan Signing", amount: -(Math.round(ln.amount * 0.20 * 100) / 100) });
    }

    /* ── Auto-applied Business+ member perk: percent off base service total ── */
    if (memberTier && estimate.baseTotal) {
      const pct = MEMBER_DISCOUNT_PCT[memberTier] ?? 0;
      if (pct > 0) {
        const off = Math.round(estimate.baseTotal * pct * 100) / 100;
        result.push({
          label:  `${memberLabel} Member Discount — ${Math.round(pct * 100)}% Off Base`,
          amount: -off,
        });
      }
    }

    return result;
  }, [selectedDate, selectedTime, estimate, isMember, memberTier, memberLabel]);

  /* HonorPass auto-apply: 10% off base whenever user is ID.me-verified.
     Lives outside `autoPromos` because it does NOT depend on date/time —
     a freshly-verified user should see the discount the instant they
     return from /idme/callback. Skipped if Calculator already added a
     HonorPass line item to the stored estimate (avoids double counting). */
  const honorPassPromo = useMemo((): { label: string; amount: number; rateOnly?: boolean }[] => {
    if (!estimate?.baseTotal) return [];
    const alreadyHasHonorPass = estimate.services.some(s => s.name.toLowerCase().includes("honorpass"));
    if (alreadyHasHonorPass) return [];
    const verif = resolveIdMeVerification(user?.idMeVerification ?? null);
    if (!isHonorPassEligible(verif)) return [];
    const off = Math.round(estimate.baseTotal * 0.10 * 100) / 100;
    return off > 0 ? [{ label: "HonorPass™ — 10% off base service fees", amount: -off }] : [];
  }, [estimate, user?.idMeVerification]);

  /* Merge HonorPass into the auto-promo list so it renders in the
     summary, contributes to the running total, and is gated by the
     same dedupe rules as other auto-promos. */
  const allAutoPromos   = useMemo(() => [...autoPromos, ...honorPassPromo], [autoPromos, honorPassPromo]);
  const autoPromoTotal  = allAutoPromos.reduce((sum, p) => sum + p.amount, 0);
  const promoDiscount   = useMemo(() => applyPromoCode(promoCode, estimate, allAutoPromos, selectedDate?.getDay() ?? -1), [promoCode, estimate, allAutoPromos, selectedDate]);
  const promoInvalid    = promoCode.trim().length > 0 && promoDiscount === null;
  const discountedTotal = estimate ? Math.max(0, estimate.total + autoPromoTotal + (promoDiscount?.amount ?? 0)) : 0;

  const today    = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear,  setViewYear]  = useState(today.getFullYear());

  useEffect(() => {
    document.title = "Book Your Appointment | Docsy Services";
    try {
      const stored = sessionStorage.getItem("docsy_estimate");
      if (stored) setEstimate(JSON.parse(stored));
    } catch {}
  }, []);

  /* ── Fetch available slots whenever date, service, or member status changes ── */
  useEffect(() => {
    if (!selectedDate) { setApiSlots([]); return; }

    const yyyy = selectedDate.getFullYear();
    const mm   = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd   = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const serviceNames = estimate?.services.map(s => s.name) ?? [];
    const params = new URLSearchParams({
      date:         dateStr,
      serviceNames: serviceNames.join(","),
      isMember:     String(isMember),
    });

    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);
    setApiSlots([]);

    fetch(`/api/slots?${params.toString()}`)
      .then(r => r.json() as Promise<{ ok: boolean; slots?: string[]; error?: string; warning?: string }>)
      .then(data => {
        if (cancelled) return;
        if (data.ok) {
          setApiSlots(data.slots ?? []);
          setSlotsError(null);
        } else {
          setSlotsError(data.error ?? "Failed to load available times.");
        }
      })
      .catch(() => {
        if (!cancelled) setSlotsError("Network error loading available times.");
      })
      .finally(() => { if (!cancelled) setSlotsLoading(false); });

    return () => { cancelled = true; };
  }, [selectedDate, estimate, isMember]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  const isSelected = (day: number) =>
    !!selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;
  const isToday = (day: number) =>
    `${viewYear}-${viewMonth}-${day}` === todayStr;

  const pickDate = (day: number) => {
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime("");
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const canConfirm = !!selectedDate && !!selectedTime;

  /* Step 1 — open modal */
  const handleConfirmClick = () => {
    if (!canConfirm) return;
    setShowModal(true);
  };

  /* Step 2 — modal confirmed, save & navigate */
  const handleModalConfirm = () => {
    sessionStorage.setItem("docsy_booking", JSON.stringify({
      date: selectedDate!.toISOString(),
      time: selectedTime,
      note,
      promoCode: promoCode.trim(),
      promoDiscount,
      autoPromos: allAutoPromos,
      discountedTotal,
      estimate,
      memberTier,
    }));
    setShowModal(false);
    setLocation("/booking/payment");
  };

  return (
    <>
      {showModal && (
        <BookingModal
          onConfirm={handleModalConfirm}
          onCancel={() => setShowModal(false)}
          hasDeliverables={hasDeliverables}
        />
      )}

      <div className="w-full" style={{ backgroundColor: BG }}>

        {/* ── Hero ── */}
        <section className="px-5 pt-16 pb-12 sm:pt-20 sm:pb-14" style={{ backgroundColor: IVORY }}>
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0}>
              <Link href="/calculate" className="inline-block text-sm font-bold text-black/40 hover:text-black/70 mb-6 transition-colors">
                ← Back to Calculator
              </Link>
              <h1 className="text-[3rem] sm:text-[4.5rem] font-black leading-none text-black mb-4" style={{ letterSpacing: "-0.03em" }}>
                Choose your time.
              </h1>
            </FadeIn>
            <FadeIn delay={140}>
              <p className="text-lg text-black/60 max-w-lg font-medium mb-4">
                Pick a preferred date and time slot. Your booking is not confirmed until you receive a confirmation email from Docsy.
              </p>
              <p className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.45)" }}>
                Want to verify your document first?{" "}
                <Link href="/document-check" className="underline font-bold" style={{ color: "rgba(0,0,0,0.70)" }} data-testid="btn-booking-doc-check">
                  Free Document Check →
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="border-t" style={{ borderColor: DIV }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">

              {/* ── Left: calendar + times + note ── */}
              <div className="lg:border-r px-6 py-8 sm:px-8" style={{ borderColor: DIV }}>

                {/* Calendar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-5">
                    <button
                      onClick={prevMonth}
                      className="w-9 h-9 flex items-center justify-center border transition-colors hover:bg-white/10"
                      style={{ borderColor: DIV, color: "rgba(255,255,255,0.45)" }}
                    >←</button>
                    <p className="text-base font-black text-white tracking-tight">{MONTHS[viewMonth]} {viewYear}</p>
                    <button
                      onClick={nextMonth}
                      className="w-9 h-9 flex items-center justify-center border transition-colors hover:bg-white/10"
                      style={{ borderColor: DIV, color: "rgba(255,255,255,0.45)" }}
                    >→</button>
                  </div>

                  <div className="grid grid-cols-7 mb-1">
                    {WEEKDAYS.map(d => (
                      <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest py-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7">
                    {Array.from({ length: firstDayOf(viewYear, viewMonth) }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth(viewYear, viewMonth) }).map((_, i) => {
                      const day = i + 1;
                      const past     = isPast(day);
                      const selected = isSelected(day);
                      const _today   = isToday(day);
                      return (
                        <button
                          key={day}
                          disabled={past}
                          onClick={() => pickDate(day)}
                          className="aspect-square flex items-center justify-center text-sm font-semibold transition-colors"
                          style={{
                            color:           past ? "rgba(255,255,255,0.12)" : selected ? "#000" : _today ? BLUE : "rgba(255,255,255,0.75)",
                            backgroundColor: selected ? BLUE : "transparent",
                            cursor:          past ? "not-allowed" : "pointer",
                            outline:         _today && !selected ? `1px solid ${BLUE}` : "none",
                          }}
                        >{day}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div className="border-t pt-6" style={{ borderColor: DIV }}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Available times — {formatDate(selectedDate)}
                      </p>
                      {/* Business+ member status (auto-detected from sign-in) */}
                      {isMember ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border" style={{ borderColor: BLUE, color: BLUE }}>
                          ◆ {memberLabel}
                        </span>
                      ) : (
                        <Link
                          href="/login"
                          className="text-[10px] font-bold uppercase tracking-widest underline"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          Sign in to apply Business+ perks
                        </Link>
                      )}
                    </div>

                    {/* Loading spinner */}
                    {slotsLoading && (
                      <div className="flex items-center gap-3 py-6">
                        <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: BLUE, borderTopColor: "transparent" }} />
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                          Checking availability…
                        </p>
                      </div>
                    )}

                    {/* Error state */}
                    {!slotsLoading && slotsError && (
                      <p className="text-xs py-4" style={{ color: "#e05252" }}>{slotsError}</p>
                    )}

                    {/* Filter API slots to standard 9 AM – 9 PM consumer window once.
                        Anything outside is firm-only / extended priority and not bookable here. */}
                    {(() => {
                      const visibleSlots = apiSlots.filter(s => slotHour(s) >= 9 && slotHour(s) <= 20);
                      if (slotsLoading || slotsError) return null;
                      if (visibleSlots.length === 0) {
                        return (
                          <p className="text-[10px] leading-relaxed py-4" style={{ color: "rgba(255,255,255,0.28)" }}>
                            No availability found for this date within standard 9 AM – 9 PM hours. Try a different day or{" "}
                            <a href="tel:+12104179614" style={{ color: BLUE }}>call us</a> to discuss options.
                          </p>
                        );
                      }
                      return (
                        <div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {visibleSlots.map(slot => {
                              const label = hhmm24to12(slot);
                              return (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(label)}
                                  className="py-2.5 text-xs font-bold border transition-colors"
                                  style={{
                                    borderColor:     selectedTime === label ? BLUE : DIV,
                                    color:           selectedTime === label ? BLUE : "rgba(255,255,255,0.45)",
                                    backgroundColor: selectedTime === label ? "rgba(77,159,219,0.1)" : "transparent",
                                  }}
                                >{label}</button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                )}

                {/* Hours notice — always visible below the calendar */}
                <p className="text-[10px] leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.28)" }}>
                  Standard hours: 9 AM – 9 PM, 7 days a week. For 24/7 RON, mobile signings until midnight, or a dedicated after-hours line, see{" "}
                  <Link href="/business" style={{ color: BLUE }}>Docsy Business+ Firm accounts</Link>.
                </p>

                {/* Note */}
                {selectedDate && selectedTime && (
                  <div className="border-t mt-6 pt-6 space-y-6" style={{ borderColor: DIV }}>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Additional Note (optional)</p>
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={3}
                        placeholder="Parking info, accessibility needs, document details, extra signers, etc."
                        className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none resize-none"
                        style={{ borderColor: DIV, color: IVORY, caretColor: BLUE } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Promo Code (optional)</p>
                      <p className="text-[10px] text-white/20 mb-3">Active promotions apply automatically — no code required. Enter one only if you have it.</p>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="e.g. HONORPASS"
                        className="w-full px-4 py-3 text-sm font-bold bg-transparent border outline-none"
                        style={{ borderColor: promoInvalid ? "#e05252" : promoDiscount ? BLUE : DIV, color: promoInvalid ? "#e05252" : BLUE, caretColor: BLUE, letterSpacing: "0.08em" } as React.CSSProperties}
                      />
                      {promoInvalid && (
                        <p className="text-[10px] mt-2" style={{ color: "#e05252" }}>Code not recognized or doesn't apply to your selected services.</p>
                      )}
                      {promoDiscount && (
                        <p className="text-[10px] mt-2 font-bold" style={{ color: BLUE }}>✓ {promoDiscount.label} applied</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right: summary + confirm ── */}
              <div className="border-t lg:border-t-0 px-6 py-8" style={{ borderColor: DIV }}>

                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Price Summary</p>

                {estimate ? (
                  <div className="mb-6">
                    <div className="mb-4">
                      <HonorPassUpsell returnTo="/booking" variant="inline" />
                    </div>
                    {estimate.services.map(s => (
                      <div key={s.name} className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                        <span className="font-bold" style={{ color: IVORY }}>${s.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    {allAutoPromos.map(p => (
                      <div key={p.label} className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
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
                    {promoDiscount && (
                      <div className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
                        <span style={{ color: BLUE }}>↳ {promoDiscount.label}</span>
                        <span className="font-bold" style={{ color: BLUE }}>−${Math.abs(promoDiscount.amount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-sm font-bold text-white">Calculated Total</span>
                      <div className="text-right">
                        {(allAutoPromos.length > 0 || promoDiscount) && (
                          <span className="text-sm line-through mr-2" style={{ color: "rgba(255,255,255,0.3)" }}>${estimate.total.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-black" style={{ color: BLUE }}>
                          ${(allAutoPromos.length > 0 || promoDiscount) ? discountedTotal.toFixed(2) : estimate.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 pb-4 border-b" style={{ borderColor: DIV }}>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                      No price quote found.{" "}
                      <Link href="/calculate" style={{ color: BLUE }}>Use the Calculator first →</Link>
                    </p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="mb-6 p-4 border" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Preferred Appointment</p>
                    <p className="text-sm font-black text-white">{formatDate(selectedDate)}</p>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{selectedTime}</p>
                  </div>
                )}

                <button
                  onClick={handleConfirmClick}
                  disabled={!canConfirm}
                  className="w-full py-4 text-base font-bold text-white mb-4 transition-opacity"
                  style={{ backgroundColor: "#000", opacity: canConfirm ? 1 : 0.3, cursor: canConfirm ? "pointer" : "not-allowed" }}
                >
                  {canConfirm ? "Confirm Booking Request" : "Select a date & time"}
                </button>

                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
                  Booking is not confirmed until you receive an email from Docsy. You know your price before you book — always. Final price confirmed before your appointment starts.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
