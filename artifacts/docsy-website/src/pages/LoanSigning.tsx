import React from "react";
import { ArrowRight, AlertTriangle, CheckCircle2, Users, Building2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";
const SURFACE = "#111";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-1 whitespace-nowrap">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

export default function LoanSigning() {
  React.useEffect(() => {
    document.title = "Loan Signing Agent | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-20 lg:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
            Loan Signing · Certified Agent
          </p>
          <h1 style={{ ...hdStyle, fontSize: "clamp(2.5rem, 5vw, 5rem)" }} className="text-white mb-8 max-w-4xl">
            Loan signings done right.<br />
            Flat rates. No surprises.<br />
            Scanbacks back fast.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-10">
            Certified loan signing agent for refinance, buyer, seller, HELOC, reverse mortgage, and commercial packages. <HL>Texas-compliant.</HL> Reliable.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: BLUE }}
              data-testid="btn-book-signing"
            >
              Book a Signing <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors"
              data-testid="btn-brokerlink"
            >
              BrokerLink™ Info
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">For Borrowers & Title Companies</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">[01]</span>
      </div>

      {/* ── SECTION 1 ────────────────────────────────── */}
      <section style={{ backgroundColor: SURFACE }} className="px-8 sm:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <Reveal>
            <span className="font-mono text-xs text-[#555] tracking-wider">[01]</span>
            <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-4 mt-2 flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: BLUE }} /> For borrowers
            </h2>
            <p className="text-base text-[#999] leading-relaxed mb-4">
              Closing on a home is stressful enough without having to worry about whether the signing agent is going to show up, know what they're doing, and return the documents on time. <HL>Docsy handles the signing side so your closing team can focus on funding.</HL>
            </p>
            <p className="text-base text-[#999] leading-relaxed">
              Docsy sends every borrower a pre-appointment guide before every signing — what ID to bring, what not to sign early, what to have ready. <HL>Prepared borrowers mean cleaner signings and faster fundings.</HL>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" style={{ color: BLUE }} /> For title companies & agents
            </h2>
            <p className="text-base text-[#999] leading-relaxed mb-4">
              <HL>Published flat rates. No negotiating every assignment.</HL> Scanbacks included with refinance and buyer packages and returned immediately on completion — not hours later.
            </p>
            <p className="text-base text-[#999] leading-relaxed">
              Texas HELOC law compliance handled proactively on every qualifying assignment. And if a re-sign is needed because of a lender or title error — <HL>that gets billed to the party at fault, not automatically to you.</HL>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── HELOC WARNING ────────────────────────────── */}
      <section className="px-8 sm:px-16 py-12" style={{ backgroundColor: "#1a1500" }}>
        <Reveal>
          <div className="flex items-start gap-6 max-w-4xl">
            <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
            <div>
              <h2 style={{ ...hdStyle, fontSize: "clamp(1.4rem, 2vw, 1.8rem)" }} className="text-amber-200 mb-3">
                Texas HELOC — the one nobody warns you about
              </h2>
              <p className="text-amber-300 text-base leading-relaxed">
                Texas law prohibits home equity loan signings at the borrower's residence. <HL>Docsy flags every HELOC assignment</HL> and confirms a compliant signing location (title company, lender branch, or attorney office) before accepting it. If your signing agent doesn't know this, <HL>your closing is at risk.</HL>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER 2 ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Pricing</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">[02]</span>
      </div>

      {/* ── SECTION 2: Pricing ───────────────────────── */}
      <section style={{ backgroundColor: "#0e0e0e" }} className="px-8 sm:px-16 py-20">
        <Reveal>
          <span className="font-mono text-xs text-[#555] tracking-wider">[02]</span>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} className="text-white mb-8 mt-2">
            Flat rates. Published. Non-negotiable.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border border-[#222] max-w-3xl mb-8">
            {[
              { l: "Refinance Package", p: "$175" },
              { l: "Buyer Purchase Package", p: "$200" },
              { l: "Seller Package", p: "$125" },
              { l: "HELOC / Home Equity", p: "$175" },
              { l: "Reverse Mortgage", p: "$225" },
              { l: "Loan Modification", p: "$100" },
            ].map((item, i) => (
              <div
                key={item.l}
                className={`p-6 border-b border-[#222] ${i % 3 !== 2 ? "border-r" : ""} ${i >= 3 ? "border-b-0" : ""}`}
              >
                <div className="text-2xl font-black mb-1" style={{ ...hdStyle, color: BLUE }}>{item.p}</div>
                <div className="text-xs text-[#777] uppercase tracking-[0.12em] font-semibold">{item.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h3 style={{ ...hdStyle, fontSize: "1.4rem" }} className="text-white mb-4">Add-ons</h3>
          <div className="grid grid-cols-3 gap-0 border border-[#222] max-w-md mb-8">
            {[{ l: "Rush (under 4 hrs)", p: "+$35" }, { l: "After-hours", p: "+$30" }, { l: "Re-sign (lender error)", p: "$75 flat" }].map((item, i) => (
              <div key={item.l} className={`p-6 text-center ${i < 2 ? "border-r border-[#222]" : ""}`}>
                <div className="text-xl font-black mb-1" style={{ ...hdStyle, color: BLUE }}>{item.p}</div>
                <div className="text-xs text-[#777]">{item.l}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 max-w-xl">
            {[
              "Scanbacks included with refinance and buyer packages",
              "90-day Docsy Safe+ vault trial included with every signing",
              "BrokerLink™ preferred pricing for real estate agents and title companies — $35/month",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span className="text-sm text-[#999]">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: BG }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <Reveal>
          <div>
            <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
              Book a loan signing or ask about BrokerLink™
            </h2>
            <p className="text-white/50 text-sm">Written estimate before every appointment. All fees disclosed before you start.</p>
          </div>
        </Reveal>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE }}
            data-testid="btn-book-signing-cta"
          >
            Book a Signing <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-colors" data-testid="btn-brokerlink-cta">
            BrokerLink™ Info
          </button>
        </div>
      </section>
    </div>
  );
}
