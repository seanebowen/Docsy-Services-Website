import React from "react";
import { Link } from "wouter";
import { Tag } from "lucide-react";

const promoItems = [
  "CURRENT PROMOS",
  "·",
  "EARLY BIRD SEAL · 8AM–10AM — $10 OFF GNW & RON",
  "·",
  "LUNCH BREAK SEAL · 11AM–1PM — $10 OFF GNW & RON",
  "·",
  "NIGHT SHIFT SEAL · 7PM–9PM — $10 OFF GNW & RON",
  "·",
];

export function PromotionTicker() {
  return (
    <Link href="/promos" className="block w-full overflow-hidden cursor-pointer group" style={{ backgroundColor: "#4A6FA8" }}>
      <div className="flex items-center h-9 overflow-hidden">

        {/* Static label */}
        <div
          className="flex items-center gap-2 shrink-0 px-4 h-full z-10"
          style={{ backgroundColor: "#141414" }}
        >
          <Tag className="h-3 w-3 text-white" />
          <span className="text-xs font-black uppercase tracking-widest text-white whitespace-nowrap">
            Current Promos
          </span>
        </div>

        {/* Scrolling track */}
        <div className="ticker-overflow flex-1 overflow-hidden">
          <div className="ticker-track flex items-center gap-0">
            {[0, 1].map((i) => (
              <span key={i} className="ticker-segment flex items-center gap-0 shrink-0">
                {promoItems.map((item, j) => (
                  <span
                    key={j}
                    className={`text-xs uppercase tracking-widest px-5 ${
                      item === "·"
                        ? "text-white/30 font-bold"
                        : item === "CURRENT PROMOS"
                        ? "font-black text-white"
                        : "font-semibold text-white"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Right arrow nudge on hover */}
        <div
          className="shrink-0 px-4 h-full flex items-center text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors"
          style={{ backgroundColor: "#3d5d8f" }}
        >
          →
        </div>
      </div>
    </Link>
  );
}
