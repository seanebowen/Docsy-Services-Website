/* ── Service definitions ────────────────────────────────── */
export interface ServiceConfig {
  label:          string;
  duration:       number;           // minutes
  locationType:   "remote" | "inperson_local" | "inperson_travel";
  availableHours: { start: number; end: number }; // 24-hour, end is last START hour
  availableDays:  number[];         // 0=Sun … 6=Sat
  nightShiftSeal: boolean;
  upfrontPayment: boolean;
  isDepo?:        boolean;
}

export const SERVICE_CONFIG: Record<string, ServiceConfig> = {
  RON: {
    label: "Remote Online Notarization",
    duration: 30, locationType: "remote",
    availableHours: { start: 8, end: 21 }, availableDays: [0,1,2,3,4,5,6],
    nightShiftSeal: true, upfrontPayment: true,
  },
  Mobile_Local: {
    label: "Mobile Notary — Local",
    duration: 60, locationType: "inperson_local",
    availableHours: { start: 8, end: 18 }, availableDays: [1,2,3,4,5,6],
    nightShiftSeal: false, upfrontPayment: true,
  },
  Mobile_Travel: {
    label: "Mobile Notary — Travel",
    duration: 90, locationType: "inperson_travel",
    availableHours: { start: 8, end: 16 }, availableDays: [1,2,3,4,5],
    nightShiftSeal: false, upfrontPayment: true,
  },
  LSA_Local: {
    label: "Loan Signing — Local",
    duration: 90, locationType: "inperson_local",
    availableHours: { start: 8, end: 21 }, availableDays: [0,1,2,3,4,5,6],
    nightShiftSeal: true, upfrontPayment: true,
  },
  LSA_Travel: {
    label: "Loan Signing — Travel",
    duration: 120, locationType: "inperson_travel",
    availableHours: { start: 8, end: 17 }, availableDays: [1,2,3,4,5,6],
    nightShiftSeal: false, upfrontPayment: true,
  },
  Apostille: {
    label: "Apostille Consultation",
    duration: 30, locationType: "remote",
    availableHours: { start: 9, end: 18 }, availableDays: [1,2,3,4,5],
    nightShiftSeal: false, upfrontPayment: true,
  },
  Deposition: {
    label: "Court Reporting — Deposition",
    duration: 240, locationType: "inperson_local",
    availableHours: { start: 8, end: 14 }, availableDays: [1,2,3,4,5],
    nightShiftSeal: false, upfrontPayment: false, isDepo: true,
  },
  EUO: {
    label: "Court Reporting — EUO",
    duration: 180, locationType: "inperson_local",
    availableHours: { start: 8, end: 14 }, availableDays: [1,2,3,4,5],
    nightShiftSeal: false, upfrontPayment: false, isDepo: true,
  },
};

/* ── Buffer matrix (minutes) ──────────────────────────────
   Key: prior job's locationType → next job's locationType.
   'BLOCKED' means the candidate slot must always be rejected.
──────────────────────────────────────────────────────────── */
export type BufferValue = number | "BLOCKED";

export const BUFFER_MATRIX: Record<string, Record<string, BufferValue>> = {
  remote:          { remote: 15, inperson_local: 60,  inperson_travel: 90  },
  inperson_local:  { remote: 30, inperson_local: 75,  inperson_travel: 120 },
  inperson_travel: { remote: 45, inperson_local: 120, inperson_travel: 120 },
  depo:            { remote: 150, inperson_local: "BLOCKED", inperson_travel: "BLOCKED" },
};

/* ── Infer the best SERVICE_CONFIG key from estimate service names ── */
export function inferServiceKey(serviceNames: string[]): string {
  const joined = serviceNames.join(" ").toLowerCase();
  if (joined.includes("remote online")) return "RON";
  if (joined.includes("apostille"))     return "Apostille";
  if (joined.includes("euo"))           return "EUO";
  if (joined.includes("deposition") || (joined.includes("court") && !joined.includes("euo")))
    return "Deposition";
  const hasTravel = joined.includes("travel fee") || joined.includes("travel tier");
  if (joined.includes("loan signing"))  return hasTravel ? "LSA_Travel" : "LSA_Local";
  if (joined.includes("general notary") || joined.includes("mobile notary"))
    return hasTravel ? "Mobile_Travel" : "Mobile_Local";
  return "RON"; // safe fallback
}
