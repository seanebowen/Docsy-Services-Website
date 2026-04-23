import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";
import {
  attachIdMeToAccount,
  setPendingIdMeVerification,
  clearPendingIdMeVerification,
  type IdMeGroup,
} from "@/lib/idme";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const GREEN = "#76b900";

const VALID: IdMeGroup[] = ["military", "veteran", "responder", "nurse", "teacher"];

export default function IdMeCallback() {
  const [, setLocation]          = useLocation();
  const { user, token, updateUser } = useAuth();
  const [status, setStatus]      = useState<"working" | "ok" | "error">("working");
  const [group,  setGroup]       = useState<IdMeGroup>("veteran");
  const [attached, setAttached]  = useState<boolean>(false);

  useEffect(() => {
    document.title = "Verifying… | Docsy Services";
    const params = new URLSearchParams(window.location.search);
    const demo   = params.get("demo");
    const code   = params.get("code");
    const grp    = (params.get("group") as IdMeGroup | null) ?? "veteran";

    const finish = async () => {
      const safeGroup: IdMeGroup = VALID.includes(grp) ? grp : "veteran";
      setGroup(safeGroup);

      if (token && user) {
        /* Signed in → attach the verification straight to the account.
           No pending-local record is needed. */
        const record = await attachIdMeToAccount(token, safeGroup);
        if (record) {
          updateUser({ ...user, idMeVerification: record });
          clearPendingIdMeVerification();
          setAttached(true);
        } else {
          /* Fallback: if the API call fails, at least park it locally so
             the user isn't stranded — it will migrate on next sign-in. */
          setPendingIdMeVerification(safeGroup);
          setAttached(false);
        }
      } else {
        /* Signed out → park locally; AuthContext migrates it up once the
           user signs in or completes the checkout-upsert flow. */
        setPendingIdMeVerification(safeGroup);
        setAttached(false);
      }
      setStatus("ok");
    };

    if (demo === "1") {
      const t = setTimeout(finish, 900);
      return () => clearTimeout(t);
    }
    if (code) {
      finish();
      return;
    }
    setStatus("error");
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.id]);

  const returnTo = sessionStorage.getItem("docsy_idme_return_to") ?? "/calculate";

  /* Smart auto-redirect: when a signed-out user verifies from inside
     the booking funnel (Calculator, Booking, Payment), skip the
     "Sign in to attach HonorPass" interstitial and bounce them
     straight back so the discount lands on their live quote. The
     pending-localStorage record migrates onto the account
     automatically when it's auto-created at checkout. Users coming
     back from any other path still see the interstitial. */
  const isFunnelReturn =
    returnTo === "/calculate" ||
    returnTo.startsWith("/calculate?") ||
    returnTo === "/booking" ||
    returnTo.startsWith("/booking?") ||
    returnTo.startsWith("/booking/");

  const goBack = () => {
    sessionStorage.removeItem("docsy_idme_return_to");
    sessionStorage.removeItem("docsy_idme_state");
    setLocation(returnTo);
  };

  useEffect(() => {
    if (status !== "ok") return;
    if (signedIn && !attached) return; // let the user see the warning
    if (signedIn && attached) return;  // signed-in success already shows a Continue button
    if (!signedIn && !isFunnelReturn) return; // promos / other → keep interstitial

    /* Signed-out + funnel return → auto-redirect after a short beat. */
    const t = setTimeout(() => goBack(), 1800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, attached]);

  const goSignIn = () => {
    sessionStorage.removeItem("docsy_idme_state");
    setLocation("/login");
  };

  const goCheckout = () => {
    sessionStorage.removeItem("docsy_idme_state");
    setLocation(returnTo);
  };

  const signedIn = !!token && !!user;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-5 py-20" style={{ backgroundColor: BG }}>
      <FadeIn delay={0}>
        <div className="w-full max-w-md text-center border" style={{ borderColor: DIV }}>

          <div className="px-8 py-10">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: GREEN, color: GREEN }}>
                ⊙ ID.me Verification
              </span>
            </div>

            {status === "working" && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  Verifying your status…
                </h1>
                <p className="text-white/40 text-sm mb-8">
                  Securely confirming your eligibility through ID.me. This takes a moment.
                </p>
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 border-2 border-white/10 rounded-full animate-spin" style={{ borderTopColor: GREEN }} />
                </div>
              </>
            )}

            {status === "ok" && signedIn && attached && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  You're verified.
                </h1>
                <p className="text-white/50 text-sm mb-2">
                  Thank you for your service.
                </p>
                <p className="text-white/40 text-sm mb-8">
                  HonorPass™ — 10% off every Docsy service — is now permanently saved to your Docsy account. It auto-applies on every quote and booking, on any device you sign in on.
                </p>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full px-5 py-4 text-base font-bold text-black mb-4"
                  style={{ backgroundColor: IVORY }}
                  data-testid="btn-idme-continue"
                >
                  Continue →
                </button>
                <p className="text-[11px] text-white/25">
                  Verified group: <span className="font-bold" style={{ color: BLUE }}>{group}</span>
                </p>
              </>
            )}

            {status === "ok" && !signedIn && isFunnelReturn && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  You're verified.
                </h1>
                <p className="text-white/50 text-sm mb-2">
                  Thank you for your service.
                </p>
                <p className="text-white/40 text-sm mb-6">
                  Taking you back to your booking — your 10% HonorPass™ discount is now applied. We'll save it to your Docsy account at checkout.
                </p>
                <div className="flex justify-center mb-6">
                  <div className="w-6 h-6 border-2 border-white/10 rounded-full animate-spin" style={{ borderTopColor: GREEN }} />
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full px-5 py-3 text-sm font-bold border"
                  style={{ borderColor: DIV, color: "rgba(255,255,255,0.6)" }}
                  data-testid="btn-idme-continue-booking"
                >
                  Continue now →
                </button>
                <p className="text-[11px] text-white/25 mt-4">
                  Verified group: <span className="font-bold" style={{ color: BLUE }}>{group}</span>
                </p>
              </>
            )}

            {status === "ok" && !signedIn && !isFunnelReturn && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  You're verified.
                </h1>
                <p className="text-white/50 text-sm mb-2">
                  Thank you for your service.
                </p>
                <p className="text-white/40 text-sm mb-8">
                  Sign in or create your Docsy account to lock HonorPass™ to your profile — once attached, 10% off auto-applies on every quote and booking, on any device you sign in on. If you continue to booking without signing in, your account is created at checkout and HonorPass is attached automatically.
                </p>
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    type="button"
                    onClick={goSignIn}
                    className="w-full px-5 py-4 text-base font-bold text-black"
                    style={{ backgroundColor: IVORY }}
                    data-testid="btn-idme-signin"
                  >
                    Sign in to attach HonorPass →
                  </button>
                  <button
                    type="button"
                    onClick={goCheckout}
                    className="w-full px-5 py-3 text-sm font-bold border"
                    style={{ borderColor: DIV, color: "rgba(255,255,255,0.6)" }}
                    data-testid="btn-idme-continue-booking"
                  >
                    Continue to booking (account created at checkout)
                  </button>
                </div>
                <p className="text-[11px] text-white/25">
                  Verified group: <span className="font-bold" style={{ color: BLUE }}>{group}</span>
                </p>
              </>
            )}

            {status === "ok" && signedIn && !attached && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  You're verified.
                </h1>
                <p className="text-white/40 text-sm mb-8">
                  We couldn't attach HonorPass to your account right now, but your verification is safely saved. It'll attach automatically the next time you open the site.
                </p>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full px-5 py-4 text-base font-bold text-black mb-4"
                  style={{ backgroundColor: IVORY }}
                >
                  Continue →
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  Verification incomplete.
                </h1>
                <p className="text-white/40 text-sm mb-8">
                  We didn't receive a confirmation from ID.me. Please try again.
                </p>
                <Link href="/calculate" className="inline-block w-full px-5 py-4 text-base font-bold text-black" style={{ backgroundColor: IVORY }}>
                  Back to Calculator
                </Link>
              </>
            )}
          </div>

          <div className="border-t px-8 py-4 text-[10px] text-white/25 leading-relaxed" style={{ borderColor: DIV }}>
            ID.me is a trusted federal credential service used by the VA, IRS, SSA, and Treasury. Docsy never sees or stores your military documents.
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
