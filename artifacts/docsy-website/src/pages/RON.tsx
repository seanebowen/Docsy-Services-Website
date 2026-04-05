import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import ronImg from "@/assets/images/ron-laptop.png";

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

export default function RON() {
  React.useEffect(() => {
    document.title = "Remote Online Notarization (RON) | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <span className="font-black">Get notarized</span>
              <br />
              <span className="font-light text-black/45">without leaving</span>
              <br />
              <span className="font-black"><H>the couch.</H></span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Remote Online Notarization — legally binding, secure, done in <strong className="text-black">under 15 minutes.</strong> Available same-hour, 7 days a week, anywhere in the US.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-ron">
                Book RON
              </Link>
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-center border-2" style={{ borderColor: "#4D9FDB", color: "#4D9FDB" }} data-testid="btn-estimate-ron">
                Estimate Your Job →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={ronImg} alt="Remote online notarization video call" />

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="RON EXPLAINED" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What is RON — and <H>when can you use it?</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            You get notarized online, via <H>live video</H>, without being in the same room as the notary. Fully legal in Texas and about 45 other US states. You sign, we witness, your document is notarized — all without leaving wherever you are.
          </p>
        </div>
      </section>

      <section className="border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: IVORY }}>✓ Works great for RON</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Powers of attorney", "Affidavits and sworn statements", "Real estate documents (most types)", "Business agreements", "Medical authorizations", "Vehicle titles (many types)"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-white/20 mt-0.5">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40">✕ Requires in-person</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Texas HELOC (must be at title company or lender)", "Some court-filed documents", "Documents requiring physical witness only", "Documents requiring physical embossed seal only"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-white/20 mt-0.5">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="PRICING" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
            <H>All in.</H> No surprises.
          </h2>
          <div className="text-left border border-[#1e2a3a] divide-y divide-[#1e2a3a] mb-8">
            {[
              { l: "First notarization", p: "$25" },
              { l: "Each additional signature (same session)", p: "$10" },
              { l: "Same-hour availability", p: "Included" },
              { l: "Docsy Safe+ 30-day trial", p: "Included" },
              { l: "Digital certified copy", p: "Included" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-4">
                <span className="text-sm text-white/60">{row.l}</span>
                <span className="text-sm font-bold" style={{ color: IVORY }}>{row.p}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/30 leading-relaxed">
            <H>Always know your price before you book.</H> If it wasn't in your price, it's not on the invoice.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="TECH REQUIREMENTS" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What you <H>need.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            A device with a working front-facing camera and microphone. A stable internet connection. A <H>valid, unexpired government-issued photo ID.</H> Your document accessible as a file or ready to share on screen. That's it.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⏱" text="AVAILABILITY" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
            Same-hour.
            <br />
            <H>Every day.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            RON is available same-hour, <H>7 days a week.</H> Midnight appointments are a real thing. If you need it done right now, text us and we'll make it happen. Same-hour is not a promotional promise — it's standard.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to get notarized <HI>right now?</HI>
          </h2>
          <p className="text-lg text-black/60 mb-8">Same-hour available. You'll be done before lunch.</p>
          <button className="px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }} data-testid="btn-book-ron-cta">
            Book RON
          </button>
        </div>
      </section>

    </div>
  );
}
