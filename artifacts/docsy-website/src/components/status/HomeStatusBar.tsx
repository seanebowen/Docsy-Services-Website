import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  DIVISIONS,
  HOME_BUSY,
  HOME_CLOSED,
  applyTokens,
  getNextTimeLabel,
  BOOKING_HREF,
} from "@/lib/statusBar";
import { useAvailability } from "@/hooks/useAvailability";

const ROTATE_MS = 4000;

export function HomeStatusBar() {
  const { state } = useAvailability();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state !== "available") return;
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      if (!paused) setIdx((i) => (i + 1) % DIVISIONS.length);
    }, ROTATE_MS);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state, paused]);

  const next = getNextTimeLabel(state);

  let dotColor = "#22c55e";
  let timeColor = "#16a34a";
  let pulse = true;
  let headline = "";
  let sub = "";
  let btnText = "Book now";
  let primary = true;

  if (state === "busy") {
    dotColor = "#eab308";
    timeColor = "#92400e";
    headline = HOME_BUSY.h;
    sub = HOME_BUSY.s;
    btnText = HOME_BUSY.btn;
    primary = false;
  } else if (state === "closed") {
    dotColor = "#ef4444";
    timeColor = "#991b1b";
    pulse = false;
    headline = applyTokens(HOME_CLOSED.h);
    sub = HOME_CLOSED.s;
    btnText = HOME_CLOSED.btn;
    primary = false;
  } else {
    const d = DIVISIONS[idx];
    headline = d.home.h;
    sub = d.home.s;
    btnText = "Book now";
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl px-5 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="status"
      aria-live="polite"
      data-testid="home-status-bar"
    >
      <div className="flex items-center gap-3">
        <span
          className={`block w-[11px] h-[11px] rounded-full shrink-0 ${
            pulse ? "animate-pulse" : ""
          }`}
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 0 3px ${dotColor}28`,
          }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div
            key={state === "available" ? `h-${idx}` : `h-${state}`}
            className="text-[15px] font-semibold text-gray-900 leading-tight"
            style={{ animation: "fadeUp .35s ease" }}
          >
            {headline}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 leading-snug">{sub}</div>
          <div className="text-xs font-semibold mt-1" style={{ color: timeColor }}>
            {next.prefix}
            {next.value}
          </div>
        </div>
        <Link
          href={BOOKING_HREF}
          className={
            "ml-auto rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors " +
            (primary
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200")
          }
          data-testid="home-status-cta"
        >
          {btnText} →
        </Link>
      </div>
      {state === "available" && (
        <div className="flex items-center gap-1.5 mt-2.5" role="tablist" aria-label="Division rotation">
          {DIVISIONS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show ${d.label}`}
              aria-selected={i === idx}
              role="tab"
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: i === idx ? "#374151" : "#e5e7eb" }}
              data-testid={`home-status-dot-${d.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
