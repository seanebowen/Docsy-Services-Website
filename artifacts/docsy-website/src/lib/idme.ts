const STORAGE_KEY = "docsy_idme_verification";

export type IdMeGroup = "military" | "veteran" | "responder" | "nurse" | "teacher";

export interface IdMeVerification {
  verified: true;
  group: IdMeGroup;
  verifiedAt: string;
}

export function getIdMeVerification(): IdMeVerification | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

export function saveIdMeVerification(group: IdMeGroup): IdMeVerification {
  const v: IdMeVerification = {
    verified: true,
    group,
    verifiedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  return v;
}

export function clearIdMeVerification(): void {
  localStorage.removeItem(STORAGE_KEY);
}

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
