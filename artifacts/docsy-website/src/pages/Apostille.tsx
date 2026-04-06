import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import apostilleImg from "@/assets/images/apostille-seal.png";

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

export default function Apostille() {
  React.useEffect(() => {
    document.title = "Apostille Services | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <span className="font-black">Your document needs</span>
              <br />
              <span className="font-light text-black/45">to work in</span>
              <br />
              <span className="font-black"><H>another country.</H></span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              All-inclusive Texas apostille services. State filing fee, digital scan, and shipping prep included. Personal documents starting at $150.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-apostille">
                Book Now →
              </Link>
              <Link href="/help-center" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-precheck-apostille">
                Free Pre-Check
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={apostilleImg} alt="Apostille wax seal on official document" />

      {[
        {
          icon: "⊙", label: "WHAT IS AN APOSTILLE",
          heading: "The certificate that\nmakes your document\nwork abroad.",
          body: "An apostille is an official certificate that authenticates a document for use in another country — specifically in countries that are part of the 1961 Hague Convention (which is most of them). If you're moving abroad, applying for dual citizenship, getting married internationally, sending your diploma to a foreign employer, or adopting internationally — you probably need an apostille.",
        },
        {
          icon: "⊟", label: "WHAT DOCSY HANDLES",
          heading: "Everything.",
          body: "You send us the original certified document. We review it before filing (our free Pre-Check makes sure it qualifies before we submit anything), file it at the Texas Secretary of State, email you a digital certified scan the moment it's done, and send the original back to you. All fees are included in the flat rate — state filing fee, scan, and return shipping prep.",
        },
        {
          icon: "✕", label: "CRITICAL LIMITATION",
          heading: "Originals only.\nNo photocopies.",
          body: "Texas apostilles can only be placed on Texas-origin documents or documents notarized by a Texas notary. Originals only — photocopies, scans, and laminated documents cannot be apostilled. If you're not sure what qualifies, use the free Pre-Check before sending anything.",
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
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              All-inclusive. No agency markup.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a] max-w-3xl mx-auto">
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1e2a3a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Texas Apostille</p>
              </div>
              {[
                { l: "Pre-Check", p: "Always Free" },
                { l: "Standard Personal Documents", p: "$150" },
                { l: "Standard Business Documents", p: "$175" },
                { l: "Next-Day Turnaround", p: "+$50 add-on" },
                { l: "Same-Day Rush (before 10 AM)", p: "+$75 add-on" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                </div>
              ))}
              <div className="px-8 py-4 border-t border-[#1e2a3a]">
                <p className="text-xs leading-relaxed text-white/25">
                  Standard turnaround is subject to the Texas Secretary of State's processing times and is handled by mail. Turnaround can vary and is not guaranteed. If your timeline is firm, select Next-Day or Same-Day Rush.
                </p>
              </div>
            </div>
            <div style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b border-[#1e2a3a]">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">Federal / Multi-Document</p>
              </div>
              {[
                { l: "Federal / USDOS Apostille", p: "$275" },
                { l: "Each additional (same order)", p: "$100" },
                { l: "Bundle (5+ documents)", p: "$90 each" },
                { l: "State SOS filing fee", p: "Included" },
                { l: "Digital certified scan", p: "Included" },
                { l: "30-day Safe+ vault trial", p: "Included" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                  <span className="text-sm text-white/60">{r.l}</span>
                  <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Not sure if your document qualifies?
          </h2>
          <p className="text-lg text-black/60 mb-8">Free Pre-Check before we file anything. No guessing. No surprises.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }} data-testid="btn-ask-apostille">Free Pre-Check</button>
            <button className="px-10 py-4 text-base font-bold text-black border-2 border-black">Ask a Question</button>
          </div>
        </div>
      </section>

    </div>
  );
}
