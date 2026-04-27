import React from "react";

const SLATE = "#131929";
const DIV   = "#1e2a3a";

/* ─────────────────────────────────────────────────────────────────────────
 * PRESS — confirmed press placements only.
 *
 * IMPORTANT: this component renders nothing if `PRESS_CONFIRMED` is empty.
 * That's intentional — listing publications we haven't actually appeared in
 * would be a content-integrity problem.
 *
 * To enable the "As seen in" strip:
 *   1) Add real, verifiable placements to PRESS_CONFIRMED below
 *      (publication name and ideally a URL to the article).
 *   2) The strip will render automatically once at least one entry exists.
 *
 * Suggested initial outlets to pursue (kept as a comment for reference,
 * NOT rendered): San Antonio Express-News, Texas Notary Association,
 * SA Hispanic Chamber, Texas Bar Today, TitleNews — ALTA.
 * ────────────────────────────────────────────────────────────────────── */
interface PressItem {
  name: string;
  url?: string;
}

const PRESS_CONFIRMED: PressItem[] = [
  // TODO: add real press placements, e.g.
  // { name: "San Antonio Express-News", url: "https://..." },
];

interface Props {
  className?: string;
}

export function PressStrip({ className = "" }: Props) {
  if (PRESS_CONFIRMED.length === 0) return null;

  return (
    <section className={`px-5 py-10 border-b ${className}`} style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-center mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
          ⊙ As seen in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {PRESS_CONFIRMED.map(({ name, url }) => {
            const inner = (
              <span
                className="text-sm sm:text-base font-black uppercase tracking-[0.08em]"
                style={{ color: "rgba(255,255,255,0.42)", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "0.04em" }}
              >
                {name}
              </span>
            );
            return url ? (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                {inner}
              </a>
            ) : (
              <span key={name}>{inner}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
