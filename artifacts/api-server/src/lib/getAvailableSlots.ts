import { createSign } from "node:crypto";
import { SERVICE_CONFIG, BUFFER_MATRIX, type ServiceConfig, type BufferValue } from "./serviceConfig.js";

/* ── Types ─────────────────────────────────────────────── */
interface CalendarEvent {
  summary?:  string;
  start:     { dateTime?: string; date?: string };
  end:       { dateTime?: string; date?: string };
  extendedProperties?: { private?: Record<string, string>; shared?: Record<string, string> };
}

interface Job {
  startMin:    number;  // minutes from midnight
  endMin:      number;
  locationType: "remote" | "inperson_local" | "inperson_travel";
  isDepo:      boolean;
}

/* ── Google Service Account JWT ────────────────────────── */
function base64url(data: string): string {
  return Buffer.from(data).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function createJWT(clientEmail: string, privateKey: string, scope: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header  = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({
    iss: clientEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }));
  const input = `${header}.${payload}`;
  const sign  = createSign("RSA-SHA256");
  sign.update(input);
  const sig = sign.sign(privateKey, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${input}.${sig}`;
}

async function getGoogleAccessToken(): Promise<string> {
  const raw = process.env["GOOGLE_SERVICE_ACCOUNT_KEY"];
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY secret is not set.");

  const json = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as {
    client_email: string;
    private_key:  string;
  };

  const jwt = createJWT(
    json.client_email,
    json.private_key,
    "https://www.googleapis.com/auth/calendar.readonly",
  );

  const res  = await fetch("https://oauth2.googleapis.com/token", {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion:  jwt,
    }),
  });
  const data = await res.json() as { access_token?: string; error?: string };
  if (!data.access_token) throw new Error(`Google token error: ${data.error ?? JSON.stringify(data)}`);
  return data.access_token;
}

/* ── Fetch calendar events for a date (Central Time = UTC-5/6) ─── */
async function fetchCalendarEvents(dateStr: string): Promise<CalendarEvent[]> {
  const calId = process.env["GOOGLE_CALENDAR_ID"];
  if (!calId) throw new Error("GOOGLE_CALENDAR_ID secret is not set.");

  const token = await getGoogleAccessToken();

  // Use UTC-6 (CST) — Texas standard offset. In production you'd handle DST.
  const timeMin = `${dateStr}T00:00:00-06:00`;
  const timeMax = `${dateStr}T23:59:59-06:00`;

  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events`);
  url.searchParams.set("timeMin",      timeMin);
  url.searchParams.set("timeMax",      timeMax);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy",      "startTime");
  url.searchParams.set("maxResults",   "50");

  const res  = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json() as { items?: CalendarEvent[]; error?: unknown };
  if (!res.ok) throw new Error(`Calendar API error: ${JSON.stringify(data.error ?? data)}`);
  return data.items ?? [];
}

/* ── Convert a dateTime string to minutes-from-midnight (Central) ── */
function toMinsFromMidnight(dt: string | undefined): number {
  if (!dt) return 0;
  const d = new Date(dt);
  // Get the time in Central (UTC-6 as approximation)
  const centralMs = d.getTime() - (d.getTimezoneOffset() * 60000);
  const centralDate = new Date(centralMs);
  return centralDate.getHours() * 60 + centralDate.getMinutes();
}

/* ── Detect the location type of an existing calendar event ─── */
function detectLocationType(event: CalendarEvent): "remote" | "inperson_local" | "inperson_travel" {
  // Check extended properties first (if we tag events programmatically)
  const priv = event.extendedProperties?.private ?? {};
  if (priv["locationType"]) {
    const lt = priv["locationType"] as string;
    if (lt === "remote" || lt === "inperson_local" || lt === "inperson_travel") return lt;
  }

  // Fall back to keyword matching on the event summary
  const title = (event.summary ?? "").toLowerCase();
  if (title.includes("travel") || title.includes("lsa_travel") || title.includes("mobile_travel")) return "inperson_travel";
  if (title.includes("remote") || title.includes("ron") || title.includes("apostille")) return "remote";
  if (title.includes("depo") || title.includes("euo") || title.includes("loan") || title.includes("mobile")) return "inperson_local";

  // Conservative default: treat unknown events as inperson_local
  return "inperson_local";
}

