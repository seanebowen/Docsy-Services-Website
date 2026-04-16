import React, { useEffect, useRef, useState } from "react";
import {
  DIVISIONS,
  HOME_BUSY,
  HOME_CLOSED,
  applyTokens,
  getNextTimeLabel,
} from "@/lib/statusBar";
import { useAvailability } from "@/hooks/useAvailability";

const ROTATE_MS = 4000;
const SLATE = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

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
  let pulse = true;
  let headline = "";
  let sub = "";

  if (state === "busy") {
    dotColor = "#eab308";
    headline = HOME_BUSY.h;
    sub = HOME_BUSY.s;
  } else if (state === "closed") {
    dotColor = "#ef4444";
    pulse = false;
    headline = applyTokens(HOME_CLOSED.h);
    sub = HOME_CLOSED.s;
  } else {
    const d = DIVISIONS[idx];
    headline = d.home.h;
    sub = d.home.s;
  }

  return (
    <div
      className="block w-full border-b"
      style={{ backgroundColor: SLATE, borderColor: DIV }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="status"
      aria-live="polite"
      data-testid="home-status-bar"
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-3.5">
        <span
          className={`block w-[13px] h-[13px] rounded-full shrink-0 ${pulse ? "animate-pulse" : ""}`}
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 0 4px ${dotColor}33`,
          }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0 flex items-center gap-3.5 flex-nowrap overflow-hidden">
          <span
            key={state === "available" ? `h-${idx}` : `h-${state}`}
            className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.12em] whitespace-nowrap"
            style={{ color: BLUE, animation: "fadeUp .35s ease" }}
          >
            {headline}
          </span>
          <span
            className="hidden lg:inline text-[12px] sm:text-[13px] font-medium whitespace-nowrap"
            style={{ color: "rgba(77,159,219,0.55)" }}
          >
            {sub}
          </span>
          <span
            className="hidden md:inline text-[12px] sm:text-[13px] font-bold whitespace-nowrap ml-auto"
            style={{ color: dotColor }}
          >
            {next.prefix}{next.value}
          </span>
        </div>
      </div>
    </div>
  );
}
