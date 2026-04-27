import React from "react";
import { useLocation } from "wouter";
import {
  APOSTILLE_COUNTRIES,
  COUNTRIES_LAST_REVIEWED,
  type ApostilleCountry,
} from "@/data/apostilleCountries";
import {
  APOSTILLE_DOC_TYPES,
  INTENDED_USES,
  type ApostilleDocType,
  type IssuingAuthority,
} from "@/data/apostilleDocTypes";

const IVORY = "#F5EFE6";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const STORAGE_KEY = "docsy_apostille_wizard_v1";
export const WIZARD_HANDOFF_KEY = "docsy_apostille_handoff";

interface WizardState {
  step: 1 | 2 | 3 | 4 | 5;
  docTypeId: string | null;
  authority: IssuingAuthority | null;
  countryIso: string | null;
  useId: string | null;
}

export interface ApostilleHandoff {
  docTypeId: string;
  docTypeLabel: string;
  countryIso: string;
  countryName: string;
  useId: string | null;
  ts: number;
}

function defaultState(): WizardState {
  return { step: 1, docTypeId: null, authority: null, countryIso: null, useId: null };
}

function loadState(): WizardState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as WizardState;
    if (!parsed || typeof parsed !== "object" || typeof parsed.step !== "number") return defaultState();
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

function saveState(s: WizardState): void {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* quota — ignore */ }
}

/* ── Chain derivation ────────────────────────────────────────────────── */

interface ChainStep {
  num: number;
  title: string;
  detail: string;
  kind: "county" | "notary" | "sos" | "usdos" | "translation" | "embassy" | "done";
}

/**
 * Build the document chain for a given doc type, destination country, and
 * (effective) issuing authority. The effective authority comes from the user's
 * confirmation/override in Step 2 — this is what determines which government
 * path the document takes (TX SOS vs USDOS, county clerk first vs not, etc.).
 */
function buildChain(
  doc: ApostilleDocType,
  country: ApostilleCountry,
  authority: IssuingAuthority,
): ChainStep[] {
  const steps: Omit<ChainStep, "num">[] = [];
  const isFederal = authority === "federal";
  const isCourt   = authority === "state-court";
  const isNotary  = authority === "notary";
  // Diplomas are state-issued but the registrar's signature must be notarized
  // before TX SOS will apostille them.
  const needsNotaryStep = isNotary || (!isFederal && doc.id === "diploma");

  if (isFederal) {
    steps.push({
      kind: "usdos",
      title: "US Department of State authentication",
      detail: "Federal-origin documents (FBI background checks, IRS letters, USCIS records, federal court orders) must be authenticated by the US Department of State in Washington DC — NOT by TX SOS. Docsy handles the courier and submission to USDOS.",
    });
  } else {
    if (isCourt) {
      steps.push({
        kind: "county",
        title: "County / district clerk certification",
        detail: "Court-issued documents need a clerk certification before TX SOS will apostille them. Docsy can pull this for you in Bexar County and on request in any TX county.",
      });
    } else if (needsNotaryStep) {
      steps.push({
        kind: "notary",
        title: doc.id === "diploma"
          ? "Texas notary certifies the registrar's signature"
          : "Texas notary acknowledgment",
        detail: doc.id === "diploma"
          ? "Diplomas and transcripts must be notarized first — the notary certifies the school registrar's signature. Docsy can arrange this with most TX schools."
          : "The document must be signed in front of a Texas notary. Docsy can perform the notarization in person or via RON and roll it into the apostille order.",
      });
    }

    steps.push({
      kind: "sos",
      title: "Texas Secretary of State apostille",
      detail: "$15 state filing fee. Standard TX SOS turnaround is typically 5–10 business days; Next-Day Rush and Same-Day Sprint options are available.",
    });
  }

  const needsTranslation = (country.commonRequirements ?? []).some(r => /translation/i.test(r));
  if (needsTranslation) {
    const requirement = (country.commonRequirements ?? []).find(r => /translation/i.test(r));
    steps.push({
      kind: "translation",
      title: "Certified translation",
      detail: requirement ?? "A certified translation by a sworn translator is commonly required.",
    });
  }

  if (!country.hague) {
    steps.push({
      kind: "embassy",
      title: `Embassy / consulate legalization (${country.name})`,
      detail: country.embassyCity
        ? `Submit to: ${country.embassyCity}. Docsy can prepare the package; consular fees are paid directly to the embassy.`
        : `Submit to the nearest ${country.name} consulate or embassy. Docsy will confirm the correct office at pre-check.`,
    });
  }

  // "Done" copy distinguishes the federal vs state path so users know which
  // authority's certificate they'll be holding at the end.
  if (country.hague) {
    steps.push({
      kind: "done",
      title: `Ready for use in ${country.name}`,
      detail: isFederal
        ? `${country.name} is a Hague Apostille signatory — the USDOS federal apostille is recognized as-is. No embassy legalization required.`
        : `${country.name} is a Hague Apostille signatory — the TX SOS apostille is recognized as-is. No embassy legalization required.`,
    });
  } else {
    steps.push({
      kind: "done",
      title: `Ready for use in ${country.name}`,
      detail: isFederal
        ? `Once embassy legalization is complete (after USDOS authentication), your document is ready to be presented to authorities in ${country.name}.`
        : `Once embassy legalization is complete (after TX SOS apostille), your document is ready to be presented to authorities in ${country.name}.`,
    });
  }

  return steps.map((s, i) => ({ ...s, num: i + 1 }));
}

