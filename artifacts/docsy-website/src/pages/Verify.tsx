import React, { useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

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
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: BG }}>
      <Reveal>
        <div className="w-full max-w-md">
          <Link href="/" className="block mb-12">
            <img
              src="/logo.png"
              alt="Docsy Notary Services"
              className="h-10 w-auto mx-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          <h1 style={{ ...hdStyle, fontSize: "2rem" }} className="text-white text-center mb-3">
            Check your email
          </h1>
          <p className="text-[#777] text-sm text-center mb-2">
            We sent a 6-digit code to
          </p>
          <p className="text-white text-sm text-center mb-10 font-semibold">
            you@example.com
          </p>

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
                className="w-12 h-14 text-center text-xl font-bold bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#4A6FA8] transition-colors"
                data-testid={`code-input-${i}`}
              />
            ))}
          </div>

          <button
            className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity mb-6"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-verify"
          >
            Verify Code <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center space-y-4">
            <button className="text-xs text-[#777] hover:text-white transition-colors uppercase tracking-widest font-semibold">
              Resend Code
            </button>
            <div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest font-semibold"
              >
                <ArrowLeft className="h-3 w-3" /> Use a different email
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#555] text-center mt-10 leading-relaxed">
            Didn't receive it? Check your spam folder or try resending.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
