import React from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import type {
  DocumentCheckResult,
  DocumentCheckRecommendation,
  DocumentCheckSuggestedService,
} from "@workspace/api-zod";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const ACCEPTED = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const MAX_BYTES = 25 * 1024 * 1024;

const SERVICE_LABELS: Record<DocumentCheckSuggestedService, string> = {
  ron:           "Remote Online Notarization",
  mobile:        "Mobile Notary (we come to you)",
  "in-office":   "In-office notarization",
  apostille:     "Apostille service",
  "loan-signing": "Loan signing",
};

const RECO_META: Record<DocumentCheckRecommendation, { label: string; color: string; bg: string; icon: string }> = {
  ready_to_notarize: { label: "Ready to notarize",  color: "#7CDB9F", bg: "rgba(124,219,159,0.10)", icon: "✓" },
  fix_first:         { label: "Fix before booking", color: "#F59E5C", bg: "rgba(245,158,92,0.12)",  icon: "!" },
  needs_review:      { label: "Needs human review", color: BLUE,      bg: "rgba(77,159,219,0.10)",  icon: "?" },
};

const Pill = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span
      className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border"
      style={{ borderColor: BLUE, color: BLUE }}
    >
      {icon} {text}
    </span>
  </div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "#000", padding: "0 5px" }}>{children}</span>
);

