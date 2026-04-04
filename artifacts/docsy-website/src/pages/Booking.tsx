import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

interface ServiceLine { name: string; amount: number; }
interface EstimateSummary { services: ServiceLine[]; total: number; hasRON: boolean; }

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDayOf(y: number, m: number) { return new Date(y, m, 1).getDay(); }

const TIME_SLOTS = Array.from({ length: 17 }, (_, i) => {
  const h = i + 7;
  const h12 = h > 12 ? h - 12 : h === 12 ? 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h12}:00 ${ampm}`;
});

export default function Booking() {
  const [, setLocation] = useLocation();
  const [estimate, setEstimate]         = useState<EstimateSummary | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote]                 = useState("");

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
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayMid;
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

  const handleConfirm = () => {
    if (!canConfirm) return;
    sessionStorage.setItem("docsy_booking", JSON.stringify({
      date: selectedDate!.toISOString(),
      time: selectedTime,
      note,
      estimate,
    }));
    setLocation("/booking/confirmation");
  };

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-12 sm:pt-20 sm:pb-14" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <Link href="/estimate" className="inline-block text-sm font-bold text-black/40 hover:text-black/70 mb-6 transition-colors">
              ← Back to Estimator
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
                          color:           past     ? "rgba(255,255,255,0.12)" : selected ? "#000" : _today ? BLUE : "rgba(255,255,255,0.75)",
                          backgroundColor: selected ? BLUE : "transparent",
                          cursor:          past     ? "not-allowed" : "pointer",
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
                <div className="border-t mt-6 pt-6" style={{ borderColor: DIV }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Additional Note (optional)</p>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={3}
                    placeholder="Parking info, accessibility needs, document details, extra signers, etc."
                    className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none resize-none"
                    style={{ borderColor: DIV, color: IVORY, caretColor: BLUE, placeholder: "rgba(255,255,255,0.25)" } as React.CSSProperties}
                  />
                </div>
              )}
            </div>

            {/* ── Right: summary + confirm ── */}
            <div className="border-t lg:border-t-0 px-6 py-8" style={{ borderColor: DIV }}>

              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Estimate Summary</p>

              {estimate ? (
                <div className="mb-6">
                  {estimate.services.map(s => (
                    <div key={s.name} className="flex justify-between py-2 border-b text-sm" style={{ borderColor: DIV }}>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                      <span className="font-bold" style={{ color: IVORY }}>${s.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-baseline pt-4">
                    <span className="text-sm font-bold text-white">Est. Total</span>
                    <span className="text-2xl font-black" style={{ color: BLUE }}>${estimate.total.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6 pb-4 border-b" style={{ borderColor: DIV }}>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                    No estimate found.{" "}
                    <Link href="/estimate" style={{ color: BLUE }}>Build one first →</Link>
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
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="w-full py-4 text-base font-bold text-white mb-4 transition-opacity"
                style={{ backgroundColor: "#000", opacity: canConfirm ? 1 : 0.3, cursor: canConfirm ? "pointer" : "not-allowed" }}
              >
                {canConfirm ? "Confirm Booking Request" : "Select a date & time"}
              </button>

              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
                Booking is not confirmed until you receive an email from Docsy. Written estimate confirming final price will be sent before your appointment.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
