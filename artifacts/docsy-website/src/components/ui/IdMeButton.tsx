import React from "react";
import { startIdMeFlow } from "@/lib/idme";

interface Props {
  variant?: "primary" | "compact";
  label?: string;
  returnTo?: string;
  className?: string;
}

const IDME_GREEN = "#76b900";

export function IdMeButton({ variant = "primary", label, returnTo, className = "" }: Props) {
  const text = label ?? "Verify with ID.me";
  const isCompact = variant === "compact";

  return (
    <button
      type="button"
      onClick={() => startIdMeFlow(returnTo)}
      data-testid="idme-verify-button"
      className={`inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-opacity hover:opacity-90 ${
        isCompact ? "px-4 py-2 text-xs" : "px-5 py-3 text-sm"
      } ${className}`}
      style={{ backgroundColor: IDME_GREEN, color: "#fff" }}
    >
      <span aria-hidden className="inline-flex items-center font-black" style={{ letterSpacing: "-0.02em" }}>
        ID.me
      </span>
      <span aria-hidden style={{ opacity: 0.6 }}>·</span>
      <span>{text}</span>
    </button>
  );
}
