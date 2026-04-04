import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const CLOUD = "#f4ffff";
const EMERALD = "#047521";

export default function Login() {
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    document.title = "Sign In | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: TERMINAL }}>
      <Reveal>
        <div className="w-full max-w-md">
          <Link href="/" className="block mb-12">
            <img src="/logo.png" alt="Docsy Notary Services" className="h-10 w-auto mx-auto brightness-0 invert" />
          </Link>

          <h1 className="text-2xl font-bold text-center mb-3" style={{ color: CLOUD }}>Sign in to Docsy</h1>
          <p className="text-sm text-center mb-10" style={{ color: `${CLOUD}66` }}>Access your documents, appointments, and Safe+ vault.</p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${CLOUD}4d` }}>Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: `${CLOUD}4d` }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-md text-sm focus:outline-none transition-colors"
                  style={{ backgroundColor: "#000F0A", border: `1px solid ${EMERALD}66`, color: CLOUD }}
                  data-testid="input-email"
                />
              </div>
            </div>

            <Link
              href="/verify"
              className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}
              data-testid="btn-continue"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ backgroundColor: `${EMERALD}66` }} />
            <span className="text-xs uppercase tracking-wider" style={{ color: `${CLOUD}4d` }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: `${EMERALD}66` }} />
          </div>

          <button className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 mb-3" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-google">
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 w-full px-7 py-4 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }} data-testid="btn-apple">
            Continue with Apple
          </button>

          <p className="text-xs text-center mt-10 leading-relaxed" style={{ color: `${CLOUD}4d` }}>
            By continuing, you agree to Docsy's Terms of Service and Privacy Policy.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
