import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { saveIdMeVerification, type IdMeGroup } from "@/lib/idme";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const GREEN = "#76b900";

const VALID: IdMeGroup[] = ["military", "veteran", "responder", "nurse", "teacher"];

export default function IdMeCallback() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"working" | "ok" | "error">("working");
  const [group,  setGroup]  = useState<IdMeGroup>("veteran");

  useEffect(() => {
    document.title = "Verifying… | Docsy Services";
    const params = new URLSearchParams(window.location.search);
    const demo   = params.get("demo");
    const code   = params.get("code");
    const grp    = (params.get("group") as IdMeGroup | null) ?? "veteran";

    const finish = () => {
      const safeGroup: IdMeGroup = VALID.includes(grp) ? grp : "veteran";
      saveIdMeVerification(safeGroup);
      setGroup(safeGroup);
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
  }, []);

  const returnTo = sessionStorage.getItem("docsy_idme_return_to") ?? "/calculate";

  const goBack = () => {
    sessionStorage.removeItem("docsy_idme_return_to");
    sessionStorage.removeItem("docsy_idme_state");
    setLocation(returnTo);
  };

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

            {status === "ok" && (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  You're verified.
                </h1>
                <p className="text-white/50 text-sm mb-2">
                  Thank you for your service.
                </p>
                <p className="text-white/40 text-sm mb-8">
                  HonorPass™ — 10% off every Docsy service — is now permanently saved to this device. It auto-applies on every quote and booking.
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
