import React from "react";
import { Link } from "wouter";
import {
  Division,
  DivisionId,
  StatusState,
  applyTokens,
  getDivision,
  getNextTimeLabel,
  BOOKING_HREF,
} from "@/lib/statusBar";

const STATE_STYLES = {
  available: { dot: "#22c55e", time: "#16a34a", pulse: true, primary: true },
  busy: { dot: "#eab308", time: "#92400e", pulse: true, primary: false },
  closed: { dot: "#ef4444", time: "#991b1b", pulse: false, primary: false },
} as const;

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
  const styles = STATE_STYLES[state];
  const next = getNextTimeLabel(state);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl px-5 py-4"
      role="status"
      aria-live="polite"
      data-testid={`status-bar-${d.id}`}
    >
      {showPill && (
        <div className="mb-2">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide border"
            style={{
              backgroundColor: d.color + "18",
              color: d.color,
              borderColor: d.color + "33",
            }}
          >
            {d.pill}
          </span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <span
          className="relative inline-flex shrink-0"
          aria-hidden="true"
        >
          <span
            className={`block w-[11px] h-[11px] rounded-full ${
              styles.pulse ? "animate-pulse" : ""
            }`}
            style={{
              backgroundColor: styles.dot,
              boxShadow: `0 0 0 3px ${styles.dot}28`,
            }}
          />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-gray-900 leading-tight">
            {applyTokens(copy.h)}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 leading-snug">
            {applyTokens(copy.s)}
          </div>
          <div
            className="text-xs font-semibold mt-1"
            style={{ color: styles.time }}
          >
            {next.prefix}
            {next.value}
          </div>
        </div>
        <Link
          href={BOOKING_HREF}
          className={
            "ml-auto rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors " +
            (styles.primary
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200")
          }
          data-testid={`status-cta-${d.id}`}
        >
          {copy.btn} →
        </Link>
      </div>
      {rotateIndicator}
    </div>
  );
}