export default function DocumentCheck() {
  const [, setLocation] = useLocation();
  const [file,    setFile]    = React.useState<File | null>(null);
  const [status,  setStatus]  = React.useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errMsg,  setErrMsg]  = React.useState<string>("");
  const [result,  setResult]  = React.useState<DocumentCheckResult | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const resultRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.title = "Free Document Check | Docsy Services";
  }, []);

  React.useEffect(() => {
    if (status === "done" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const validate = (f: File): string | null => {
    if (f.size > MAX_BYTES) return "File is over 25 MB. Re-export at lower resolution or split into pages.";
    const ok =
      f.type === "application/pdf" ||
      f.type === "image/jpeg" || f.type === "image/jpg" ||
      f.type === "image/png";
    if (!ok) return "Only PDF, JPG, or PNG files are accepted.";
    return null;
  };

  const handleFile = (f: File) => {
    const err = validate(f);
    if (err) {
      setErrMsg(err);
      setStatus("error");
      setFile(null);
      return;
    }
    setErrMsg("");
    setStatus("idle");
    setResult(null);
    setFile(f);
  };

  const submit = async () => {
    if (!file) return;
    setStatus("uploading");
    setErrMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${import.meta.env.BASE_URL}api/document-check`, {
        method: "POST",
        body:   fd,
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Document check failed.");
      }
      setResult(json.result as DocumentCheckResult);
      setStatus("done");
    } catch (e) {
      setErrMsg((e as Error).message || "Document check failed.");
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setStatus("idle");
    setErrMsg("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const goBook = () => {
    if (!result) return;
    /* Map suggested service onto the calculator's service flag. The
       wizard uses the same convention so behavior is consistent. */
    const params = new URLSearchParams();
    switch (result.suggestedService) {
      case "apostille":     params.set("service", "apostille"); break;
      case "loan-signing":  params.set("service", "loan");      break;
      case "ron":           params.set("service", "ron");       break;
      case "in-office":
      case "mobile":
      default:              params.set("service", "mobile");    break;
    }
    setLocation(`/calculate?${params.toString()}`);
  };

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-12 pb-12 sm:pt-16 sm:pb-14" style={{ backgroundColor: IVORY }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[2.6rem] sm:text-[4rem] md:text-[5.5rem] leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              <span className="font-black">Catch errors</span>
              <br />
              <span className="font-light text-black/45">before you</span>
              <br />
              <span className="font-black"><H>book.</H></span>
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Drop in your document. Docsy's free pre-flight inspector flags the common mistakes that get notary work bounced — wrong notarial wording, missing signature lines, photocopies posing as certified copies — in about 20 seconds.
            </p>
          </FadeIn>
          <FadeIn delay={220}>
            <p className="mt-6 text-sm text-black/50 max-w-xl border-l-2 pl-4" style={{ borderColor: BLUE }}>
              <strong className="text-black">No account required.</strong> Documents are inspected by an AI vision service, kept in encrypted storage, and purged automatically after 24 hours. They're never sent to a notary or third party without your booking.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Upload + Result ── */}
      <section className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">

          {/* Upload card */}
          {status !== "done" && (
            <FadeIn delay={0}>
              <div className="border" style={{ borderColor: DIV }}>

                <div className="px-6 sm:px-8 pt-7 pb-3 border-b" style={{ borderColor: DIV }}>
                  <Pill icon="◇" text="Free Pre-Flight Check" />
                  <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-2" style={{ letterSpacing: "-0.02em" }}>
                    Upload your document.
                  </h2>
                  <p className="text-sm text-white/45 text-center max-w-2xl mx-auto pb-4">
                    PDF, JPG, or PNG up to 25 MB. One file at a time. Multi-page batch uploads are coming next.
                  </p>
                </div>

                <div className="px-6 sm:px-8 py-8">
                  {/* Drop zone */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload a document — drop a file here or press Enter to choose"
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleFile(f);
                    }}
                    className="border-2 border-dashed flex flex-col items-center justify-center text-center p-10 sm:p-14 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                    style={{
                      borderColor: dragOver ? BLUE : DIV,
                      backgroundColor: dragOver ? "rgba(77,159,219,0.05)" : "transparent",
                    }}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        inputRef.current?.click();
                      }
                    }}
                    data-testid="docchk-dropzone"
                  >
                    <div className="text-5xl mb-3" style={{ color: BLUE }} aria-hidden>⤒</div>
                    <p className="text-base font-bold text-white mb-1">
                      {file ? file.name : "Drop your document here"}
                    </p>
                    <p className="text-xs text-white/40">
                      {file
                        ? `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type || "unknown type"}`
                        : "or click to choose a file"}
                    </p>
                    <input
                      ref={inputRef}
                      type="file"
                      accept={ACCEPTED}
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                      data-testid="docchk-file-input"
                    />
                  </div>

                  {errMsg && (
                    <p className="mt-4 text-sm border-l-2 pl-4 py-2" style={{ borderColor: "#F59E5C", color: "#F59E5C" }} data-testid="docchk-error">
                      {errMsg}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!file || status === "uploading"}
                      data-testid="docchk-submit"
                      className="px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: BLUE }}
                    >
                      {status === "uploading" ? "Inspecting…" : "Run free check →"}
                    </button>
                    {file && status !== "uploading" && (
                      <button
                        type="button"
                        onClick={reset}
                        className="px-7 py-4 text-sm font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                        style={{ borderColor: DIV }}
                      >
                        Choose different file
                      </button>
                    )}
                  </div>

                  {status === "uploading" && (
                    <div className="mt-6 flex items-center gap-3 text-sm text-white/55" data-testid="docchk-loading">
                      <span
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: BLUE }}
                      />
                      Scanning your document — this usually takes 15–25 seconds.
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Result */}
          {status === "done" && result && (
            <FadeIn delay={0}>
              <div ref={resultRef} className="border" style={{ borderColor: DIV }} data-testid="docchk-result">

                <div className="px-6 sm:px-8 pt-7 pb-4 border-b" style={{ borderColor: DIV }}>
                  <Pill icon="◇" text="Inspection Result" />
                  <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-2" style={{ letterSpacing: "-0.02em" }}>
                    {result.documentType}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]">

                  {/* Left: thumbnail */}
                  <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r" style={{ borderColor: DIV }}>
                    {result.thumbnailDataUrl ? (
                      <div className="border max-h-[480px] overflow-hidden flex items-center justify-center" style={{ borderColor: DIV, backgroundColor: "rgba(255,255,255,0.02)" }}>
                        <img
                          src={result.thumbnailDataUrl}
                          alt="Uploaded document preview"
                          className="max-w-full max-h-[480px] object-contain"
                          data-testid="docchk-thumbnail"
                        />
                      </div>
                    ) : (
                      <div
                        className="border flex flex-col items-center justify-center p-10 text-center"
                        style={{ borderColor: DIV, backgroundColor: "rgba(255,255,255,0.02)" }}
                      >
                        <div className="text-5xl mb-3 text-white/30" aria-hidden>📄</div>
                        <p className="text-sm text-white/50">PDF preview unavailable.</p>
                      </div>
                    )}
                  </div>

                  {/* Right: findings */}
                  <div className="p-6 sm:p-8">
                    {/* Status badge */}
                    {(() => {
                      const meta = RECO_META[result.recommendation];
                      return (
                        <div
                          className="border-l-4 pl-4 py-3 mb-5"
                          style={{ borderColor: meta.color, backgroundColor: meta.bg }}
                          data-testid={`docchk-status-${result.recommendation}`}
                        >
                          <p className="flex items-center gap-2 text-base font-black" style={{ color: meta.color }}>
                            <span className="inline-flex w-6 h-6 items-center justify-center text-sm font-black" style={{ backgroundColor: meta.color, color: "#000" }}>{meta.icon}</span>
                            {meta.label}
                          </p>
                          {result.recommendationRationale && (
                            <p className="mt-2 text-sm text-white/65 leading-relaxed">{result.recommendationRationale}</p>
                          )}
                        </div>
                      );
                    })()}

                    {/* Findings */}
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>What we found</p>
                    <ul className="space-y-2 mb-5">
                      <li className="flex justify-between gap-4 text-sm">
                        <span className="text-white/50">Notarial block</span>
                        <span className="text-white/85 text-right">
                          {result.notarialBlockPresent.present
                            ? `Present${result.notarialBlockPresent.location ? ` (${result.notarialBlockPresent.location})` : ""}`
                            : "Not detected"}
                        </span>
                      </li>
                      <li className="flex justify-between gap-4 text-sm">
                        <span className="text-white/50">Signature line</span>
                        <span className="text-white/85 text-right">
                          {result.signaturePresent ? "Present" : "Not detected"}
                        </span>
                      </li>
                      <li className="flex justify-between gap-4 text-sm">
                        <span className="text-white/50">Date field</span>
                        <span className="text-white/85 text-right capitalize">{result.dateField}</span>
                      </li>
                    </ul>

                    {/* Red flags */}
                    {result.redFlags.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#F59E5C" }}>Issues to address</p>
                        <ul className="space-y-2" data-testid="docchk-redflags">
                          {result.redFlags.map((flag, i) => (
                            <li key={i} className="flex gap-3 text-sm text-white/75 border-l-2 pl-3 py-1" style={{ borderColor: "rgba(245,158,92,0.5)" }}>
                              <span className="shrink-0 mt-0.5" style={{ color: "#F59E5C" }}>!</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggested service + CTA */}
                    <div className="border-t pt-5 mt-5" style={{ borderColor: DIV }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Suggested service</p>
                      <p className="text-base font-bold text-white mb-4">{SERVICE_LABELS[result.suggestedService]}</p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={goBook}
                          data-testid="docchk-book-cta"
                          className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-black"
                          style={{ backgroundColor: BLUE }}
                        >
                          Book {SERVICE_LABELS[result.suggestedService]} →
                        </button>
                        <Link
                          href="/about?inquiry=document-check#contact"
                          className="px-6 py-3 text-xs font-bold uppercase tracking-widest border text-white/70 hover:text-white transition-colors text-center"
                          style={{ borderColor: DIV }}
                        >
                          Talk to a human first
                        </Link>
                        <button
                          type="button"
                          onClick={reset}
                          data-testid="docchk-reset"
                          className="px-6 py-3 text-xs font-bold uppercase tracking-widest border text-white/55 hover:text-white transition-colors"
                          style={{ borderColor: DIV }}
                        >
                          Scan another
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy footer */}
                <div className="px-6 sm:px-8 py-5 border-t text-[10px] text-white/35 leading-relaxed" style={{ borderColor: DIV }}>
                  This pre-flight scan is informational only and is not legal advice. Docsy's free Pre-Check confirms eligibility before any document is submitted. Your file is processed by an AI vision service to spot common issues.
                  {result.storedExpiresAt
                    ? <> Anonymous uploads are kept in encrypted storage and automatically purged on{" "}
                        <strong className="text-white/55">
                          {new Date(result.storedExpiresAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                        </strong>.
                      </>
                    : <> Anonymous uploads are not retained on Docsy servers after the scan completes.</>}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-20 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-12">
              <Pill icon="⊞" text="How it works" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
                Three steps. About a minute.
              </h2>
            </div>
          </FadeIn>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { n: "1", h: "Upload",     d: "Drop in a PDF, JPG, or PNG. We'll never share it without your booking." },
              { n: "2", h: "Inspect",    d: "Our AI vision inspector reads the document and flags the common rejection triggers." },
              { n: "3", h: "Book or fix", d: "Get a clear next step — fix the issues, or book the right Docsy service in one click." },
            ].map((s) => (
              <li key={s.n} className="p-7" style={{ backgroundColor: BG }}>
                <p className="text-3xl font-black mb-3" style={{ color: BLUE }}>{s.n}</p>
                <p className="text-base font-bold text-white mb-2">{s.h}</p>
                <p className="text-sm text-white/45 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-sm text-white/40">
            Need a human eyeball instead? <Link href="/about?inquiry=document-check#contact" className="underline" style={{ color: BLUE }}>Book a free Pre-Check call.</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
