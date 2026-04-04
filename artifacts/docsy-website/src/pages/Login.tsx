import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

export default function Login() {
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    document.title = "Sign In | Docsy Notary Services";
  }, []);

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
            Sign in to Docsy
          </h1>
          <p className="text-[#777] text-sm text-center mb-10">
            Access your documents, appointments, and Safe+ vault.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#111] border border-[#222] text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-[#4A6FA8] transition-colors"
                  data-testid="input-email"
                />
              </div>
            </div>

            <Link
              href="/verify"
              className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: BLUE }}
              data-testid="btn-continue"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-xs text-[#555] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          <button
            className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-[#222] hover:bg-[#111] transition-colors mb-3"
            data-testid="btn-google"
          >
            Continue with Google
          </button>
          <button
            className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-[#222] hover:bg-[#111] transition-colors"
            data-testid="btn-apple"
          >
            Continue with Apple
          </button>

          <p className="text-xs text-[#555] text-center mt-10 leading-relaxed">
            By continuing, you agree to Docsy's Terms of Service and Privacy Policy.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
