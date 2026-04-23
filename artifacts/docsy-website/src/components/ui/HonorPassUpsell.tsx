import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  resolveIdMeVerification,
  isHonorPassEligible,
  groupLabel,
} from "@/lib/idme";
import { IdMeButton } from "@/components/ui/IdMeButton";

const GREEN = "#76b900";
const IVORY = "#F5EFE6";

interface Props {
  returnTo: string;
  variant?: "panel" | "inline";
  className?: string;
}

/* ── Inline HonorPass / ID.me upsell ─────────────────────────
   Shown anywhere a price is presented (Calculator quote panel,
   Booking summary, Payment totals). Two states:
     • Unverified → green-bordered card with the ID.me CTA and
       the explicit "no Docsy account needed yet" microcopy.
     • Verified   → compact "✓ HonorPass active — {group}" chip
       so verified users are not nagged.
   Reads verification from the AuthContext (which falls back to the
   pending-localStorage record for signed-out users), so the moment
   a user returns from /idme/callback the chip flips automatically
   without a refresh.
*/
export function HonorPassUpsell({ returnTo, variant = "panel", className = "" }: Props) {
  const { user } = useAuth();
  const verif = resolveIdMeVerification(user?.idMeVerification ?? null);
  const verified = isHonorPassEligible(verif);

  if (verified && verif) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 border ${className}`}
        style={{ borderColor: GREEN, backgroundColor: "rgba(118,185,0,0.08)" }}
        data-testid="honorpass-upsell-verified"
      >
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-black"
          style={{ backgroundColor: GREEN, color: "#000" }}
        >✓</span>
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>
          HonorPass active
        </span>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
          — {groupLabel(verif.group)}
        </span>
      </div>
    );
  }

  const compact = variant === "inline";

  return (
    <div
      className={`border ${compact ? "p-3" : "p-4"} ${className}`}
      style={{ borderColor: GREEN + "55", backgroundColor: "rgba(118,185,0,0.05)" }}
      data-testid="honorpass-upsell"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: GREEN }}>
        ⊙ Save 10% — HonorPass
      </p>
      <p className="text-sm font-bold leading-snug mb-2" style={{ color: IVORY }}>
        Service member, vet, or first responder?
      </p>
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
        Verify free with ID.me and 10% comes off your base service fee — applied the moment you come back.
      </p>
      <IdMeButton
        variant={compact ? "compact" : "primary"}
        label="Verify free in ~5 min"
        returnTo={returnTo}
        className="w-full"
      />
      <p className="text-[10px] leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>
        ID.me handles signup &amp; verification on their site — the same federal credential service used by the VA &amp; IRS.
        You don't need a Docsy account first; we'll save HonorPass to your account at checkout.
      </p>
    </div>
  );
}
