import React from "react";
import { Link } from "wouter";

const AMBER = "#4D9FDB";

const items = [
  "TRANSPARENT PRICING",
  "·",
  "KNOW YOUR PRICE BEFORE YOU BOOK — ALWAYS",
  "·",
  "EARLY BIRD SEAL — $10 OFF · 8AM–10AM MON–FRI",
  "·",
  "LUNCH BREAK SEAL — $10 OFF · 11AM–1PM MON–FRI",
  "·",
  "NIGHT SHIFT SEAL — $10 OFF · 6PM–9PM MON–FRI",
  "·",
  "SAME-HOUR RON AVAILABLE",
  "·",
  "RON & MOBILE: 7AM–11PM DAILY",
  "·",
  "GENERAL HOURS 9AM–9PM · EXTENDED HOURS FOR MEMBERS",
  "·",
];

export function PromotionTicker() {
  return (
    <Link href="/promos" className="block w-full overflow-hidden border-b border-[#1e2a3a] cursor-pointer group" style={{ backgroundColor: "#131929" }}>
      <div className="ticker-overflow h-11 flex items-center">
        <div className="ticker-track flex items-center">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center shrink-0">
              {items.map((item, j) => (
                <span
                  key={j}
                  className="text-sm font-bold uppercase tracking-widest px-5 whitespace-nowrap"
                  style={{ color: item === "·" ? "rgba(255,255,255,0.15)" : AMBER }}
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
