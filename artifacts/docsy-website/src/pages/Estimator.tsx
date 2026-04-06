import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const AMBER = "#4D9FDB";
const DIV   = "#1e2a3a";

/* ── Geocoding helpers (Nominatim / OpenStreetMap — free, no API key) ── */
const HOMEBASE = { lat: 29.5958, lng: -98.7255 }; // San Antonio TX 78253, Alamo Ranch
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const toR = (d: number) => (d * Math.PI) / 180;
  const dLat = toR(lat2 - lat1);
  const dLng = toR(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function distanceToTier(miles: number): 1 | 2 | 3 | 4 {
  if (miles <= 10) return 1;
  if (miles <= 25) return 2;
  if (miles <= 40) return 3;
  return 4;
}

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "#000", padding: "0 5px" }}>{children}</span>
);

/* ─── tiny label pill ─── */
const Pill = ({ text }: { text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: AMBER, color: AMBER }}>
      ⊙ {text}
    </span>
  </div>
);

/* ─── control helpers ─── */
function Stepper({ value, onChange, min = 1, max = 50 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  const [draft, setDraft] = React.useState<string>(String(value));
  React.useEffect(() => { setDraft(String(value)); }, [value]);

  const commit = (raw: string) => {
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    else setDraft(String(value));
  };

  return (
    <div className="flex items-center gap-0 border" style={{ borderColor: DIV }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-3 py-1.5 text-sm font-bold transition-colors hover:bg-white/10"
        style={{ color: "rgba(255,255,255,0.5)", borderRight: `1px solid ${DIV}` }}
      >−</button>
      <input
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") commit(draft); }}
        className="px-2 py-1.5 text-sm font-bold text-white text-center bg-transparent outline-none min-w-[3rem]"
        style={{ caretColor: AMBER } as React.CSSProperties}
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-3 py-1.5 text-sm font-bold transition-colors hover:bg-white/10"
        style={{ color: "rgba(255,255,255,0.5)", borderLeft: `1px solid ${DIV}` }}
      >+</button>
    </div>
  );
}

function RadioRow({ label, price, selected, onClick }: { label: string; price: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 border-b text-left transition-colors hover:bg-white/5"
      style={{ borderColor: DIV, backgroundColor: selected ? "rgba(77,159,219,0.08)" : "transparent" }}
    >
      <span className="flex items-center gap-3">
        <span className="w-4 h-4 border flex items-center justify-center shrink-0" style={{ borderColor: selected ? AMBER : "rgba(255,255,255,0.2)" }}>
          {selected && <span className="w-2 h-2" style={{ backgroundColor: AMBER }} />}
        </span>
        <span className="text-sm" style={{ color: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>{label}</span>
      </span>
      <span className="text-sm font-bold ml-4" style={{ color: selected ? IVORY : "rgba(255,255,255,0.3)" }}>{price}</span>
    </button>
  );
}

function CheckRow({ label, price, checked, onChange }: { label: string; price: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between px-4 py-3 border-b text-left transition-colors hover:bg-white/5"
      style={{ borderColor: DIV, backgroundColor: checked ? "rgba(77,159,219,0.08)" : "transparent" }}
    >
      <span className="flex items-center gap-3">
        <span className="w-4 h-4 border flex items-center justify-center shrink-0 text-[10px]" style={{ borderColor: checked ? AMBER : "rgba(255,255,255,0.2)", color: AMBER }}>
          {checked && "✓"}
        </span>
        <span className="text-sm" style={{ color: checked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>{label}</span>
      </span>
      <span className="text-sm font-bold ml-4" style={{ color: checked ? IVORY : "rgba(255,255,255,0.3)" }}>{price}</span>
    </button>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{children}</p>;
}

/* ─── pricing logic ─── */

type LoanPackage = "refi" | "buyer" | "seller" | "heloc" | "reverse" | "mod";
type ApostilleType = "personal" | "business" | "federal";
type ApostilleTurnaround = "standard" | "nextday" | "sameday";
type CourtFormat = "inperson" | "remote";
type CourtDuration = "2hr" | "halfday" | "fullday";
type TranscriptSpeed = "14day" | "7day" | "3day" | "sameday";

interface RONState   { docs: number; witness: number; signers: number; }
interface GNWState   { seals: number; witness: number; signers: number; address: string; }
interface TravelState {
  tier: 1 | 2 | 3 | 4;
  afterHours: boolean; lateNight: boolean; holiday: boolean;
}
interface LoanState  { packages: LoanPackage[]; address: string; }
interface ApostilleState {
  types: ApostilleType[]; docs: number; turnaround: ApostilleTurnaround; mobile: boolean; address: string;
}
interface CourtState {
  format: CourtFormat; duration: CourtDuration;
  transcript: boolean; pages: number; speed: TranscriptSpeed;
}

/* Witness: $10/witness. Additional signers: $5/signer beyond first. */
function calcRON(s: RONState): number {
  return 25 + Math.max(0, s.docs - 1) * 5 + s.witness * 10 + Math.max(0, s.signers - 1) * 5;
}
function calcGNW(s: GNWState): number {
  return 10 + Math.max(0, s.seals - 1) * 1 + s.witness * 10 + Math.max(0, s.signers - 1) * 5;
}
function timingFee(s: TravelState): number {
  return (s.lateNight ? 35 : s.afterHours ? 20 : 0) + (s.holiday ? 20 : 0);
}

/* Returns true if the given date falls on a US federal holiday (or its observed substitute). */
function isFederalHoliday(date: Date): boolean {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0-indexed
  const d = date.getDate();
  /* Shift a fixed-date holiday to its observed weekday */
  const obs = (hm: number, hd: number): [number, number] => {
    const hw = new Date(y, hm, hd).getDay();
    if (hw === 0) { const n = new Date(y, hm, hd + 1); return [n.getMonth(), n.getDate()]; }
    if (hw === 6) { const n = new Date(y, hm, hd - 1); return [n.getMonth(), n.getDate()]; }
    return [hm, hd];
  };
  /* nth weekday of a given month (wday: 0=Sun … 6=Sat, n: 1-based) */
  const nthW = (hm: number, wday: number, n: number): [number, number] => {
    const firstDow = new Date(y, hm, 1).getDay();
    const offset   = (wday - firstDow + 7) % 7;
    return [hm, 1 + offset + (n - 1) * 7];
  };
  /* Last weekday of a given month */
  const lastW = (hm: number, wday: number): [number, number] => {
    const last = new Date(y, hm + 1, 0);
    return [hm, last.getDate() - (last.getDay() - wday + 7) % 7];
  };
  const ck = ([hm, hd]: [number, number]) => m === hm && d === hd;
  return (
    ck(obs(0, 1))       || // New Year's Day
    ck(nthW(0, 1, 3))   || // MLK Day — 3rd Mon Jan
    ck(nthW(1, 1, 3))   || // Presidents Day — 3rd Mon Feb
    ck(lastW(4, 1))     || // Memorial Day — last Mon May
    ck(obs(6, 4))       || // Independence Day
    ck(nthW(8, 1, 1))   || // Labor Day — 1st Mon Sep
    ck(nthW(9, 1, 2))   || // Columbus Day — 2nd Mon Oct
    ck(nthW(10, 4, 4))  || // Thanksgiving — 4th Thu Nov
    ck(obs(11, 25))        // Christmas
  );
}
/* GNW travel tier: $30/$45/$65/$85 — only applied when GNW is the sole in-person service (or 40+ miles extension) */
function gnwTierFee(tier: 1|2|3|4): number { return [0, 30, 45, 65, 85][tier]; }

function calcLoan(s: LoanState): number {
  const prices: Record<LoanPackage, number> = { refi: 175, buyer: 200, seller: 125, heloc: 175, reverse: 225, mod: 100 };
  return s.packages.reduce((sum, pkg) => sum + prices[pkg], 0);
}

function calcApostille(s: ApostilleState): number {
  if (s.types.length === 0) return 0;
  const standardBase: Record<ApostilleType, number> = { personal: 150, business: 175, federal: 275 };
  const turnaroundAddon: Record<ApostilleTurnaround, number> = { standard: 0, nextday: 50, sameday: 75 };
  const hasFederal = s.types.includes("federal");
  const nonFederal = s.types.filter(t => t !== "federal");
  let base = hasFederal ? 275 : 0;
  base += nonFederal.reduce((sum, t) => sum + standardBase[t], 0);
  if (s.docs > 1) base += (s.docs - 1) * (s.docs >= 5 ? 90 : 100);
  return base + turnaroundAddon[s.turnaround];
}

function calcCourt(s: CourtState): number {
  const appearFees: Record<CourtFormat, Record<CourtDuration, number>> = {
    inperson: { "2hr": 225, halfday: 325, fullday: 550 },
    remote:   { "2hr": 150, halfday: 250, fullday: 450 },
  };
  const appear = appearFees[s.format][s.duration];
  if (!s.transcript) return appear;
  const ratePerPage: Record<TranscriptSpeed, number> = {
    "14day": 4.75, "7day": 5.75, "3day": 6.75, sameday: 0,
  };
  return appear + s.pages * ratePerPage[s.speed];
}

/* ── Base-fee-only versions (excludes add-ons/surcharges) ── */
function calcRONBase(_s: RONState): number { return 25; }
function calcGNWBase(s: GNWState): number  { return 10 + Math.max(0, s.seals - 1) * 1; }
function calcLoanBase(s: LoanState): number { return calcLoan(s); }
function calcApostilleBase(s: ApostilleState): number {
  // base service fee only — excludes next-day / same-day turnaround add-ons
  if (s.types.length === 0) return 0;
  const standardBase: Record<ApostilleType, number> = { personal: 150, business: 175, federal: 275 };
  const hasFederal = s.types.includes("federal");
  const nonFederal = s.types.filter(t => t !== "federal");
  let base = hasFederal ? 275 : 0;
  base += nonFederal.reduce((sum, t) => sum + standardBase[t], 0);
  if (s.docs > 1) base += (s.docs - 1) * (s.docs >= 5 ? 90 : 100);
  return base;
}
function calcCourtBase(s: CourtState): number { // appearance fee only; transcript is an add-on
  const appearFees: Record<CourtFormat, Record<CourtDuration, number>> = {
    inperson: { "2hr": 225, halfday: 325, fullday: 550 },
    remote:   { "2hr": 150, halfday: 250, fullday: 450 },
  };
  return appearFees[s.format][s.duration];
}

/* ─── service card wrapper ─── */
function ServiceCard({
  num, title, desc, startingAt, active, onToggle, children,
}: {
  num: string; title: string; desc: string; startingAt: string;
  active: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div
      className="border-b transition-colors"
      style={{
        borderColor: DIV,
        borderLeft: active ? `3px solid ${AMBER}` : "3px solid transparent",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-5 px-6 py-6 text-left transition-colors hover:bg-white/5"
        style={{ backgroundColor: active ? "rgba(77,159,219,0.04)" : "transparent" }}
      >
        {/* checkbox-style indicator */}
        <span
          className="shrink-0 w-5 h-5 border flex items-center justify-center mt-0.5 text-[11px] font-bold transition-colors"
          style={{
            borderColor: active ? AMBER : "rgba(255,255,255,0.18)",
            color: AMBER,
            backgroundColor: active ? "rgba(77,159,219,0.15)" : "transparent",
          }}
        >
          {active ? "✓" : ""}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold font-mono" style={{ color: active ? AMBER : "rgba(255,255,255,0.2)" }}>[{num}]</span>
            <p className="text-base font-black text-white leading-tight">{title}</p>
            {active && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.2)", color: AMBER }}>
                In quote
              </span>
            )}
          </div>
          <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</p>
        </div>
        <div className="shrink-0 text-right ml-4">
          {!active && (
            <>
              <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.25)" }}>from</p>
              <p className="text-base font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>{startingAt}</p>
            </>
          )}
          {active && (
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
              collapse ↑
            </p>
          )}
        </div>
      </button>

      {active && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: DIV, backgroundColor: "rgba(0,0,0,0.15)" }}>
          <div className="pt-5">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ─── line item in summary ─── */
function SummaryLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: DIV }}>
      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: IVORY }}>${amount.toFixed(2)}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════ */
export default function Estimator() {
  React.useEffect(() => { document.title = "Price Calculator | Docsy Notary Services"; }, []);

  /* active service toggles */
  const [ronOn,   setRonOn]   = useState(false);
  const [gnwOn,   setGnwOn]   = useState(false);
  const [loanOn,  setLoanOn]  = useState(false);
  const [apostOn, setApostOn] = useState(false);
  const [courtOn, setCourtOn] = useState(false);

  /* RON state */
  const [ron, setRon] = useState<RONState>({ docs: 1, witness: 0, signers: 1 });

  /* General Notary Work state */
  const [gnw, setGnw] = useState<GNWState>({ seals: 1, witness: 0, signers: 1, address: "" });

  /* Appointment date + time for timing fee auto-detection */
  const [apptDate, setApptDate] = useState<string>("");
  const [apptTime, setApptTime] = useState<string>("");

  /* Shared travel state — distance tier + timing, one per appointment */
  const [travel, setTravel] = useState<TravelState>({
    tier: 1,
    afterHours: false, lateNight: false, holiday: false,
  });

  /* Loan state */
  const [loan, setLoan] = useState<LoanState>({ packages: ["refi"], address: "" });

  /* Apostille state */
  const [apost, setApost] = useState<ApostilleState>({
    types: ["personal"], docs: 1, turnaround: "standard", mobile: false, address: "",
  });

  /* Court state */
  const [court, setCourt] = useState<CourtState>({
    format: "inperson", duration: "2hr",
    transcript: false, pages: 100, speed: "14day",
  });

  /* Geocoding state */
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [geoMiles, setGeoMiles]   = useState<number | null>(null);
  const geoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Travel fee logic ──────────────────────────────────────────────────────
     - Apostille & Loan Signing include a base travel fee in their pricing.
     - If ONLY GNW is selected (no Apostille/Loan Signing), GNW pays the tier fee.
     - If GNW is combined with Apostille or Loan Signing, GNW travel is waived
       (the trip is already covered). The Apostille/Loan Signing pricing absorbs it.
     - Extended distance (Tier 4, 40+ miles) always adds $85, even for Apostille/Loan Signing.
     - Timing surcharges apply once per appointment when any in-person service is selected.
  ─────────────────────────────────────────────────────────────────────────── */
  const needsTravel    = gnwOn || loanOn || (apostOn && apost.mobile);
  const hasIncludedTravel = loanOn || (apostOn && apost.mobile); // travel already baked into these services
  const gnwTravelWaived   = gnwOn && hasIncludedTravel;           // GNW travel free when combined

  /* GNW tier fee: full fee when alone, waived when combined (regardless of tier),
     BUT if tier 4 (40+ miles) and combined — still $0, extended fee covers it. */
  const gnwTierTotal   = gnwOn && !gnwTravelWaived ? gnwTierFee(travel.tier) : 0;

  /* Extended distance surcharge: applies when Apostille/Loan Signing is selected AND tier 4 */
  const extendedFee    = hasIncludedTravel && travel.tier === 4 ? 85 : 0;

  /* Timing: in-person surcharges gated by needsTravel; holiday always applies when any service is selected */
  const anyOn = ronOn || gnwOn || loanOn || apostOn || courtOn;
  const inPersonTimingFee = needsTravel ? (travel.lateNight ? 35 : travel.afterHours ? 20 : 0) : 0;
  const timingTotal    = inPersonTimingFee + (anyOn && travel.holiday ? 20 : 0);

  const travelTotal    = gnwTierTotal + extendedFee + timingTotal;

  /* computed service totals (no travel inside these) */
  const ronTotal   = ronOn   ? calcRON(ron)        : 0;
  const gnwTotal   = gnwOn   ? calcGNW(gnw)        : 0;
  const loanTotal  = loanOn  ? calcLoan(loan)      : 0;
  const apostTotal = apostOn ? calcApostille(apost) : 0;
  const courtTotal = courtOn ? calcCourt(court)    : 0;
  const grandTotal = ronTotal + gnwTotal + loanTotal + apostTotal + courtTotal + travelTotal;

  const apostilleAddon = apostOn && apost.turnaround !== "standard"
    ? (apost.turnaround === "nextday" ? 50 : 75)
    : 0;
  const apostilleAddonLabel = apost.turnaround === "nextday" ? "Next-Day Turnaround" : "Same-Day Rush Turnaround";

  const baseTotal = (ronOn         ? calcRONBase(ron)        : 0)
                  + (gnwOn         ? calcGNWBase(gnw)        : 0)
                  + (loanOn        ? calcLoanBase(loan)      : 0)
                  + (apostOn       ? calcApostilleBase(apost): 0)
                  + (courtOn       ? calcCourtBase(court)    : 0)
                  + gnwTierFee(travel.tier) * (gnwOn && !gnwTravelWaived ? 1 : 0)
                  + extendedFee;
  const anySelected = anyOn;

  const [, setLocation] = useLocation();

  /* save estimate → navigate to booking */
  const handleBookJob = useCallback(() => {
    const services = [
      ronOn      && { name: "Remote Online Notarization",                                                                   amount: ronTotal },
      gnwOn      && { name: `General Notary Work (${gnw.seals} seal${gnw.seals !== 1 ? "s" : ""})`,                        amount: gnwTotal },
      loanOn     && { name: `Loan Signing (${loan.packages.length} pkg${loan.packages.length !== 1 ? "s" : ""})`,           amount: loanTotal },
      apostOn    && { name: `Apostille — ${apost.types.join(" + ")} (${apost.docs} doc${apost.docs > 1 ? "s" : ""})`,      amount: apostilleAddon > 0 ? apostTotal - apostilleAddon : apostTotal },
      apostOn && apostilleAddon > 0 && { name: `Apostille — ${apostilleAddonLabel}`,                                       amount: apostilleAddon },
      courtOn    && { name: "Court Reporting",                                                                              amount: courtTotal },
      travelTotal > 0 && { name: "Travel & Scheduling", amount: travelTotal },
    ].filter(Boolean) as { name: string; amount: number }[];
    sessionStorage.setItem("docsy_estimate", JSON.stringify({ services, total: grandTotal, baseTotal, hasRON: ronOn }));
    setLocation("/booking");
  }, [ronOn, gnwOn, loanOn, apostOn, courtOn, ronTotal, gnwTotal, loanTotal, apostTotal, courtTotal, travelTotal, grandTotal, baseTotal, apostilleAddon, apostilleAddonLabel, loan.packages, apost.types, apost.docs, gnw.seals]);

  /* helpers */
  const upG = useCallback((patch: Partial<GNWState>)      => setGnw(p    => ({ ...p, ...patch })), []);
  const upT = useCallback((patch: Partial<TravelState>)    => setTravel(p => ({ ...p, ...patch })), []);
  const upA = useCallback((patch: Partial<ApostilleState>) => setApost(p => ({ ...p, ...patch })), []);
  const upC = useCallback((patch: Partial<CourtState>)     => setCourt(p => ({ ...p, ...patch })), []);
  const upL = useCallback((patch: Partial<LoanState>)      => setLoan(p  => ({ ...p, ...patch })), []);

  /* ── Auto-detect timing fees from appointment date + time ── */
  useEffect(() => {
    const holiday = apptDate ? (() => {
      const [y, mo, d] = apptDate.split("-").map(Number);
      return isFederalHoliday(new Date(y, mo - 1, d));
    })() : false;

    let afterHours = false;
    let lateNight  = false;
    if (apptTime) {
      const [hStr, mStr] = apptTime.split(":");
      const hour = parseInt(hStr, 10) + parseInt(mStr, 10) / 60;
      lateNight  = hour >= 22;          // 10 PM – midnight
      afterHours = hour >= 21 && !lateNight; // 9 PM – 9:59 PM
    }
    upT({ holiday, afterHours, lateNight });
  }, [apptDate, apptTime, upT]);

  /* ── Auto-geocode: fires when user types an address in any in-person service field ── */
  const geocodeAddress = useCallback(async (addr: string) => {
    if (!addr.trim()) { setGeoStatus("idle"); setGeoMiles(null); return; }
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr)}&format=json&limit=1&countrycodes=us`;
      const res  = await fetch(url, { headers: { "User-Agent": "DcsyEstimator/1.0 (hello@docsynotary.com)" } });
      const data = await res.json() as { lat: string; lon: string }[];
      if (!data.length) { setGeoStatus("error"); return; }
      const miles = haversine(HOMEBASE.lat, HOMEBASE.lng, parseFloat(data[0].lat), parseFloat(data[0].lon));
      setGeoMiles(miles);
      setGeoStatus("done");
      upT({ tier: distanceToTier(miles) });
    } catch {
      setGeoStatus("error");
    }
  }, [upT]);

  const handleAddressGeo = useCallback((addr: string) => {
    if (geoTimerRef.current) clearTimeout(geoTimerRef.current);
    if (!addr.trim()) { setGeoStatus("idle"); setGeoMiles(null); return; }
    setGeoStatus("loading");
    geoTimerRef.current = setTimeout(() => geocodeAddress(addr), 900);
  }, [geocodeAddress]);

  const toggleLoanPkg = useCallback((key: LoanPackage) => {
    setLoan(prev => ({
      packages: prev.packages.includes(key)
        ? prev.packages.filter(k => k !== key)
        : [...prev.packages, key],
    }));
  }, []);

  const toggleApostType = useCallback((t: ApostilleType) => {
    setApost(prev => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter(x => x !== t)
        : [...prev.types, t],
    }));
  }, []);

  const loanLabels: Record<LoanPackage, [string, string]> = {
    refi:    ["Refinance Package", "$175"],
    buyer:   ["Buyer Purchase Package", "$200"],
    seller:  ["Seller Package", "$125"],
    heloc:   ["HELOC / Home Equity", "$175"],
    reverse: ["Reverse Mortgage", "$225"],
    mod:     ["Loan Modification", "$100"],
  };

  const transcriptSpeeds: [TranscriptSpeed, string, string][] = [
    ["14day",    "14-Day",             "$4.75/pg"],
    ["7day",     "7-Day Expedited",    "$5.75/pg"],
    ["3day",     "3-Day Rush",         "$6.75/pg"],
    ["sameday",  "Same-Day",           "Call for pricing"],
  ];

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <Pill text="STEP 1 OF 3 — PRICE CALCULATOR" />
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <span className="font-black">Know your cost</span>
              <br />
              <span className="font-light text-black/45">before you</span>
              <br />
              <span className="font-black"><H>book.</H></span>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Select your services and configure the details — your exact price calculates in real time. Your quote carries directly into the booking flow as Step 1 of 3.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Main estimator body ── */}
      <section className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">

            {/* Left: service cards */}
            <div className="lg:border-r" style={{ borderColor: DIV }}>

              {/* header row */}
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Check any service to build your quote</span>
                <span className="text-[10px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>Multiple selections allowed</span>
              </div>

              {/* ── RON ── */}
              <FadeIn delay={0} threshold={0.05}>
              <ServiceCard
                num="01" title="Remote Online Notarization"
                desc="Get notarized via live video in under 15 minutes. No travel. Anywhere in the US."
                startingAt="$25"
                active={ronOn} onToggle={() => setRonOn(o => !o)}
              >
                <div className="space-y-5">
                  <div>
                    <RowLabel>Number of documents / seals</RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={ron.docs} onChange={v => setRon(p => ({ ...p, docs: v }))} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {ron.docs === 1 ? "$25 flat" : `$25 + ${ron.docs - 1} × $5 additional`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Additional signers <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>(beyond the first — $5 each)</span></RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={ron.signers} onChange={v => setRon(p => ({ ...p, signers: v }))} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {ron.signers <= 1 ? "1 signer included" : `+${ron.signers - 1} additional × $5`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Does Docsy need to provide a witness? <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>($10 per witness)</span></RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      {([0, 1, 2] as const).map(n => (
                        <RadioRow key={n} label={n === 0 ? "No witness needed" : `Yes — ${n} witness${n > 1 ? "es" : ""}`} price={n === 0 ? "" : `+$${n * 10}`} selected={ron.witness === n} onClick={() => setRon(p => ({ ...p, witness: n }))} />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs font-light pt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Same-hour availability, digital certified copy, and 30-day Safe+ trial included at no extra charge.
                  </div>
                </div>
              </ServiceCard>
              </FadeIn>

              {/* ── General Notary Work ── */}
              <FadeIn delay={60} threshold={0.05}>
              <ServiceCard
                num="02" title="General Notary Work"
                desc="In-person notarizations — powers of attorney, affidavits, medical forms, and more. We come to you."
                startingAt="$40"
                active={gnwOn} onToggle={() => setGnwOn(o => !o)}
              >
                <div className="space-y-5">

                  <div>
                    <RowLabel>Number of notarizations (seals)</RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={gnw.seals} onChange={v => upG({ seals: v })} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {gnw.seals === 1 ? "$10 first seal" : `$10 + ${gnw.seals - 1} × $1`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Additional signers <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>(beyond the first — $5 each)</span></RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={gnw.signers} onChange={v => upG({ signers: v })} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {gnw.signers <= 1 ? "1 signer included" : `+${gnw.signers - 1} additional × $5`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Does Docsy need to provide a witness? <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>($10 per witness)</span></RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      {([0, 1, 2] as const).map(n => (
                        <RadioRow key={n} label={n === 0 ? "No witness needed" : `Yes — ${n} witness${n > 1 ? "es" : ""}`} price={n === 0 ? "" : `+$${n * 10}`} selected={gnw.witness === n} onClick={() => upG({ witness: n })} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <RowLabel>Service address</RowLabel>
                    <input
                      type="text"
                      value={gnw.address}
                      onChange={e => { upG({ address: e.target.value }); handleAddressGeo(e.target.value); }}
                      placeholder="123 Main St, San Antonio TX — home, office, hospital, hospice, etc."
                      className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none"
                      style={{ borderColor: DIV, color: IVORY, caretColor: AMBER }}
                    />
                    <p className="text-xs font-light mt-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                      Type your address — distance auto-calculates from Alamo Ranch (San Antonio, TX 78253).
                      {gnwTravelWaived && <span style={{ color: AMBER }}> Travel included — waived because Apostille or Loan Signing is also selected.</span>}
                    </p>
                  </div>

                </div>
              </ServiceCard>
              </FadeIn>

              {/* ── Shared Scheduling & Distance — only shows for GNW (travel is included in Loan/Apostille pricing) ── */}
              {gnwOn && (
                <FadeIn delay={0} threshold={0.01}>
                <div className="border-b" style={{ borderColor: DIV, borderLeft: `3px solid ${AMBER}` }}>
                  <div className="px-6 py-5 border-b" style={{ borderColor: DIV, backgroundColor: "rgba(77,159,219,0.04)" }}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold font-mono" style={{ color: AMBER }}>[SCHEDULING]</span>
                      <p className="text-base font-black text-white">Distance &amp; Timing</p>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.2)", color: AMBER }}>Applies once per appointment</span>
                    </div>
                    <div className="mt-1 ml-7 space-y-1">
                      {gnwTravelWaived && (
                        <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                          GNW travel waived — covered by your Apostille or Loan Signing appointment. Only extended distance (40+ miles) or timing surcharges may apply.
                        </p>
                      )}
                      {geoStatus === "idle" && !gnwTravelWaived && (
                        <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                          Type your address in any service field above — travel fee calculates automatically from Headquarters (Alamo Ranch, San Antonio TX 78253).
                        </p>
                      )}
                      {geoStatus === "loading" && (
                        <p className="text-sm font-light" style={{ color: AMBER }}>Calculating distance from Alamo Ranch…</p>
                      )}
                      {geoStatus === "done" && geoMiles !== null && (
                        <p className="text-sm font-light" style={{ color: AMBER }}>
                          ~{geoMiles.toFixed(1)} miles from Headquarters — travel fee updated.
                          {gnwTravelWaived ? " GNW travel still waived." : ""}
                        </p>
                      )}
                      {geoStatus === "error" && (
                        <p className="text-sm font-light" style={{ color: "rgba(255,130,130,0.85)" }}>
                          Address not found — double-check what you entered and try again.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6 border-t" style={{ borderColor: DIV, backgroundColor: "rgba(0,0,0,0.15)" }}>
                    <div className="pt-5 space-y-6">

                      <div>
                        <RowLabel>Distance tiers — for your reference</RowLabel>
                        <div className="border" style={{ borderColor: DIV }}>
                          {([
                            [1, "Tier 1", "0 to 10 miles",  gnwTravelWaived ? "included" : "$30"],
                            [2, "Tier 2", "11 to 25 miles", gnwTravelWaived ? "included" : "$45"],
                            [3, "Tier 3", "26 to 40 miles", gnwTravelWaived ? "included" : "$65"],
                            [4, "Tier 4", "40+ miles",      "$85 extended"],
                          ] as [1|2|3|4, string, string, string][]).map(([t, tierLabel, range, price]) => {
                            const isActive = geoStatus === "done" && travel.tier === t;
                            return (
                              <div key={t} className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
                                style={{ borderColor: DIV, backgroundColor: isActive ? "rgba(77,159,219,0.1)" : "transparent" }}>
                                <div className="flex items-center gap-3">
                                  {isActive && (
                                    <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 shrink-0"
                                      style={{ backgroundColor: AMBER, color: "#000" }}>Your tier</span>
                                  )}
                                  <span className="text-sm font-light"
                                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}>
                                    {tierLabel} — {range}
                                  </span>
                                </div>
                                <span className="text-sm font-bold ml-4"
                                  style={{ color: isActive ? AMBER : "rgba(255,255,255,0.25)" }}>
                                  {price}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        {gnwTravelWaived && travel.tier < 4 && geoStatus === "done" && (
                          <p className="text-xs font-light mt-2" style={{ color: AMBER }}>
                            Travel waived — GNW shares this appointment with a service that includes travel. No separate travel fee for tiers 1–3.
                          </p>
                        )}
                        {travel.tier === 4 && geoStatus === "done" && (
                          <p className="text-xs font-light mt-2" style={{ color: AMBER }}>
                            Extended distance (40+ miles) — $85 added even when travel is otherwise included.
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
                </FadeIn>
              )}

              {/* ── Loan Signing ── */}
              <FadeIn delay={120} threshold={0.05}>
              <ServiceCard
                num="03" title="Loan Signing"
                desc="Certified loan signing agent for refinance, buyer, seller, HELOC, and more. Flat rates."
                startingAt="$100"
                active={loanOn} onToggle={() => setLoanOn(o => !o)}
              >
                <div className="space-y-5">
                  <div>
                    <RowLabel>Select all packages needed</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      {(Object.keys(loanLabels) as LoanPackage[]).map(key => (
                        <CheckRow
                          key={key}
                          label={loanLabels[key][0]}
                          price={loanLabels[key][1]}
                          checked={loan.packages.includes(key)}
                          onChange={() => toggleLoanPkg(key)}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-light mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                      Scanbacks included with Refinance and Buyer Purchase packages. Docsy Safe+ 30-day trial included. Base travel included in pricing — extended distance (40+ miles) billed separately.
                    </p>
                  </div>
                  <div>
                    <RowLabel>Signing location address</RowLabel>
                    <input
                      type="text"
                      value={loan.address}
                      onChange={e => upL({ address: e.target.value })}
                      placeholder="Title company, escrow office, or your home/office address"
                      className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none"
                      style={{ borderColor: DIV, color: IVORY, caretColor: AMBER }}
                    />
                    <p className="text-xs font-light mt-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                      Travel is included in your package rate. Address is used for scheduling coordination.
                    </p>
                  </div>
                </div>
              </ServiceCard>

              </FadeIn>

              {/* ── Apostille ── */}
              <FadeIn delay={180} threshold={0.05}>
              <ServiceCard
                num="04" title="Apostille Services"
                desc="Texas apostille filing. State fee, digital scan, and return shipping prep all included."
                startingAt="$150"
                active={apostOn} onToggle={() => setApostOn(o => !o)}
              >
                <div className="space-y-6">

                  <div>
                    <RowLabel>Document types (select all that apply)</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <CheckRow label="Personal document" price="from $150" checked={apost.types.includes("personal")} onChange={() => toggleApostType("personal")} />
                      <CheckRow label="Business document" price="from $175" checked={apost.types.includes("business")} onChange={() => toggleApostType("business")} />
                      <CheckRow label="Federal / USDOS" price="$275 flat" checked={apost.types.includes("federal")} onChange={() => toggleApostType("federal")} />
                    </div>
                    <p className="text-xs font-light mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>Federal documents are always standard turnaround at $275 flat.</p>
                  </div>

                  {apost.types.some(t => t !== "federal") && (
                    <div>
                      <RowLabel>Turnaround <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>(applies to personal / business docs)</span></RowLabel>
                      <div className="border" style={{ borderColor: DIV }}>
                        <RadioRow
                          label="Standard"
                          price="base rate"
                          selected={apost.turnaround === "standard"}
                          onClick={() => upA({ turnaround: "standard" })}
                        />
                        <RadioRow
                          label="Next-Day"
                          price="+$50 add-on"
                          selected={apost.turnaround === "nextday"}
                          onClick={() => upA({ turnaround: "nextday" })}
                        />
                        <RadioRow
                          label="Same-Day Rush (order before 10 AM)"
                          price="+$75 add-on"
                          selected={apost.turnaround === "sameday"}
                          onClick={() => upA({ turnaround: "sameday" })}
                        />
                      </div>
                      {apost.turnaround === "standard" && (
                        <p className="text-xs font-light mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
                          Standard turnaround is subject to the Texas Secretary of State's processing times and is processed by mail. Turnaround can vary and is not guaranteed. Choose Next-Day or Same-Day if your timeline is firm.
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <RowLabel>Number of documents</RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={apost.docs} onChange={v => upA({ docs: v })} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {apost.docs >= 5
                          ? "Bundle rate — $90 each for 5+"
                          : apost.docs > 1
                            ? `+$100 each additional`
                            : "First document"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Document delivery method</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <RadioRow label="Mail-in / drop-off" price="no travel fee" selected={!apost.mobile} onClick={() => upA({ mobile: false })} />
                      <RadioRow label="Mobile pickup — notary comes to you" price="base travel included" selected={apost.mobile} onClick={() => upA({ mobile: true })} />
                    </div>
                    <p className="text-xs font-light mt-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                      Mobile pickup includes base travel. Extended distance (40+ miles) billed separately.
                    </p>
                  </div>

                  <div>
                    <RowLabel>
                      {apost.mobile ? "Pickup address" : "Mailing / drop-off address"}
                    </RowLabel>
                    <input
                      type="text"
                      value={apost.address}
                      onChange={e => upA({ address: e.target.value })}
                      placeholder={apost.mobile ? "Your address for mobile pickup" : "Mailing address or drop-off location"}
                      className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none"
                      style={{ borderColor: DIV, color: IVORY, caretColor: AMBER }}
                    />
                  </div>

                </div>
              </ServiceCard>

              </FadeIn>

              {/* ── Court Reporting ── */}
              <FadeIn delay={240} threshold={0.05}>
              <ServiceCard
                num="05" title="Court Reporting"
                desc="AAERT-certified digital court reporter. $4.75/page standard — below agency rates."
                startingAt="$150"
                active={courtOn} onToggle={() => setCourtOn(o => !o)}
              >
                <div className="space-y-6">

                  <div>
                    <RowLabel>Format</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <RadioRow label="In-person" price="" selected={court.format === "inperson"} onClick={() => upC({ format: "inperson" })} />
                      <RadioRow label="Remote" price="" selected={court.format === "remote"} onClick={() => upC({ format: "remote" })} />
                    </div>
                  </div>

                  {court.format === "inperson" && (
                    <div className="px-4 py-3 border-l-2" style={{ borderColor: AMBER, backgroundColor: "rgba(77,159,219,0.06)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: AMBER }}>Venue address collected separately</p>
                      <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        No address needed here. When you book, Docsy will email you a confirmation and ask you to reply with the deposition notice — venue, date, time, and case info all come from there.
                      </p>
                    </div>
                  )}

                  <div>
                    <RowLabel>Appearance duration</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <RadioRow
                        label="2-Hour Minimum"
                        price={court.format === "remote" ? "$150" : "$225"}
                        selected={court.duration === "2hr"}
                        onClick={() => upC({ duration: "2hr" })}
                      />
                      <RadioRow
                        label="Half-Day (up to 4 hrs)"
                        price={court.format === "remote" ? "$250" : "$325"}
                        selected={court.duration === "halfday"}
                        onClick={() => upC({ duration: "halfday" })}
                      />
                      <RadioRow
                        label="Full-Day (up to 8 hrs)"
                        price={court.format === "remote" ? "$450" : "$550"}
                        selected={court.duration === "fullday"}
                        onClick={() => upC({ duration: "fullday" })}
                      />
                    </div>
                  </div>

                  <div>
                    <RowLabel>Transcript needed?</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <CheckRow label="Yes — include transcript cost" price="" checked={court.transcript} onChange={v => upC({ transcript: v })} />
                    </div>
                  </div>

                  {court.transcript && (
                    <>
                      <div>
                        <RowLabel>Estimated page count</RowLabel>
                        <div className="flex items-center gap-4">
                          <Stepper value={court.pages} onChange={v => upC({ pages: v })} min={1} max={2000} />
                          <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>pages</span>
                        </div>
                        <p className="text-xs font-light mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                          Average page count is 32–35 pages per hour of recording. Typical depositions run 50–400 pages.
                        </p>
                      </div>

                      <div>
                        <RowLabel>Transcript delivery speed</RowLabel>
                        <div className="border" style={{ borderColor: DIV }}>
                          {transcriptSpeeds.map(([key, label, price]) => (
                            <RadioRow
                              key={key}
                              label={label}
                              price={price}
                              selected={court.speed === key}
                              onClick={() => upC({ speed: key })}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-light mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                          Word index, certified PDF, e-transcript, and digital delivery always included.
                          {court.speed === "sameday" && " Same-Day transcript pricing is custom — Docsy will confirm cost before the appointment."}
                        </p>
                      </div>
                    </>
                  )}

                </div>
              </ServiceCard>
              </FadeIn>


              {/* ── Appointment Date & Time — always shown when any service is selected ── */}
              {anySelected && (
                <FadeIn delay={0} threshold={0.01}>
                <div className="border-b" style={{ borderColor: DIV, borderLeft: `3px solid ${AMBER}` }}>
                  <div className="px-6 py-5 border-b" style={{ borderColor: DIV, backgroundColor: "rgba(77,159,219,0.04)" }}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold font-mono" style={{ color: AMBER }}>[SCHEDULING]</span>
                      <p className="text-base font-black text-white">Appointment Date &amp; Time</p>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.2)", color: AMBER }}>Timing fees auto-apply</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6 border-t" style={{ borderColor: DIV, backgroundColor: "rgba(0,0,0,0.15)" }}>
                    <div className="pt-5 space-y-6">

                      <div>
                        <RowLabel>Date &amp; time <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>(optional)</span></RowLabel>
                        <div className="flex gap-3">
                          <input
                            type="date"
                            value={apptDate}
                            onChange={e => setApptDate(e.target.value)}
                            className="flex-1 px-4 py-3 text-sm font-light text-white bg-transparent border"
                            style={{ borderColor: DIV, colorScheme: "dark" }}
                          />
                          {needsTravel && (
                            <input
                              type="time"
                              value={apptTime}
                              onChange={e => setApptTime(e.target.value)}
                              className="flex-1 px-4 py-3 text-sm font-light text-white bg-transparent border"
                              style={{ borderColor: DIV, colorScheme: "dark" }}
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <RowLabel>Timing fees</RowLabel>
                        <div className="border divide-y" style={{ borderColor: DIV }}>
                          {needsTravel && ([
                            { label: "After-hours (9 PM – 9:59 PM)", price: "+$20", active: travel.afterHours },
                            { label: "Late night (10 PM – midnight)",  price: "+$35", active: travel.lateNight },
                          ] as { label: string; price: string; active: boolean }[]).map(row => (
                            <div key={row.label} className="flex items-center justify-between px-4 py-3" style={{ borderColor: DIV }}>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-light" style={{ color: row.active ? "#fff" : "rgba(255,255,255,0.3)" }}>{row.label}</span>
                                {row.active && <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: AMBER, color: "#000" }}>Applied</span>}
                              </div>
                              <span className="text-sm font-bold" style={{ color: row.active ? AMBER : "rgba(255,255,255,0.2)" }}>{row.price}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between px-4 py-3" style={{ borderColor: DIV }}>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-light" style={{ color: travel.holiday ? "#fff" : "rgba(255,255,255,0.3)" }}>Federal holiday</span>
                              {travel.holiday && <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: AMBER, color: "#000" }}>Applied</span>}
                            </div>
                            <span className="text-sm font-bold" style={{ color: travel.holiday ? AMBER : "rgba(255,255,255,0.2)" }}>+$20</span>
                          </div>
                        </div>
                        <p className="text-xs font-light mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                          {needsTravel
                            ? "After-hours and late night are mutually exclusive. Federal holiday applies to all services."
                            : "Federal holiday fee applies when your appointment date falls on a US federal holiday."}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
                </FadeIn>
              )}

            </div>{/* end left col */}

            {/* Right: sticky summary panel */}
            <div className="lg:sticky lg:top-14 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto border-t lg:border-t-0" style={{ borderColor: DIV }}>

              <div className="px-6 py-4 border-b" style={{ borderColor: DIV }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Your Estimate</p>
              </div>

              {!anySelected ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-3xl mb-3" style={{ color: "rgba(255,255,255,0.1)" }}>—</p>
                  <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.25)" }}>Select a service on the left to start your quote.</p>
                </div>
              ) : (
                <div className="px-6 py-6">

                  {/* line items */}
                  <div className="mb-6">
                    {ronOn        && <SummaryLine label="Remote Online Notarization" amount={ronTotal} />}
                    {gnwOn        && <SummaryLine label={`General Notary Work (${gnw.seals} seal${gnw.seals !== 1 ? "s" : ""})`} amount={gnwTotal} />}
                    {loanOn       && <SummaryLine label={`Loan Signing (${loan.packages.length} pkg${loan.packages.length !== 1 ? "s" : ""})`} amount={loanTotal} />}
                    {apostOn      && <SummaryLine label={`Apostille — ${apost.types.join(" + ")} (${apost.docs} doc${apost.docs > 1 ? "s" : ""})`} amount={apostilleAddon > 0 ? apostTotal - apostilleAddon : apostTotal} />}
                    {apostOn && apostilleAddon > 0 && <SummaryLine label={`↳ ${apostilleAddonLabel}`} amount={apostilleAddon} />}
                    {courtOn           && <SummaryLine label="Court Reporting" amount={courtTotal} />}
                    {gnwTierTotal > 0  && <SummaryLine label="↳ GNW Travel" amount={gnwTierTotal} />}
                    {extendedFee > 0   && <SummaryLine label="↳ Extended Distance (40+ mi)" amount={extendedFee} />}
                    {timingTotal > 0   && <SummaryLine label="↳ Timing Surcharge" amount={timingTotal} />}
                    {gnwTravelWaived && travel.tier < 4 && gnwOn && (
                      <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: DIV }}>
                        <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.35)" }}>↳ GNW Travel</span>
                        <span className="text-sm font-bold" style={{ color: AMBER }}>WAIVED</span>
                      </div>
                    )}
                  </div>

                  {/* grand total */}
                  <div className="border-t pt-5 mb-6" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Your Price</p>
                    <p className="font-black leading-none" style={{ fontSize: "clamp(2.5rem,6vw,3.5rem)", color: AMBER, letterSpacing: "-0.03em" }}>
                      ${grandTotal % 1 === 0 ? grandTotal.toLocaleString() : grandTotal.toFixed(2)}
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-3 mb-8">
                    <button
                      onClick={handleBookJob}
                      className="w-full py-4 text-base font-bold text-white text-center"
                      style={{ backgroundColor: "#000" }}
                      data-testid="btn-book-estimate"
                    >
                      Continue to Book — Step 2 →
                    </button>
                  </div>

                  {/* disclaimer */}
                  <div className="border-t pt-5" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>About This Quote</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                      This quote is for planning purposes only. You know your price before you book — always. Final pricing is confirmed before your appointment starts. Any differences (extra signers, timing changes, travel adjustments) are disclosed before you confirm.
                    </p>
                  </div>

                </div>
              )}

            </div>{/* end right col */}

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV, backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Like what you see?
            <br />
            <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>Let's make it official.</span>
          </h2>
          <p className="text-lg text-black/60">Know your price before you book. Always.</p>
        </div>
      </section>

    </div>
  );
}
