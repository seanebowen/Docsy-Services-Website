import React, { useState } from "react";
import { Link } from "wouter";

const CAROLINA = "#D4B896";
const BG = "#0d1b3e";

export default function Login() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    document.title = "Sign In | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 py-20" style={{ backgroundColor: BG }}>
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: CAROLINA, color: "#000" }}>
              ◎ DOCSY SAFE+
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Sign in.
          </h1>
          <p className="text-white/40 text-base">
            We'll send a one-time link to your email.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-5 py-4 text-base text-white placeholder-white/20 border border-[#222] focus:border-[#444] outline-none transition-colors"
              style={{ backgroundColor: "#111" }}
              data-testid="input-email"
            />
            <button
              type="submit"
              className="w-full px-5 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: CAROLINA }}
              data-testid="btn-send-link"
            >
              Send Sign-In Link
            </button>
          </form>
        ) : (
          <div className="text-center border border-[#162040] px-8 py-12" style={{ backgroundColor: "#111" }}>
            <p className="text-4xl font-black text-white mb-2" style={{ letterSpacing: "-0.02em" }}>Check your email.</p>
            <p className="text-white/40 text-sm mt-4">
              We sent a link to <strong className="text-white/60">{email}</strong>. Click it to sign in. The link expires in 15 minutes.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm text-white/30 hover:text-white/60 underline transition-colors"
            >
              Try a different email
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-white/25">
          Don't have an account?{" "}
          <Link href="/" className="text-white/40 hover:text-white underline transition-colors">
            Book your first service
          </Link>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
}
