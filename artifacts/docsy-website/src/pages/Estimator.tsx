import React, { useState, useCallback } from "react";
import { Link } from "wouter";

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
  return (
    <div className="flex items-center gap-0 border" style={{ borderColor: DIV }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-3 py-1.5 text-sm font-bold transition-colors hover:bg-white/10"
        style={{ color: "rgba(255,255,255,0.5)", borderRight: `1px solid ${DIV}` }}
      >−</button>
      <span className="px-4 py-1.5 text-sm font-bold text-white min-w-[3rem] text-center">{value}</span>
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
type TranscriptSpeed = "ordinary" | "14day" | "7day" | "3day" | "24hr" | "sameday";

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
  package: LoanPackage;
}
interface ApostilleState {
  type: ApostilleType;
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
  return { refi: 175, buyer: 200, seller: 125, heloc: 175, reverse: 225, mod: 100 }[s.package];
}

function calcApostille(s: ApostilleState): number {
  const standardBase: Record<ApostilleType, number> = { personal: 150, business: 175, federal: 275 };
  const turnaroundBase: Record<ApostilleTurnaround, number | null> = { standard: null, nextday: 190, sameday: 225 };
  const base = turnaroundBase[s.turnaround] ?? standardBase[s.type];
  if (s.docs <= 1) return base;
  if (s.docs >= 5) return base + (s.docs - 1) * 90;
  return base + (s.docs - 1) * 100;
}

function calcCourt(s: CourtState): number {
  const appearFees: Record<CourtFormat, Record<CourtDuration, number>> = {
    inperson: { "2hr": 275, halfday: 325, fullday: 550 },
    remote:   { "2hr": 275, halfday: 250, fullday: 450 },
  };
  const appear = appearFees[s.format][s.duration];
  if (!s.transcript) return appear;
  const ratePerPage: Record<TranscriptSpeed, number> = {
    ordinary: 4.25, "14day": 5.00, "7day": 5.75, "3day": 6.50, "24hr": 7.75, sameday: 9.50,
  };
  return appear + s.pages * ratePerPage[s.speed];
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
                In estimate
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
  React.useEffect(() => { document.title = "Job Estimator | Docsy Notary Services"; }, []);

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
  const [loan, setLoan] = useState<LoanState>({ package: "refi" });

  /* Apostille state */
  const [apost, setApost] = useState<ApostilleState>({
    type: "personal", docs: 1, turnaround: "standard",
  });

  /* Court state */
  const [court, setCourt] = useState<CourtState>({
    format: "inperson", duration: "2hr",
    transcript: false, pages: 100, speed: "ordinary",
  });

  /* computed totals */
  const ronTotal    = ronOn    ? calcRON(ron)       : 0;
  const mobileTotal = mobileOn ? calcMobile(mobile) : 0;
  const loanTotal   = loanOn   ? calcLoan(loan)     : 0;
  const apostTotal  = apostOn  ? calcApostille(apost): 0;
  const courtTotal  = courtOn  ? calcCourt(court)   : 0;
  const grandTotal  = ronTotal + mobileTotal + loanTotal + apostTotal + courtTotal;
  const anySelected = ronOn || mobileOn || loanOn || apostOn || courtOn;

  /* helpers */
  const upM = useCallback((patch: Partial<MobileState>) => setMobile(p => ({ ...p, ...patch })), []);
  const upA = useCallback((patch: Partial<ApostilleState>) => setApost(p => ({ ...p, ...patch })), []);
  const upC = useCallback((patch: Partial<CourtState>) => setCourt(p => ({ ...p, ...patch })), []);

  const loanLabels: Record<LoanPackage, [string, string]> = {
    refi:    ["Refinance Package", "$175"],
    buyer:   ["Buyer Purchase Package", "$200"],
    seller:  ["Seller Package", "$125"],
    heloc:   ["HELOC / Home Equity", "$175"],
    reverse: ["Reverse Mortgage", "$225"],
    mod:     ["Loan Modification", "$100"],
  };

  const transcriptSpeeds: [TranscriptSpeed, string, string][] = [
    ["ordinary", "Ordinary (30 days)", "$4.25/pg"],
    ["14day",    "14-Day",             "$5.00/pg"],
    ["7day",     "7-Day Expedited",    "$5.75/pg"],
    ["3day",     "3-Day Rush",         "$6.50/pg"],
    ["24hr",     "24-Hour Rush",       "$7.75/pg"],
    ["sameday",  "Same-Day",           "$9.50/pg"],
  ];

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <Pill text="JOB ESTIMATOR" />
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            <span className="font-black">Know your cost</span>
            <br />
            <span className="font-light text-black/45">before you</span>
            <br />
            <span className="font-black"><H>book.</H></span>
          </h1>
          <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
            Select the services you need. Configure the details. We'll calculate your estimate on the spot — down to the dollar.
          </p>
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
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Check any service to add it to your estimate</span>
                <span className="text-[10px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>Multiple selections allowed</span>
              </div>

              {/* ── RON ── */}
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
                    Same-hour availability, digital certified copy, and 90-day Safe+ trial included at no extra charge.
                  </div>
                </div>
              </ServiceCard>

              {/* ── Mobile Notary ── */}
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

              {/* ── Loan Signing ── */}
              <ServiceCard
                num="03" title="Loan Signing"
                desc="Certified loan signing agent for refinance, buyer, seller, HELOC, and more. Flat rates."
                startingAt="$100"
                active={loanOn} onToggle={() => setLoanOn(o => !o)}
              >
                <div>
                  <RowLabel>Select your package</RowLabel>
                  <div className="border" style={{ borderColor: DIV }}>
                    {(Object.keys(loanLabels) as LoanPackage[]).map(key => (
                      <RadioRow
                        key={key}
                        label={loanLabels[key][0]}
                        price={loanLabels[key][1]}
                        selected={loan.package === key}
                        onClick={() => setLoan({ package: key })}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-light mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Scanbacks included with Refinance and Buyer Purchase packages. Docsy Safe+ 90-day trial included with all packages.
                  </p>
                </div>
              </ServiceCard>

              {/* ── Apostille ── */}
              <ServiceCard
                num="04" title="Apostille Services"
                desc="Texas apostille filing. State fee, digital scan, and return shipping prep all included."
                startingAt="$150"
                active={apostOn} onToggle={() => setApostOn(o => !o)}
              >
                <div className="space-y-6">

                  <div>
                    <RowLabel>Document type</RowLabel>
                    <div className="border" style={{ borderColor: DIV }}>
                      <RadioRow label="Personal document" price="from $150" selected={apost.type === "personal"} onClick={() => upA({ type: "personal", turnaround: apost.turnaround === "sameday" ? "sameday" : apost.turnaround })} />
                      <RadioRow label="Business document" price="from $175" selected={apost.type === "business"} onClick={() => upA({ type: "business" })} />
                      <RadioRow label="Federal / USDOS" price="$275" selected={apost.type === "federal"} onClick={() => upA({ type: "federal", turnaround: "standard" })} />
                    </div>
                  </div>

                  {apost.type !== "federal" && (
                    <div>
                      <RowLabel>Turnaround</RowLabel>
                      <div className="border" style={{ borderColor: DIV }}>
                        <RadioRow
                          label="Standard (30 days)"
                          price={apost.type === "personal" ? "$150" : "$175"}
                          selected={apost.turnaround === "standard"}
                          onClick={() => upA({ turnaround: "standard" })}
                        />
                        <RadioRow
                          label="Next-Day"
                          price="$190"
                          selected={apost.turnaround === "nextday"}
                          onClick={() => upA({ turnaround: "nextday" })}
                        />
                        <RadioRow
                          label="Same-Day Rush (order before 10 AM)"
                          price="$225"
                          selected={apost.turnaround === "sameday"}
                          onClick={() => upA({ turnaround: "sameday" })}
                        />
                      </div>
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

              {/* ── Court Reporting ── */}
              <ServiceCard
                num="05" title="Court Reporting"
                desc="Soniclear-certified digital court reporter. $4.25/page standard — below agency rates."
                startingAt="$275"
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
                        price="$275"
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
                          Average deposition: 50–400 pages. Adjust to match your expected duration.
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
                        </p>
                      </div>
                    </>
                  )}

                </div>
              </ServiceCard>

            </div>{/* end left col */}

            {/* Right: sticky summary panel */}
            <div className="lg:sticky lg:top-14 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto border-t lg:border-t-0" style={{ borderColor: DIV }}>

              <div className="px-6 py-4 border-b" style={{ borderColor: DIV }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Your Estimate</p>
              </div>

              {!anySelected ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-3xl mb-3" style={{ color: "rgba(255,255,255,0.1)" }}>—</p>
                  <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.25)" }}>Select a service on the left to begin building your estimate.</p>
                </div>
              ) : (
                <div className="px-6 py-6">

                  {/* line items */}
                  <div className="mb-6">
                    {ronOn    && <SummaryLine label="Remote Online Notarization" amount={ronTotal} />}
                    {mobileOn && <SummaryLine label="Mobile Notary" amount={mobileTotal} />}
                    {loanOn   && <SummaryLine label={`Loan Signing — ${loanLabels[loan.package][0]}`} amount={loanTotal} />}
                    {apostOn  && <SummaryLine label={`Apostille (${apost.docs} doc${apost.docs > 1 ? "s" : ""})`} amount={apostTotal} />}
                    {courtOn  && <SummaryLine label="Court Reporting" amount={courtTotal} />}
                  </div>

                  {/* grand total */}
                  <div className="border-t pt-5 mb-6" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Estimated Total</p>
                    <p className="font-black leading-none" style={{ fontSize: "clamp(2.5rem,6vw,3.5rem)", color: AMBER, letterSpacing: "-0.03em" }}>
                      ${grandTotal % 1 === 0 ? grandTotal.toLocaleString() : grandTotal.toFixed(2)}
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-3 mb-8">
                    <button
                      className="w-full py-4 text-base font-bold text-white text-center"
                      style={{ backgroundColor: "#000" }}
                      data-testid="btn-book-estimate"
                    >
                      Book This Job
                    </button>
                    <button
                      className="w-full py-4 text-base font-bold text-center border-2"
                      style={{ borderColor: "#fff", color: "#fff" }}
                      data-testid="btn-text-estimate"
                    >
                      Text to Schedule
                    </button>
                  </div>

                  {/* disclaimer */}
                  <div className="border-t pt-5" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Estimate Disclaimer</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                      This estimate is for planning purposes only and is not a binding quote. Final pricing may vary based on actual document count, travel conditions, session duration, or any additional services requested during the appointment (e.g., extra signers, late arrival surcharges, or add-ons). Docsy provides a written estimate before every appointment confirming your final price — no surprises at the door.
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
          <p className="text-lg text-black/60 mb-8">Written estimate before every appointment. All fees disclosed before you start.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/memberships" className="px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-cta">
              Book a Service
            </Link>
            <Link href="/faq" className="px-10 py-4 text-base font-bold text-black border-2 border-black text-center">
              Still have questions?
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
