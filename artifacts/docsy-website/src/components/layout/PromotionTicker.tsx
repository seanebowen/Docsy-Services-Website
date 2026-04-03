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

const tickerText = promoItems.join("   ");

export function PromotionTicker() {
  return (
    <Link href="/promos" className="block w-full overflow-hidden cursor-pointer group" style={{ backgroundColor: "#f0c040" }}>
      <div className="flex items-center h-9 overflow-hidden">

        {/* Static label */}
        <div
          className="flex items-center gap-2 shrink-0 px-4 h-full z-10"
          style={{ backgroundColor: "#141414" }}
        >
          <Tag className="h-3 w-3 text-yellow-400" />
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 whitespace-nowrap">
            Current Promos
          </span>
        </div>

        {/* Scrolling track */}
        <div className="ticker-overflow flex-1 overflow-hidden">
          <div className="ticker-track flex items-center gap-0">
            {/* Duplicate the text twice for seamless loop */}
            {[0, 1].map((i) => (
              <span key={i} className="ticker-segment flex items-center gap-0 shrink-0">
                {promoItems.map((item, j) => (
                  <span
                    key={j}
                    className={`text-xs uppercase tracking-widest px-5 ${
                      item === "·"
                        ? "text-black/30 font-bold"
                        : item === "CURRENT PROMOS"
                        ? "font-black text-black"
                        : "font-semibold text-black"
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
          className="shrink-0 px-4 h-full flex items-center text-xs font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors"
          style={{ backgroundColor: "#e8b830" }}
        >
          →
        </div>
      </div>
    </Link>
  );
}
