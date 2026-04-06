import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const AMBER = "#4D9FDB";
const DIV   = "#1e2a3a";

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

interface RONState {
  docs: number;
}
interface MobileState {
  seals: number;
  address: string;
  tier: 1 | 2 | 3 | 4;
  afterHours: boolean;
  lateNight: boolean;
  rush: boolean;
  weekend: boolean;
}
interface LoanState {
  packages: LoanPackage[];
}
interface ApostilleState {
  types: ApostilleType[];
  docs: number;
  turnaround: ApostilleTurnaround;
}
interface CourtState {
  format: CourtFormat;
  duration: CourtDuration;
  transcript: boolean;
  pages: number;
  speed: TranscriptSpeed;
}

function calcRON(s: RONState): number {
  return 25 + Math.max(0, s.docs - 1) * 5;
}

function calcMobile(s: MobileState): number {
  const notary = 10 + Math.max(0, s.seals - 1) * 1;
  const travel = [0, 30, 45, 65, 85][s.tier];
  const timing = (s.lateNight ? 35 : s.afterHours ? 20 : 0) + (s.rush ? 35 : 0) + (s.weekend ? 25 : 0);
  return notary + travel + timing;
}

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
function calcRONBase(_s: RONState): number { return 25; } // base seal only; extra docs are add-ons
function calcMobileBase(s: MobileState): number { return 10 + Math.max(0, s.seals - 1) * 1; } // notary fee only; travel & surcharges are add-ons
function calcLoanBase(s: LoanState): number { return calcLoan(s); } // package prices are the base service fee
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
  const [ronOn,    setRonOn]    = useState(false);
  const [mobileOn, setMobileOn] = useState(false);
  const [loanOn,   setLoanOn]   = useState(false);
  const [apostOn,  setApostOn]  = useState(false);
  const [courtOn,  setCourtOn]  = useState(false);

  /* RON state */
  const [ron, setRon] = useState<RONState>({ docs: 1 });

  /* Mobile state */
  const [mobile, setMobile] = useState<MobileState>({
    seals: 1, address: "", tier: 1,
    afterHours: false, lateNight: false, rush: false, weekend: false,
  });

  /* Loan state */
  const [loan, setLoan] = useState<LoanState>({ packages: ["refi"] });

  /* Apostille state */
  const [apost, setApost] = useState<ApostilleState>({
    types: ["personal"], docs: 1, turnaround: "standard",
  });

  /* Court state */
  const [court, setCourt] = useState<CourtState>({
    format: "inperson", duration: "2hr",
    transcript: false, pages: 100, speed: "14day",
  });

  /* computed totals */
  const ronTotal    = ronOn    ? calcRON(ron)       : 0;
  const mobileTotal = mobileOn ? calcMobile(mobile) : 0;
  const loanTotal   = loanOn   ? calcLoan(loan)     : 0;
  const apostTotal  = apostOn  ? calcApostille(apost): 0;
  const courtTotal  = courtOn  ? calcCourt(court)   : 0;
  const grandTotal  = ronTotal + mobileTotal + loanTotal + apostTotal + courtTotal;

  const apostilleAddon = apostOn && apost.turnaround !== "standard"
    ? (apost.turnaround === "nextday" ? 50 : 75)
    : 0;
  const apostilleAddonLabel = apost.turnaround === "nextday" ? "Next-Day Turnaround" : "Same-Day Rush Turnaround";

  /* ── Auto-apply promos based on current time / day ── */
  const autoPromos = useMemo(() => {
    const now = new Date();
    const hour = now.getHours(); // 0–23
    const day  = now.getDay();   // 0=Sun … 6=Sat
    const isWeekend = day === 0 || day === 6;
    const isWeekday = day >= 1 && day <= 5;
    const result: { label: string; amount: number }[] = [];

    if (ronOn) {
      if      (hour >= 8  && hour < 10) result.push({ label: "Early Bird Seal™ — $10 Off",   amount: -10 });
      else if (hour >= 11 && hour < 13) result.push({ label: "Lunch Break Seal™ — $10 Off",  amount: -10 });
      else if (hour >= 21)              result.push({ label: "Night Shift Seal™ — $10 Off",   amount: -10 });
    }
    if (mobileOn && isWeekday && hour >= 12 && hour < 18)
      result.push({ label: "Midday Miles™ — $10 Off", amount: -10 });
    if (loanOn && isWeekend)
      result.push({ label: "Weekend Warrior™ — 20% Off Loan Signing", amount: -Math.round(loanTotal * 0.20) });

    return result;
  }, [ronOn, mobileOn, loanOn, loanTotal]);

  const autoPromoTotal = autoPromos.reduce((sum, p) => sum + p.amount, 0);
  const displayTotal   = grandTotal + autoPromoTotal;

  const baseTotal = (ronOn    ? calcRONBase(ron)       : 0)
                  + (mobileOn ? calcMobileBase(mobile) : 0)
                  + (loanOn   ? calcLoanBase(loan)     : 0)
                  + (apostOn  ? calcApostilleBase(apost): 0)
                  + (courtOn  ? calcCourtBase(court)   : 0);
  const anySelected = ronOn || mobileOn || loanOn || apostOn || courtOn;

  const [, setLocation] = useLocation();

  /* save estimate → navigate to booking */
  const handleBookJob = useCallback(() => {
    const services = [
      ronOn    && { name: "Remote Online Notarization",                                           amount: ronTotal },
      mobileOn && { name: "Mobile Notary",                                                        amount: mobileTotal },
      loanOn   && { name: `Loan Signing (${loan.packages.length} pkg${loan.packages.length !== 1 ? "s" : ""})`, amount: loanTotal },
      apostOn  && { name: `Apostille — ${apost.types.join(" + ")} (${apost.docs} doc${apost.docs > 1 ? "s" : ""})`, amount: apostilleAddon > 0 ? apostTotal - apostilleAddon : apostTotal },
      apostOn && apostilleAddon > 0 && { name: `Apostille — ${apostilleAddonLabel}`, amount: apostilleAddon },
      courtOn  && { name: "Court Reporting",                                                      amount: courtTotal },
    ].filter(Boolean) as { name: string; amount: number }[];
    sessionStorage.setItem("docsy_estimate", JSON.stringify({ services, total: displayTotal, baseTotal, hasRON: ronOn, autoPromos }));
    setLocation("/booking");
  }, [ronOn, mobileOn, loanOn, apostOn, courtOn, ronTotal, mobileTotal, loanTotal, apostTotal, courtTotal, grandTotal, displayTotal, baseTotal, autoPromos, apostilleAddon, apostilleAddonLabel, loan.packages, apost.types, apost.docs]);

  /* helpers */
  const upM = useCallback((patch: Partial<MobileState>) => setMobile(p => ({ ...p, ...patch })), []);
  const upA = useCallback((patch: Partial<ApostilleState>) => setApost(p => ({ ...p, ...patch })), []);
  const upC = useCallback((patch: Partial<CourtState>) => setCourt(p => ({ ...p, ...patch })), []);

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
                      <Stepper value={ron.docs} onChange={v => setRon({ docs: v })} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {ron.docs === 1 ? "$25 flat" : `$25 + ${ron.docs - 1} × $5 additional`}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-light pt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Same-hour availability, digital certified copy, and 30-day Safe+ trial included at no extra charge.
                  </div>
                </div>
              </ServiceCard>
              </FadeIn>

              {/* ── Mobile Notary ── */}
              <FadeIn delay={60} threshold={0.05}>
              <ServiceCard
                num="02" title="Mobile Notary"
                desc="We come to you — home, office, hospital, hospice. 7 days, 7 AM to midnight."
                startingAt="$40"
                active={mobileOn} onToggle={() => setMobileOn(o => !o)}
              >
                <div className="space-y-6">

                  <div>
                    <RowLabel>Number of notarizations (seals)</RowLabel>
                    <div className="flex items-center gap-4">
                      <Stepper value={mobile.seals} onChange={v => upM({ seals: v })} />
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {mobile.seals === 1 ? "$10 first seal" : `$10 + ${mobile.seals - 1} × $1`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <RowLabel>Meeting point address</RowLabel>
                    <input
                      type="text"
                      value={mobile.address}
                      onChange={e => upM({ address: e.target.value })}
                      placeholder="123 Main St, Austin TX — or hospital, office, etc."
                      className="w-full px-4 py-3 text-sm font-light bg-transparent border outline-none"
                      style={{
                        borderColor: DIV,
                        color: IVORY,
                        caretColor: AMBER,
                      }}
                    />
                    <p className="text-xs font-light mt-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                      Actual travel fee confirmed at booking from this address.
                    </p>
                  </div>

                  <div>
                    <RowLabel>Estimated distance <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>(for budgeting — confirmed from your address at booking)</span></RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      {([
                        [1, "Tier 1 — 0 to 10 miles", "$30"],
                        [2, "Tier 2 — 11 to 25 miles", "$45"],
                        [3, "Tier 3 — 26 to 40 miles", "$65"],
                        [4, "Tier 4 — 40+ miles", "$85"],
                      ] as [1|2|3|4, string, string][]).map(([t, label, price]) => (
                        <RadioRow key={t} label={label} price={price} selected={mobile.tier === t} onClick={() => upM({ tier: t })} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <RowLabel>Timing add-ons (select all that apply)</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <CheckRow label="After-hours (after 6 PM)" price="+$20" checked={mobile.afterHours} onChange={v => upM({ afterHours: v, lateNight: v ? false : mobile.lateNight })} />
                      <CheckRow label="Late night (10 PM – midnight)" price="+$35" checked={mobile.lateNight} onChange={v => upM({ lateNight: v, afterHours: v ? false : mobile.afterHours })} />
                      <CheckRow label="Rush — within 2 hours" price="+$35" checked={mobile.rush} onChange={v => upM({ rush: v })} />
                      <CheckRow label="Weekend or holiday" price="+$25" checked={mobile.weekend} onChange={v => upM({ weekend: v })} />
                    </div>
                    <p className="text-xs font-light mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                      After-hours and Late night are mutually exclusive. Late night (+$35) overrides after-hours (+$20).
                    </p>
                  </div>

                </div>
              </ServiceCard>

              </FadeIn>

              {/* ── Loan Signing ── */}
              <FadeIn delay={120} threshold={0.05}>
              <ServiceCard
                num="03" title="Loan Signing"
                desc="Certified loan signing agent for refinance, buyer, seller, HELOC, and more. Flat rates."
                startingAt="$100"
                active={loanOn} onToggle={() => setLoanOn(o => !o)}
              >
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
                    Scanbacks included with Refinance and Buyer Purchase packages. Docsy Safe+ 30-day trial included with all packages.
                  </p>
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
                    {ronOn    && <SummaryLine label="Remote Online Notarization" amount={ronTotal} />}
                    {mobileOn && <SummaryLine label="Mobile Notary" amount={mobileTotal} />}
                    {loanOn   && <SummaryLine label={`Loan Signing (${loan.packages.length} pkg${loan.packages.length !== 1 ? "s" : ""})`} amount={loanTotal} />}
                    {apostOn  && <SummaryLine label={`Apostille — ${apost.types.join(" + ")} (${apost.docs} doc${apost.docs > 1 ? "s" : ""})`} amount={apostilleAddon > 0 ? apostTotal - apostilleAddon : apostTotal} />}
                    {apostOn && apostilleAddon > 0 && <SummaryLine label={`↳ ${apostilleAddonLabel}`} amount={apostilleAddon} />}
                    {courtOn  && <SummaryLine label="Court Reporting" amount={courtTotal} />}

                    {/* Auto-applied promo lines */}
                    {autoPromos.map(p => (
                      <div key={p.label} className="flex justify-between items-center py-2 border-b" style={{ borderColor: DIV }}>
                        <span className="text-sm font-light flex items-center gap-2" style={{ color: AMBER }}>
                          ↳ {p.label}
                          <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5" style={{ backgroundColor: "rgba(77,159,219,0.18)", color: AMBER }}>Auto</span>
                        </span>
                        <span className="text-sm font-bold" style={{ color: AMBER }}>−${Math.abs(p.amount).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* grand total */}
                  <div className="border-t pt-5 mb-6" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Your Price</p>
                    {autoPromoTotal < 0 && (
                      <p className="text-sm line-through mb-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                        ${grandTotal % 1 === 0 ? grandTotal.toLocaleString() : grandTotal.toFixed(2)}
                      </p>
                    )}
                    <p className="font-black leading-none" style={{ fontSize: "clamp(2.5rem,6vw,3.5rem)", color: AMBER, letterSpacing: "-0.03em" }}>
                      ${displayTotal % 1 === 0 ? displayTotal.toLocaleString() : displayTotal.toFixed(2)}
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
                      This quote is for planning purposes only. You know your price before you book — always. Final pricing is confirmed before your appointment starts. Any differences (extra signers, rush changes, travel adjustments) are disclosed before you confirm.
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