function authorityForDoc(doc: ApostilleDocType): IssuingAuthority {
  return doc.issuingAuthority;
}

function authorityLabel(a: IssuingAuthority): string {
  switch (a) {
    case "state-vital": return "Texas state-issued (vital records)";
    case "state-court": return "Texas court-issued";
    case "state-other": return "Texas state-issued (other)";
    case "notary":      return "Notarized in Texas";
    case "federal":     return "US federal-issued";
  }
}

/**
 * Apostille calculator type derives from the *effective* authority, not the
 * raw doc type — so a user who selects "Other" and then overrides the
 * authority to "federal" still gets routed to the federal apostille pricing.
 */
function apostTypeForAuthority(
  doc: ApostilleDocType,
  authority: IssuingAuthority,
): "personal" | "business" | "federal" {
  if (authority === "federal") return "federal";
  if (doc.id === "corporate-doc") return "business";
  return "personal";
}

/* ── Small UI helpers ────────────────────────────────────────────────── */

const Pill = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-6">
    <span
      className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border"
      style={{ borderColor: BLUE, color: BLUE }}
    >
      {icon} {text}
    </span>
  </div>
);

const StepDots = ({ step }: { step: number }) => (
  <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Step ${step} of 4`}>
    {[1, 2, 3, 4].map(n => (
      <span
        key={n}
        className="h-1 w-8 rounded-full transition-colors"
        style={{ backgroundColor: n <= step ? BLUE : "rgba(255,255,255,0.12)" }}
      />
    ))}
    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
      Step {step} of 4
    </span>
  </div>
);

/* ── Main component ──────────────────────────────────────────────────── */

export function DestinationWizard() {
  const [, setLocation] = useLocation();
  const [state, setState] = React.useState<WizardState>(() => loadState());
  const [countryQuery, setCountryQuery] = React.useState("");

  /* Focus the step heading when advancing — keyboard users land on the new
     step's prompt rather than re-traversing the entire page. */
  const stepHeadingRef = React.useRef<HTMLParagraphElement | null>(null);
  const prevStepRef    = React.useRef<number>(state.step);
  const isFirstMountRef = React.useRef(true);

  React.useEffect(() => { saveState(state); }, [state]);

  React.useEffect(() => {
    // Skip the very first mount — focusing on initial render would yank the
    // viewport away from the user's current scroll position.
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      prevStepRef.current = state.step;
      return;
    }
    if (state.step !== prevStepRef.current) {
      prevStepRef.current = state.step;
      stepHeadingRef.current?.focus();
    }
  }, [state.step]);

  const doc      = APOSTILLE_DOC_TYPES.find(d => d.id === state.docTypeId) ?? null;
  const country  = APOSTILLE_COUNTRIES.find(c => c.iso === state.countryIso) ?? null;
  const intended = INTENDED_USES.find(u => u.id === state.useId) ?? null;
  /* Effective authority: user's Step 2 override wins; otherwise the doc's
     default. This is what feeds the chain derivation and Calculator type. */
  const effectiveAuthority: IssuingAuthority | null =
    state.authority ?? (doc ? doc.issuingAuthority : null);
  const canFinish = doc !== null && country !== null && state.useId !== null && effectiveAuthority !== null;

  const goBack = () => setState(s => ({ ...s, step: Math.max(1, s.step - 1) as WizardState["step"] }));
  const reset  = () => {
    setState(defaultState());
    setCountryQuery("");
    try { sessionStorage.removeItem(WIZARD_HANDOFF_KEY); } catch { /* ignore */ }
  };

  const handlePickDoc = (d: ApostilleDocType) => {
    setState(s => ({ ...s, docTypeId: d.id, authority: authorityForDoc(d), step: 2 }));
  };
  const handleConfirmAuthority = () => {
    setState(s => ({ ...s, step: 3 }));
  };
  const handlePickCountry = (c: ApostilleCountry) => {
    setState(s => ({ ...s, countryIso: c.iso, step: 4 }));
  };
  const handlePickUse = (useId: string) => {
    setState(s => ({ ...s, useId, step: 5 }));
  };

  const handleBookCta = () => {
    if (!doc || !country || !effectiveAuthority) return;
    const apostType = apostTypeForAuthority(doc, effectiveAuthority);
    /* Stash the wizard's contextual answers so the Calculator can surface
       them as a banner ("From your wizard: Birth certificate → Spain") and
       the booking flow can attach them to the order for Docsy's pre-check. */
    const handoff: ApostilleHandoff = {
      docTypeId: doc.id,
      docTypeLabel: doc.label,
      countryIso: country.iso,
      countryName: country.name,
      useId: state.useId,
      ts: Date.now(),
    };
    try { sessionStorage.setItem(WIZARD_HANDOFF_KEY, JSON.stringify(handoff)); } catch { /* ignore */ }
    const params = new URLSearchParams({
      service: "apostille",
      docType: doc.id,
      country: country.iso,
      apostType,
    });
    setLocation(`/calculate?${params.toString()}`);
  };

  const filteredCountries = React.useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return APOSTILLE_COUNTRIES;
    return APOSTILLE_COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.iso.toLowerCase() === q,
    );
  }, [countryQuery]);

  return (
    <div
      className="border"
      style={{ borderColor: DIV, backgroundColor: "rgba(255,255,255,0.02)" }}
      data-testid="apostille-wizard"
    >
      {/* Header */}
      <div className="px-6 sm:px-8 pt-7 pb-4 border-b" style={{ borderColor: DIV }}>
        <Pill icon="◇" text="Destination Wizard" />
        <h2
          className="text-3xl sm:text-4xl font-black text-white text-center mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          Build your document chain.
        </h2>
        <p className="text-sm text-white/45 text-center max-w-2xl mx-auto">
          Tell us about your document and where it's going. Docsy will map out the exact steps — apostille only, federal authentication, certified translation, embassy legalization — so nothing gets sent to the wrong place.
        </p>
        <StepDots step={Math.min(4, state.step)} />
      </div>

      {/* Body */}
      <div className="px-6 sm:px-8 py-7">
        {/* ── Step 1: Document type ── */}
        {state.step === 1 && (
          <div>
            <p
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-[10px] font-bold uppercase tracking-widest mb-3 outline-none"
              style={{ color: BLUE }}
            >
              1 · What kind of document?
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {APOSTILLE_DOC_TYPES.map(d => {
                const selected = state.docTypeId === d.id;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => handlePickDoc(d)}
                      data-testid={`wiz-doc-${d.id}`}
                      className="w-full text-left px-4 py-3 border transition-colors hover:bg-white/5"
                      style={{
                        borderColor: selected ? BLUE : DIV,
                        backgroundColor: selected ? "rgba(77,159,219,0.08)" : "transparent",
                      }}
                    >
                      <p className="text-sm font-bold text-white">{d.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{d.examples}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ── Step 2: Confirm issuing authority ── */}
        {state.step === 2 && doc && (
          <div>
            <p
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-[10px] font-bold uppercase tracking-widest mb-3 outline-none"
              style={{ color: BLUE }}
            >
              2 · Issuing authority
            </p>
            <p className="text-sm text-white/55 mb-5">
              Based on <strong className="text-white">{doc.label}</strong>, this document is issued by:
            </p>
            <div className="border px-4 py-4 mb-5" style={{ borderColor: BLUE, backgroundColor: "rgba(77,159,219,0.05)" }}>
              <p className="text-base font-bold text-white">{authorityLabel(state.authority ?? doc.issuingAuthority)}</p>
              {doc.notes && <p className="text-xs text-white/45 mt-2 leading-relaxed">{doc.notes}</p>}
            </div>
            <details className="mb-5 text-xs text-white/40">
              <summary className="cursor-pointer hover:text-white/60 transition-colors">
                Override — my document is actually issued differently
              </summary>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(["state-vital", "state-court", "state-other", "notary", "federal"] as IssuingAuthority[]).map(a => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setState(s => ({ ...s, authority: a }))}
                    data-testid={`wiz-authority-${a}`}
                    className="text-left px-3 py-2 border text-xs"
                    style={{
                      borderColor: state.authority === a ? BLUE : DIV,
                      color: state.authority === a ? IVORY : "rgba(255,255,255,0.55)",
                      backgroundColor: state.authority === a ? "rgba(77,159,219,0.08)" : "transparent",
                    }}
                  >
                    {authorityLabel(a)}
                  </button>
                ))}
              </div>
            </details>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goBack}
                className="px-5 py-3 text-xs font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                style={{ borderColor: DIV }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleConfirmAuthority}
                data-testid="wiz-step2-continue"
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-black"
                style={{ backgroundColor: BLUE }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Destination country ── */}
        {state.step === 3 && (
          <div>
            <p
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-[10px] font-bold uppercase tracking-widest mb-3 outline-none"
              style={{ color: BLUE }}
            >
              3 · Destination country
            </p>
            <label htmlFor="apostille-country-search" className="sr-only">Search countries</label>
            <input
              id="apostille-country-search"
              type="search"
              value={countryQuery}
              onChange={e => setCountryQuery(e.target.value)}
              placeholder="Search ~150 countries…"
              autoComplete="off"
              data-testid="wiz-country-search"
              className="w-full px-4 py-3 text-sm bg-transparent border text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors mb-3"
              style={{ borderColor: DIV, caretColor: BLUE } as React.CSSProperties}
            />
            <div className="border max-h-72 overflow-y-auto" style={{ borderColor: DIV }}>
              {filteredCountries.length === 0 && (
                <p className="px-4 py-6 text-sm text-white/40 text-center">
                  No countries match "{countryQuery}". Try a different spelling or ISO code.
                </p>
              )}
              {filteredCountries.map(c => {
                const selected = state.countryIso === c.iso;
                return (
                  <button
                    key={c.iso}
                    type="button"
                    onClick={() => handlePickCountry(c)}
                    data-testid={`wiz-country-${c.iso}`}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left border-b last:border-b-0 transition-colors hover:bg-white/5"
                    style={{
                      borderColor: DIV,
                      backgroundColor: selected ? "rgba(77,159,219,0.08)" : "transparent",
                    }}
                  >
                    <span className="text-sm text-white/85">{c.name}</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest shrink-0"
                      style={{ color: c.hague ? BLUE : "rgba(255,180,120,0.85)" }}
                    >
                      {c.hague ? "Hague" : "Non-Hague"}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] text-white/30 leading-relaxed">
              Hague Convention status reviewed {COUNTRIES_LAST_REVIEWED}. Membership changes occasionally — Docsy will reconfirm at the free pre-check.
            </p>
            <div className="mt-5 flex">
              <button
                type="button"
                onClick={goBack}
                className="px-5 py-3 text-xs font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                style={{ borderColor: DIV }}
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Intended use ── */}
        {state.step === 4 && (
          <div>
            <p
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-[10px] font-bold uppercase tracking-widest mb-3 outline-none"
              style={{ color: BLUE }}
            >
              4 · What will it be used for?
            </p>
            <p className="text-sm text-white/45 mb-4">
              This helps Docsy flag any extra documents the receiving authority typically asks for.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INTENDED_USES.map(u => {
                const selected = state.useId === u.id;
                return (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => handlePickUse(u.id)}
                      data-testid={`wiz-use-${u.id}`}
                      className="w-full text-left px-4 py-3 border text-sm transition-colors hover:bg-white/5"
                      style={{
                        borderColor: selected ? BLUE : DIV,
                        color: selected ? IVORY : "rgba(255,255,255,0.7)",
                        backgroundColor: selected ? "rgba(77,159,219,0.08)" : "transparent",
                      }}
                    >
                      {u.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex">
              <button
                type="button"
                onClick={goBack}
                className="px-5 py-3 text-xs font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                style={{ borderColor: DIV }}
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Result chain ── */}
        {state.step === 5 && canFinish && doc && country && effectiveAuthority && (
          <div data-testid="wiz-result">
            <p
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-[10px] font-bold uppercase tracking-widest mb-3 outline-none"
              style={{ color: BLUE }}
            >
              Your document chain
            </p>
            <div className="mb-5 p-4 border" style={{ borderColor: DIV, backgroundColor: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs text-white/40 leading-relaxed">
                <strong className="text-white">{doc.label}</strong> · destination{" "}
                <strong className="text-white">{country.name}</strong>
                {country.hague ? " (Hague signatory)" : " (non-Hague — embassy legalization required)"}
                {intended ? ` · for ${intended.label.toLowerCase()}` : ""}
              </p>
            </div>

            <ol className="space-y-3 mb-6">
              {buildChain(doc, country, effectiveAuthority).map(s => (
                <li
                  key={s.num}
                  className="flex gap-4 border-l-2 pl-4 py-2"
                  style={{ borderColor: s.kind === "done" ? BLUE : DIV }}
                  data-testid={`wiz-chain-step-${s.num}`}
                >
                  <span
                    className="shrink-0 w-7 h-7 flex items-center justify-center text-xs font-black"
                    style={{
                      backgroundColor: s.kind === "done" ? BLUE : "rgba(77,159,219,0.15)",
                      color: s.kind === "done" ? "#000" : BLUE,
                    }}
                  >
                    {s.kind === "done" ? "✓" : s.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{s.title}</p>
                    <p className="text-xs text-white/45 mt-1 leading-relaxed">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            {country.notes && (
              <div className="mb-6 p-4 border-l-2 text-xs text-white/55 leading-relaxed" style={{ borderColor: BLUE, backgroundColor: "rgba(77,159,219,0.05)" }}>
                <strong className="block text-white mb-1">Heads up — {country.name}</strong>
                {country.notes}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleBookCta}
                data-testid="wiz-cta-book"
                className="px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                Book this work with Docsy →
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-7 py-4 text-sm font-bold uppercase tracking-widest border text-white/70 hover:text-white transition-colors"
                style={{ borderColor: DIV }}
              >
                Print chain
              </button>
              <button
                type="button"
                onClick={reset}
                data-testid="wiz-cta-reset"
                className="px-7 py-4 text-sm font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                style={{ borderColor: DIV }}
              >
                Start over
              </button>
            </div>

            <p className="mt-5 text-[10px] text-white/35 leading-relaxed max-w-prose">
              This chain reflects general Texas practice as of {COUNTRIES_LAST_REVIEWED}. Specific receiving authorities may require additional steps. Docsy's free pre-check confirms eligibility and the exact chain before any document is submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationWizard;
