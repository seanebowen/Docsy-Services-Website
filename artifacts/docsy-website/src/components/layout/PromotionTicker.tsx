import React from "react";
import { Link } from "wouter";
import { Tag } from "lucide-react";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const CLOUD = "#f4ffff";

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
    <Link href="/promos" className="block w-full overflow-hidden cursor-pointer group" style={{ backgroundColor: CAROLINA }}>
      <div className="flex items-center h-9 overflow-hidden">

        <div
          className="flex items-center gap-2 shrink-0 px-4 h-full z-10"
          style={{ backgroundColor: TERMINAL }}
        >
          <Tag className="h-3 w-3" style={{ color: CLOUD }} />
          <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap" style={{ color: CLOUD }}>
            Current Promos
          </span>
        </div>

        <div className="ticker-overflow flex-1 overflow-hidden">
          <div className="ticker-track flex items-center gap-0">
            {[0, 1].map((i) => (
              <span key={i} className="ticker-segment flex items-center gap-0 shrink-0">
                {promoItems.map((item, j) => (
                  <span
                    key={j}
                    className={`text-xs uppercase tracking-widest px-5 ${
                      item === "·"
                        ? "font-bold"
                        : item === "CURRENT PROMOS"
                        ? "font-black"
                        : "font-semibold"
                    }`}
                    style={{ color: item === "·" ? `${CLOUD}4d` : CLOUD }}
                  >
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div
          className="shrink-0 px-4 h-full flex items-center text-xs font-black uppercase tracking-widest transition-colors"
          style={{ backgroundColor: EMERALD, color: `${CLOUD}66` }}
        >
          →
        </div>
      </div>
    </Link>
  );
}
