import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import loanImg from "@/assets/images/loan-signing-keys.png";

const IVORY = "#F5EFE6";
const BG = "#131929";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#4D9FDB", color: "#4D9FDB" }}>
      {icon} {text}
    </span>
  </div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "#000", padding: "0 5px" }}>{children}</span>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

export default function LoanSigning() {
  React.useEffect(() => {
    document.title = "Loan Signing Agent | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Loan signings done right.
              <br />
              <HI>Flat rates.</HI>
              <br />
              No surprises.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Certified loan signing agent for refinance, buyer, seller, HELOC, reverse mortgage, and commercial packages. Texas-compliant. Reliable.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-signing">
                Book Now →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={loanImg} alt="Loan signing pen and house keys" />

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border bg-[#4D9FDB] text-black">
              ⚠ TEXAS HELOC
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            The one nobody
            <br />
            warns you about.
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Texas law prohibits home equity loan signings at the borrower's residence. Docsy flags every HELOC assignment and confirms a compliant signing location before accepting it. If your signing agent doesn't know this, your closing is at risk.
          </p>
        </div>
      </section>

      {[
        {
          icon: "⊙", label: "FOR BORROWERS",
          heading: "Prepared borrowers mean cleaner closings.",
          body: "Docsy sends every borrower a pre-appointment guide before every signing — what ID to bring, what not to sign early, what to have ready. Closing on a home is stressful enough without having to wonder if the signing agent is going to show up.",
        },
        {
          icon: "⊟", label: "FOR TITLE COMPANIES",
          heading: "Published rates.\nNo negotiating.",
          body: "Flat rates, published in advance. Scanbacks included with refinance and buyer packages, returned immediately on completion — not hours later. And if a re-sign is needed because of a lender or title error, that gets billed to the party at fault.",
        },
        {
          icon: "◎", label: "SCANBACKS",
          heading: "Back to your team\nbefore you blink.",
          body: "Scanbacks are included with refinance and buyer packages and returned immediately after the signing is complete. Not in 2 hours. Not end of day. Immediately. Your title team will have them before the borrowers have left the table.",
        },
      ].map((feat, i) => (
        <section key={i} className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
          <div className="max-w-2xl mx-auto">
            <Label icon={feat.icon} text={feat.label} />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
              {feat.heading}
            </h2>
            <p className="text-lg font-light text-white/50 leading-relaxed">{feat.body}</p>
          </div>
        </section>
      ))}

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊞" text="PRICING" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>Flat rates. Published.</h2>
          </div>
          <div className="border border-[#1e2a3a] divide-y divide-[#1e2a3a] max-w-xl mx-auto mb-8">
            {[
              { l: "Refinance Package", p: "$175" },
              { l: "Buyer Purchase Package", p: "$200" },
              { l: "Seller Package", p: "$125" },
              { l: "HELOC / Home Equity", p: "$175" },
              { l: "Reverse Mortgage", p: "$225" },
              { l: "Loan Modification", p: "$100" },
              { l: "Scanbacks (refinance + buyer)", p: "Included" },
              { l: "Docsy Safe+ 30-day trial", p: "Included" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-4">
                <span className="text-sm text-white/60">{row.l}</span>
                <span className="text-sm font-bold" style={{ color: IVORY }}>{row.p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              Flat rates. No surprises.<br />
              <span style={{ color: "#4D9FDB" }}>Know your price first.</span>
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["Scanbacks always included", "TX HELOC compliant", "Itemized invoice every time"].map(t => (
                <span key={t} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <span style={{ color: "#4D9FDB" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href="/estimate" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-signing-cta">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
