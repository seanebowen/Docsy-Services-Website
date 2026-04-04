import React from "react";
import { Link } from "wouter";

const CAROLINA = "#D4B896";

const items = [
  "TRANSPARENT PRICING",
  "·",
  "WRITTEN ESTIMATE BEFORE EVERY APPOINTMENT",
  "·",
  "EARLY BIRD SEAL — $10 OFF · 8AM–10AM",
  "·",
  "LUNCH BREAK SEAL — $10 OFF · 11AM–1PM",
  "·",
  "NIGHT SHIFT SEAL — $10 OFF · 7PM–9PM",
  "·",
  "SAME-HOUR RON AVAILABLE",
  "·",
  "7 DAYS · 7AM TO MIDNIGHT",
  "·",
];

export function PromotionTicker() {
  return (
    <Link href="/promos" className="block w-full overflow-hidden border-b border-[#162040] cursor-pointer group" style={{ backgroundColor: "#0d1b3e" }}>
      <div className="ticker-overflow h-9 flex items-center">
        <div className="ticker-track flex items-center">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center shrink-0">
              {items.map((item, j) => (
                <span
                  key={j}
                  className="text-xs font-bold uppercase tracking-widest px-4 whitespace-nowrap"
                  style={{ color: item === "·" ? "rgba(255,255,255,0.2)" : CAROLINA }}
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
