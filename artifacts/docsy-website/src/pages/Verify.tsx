import React, { useState, useRef } from "react";
import { Link } from "wouter";

const IVORY = "#F5EFE6";
const BG = "#131929";

export default function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    document.title = "Verify | Docsy Notary Services";
  }, []);

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    setError(false);
    if (value && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const full = code.join("");
    if (full.length === 6) setVerified(true);
    else setError(true);
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 py-20" style={{ backgroundColor: BG }}>
      <div className="w-full max-w-md text-center">

        {!verified ? (
          <>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#C8960A", color: "#C8960A" }}>
                ⊙ VERIFY EMAIL
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>Enter your code.</h1>
            <p className="text-white/40 text-base mb-10">Check your inbox. We sent a 6-digit code.</p>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center gap-3 mb-8">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold text-white border outline-none transition-colors"
                    style={{ backgroundColor: "#111", borderColor: error ? "#ef4444" : digit ? IVORY : "#222" }}
                    data-testid={`code-input-${i}`}
                  />
                ))}
              </div>
              {error && <p className="text-sm text-red-400 mb-4">Please enter the full 6-digit code.</p>}
              <button
                type="submit"
                className="w-full px-5 py-4 text-base font-bold text-black mb-4"
                style={{ backgroundColor: IVORY }}
                data-testid="btn-verify"
              >
                Verify & Sign In
              </button>
            </form>

            <Link href="/login" className="text-sm text-white/30 hover:text-white/60 underline transition-colors">
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#C8960A", color: "#C8960A" }}>
                ✓ VERIFIED
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>You're in.</h1>
            <p className="text-white/40 text-base mb-10">Your Docsy Safe+ vault is ready.</p>
            <Link href="/" className="inline-block px-10 py-4 text-base font-bold text-black" style={{ backgroundColor: IVORY }}>
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
