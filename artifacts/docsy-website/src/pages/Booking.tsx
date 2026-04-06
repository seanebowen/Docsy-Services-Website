import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

interface ServiceLine { name: string; amount: number; }
interface EstimateSummary { services: ServiceLine[]; total: number; baseTotal?: number; hasRON: boolean; }
type PromoResult = { label: string; amount: number } | null;

function parseHour(timeStr: string): number {
  const [clock, period] = timeStr.split(" ");
  let h = parseInt(clock.split(":")[0], 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h;
}

function applyPromoCode(code: string, estimate: EstimateSummary | null, appliedAuto: { label: string; amount: number }[] = []): PromoResult {
  if (!estimate || !code.trim()) return null;
  const n = code.trim().toUpperCase();
  const { services, baseTotal, total } = estimate;
  const base = baseTotal ?? total;
  const has    = (kw: string) => services.some(s => s.name.toLowerCase().includes(kw.toLowerCase()));
  const autoHas = (kw: string) => appliedAuto.some(p => p.label.toLowerCase().includes(kw.toLowerCase()));
  switch (n) {
    case "HONORPASS":
      return { label: "HonorPass — 10% Off Base Service Fee", amount: -Math.round(base * 0.10) };
    case "WEEKENDWARRIOR": {
      if (autoHas("weekend warrior")) return null;
      const ln = services.find(s => s.name.toLowerCase().includes("loan signing"));
      return ln ? { label: "Weekend Warrior™ — 20% Off Loan Signing", amount: -Math.round(ln.amount * 0.20) } : null;
    }
    case "EARLYBIRDSEAL":
      if (autoHas("early bird")) return null;
      return has("remote online") ? { label: "Early Bird Seal™ — $10 Off Base RON Fee", amount: -10 } : null;
    case "LUNCHBREAKSEAL":
      if (autoHas("lunch break")) return null;
      return has("remote online") ? { label: "Lunch Break Seal™ — $10 Off Base RON Fee", amount: -10 } : null;
    case "NIGHTSHIFTSEAL":
      if (autoHas("night shift")) return null;
      return has("remote online") ? { label: "Night Shift Seal™ — $10 Off Base RON Fee", amount: -10 } : null;
    case "MIDDAYMILES":
      if (autoHas("midday miles")) return null;
      return has("general notary work") ? { label: "Midday Miles™ — $10 Off Base Notary Fee", amount: -10 } : null;
    default:
      return null;
  }
}

const MONTHS   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDayOf(y: number, m: number)  { return new Date(y, m, 1).getDay(); }

const TIME_SLOTS = Array.from({ length: 17 }, (_, i) => {
  const h   = i + 7;
  const h12 = h > 12 ? h - 12 : h === 12 ? 12 : h;
  return `${h12}:00 ${h >= 12 ? "PM" : "AM"}`;
});

/* ── Terms & Safe+ modal ── */
function BookingModal({
  onConfirm,
  onCancel,
  hasDeliverables,
}: {
  onConfirm: (safePlus: boolean) => void;
  onCancel: () => void;
  hasDeliverables: boolean;
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [safePlus,    setSafePlus]    = useState<"in" | "out">("in");

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
                The estimate shown is for planning purposes only. Your confirmed price is provided before the appointment starts — always. Final pricing may vary only if document count, session duration, or additional services change, and any difference is disclosed before you confirm.
              </p>
              <p className="mb-2">
                Travel fees (mobile only) are based on your distance tier. Rush, after-hours, and late-night surcharges apply only if relevant and are disclosed at booking. Statutory notary fees ($10 first signature, $1 each additional) are set by Texas law and itemized separately on every invoice.
              </p>
              <p>
                By proceeding you agree that Docsy may contact you to confirm your appointment, discuss document requirements, and send your invoice. You may cancel or reschedule at any time before confirmation.
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setTermsAgreed(v => !v)}>
              <div
                className="mt-0.5 w-5 h-5 shrink-0 border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor:     termsAgreed ? BLUE : "rgba(255,255,255,0.2)",
                  backgroundColor: termsAgreed ? BLUE : "transparent",
                }}
              >
                {termsAgreed && <span className="text-black text-[11px] font-black leading-none">✓</span>}
              </div>
              <span className="text-sm font-medium leading-snug" style={{ color: termsAgreed ? IVORY : "rgba(255,255,255,0.5)" }}>
                I have read and agree to the rates, fees, and booking terms above.
              </span>
            </label>
          </div>

          {/* ── 2. Safe+ — only if booking includes deliverable services ── */}
          {hasDeliverables && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                02 — Docsy Safe+ File Vault
              </p>
              <div className="border p-4 mb-4 text-xs leading-relaxed" style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}>
                Docsy Safe+ is an encrypted file vault. All appointment deliverables — notarized documents, apostilled files, signed loan packages, deposition transcripts, and audio recordings — upload automatically after every appointment. The first <strong className="text-white/60">30 days are free</strong> — no credit card, no signup. After 30 days it's $7/month if you choose to continue. You can cancel anytime.
              </div>
              <div className="space-y-2">
                {([
                  ["in",  "Yes — enroll me in the free 30-day Safe+ trial"],
                  ["out", "No thanks — I'll opt out of Safe+"],
                ] as ["in" | "out", string][]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-3 cursor-pointer" onClick={() => setSafePlus(val)}>
                    <div
                      className="w-4 h-4 shrink-0 border-2 flex items-center justify-center"
                      style={{
                        borderColor:     safePlus === val ? BLUE : "rgba(255,255,255,0.2)",
                        backgroundColor: "transparent",
                      }}
                    >
                      {safePlus === val && (
                        <div className="w-2 h-2" style={{ backgroundColor: BLUE }} />
                      )}
                    </div>
                    <span className="text-sm font-medium" style={{ color: safePlus === val ? IVORY : "rgba(255,255,255,0.45)" }}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: DIV }}>
          <button
            onClick={() => onConfirm(hasDeliverables ? safePlus === "in" : false)}
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

