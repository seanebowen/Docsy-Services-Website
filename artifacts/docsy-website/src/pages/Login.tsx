import React, { useState } from "react";
import { useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const RED   = "#e05252";

function detectType(raw: string): "email" | "phone" | null {
  if (raw.includes("@")) return "email";
  if (raw.replace(/\D/g, "").length >= 10) return "phone";
  return null;
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
}

export default function Login() {
  const [, setLocation] = useLocation();
  const [raw,      setRaw]      = useState("");
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  React.useEffect(() => { document.title = "Sign In | Docsy Notary Services"; }, []);

  const type    = detectType(raw);
  const isEmpty = raw.trim() === "";
  const hint    = isEmpty ? "Enter your email or phone number"
                : type === "email" ? "We'll send a one-time code to this email"
                : type === "phone" ? "We'll send a one-time code via text"
                : "Enter a valid email or 10-digit phone number";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v.includes("@") && v.replace(/\D/g, "").length >= 1) {
      setRaw(formatPhone(v));
    } else {
      setRaw(v);
    }
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch("/api/auth/request", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ identifier: raw.trim() }),
      });
      const data = await res.json() as { ok: boolean; error?: string; masked?: string };
      if (data.ok) {
        sessionStorage.setItem("docsy_auth_identifier", raw.trim());
        sessionStorage.setItem("docsy_auth_masked",     data.masked ?? "");
        setLocation("/verify");
      } else {
        setApiError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 py-20" style={{ backgroundColor: BG }}>
      <FadeIn delay={0}>
      <div className="w-full max-w-md">

        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
              ◎ DOCSY SAFE+
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Sign in.
          </h1>
          <p className="text-white/40 text-base">
            Enter your email or phone — we'll send a one-time code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              inputMode={type === "phone" || (!type && raw.replace(/\D/g, "").length > 0 && !raw.includes("@")) ? "tel" : "email"}
              value={raw}
              onChange={handleChange}
              placeholder="Email or phone number"
              required
              className="w-full px-5 py-4 text-base text-white placeholder-white/20 border outline-none transition-colors"
              style={{
                backgroundColor: "#111",
                borderColor: apiError ? RED : type ? BLUE : DIV,
              }}
              data-testid="input-identifier"
            />
            <p className="text-xs mt-2 font-light transition-colors" style={{ color: apiError ? RED : "rgba(255,255,255,0.3)" }}>
              {apiError ?? hint}
            </p>
          </div>

          <button
            type="submit"
            disabled={!type || loading}
            className="w-full px-5 py-4 text-base font-bold text-black transition-opacity"
            style={{
              backgroundColor: IVORY,
              opacity: (!type || loading) ? 0.4 : 1,
              cursor: (!type || loading) ? "default" : "pointer",
            }}
            data-testid="btn-send-link"
          >
            {loading ? "Sending…" : "Send Code →"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/25">
          First time here?{" "}
          <a href="/estimate" className="text-white/40 hover:text-white underline transition-colors">
            Book your first service
          </a>{" "}
          to create your account.
        </p>

      </div>
      </FadeIn>
    </div>
  );
}
