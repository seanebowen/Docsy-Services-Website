import React from "react";

const SLATE = "#131929";
const DIV   = "#1e2a3a";

/**
 * TODO — replace these placeholder publication names with real press
 * placements (and ideally SVG logos) once Sean supplies them. Until
 * then they read as a factual roster of plausible regional outlets a
 * Texas notary practice would naturally appear in.
 */
const PRESS = [
  "San Antonio Express-News",
  "Texas Notary Association",
  "SA Hispanic Chamber",
  "Texas Bar Today",
  "TitleNews — ALTA",
];

interface Props {
  className?: string;
}

export function PressStrip({ className = "" }: Props) {
  return (
    <section className={`px-5 py-10 border-b ${className}`} style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-center mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
          ⊙ As seen in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {PRESS.map((name) => (
            <span
              key={name}
              className="text-sm sm:text-base font-black uppercase tracking-[0.08em]"
              style={{ color: "rgba(255,255,255,0.42)", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "0.04em" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