/* ── Main page ── */
export default function Booking() {
  const [, setLocation] = useLocation();
  const [estimate, setEstimate]       = useState<EstimateSummary | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote]               = useState("");
  const [promoCode, setPromoCode]     = useState("");
  const [showModal, setShowModal]     = useState(false);

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
      // Apostille bundle applies regardless of time — compute it even without a time slot
      if (!estimate) return [];
      const apostSvc = estimate.services.find(s =>
        s.name.toLowerCase().includes("apostille") && !s.name.toLowerCase().includes("turnaround")
      );
      if (apostSvc) {
        const m = apostSvc.name.match(/\((\d+) doc/);
        const docs = m ? parseInt(m[1], 10) : 1;
        if (docs >= 5) return [{ label: `Apostille Bundle Rate — $90/doc (${docs} docs)`, amount: 0, rateOnly: true }];
      }
      return [];
    }
    const day  = selectedDate.getDay();
    const isWeekend = day === 0 || day === 6;
    const isWeekday = day >= 1 && day <= 5;
    const hour = parseHour(selectedTime);
    const has  = (kw: string) => estimate.services.some(s => s.name.toLowerCase().includes(kw.toLowerCase()));
    const result: { label: string; amount: number; rateOnly?: boolean }[] = [];

    if (has("remote online")) {
      if      (hour >= 8  && hour < 10) result.push({ label: "Early Bird Seal™ — $10 Off",  amount: -10 });
      else if (hour >= 11 && hour < 13) result.push({ label: "Lunch Break Seal™ — $10 Off", amount: -10 });
      else if (hour >= 21)              result.push({ label: "Night Shift Seal™ — $10 Off",  amount: -10 });
    }
    if (has("general notary work") && isWeekday && hour >= 12 && hour < 18)
      result.push({ label: "Midday Miles™ — $10 Off", amount: -10 });
    if (has("loan signing") && isWeekend) {
      const ln = estimate.services.find(s => s.name.toLowerCase().includes("loan signing"));
      if (ln) result.push({ label: "Weekend Warrior™ — 20% Off Loan Signing", amount: -Math.round(ln.amount * 0.20) });
    }
    // Apostille bundle — rate already baked in, show as applied note
    const apostSvc = estimate.services.find(s =>
      s.name.toLowerCase().includes("apostille") && !s.name.toLowerCase().includes("turnaround")
    );
    if (apostSvc) {
      const m = apostSvc.name.match(/\((\d+) doc/);
      const docs = m ? parseInt(m[1], 10) : 1;
      if (docs >= 5) result.push({ label: `Apostille Bundle Rate — $90/doc (${docs} docs)`, amount: 0, rateOnly: true });
    }
    return result;
  }, [selectedDate, selectedTime, estimate]);

  const autoPromoTotal  = autoPromos.reduce((sum, p) => sum + p.amount, 0);
  const promoDiscount   = useMemo(() => applyPromoCode(promoCode, estimate, autoPromos), [promoCode, estimate, autoPromos]);
  const promoInvalid    = promoCode.trim().length > 0 && promoDiscount === null;
  const discountedTotal = estimate ? Math.max(0, estimate.total + autoPromoTotal + (promoDiscount?.amount ?? 0)) : 0;

  const today    = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear,  setViewYear]  = useState(today.getFullYear());

  useEffect(() => {
    document.title = "Book Your Appointment | Docsy Notary Services";
    try {
      const stored = sessionStorage.getItem("docsy_estimate");
      if (stored) setEstimate(JSON.parse(stored));
    } catch {}
  }, []);

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
  const handleModalConfirm = (safePlusOptIn: boolean) => {
    sessionStorage.setItem("docsy_booking", JSON.stringify({
      date: selectedDate!.toISOString(),
      time: selectedTime,
      note,
      promoCode: promoCode.trim(),
      promoDiscount,
      autoPromos,
      discountedTotal,
      estimate,
      safePlusOptIn,
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
              <Link href="/estimate" className="inline-block text-sm font-bold text-black/40 hover:text-black/70 mb-6 transition-colors">
                ← Back to Calculator
              </Link>
              <h1 className="text-[3rem] sm:text-[4.5rem] font-black leading-none text-black mb-4" style={{ letterSpacing: "-0.03em" }}>
                Choose your time.
              </h1>
            </FadeIn>
            <FadeIn delay={140}>
              <p className="text-lg text-black/60 max-w-lg font-medium">
                Pick a preferred date and time slot. Your booking is not confirmed until you receive a confirmation email from Docsy.
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
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Available times — {formatDate(selectedDate)}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className="py-2.5 text-xs font-bold border transition-colors"
                          style={{
                            borderColor:     selectedTime === slot ? BLUE : DIV,
                            color:           selectedTime === slot ? BLUE : "rgba(255,255,255,0.45)",
                            backgroundColor: selectedTime === slot ? "rgba(77,159,219,0.1)" : "transparent",
                          }}
                        >{slot}</button>
                      ))}
                    </div>
                  </div>
                )}

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
                    {estimate.services.map(s => (
                      <div key={s.name} className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                        <span className="font-bold" style={{ color: IVORY }}>${s.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    {autoPromos.map(p => (
                      <div key={p.label} className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
                        <span className="flex items-center gap-2" style={{ color: BLUE }}>
                          ↳ {p.label}
                          <span className="text-[8px] font-black uppercase tracking-widest px-1 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.15)", color: BLUE }}>Auto</span>
                        </span>
                        {p.rateOnly
                          ? <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>Applied</span>
                          : <span className="font-bold" style={{ color: BLUE }}>−${Math.abs(p.amount).toFixed(2)}</span>
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
                      <span className="text-sm font-bold text-white">Est. Total</span>
                      <div className="text-right">
                        {(autoPromos.length > 0 || promoDiscount) && (
                          <span className="text-sm line-through mr-2" style={{ color: "rgba(255,255,255,0.3)" }}>${estimate.total.toLocaleString()}</span>
                        )}
                        <span className="text-2xl font-black" style={{ color: BLUE }}>
                          ${(autoPromos.length > 0 || promoDiscount) ? discountedTotal.toLocaleString() : estimate.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 pb-4 border-b" style={{ borderColor: DIV }}>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                      No price quote found.{" "}
                      <Link href="/estimate" style={{ color: BLUE }}>Use the Calculator first →</Link>
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
