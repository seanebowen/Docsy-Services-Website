/* ── HonorPass / ID.me verification helpers ─────────────────
   HonorPass is an account-scoped property. When the user is signed
   in, verification lives on their Docsy account and is exposed via
   `user.idMeVerification` (see AuthContext). When the user is
   signed out, a just-completed verification is parked in local
   storage as a "pending" record and migrated up to the account on
   next sign-in / account creation.
*/

const PENDING_KEY = "docsy_idme_verification"; // retained for back-compat migration

export type IdMeGroup = "military" | "veteran" | "responder" | "nurse" | "teacher";

export interface IdMeVerification {
  verified:   true;
  group:      IdMeGroup;
  verifiedAt: string;
}

/* ── Pending (local-only) verification store ────────────
   Used only while the user is signed out. Migrated to the account
   automatically on sign-in / checkout-upsert.
*/
export function getPendingIdMeVerification(): IdMeVerification | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.verified === true && typeof parsed.group === "string") {
      return parsed as IdMeVerification;
    }
    return null;
  } catch {
    return null;
  }
}

export function setPendingIdMeVerification(group: IdMeGroup): IdMeVerification {
  const v: IdMeVerification = {
    verified:   true,
    group,
    verifiedAt: new Date().toISOString(),
  };
  localStorage.setItem(PENDING_KEY, JSON.stringify(v));
  return v;
}

export function clearPendingIdMeVerification(): void {
  localStorage.removeItem(PENDING_KEY);
}

/* ── Account-scoped HonorPass helpers ──────────────────── */
export interface AccountIdMeRecord {
  group:      IdMeGroup;
  verifiedAt: string;
}

/* Pick the active verification for the current UI:
   prefer the account-scoped record, fall back to a pending local
   record when signed out. */
export function resolveIdMeVerification(
  accountRecord: AccountIdMeRecord | null | undefined,
): IdMeVerification | null {
  if (accountRecord && accountRecord.group) {
    return {
      verified:   true,
      group:      accountRecord.group,
      verifiedAt: accountRecord.verifiedAt,
    };
  }
  return getPendingIdMeVerification();
}

/* ── Server mutations (authenticated) ──────────────────── */
export async function attachIdMeToAccount(
  token: string,
  group: IdMeGroup,
): Promise<AccountIdMeRecord | null> {
  try {
    const res  = await fetch("/api/auth/idme", {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ group }),
    });
    const data = await res.json() as { ok: boolean; user?: { idMeVerification?: AccountIdMeRecord | null } };
    if (data.ok && data.user?.idMeVerification) {
      return data.user.idMeVerification;
    }
    return null;
  } catch {
    return null;
  }
}

export async function clearIdMeOnAccount(token: string): Promise<boolean> {
  try {
    const res  = await fetch("/api/auth/idme", {
      method:  "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json() as { ok: boolean };
    return !!data.ok;
  } catch {
    return false;
  }
}

/* ── Display / eligibility helpers ─────────────────────── */
export function isHonorPassEligible(v: IdMeVerification | null): boolean {
  if (!v) return false;
  return v.group === "military" || v.group === "veteran";
}

export function groupLabel(group: IdMeGroup): string {
  switch (group) {
    case "military":  return "Active Military";
    case "veteran":   return "U.S. Veteran";
    case "responder": return "First Responder";
    case "nurse":     return "Nurse";
    case "teacher":   return "Teacher";
  }
}

/* ── ID.me OAuth-style entry flow ──────────────────────── */
const REDIRECT_PATH = "/idme/callback";
const SCOPE = "military";

export function startIdMeFlow(returnTo: string = window.location.pathname + window.location.search) {
  sessionStorage.setItem("docsy_idme_return_to", returnTo);

  const clientId = (import.meta as any).env?.VITE_IDME_CLIENT_ID as string | undefined;
  const base     = window.location.origin + (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const redirectUri = base + REDIRECT_PATH;

  if (clientId) {
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem("docsy_idme_state", state);
    const url = new URL("https://api.id.me/oauth/authorize");
    url.searchParams.set("client_id",     clientId);
    url.searchParams.set("redirect_uri",  redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope",         SCOPE);
    url.searchParams.set("state",         state);
    window.location.href = url.toString();
    return;
  }

  window.location.href = REDIRECT_PATH + "?demo=1&group=veteran";
}
