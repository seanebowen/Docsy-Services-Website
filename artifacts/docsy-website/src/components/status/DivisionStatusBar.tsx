import React from "react";
import {
  Division,
  DivisionId,
  StatusState,
  applyTokens,
  getDivision,
  getNextTimeLabel,
} from "@/lib/statusBar";

const SLATE = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const DOT_COLOR: Record<StatusState, string> = {
  available: "#22c55e",
  busy: "#eab308",
  closed: "#ef4444",
};

interface Props {
  divisionId?: DivisionId;
  division?: Division;
  state: StatusState;
  showPill?: boolean;
  rotateIndicator?: React.ReactNode;
}

export function DivisionStatusBar({
  divisionId,
  division,
  state,
  showPill = true,
  rotateIndicator,
}: Props) {
  const d = division ?? (divisionId ? getDivision(divisionId) : null);
  if (!d) return null;

  const copy = d[state];
  const dot = DOT_COLOR[state];
  const pulse = state !== "closed";
  const next = getNextTimeLabel(state);

  return (
    <div
      className="block w-full border-b"
      style={{ backgroundColor: SLATE, borderColor: DIV }}
      role="status"
      aria-live="polite"
      data-testid={`status-bar-${d.id}`}
    >
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center gap-3">
        <span
          className={`block w-[10px] h-[10px] rounded-full shrink-0 ${pulse ? "animate-pulse" : ""}`}
          style={{
            backgroundColor: dot,
            boxShadow: `0 0 0 3px ${dot}33`,
          }}
          aria-hidden="true"
        />
        {showPill && (
          <span
            className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide border whitespace-nowrap shrink-0 uppercase"
            style={{
              backgroundColor: "transparent",
              color: BLUE,
              borderColor: BLUE + "55",
            }}
          >
            {d.pill}
          </span>
        )}
        <div className="flex-1 min-w-0 flex items-center gap-3 overflow-hidden">
          <span
            className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] whitespace-nowrap truncate"
            style={{ color: BLUE }}
          >
            {applyTokens(copy.h)}
          </span>
          <span
            className="hidden md:inline text-[11px] font-medium truncate"
            style={{ color: "rgba(77,159,219,0.55)" }}
          >
            {applyTokens(copy.s)}
          </span>
          <span
            className="hidden lg:inline text-[11px] font-bold whitespace-nowrap ml-auto"
            style={{ color: "rgba(77,159,219,0.7)" }}
          >
            {next.prefix}{next.value}
          </span>
        </div>
      </div>
      {rotateIndicator}
    </div>
  );
}
