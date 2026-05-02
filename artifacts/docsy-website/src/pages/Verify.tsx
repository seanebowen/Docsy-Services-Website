import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";
import type { AuthUser } from "@/context/AuthContext";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const RED   = "#e05252";

export default function Verify() {
  const [, setLocation] = useLocation();
  const { signIn }      = useAuth();

  const identifier = sessionStorage.getItem("docsy_auth_identifier") ?? "";
  const masked     = sessionStorage.getItem("docsy_auth_masked")     ?? identifier;

  const [digits,   setDigits]   = useState(Array(6).fill(""));
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    document.title = "Verify | Docsy Services";
    if (!identifier) setLocation("/login");
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    setApiError(null);
    if (value && i < 5) inputs.current[i + 1]?.focus();
    if (value && i === 5) handleVerify(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      const next = text.split("");
      setDigits(next);
      inputs.current[5]?.focus();
      handleVerify(text);
    }
  };

  const handleVerify = async (code: string) => {
    if (code.length < 6) return;
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch("/api/auth/verify", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ identifier, code }),
      });
      const data = await res.json() as { ok: boolean; token?: string; user?: AuthUser; error?: string };
      if (data.ok && data.token && data.user) {
        signIn(data.token, data.user);
        sessionStorage.removeItem("docsy_auth_identifier");
        sessionStorage.removeItem("docsy_auth_masked");
        const nextRaw = sessionStorage.getItem("docsy_auth_next");
        sessionStorage.removeItem("docsy_auth_next");
        const dest = nextRaw && nextRaw.startsWith("/")
          ? nextRaw
          : (data.user.role === "firm_admin" || data.user.role === "firm_member")
            ? "/firm/portal"
            : "/vault";
        setLocation(dest);
      } else {
        setApiError(data.error ?? "Invalid code. Please try again.");
        setDigits(Array(6).fill(""));
        inputs.current[0]?.focus();
      }
    } catch {
      setApiError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(digits.join(""));
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 py-20" style={{ backgroundColor: BG }}>
      <FadeIn delay={0}>
      <div className="w-full max-w-md text-center">

        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
            ⊙ ENTER YOUR CODE
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
          Enter your code.
        </h1>
        <p className="text-white/40 text-base mb-2">
          We sent a 6-digit code to
        </p>
        <p className="font-bold mb-10" style={{ color: BLUE }}>{masked || "your contact"}</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                disabled={loading}
                className="w-12 h-14 text-center text-xl font-bold text-white border outline-none transition-colors"
                style={{
                  backgroundColor: "#111",
                  borderColor: apiError ? RED : d ? BLUE : "#222",
                }}
                data-testid={`code-input-${i}`}
              />
            ))}
          </div>

          {apiError && (
            <p className="text-sm mb-4" style={{ color: RED }}>{apiError}</p>
          )}

          <button
            type="submit"
            disabled={digits.join("").length < 6 || loading}
            className="w-full px-5 py-4 text-base font-bold text-black mb-4 transition-opacity"
            style={{
              backgroundColor: IVORY,
              opacity: (digits.join("").length < 6 || loading) ? 0.4 : 1,
            }}
            data-testid="btn-verify"
          >
            {loading ? "Verifying…" : "Verify & Sign In →"}
          </button>
        </form>

        <p className="text-xs text-white/25 mb-4">
          Didn't receive a code? Codes expire in 15 minutes.
        </p>

        <Link href="/login" className="text-sm text-white/30 hover:text-white/60 underline transition-colors">
          ← Try a different email or phone
        </Link>

      </div>
      </FadeIn>
    </div>
  );
}
