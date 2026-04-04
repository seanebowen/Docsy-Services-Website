import React, { useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const CLOUD = "#f4ffff";
const EMERALD = "#047521";

export default function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    document.title = "Verify Code | Docsy Notary Services";
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: TERMINAL }}>
      <Reveal>
        <div className="w-full max-w-md">
          <Link href="/" className="block mb-12">
            <img src="/logo.png" alt="Docsy Notary Services" className="h-10 w-auto mx-auto brightness-0 invert" />
          </Link>

          <h1 className="text-2xl font-bold text-center mb-3" style={{ color: CLOUD }}>Check your email</h1>
          <p className="text-sm text-center mb-2" style={{ color: `${CLOUD}66` }}>We sent a 6-digit code to</p>
          <p className="text-sm text-center mb-10 font-semibold" style={{ color: CLOUD }}>you@example.com</p>

          <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-md focus:outline-none transition-colors"
                style={{ backgroundColor: "#000F0A", border: `1px solid ${EMERALD}66`, color: CLOUD }}
                data-testid={`code-input-${i}`}
              />
            ))}
          </div>

          <button
            className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 mb-6 shadow-lg"
            style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}
            data-testid="btn-verify"
          >
            Verify Code <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center space-y-4">
            <button className="text-xs uppercase tracking-wider font-semibold transition-colors" style={{ color: `${CLOUD}66` }}>
              Resend Code
            </button>
            <div>
              <Link href="/login" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold transition-colors" style={{ color: `${CLOUD}4d` }}>
                <ArrowLeft className="h-3 w-3" /> Use a different email
              </Link>
            </div>
          </div>

          <p className="text-xs text-center mt-10 leading-relaxed" style={{ color: `${CLOUD}4d` }}>
            Didn't receive it? Check your spam folder or try resending.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
