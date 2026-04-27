import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

export const IVORY = "#F5EFE6";
export const BG    = "#131929";
export const BLUE  = "#4D9FDB";
export const DIV   = "#1e2a3a";
export const MUTE  = "rgba(255,255,255,0.55)";
export const SOFT  = "rgba(255,255,255,0.42)";

export const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

export const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
      {icon} {text}
    </span>
  </div>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed font-light mb-4" style={{ color: MUTE }}>{children}</p>
);

export const SubH = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-bold uppercase tracking-[0.12em] mt-8 mb-3" style={{ color: IVORY }}>{children}</h3>
);

export const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2 mb-4 pl-5">
    {items.map((it, i) => (
      <li key={i} className="text-[15px] leading-relaxed font-light list-disc" style={{ color: MUTE }}>{it}</li>
    ))}
  </ul>
);

export interface LegalSectionEntry {
  id: string;
  n: string;
  title: string;
}

export const SectionHeader = ({ entry }: { entry: LegalSectionEntry }) => (
  <div className="mb-6 pb-4 border-b" style={{ borderColor: DIV }}>
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: BLUE }}>Section {entry.n}</p>
    <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: IVORY, letterSpacing: "-0.02em" }}>
      {entry.title}
    </h2>
  </div>
);

export const Section = ({ entry, children }: { entry: LegalSectionEntry; children: React.ReactNode }) => (
  <section id={entry.id} className="scroll-mt-24 mb-16">
    <FadeIn delay={0}>
      <SectionHeader entry={entry} />
    </FadeIn>
    <FadeIn delay={60}>
      <div>{children}</div>
    </FadeIn>
  </section>
);

interface ShellProps {
  documentTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleLead: React.ReactNode;
  titleHighlight: React.ReactNode;
  intro: React.ReactNode;
  lastUpdated: string;
  effective: string;
  summaryLabel?: string;
  summary: React.ReactNode;
  contactEmail?: string;
  toc: LegalSectionEntry[];
  tocTestId?: string;
  children: React.ReactNode;
}

export function LegalShell({
  documentTitle,
  metaDescription,
  eyebrow,
  titleLead,
  titleHighlight,
  intro,
  lastUpdated,
  effective,
  summaryLabel = "WHAT THIS MEANS FOR YOU",
  summary,
  contactEmail,
  toc,
  tocTestId,
  children,
}: ShellProps) {
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    document.title = documentTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", metaDescription);
  }, [documentTitle, metaDescription]);

  /* Highlight active TOC entry as user scrolls. */
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  /* Scroll to deep-linked section on mount (e.g. /privacy#sharing). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    if (!toc.some(e => e.id === hash)) return;
    const el = document.getElementById(hash);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(hash);
    });
  }, [toc]);

  const handleTocClick = (id: string) => {
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
    setActive(id);
  };

  const tocId = tocTestId ? `${tocTestId}-mobile-toc` : "legal-mobile-toc";

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5 text-black/55">⊙ {eyebrow}</p>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              {titleLead} <HI>{titleHighlight}</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xl sm:text-2xl text-black/55 max-w-3xl font-medium leading-snug">
              {intro}
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-wrap gap-3 mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-black/55">
              <span className="px-3 py-2 border-2 border-black">Last Updated: {lastUpdated}</span>
              <span className="px-3 py-2 border-2 border-black/30">Effective: {effective}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Plain-English Summary ── */}
      <section className="px-5 py-14 sm:py-16 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <Label icon="⊙" text={summaryLabel} />
          <FadeIn delay={80}>
            <div className="border-2 p-6 sm:p-8" style={{ borderColor: BLUE, backgroundColor: "rgba(77,159,219,0.06)" }}>
              <div className="text-base sm:text-lg leading-relaxed font-light" style={{ color: IVORY }}>
                {summary}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body: TOC + Sections ── */}
      <section className="px-5 py-12 sm:py-16 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">

          {/* ── Mobile TOC toggle ── */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileTocOpen(o => !o)}
              className="w-full flex justify-between items-center px-4 py-3 border-2 text-sm font-bold uppercase tracking-[0.16em]"
              style={{ borderColor: BLUE, color: BLUE }}
              data-testid={tocTestId ? `${tocTestId}-toc-toggle` : undefined}
              aria-expanded={mobileTocOpen}
              aria-controls={tocId}
            >
              <span>⊙ Jump to section</span>
              <span>{mobileTocOpen ? "−" : "+"}</span>
            </button>
            {mobileTocOpen && (
              <ol id={tocId} aria-label="Table of contents" className="mt-3 border" style={{ borderColor: DIV }}>
                {toc.map(e => (
                  <li key={e.id}>
                    <button
                      onClick={() => handleTocClick(e.id)}
                      className="w-full text-left flex gap-3 px-4 py-2.5 border-b text-[13px] font-light hover:bg-white/5"
                      style={{ borderColor: DIV, color: MUTE }}
                    >
                      <span style={{ color: SOFT }}>{e.n}</span>
                      <span>{e.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* ── Sticky desktop TOC ── */}
          <aside className="hidden lg:block" aria-label="Table of contents">
            <div className="sticky top-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: SOFT }}>⊙ Contents</p>
              <ol className="space-y-1.5 border-l" style={{ borderColor: DIV }}>
                {toc.map(e => {
                  const isActive = active === e.id;
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => handleTocClick(e.id)}
                        aria-current={isActive ? "true" : undefined}
                        className="w-full text-left pl-4 py-1.5 -ml-px border-l-2 transition-colors"
                        style={{
                          borderColor: isActive ? BLUE : "transparent",
                          color: isActive ? IVORY : SOFT,
                        }}
                      >
                        <span className="text-[10px] font-bold tracking-widest mr-2" style={{ color: isActive ? BLUE : "rgba(255,255,255,0.25)" }}>{e.n}</span>
                        <span className="text-[13px] font-light">{e.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {contactEmail && (
                <div className="mt-8 pt-6 border-t text-[11px] font-light leading-relaxed" style={{ borderColor: DIV, color: SOFT }}>
                  Questions about this policy?<br />
                  <a href={`mailto:${contactEmail}`} className="underline hover:text-white" style={{ color: BLUE }}>{contactEmail}</a>
                </div>
              )}
            </div>
          </aside>

          {/* ── Sections ── */}
          <div className="min-w-0">
            {children}
            {contactEmail && (
              <div className="mt-12 pt-8 border-t text-[13px] font-light lg:hidden" style={{ borderColor: DIV, color: SOFT }}>
                Questions about this policy?{" "}
                <a href={`mailto:${contactEmail}`} className="underline hover:text-white" style={{ color: BLUE }}>{contactEmail}</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