function detectIsDepo(event: CalendarEvent): boolean {
  const priv  = event.extendedProperties?.private ?? {};
  if (priv["isDepo"] === "true") return true;
  const title = (event.summary ?? "").toLowerCase();
  return title.includes("depo") || title.includes("euo");
}

/* ── Main export ──────────────────────────────────────────── */
export async function getAvailableSlots(
  dateStr:    string,   // YYYY-MM-DD
  serviceKey: string,   // key into SERVICE_CONFIG
  isMember:   boolean = false,
): Promise<string[]> {
  const svcConfig: ServiceConfig | undefined = SERVICE_CONFIG[serviceKey];
  if (!svcConfig) throw new Error(`Unknown service key: ${serviceKey}`);

  /* ── 1. Validate the day of week ── */
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dow = dateObj.getDay();
  if (!svcConfig.availableDays.includes(dow)) return []; // service not offered this day

  /* ── 2. Determine the available hours window ── */
  // Members can book 2 hours earlier and 2 hours later than the service window
  const memberExtension = isMember ? 2 : 0;
  const windowStart = Math.max(0,  svcConfig.availableHours.start - memberExtension);
  const windowEnd   = Math.min(23, svcConfig.availableHours.end   + memberExtension);

  /* ── 3. Fetch existing calendar events ── */
  const events = await fetchCalendarEvents(dateStr);

  /* ── 4. Build sorted job list from events ── */
  const jobs: Job[] = events
    .filter(e => e.start.dateTime) // skip all-day events
    .map(e => ({
      startMin:    toMinsFromMidnight(e.start.dateTime),
      endMin:      toMinsFromMidnight(e.end.dateTime),
      locationType: detectLocationType(e),
      isDepo:      detectIsDepo(e),
    }))
    .sort((a, b) => a.startMin - b.startMin);

  /* ── 5. Deposition block rule ──
     If the new service is a depo AND a depo already exists today → return empty. */
  if (svcConfig.isDepo) {
    const alreadyHasDepo = jobs.some(j => j.isDepo);
    if (alreadyHasDepo) return [];
  }

  /* ── 6. Generate candidate 15-min slots ── */
  const serviceDuration = svcConfig.duration; // minutes
  const candidates: string[] = [];

  for (let h = windowStart; h <= windowEnd; h++) {
    for (let q = 0; q < 4; q++) {
      const slotStartMin = h * 60 + q * 15;
      const slotEndMin   = slotStartMin + serviceDuration;
      // Slot must end by (windowEnd + 1) * 60 to avoid running past the window
      if (slotEndMin > (windowEnd + 1) * 60) break;

      /* ── 6a. Reject if slot overlaps any existing event ── */
      const overlaps = jobs.some(j => slotStartMin < j.endMin && slotEndMin > j.startMin);
      if (overlaps) continue;

      /* ── 6b. Find the jobs immediately before and after ── */
      const priorJob = [...jobs].reverse().find(j => j.endMin <= slotStartMin) ?? null;
      const nextJob  = jobs.find(j => j.startMin >= slotEndMin) ?? null;

      /* ── 6c. Check buffer from prior job → new service ── */
      if (priorJob) {
        const priorKey = priorJob.isDepo ? "depo" : priorJob.locationType;
        const required: BufferValue = BUFFER_MATRIX[priorKey]?.[svcConfig.locationType] ?? 0;
        if (required === "BLOCKED") continue;
        const gapBefore = slotStartMin - priorJob.endMin;
        if (gapBefore < (required as number)) continue;
      }

      /* ── 6d. Check buffer from new service → next job ── */
      if (nextJob) {
        const nextKey  = nextJob.isDepo ? "depo" : nextJob.locationType;
        const required: BufferValue = BUFFER_MATRIX[svcConfig.locationType]?.[nextKey] ?? 0;
        if (required === "BLOCKED") continue;
        const gapAfter = nextJob.startMin - slotEndMin;
        if (gapAfter < (required as number)) continue;
      }

      /* ── Valid! ── */
      const hStr = String(h).padStart(2, "0");
      const mStr = String(q * 15).padStart(2, "0");
      candidates.push(`${hStr}:${mStr}`);
    }
  }

  return candidates;
}
