import React from "react";
import { Link } from "wouter";

const BEIGE = "#D4B896";
const BG = "#0d1b3e";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: BEIGE, color: "#000" }}>
      {icon} {text}
    </span>
  </div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "#22c55e", color: "#000", padding: "0 5px" }}>{children}</span>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "#ef4444", color: "#fff", padding: "0 5px" }}>{children}</span>
);

export default function RON() {
  React.useEffect(() => {
    document.title = "Remote Online Notarization (RON) | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            Get notarized
            <br />
            without leaving
            <br />
            <HI>the couch.</HI>
          </h1>
          <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
            Remote Online Notarization — legally binding, secure, done in <strong className="text-black">under 15 minutes.</strong> Available same-hour, 7 days a week, anywhere in the US.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-ron">
              Book RON
            </button>
            <button className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-text-ron">
              Text to Schedule
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="RON EXPLAINED" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What is RON — and <H>when can you use it?</H>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            You get notarized online, via <H>live video</H>, without being in the same room as the notary. Fully legal in Texas and about 45 other US states. You sign, we witness, your document is notarized — all without leaving wherever you are.
          </p>
        </div>
      </section>

      <section className="border-t border-[#162040]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#162040]">
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: BEIGE }}>✓ Works great for RON</p>
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

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="PRICING" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
            <H>All in.</H> No surprises.
          </h2>
          <div className="text-left border border-[#162040] divide-y divide-[#162040] mb-8">
            {[
              { l: "First notarization", p: "$25" },
              { l: "Each additional signature (same session)", p: "$10" },
              { l: "Same-hour availability", p: "Included" },
              { l: "Docsy Safe+ 90-day trial", p: "Included" },
              { l: "Digital certified copy", p: "Included" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-4">
                <span className="text-sm text-white/60">{row.l}</span>
                <span className="text-sm font-bold" style={{ color: BEIGE }}>{row.p}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/30 leading-relaxed">
            <H>Written estimate before every appointment.</H> If it wasn't in the estimate, it's not on the invoice.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="TECH REQUIREMENTS" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What you <H>need.</H>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A device with a working front-facing camera and microphone. A stable internet connection. A <H>valid, unexpired government-issued photo ID.</H> Your document accessible as a file or ready to share on screen. That's it.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⏱" text="AVAILABILITY" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
            Same-hour.
            <br />
            <H>Every day.</H>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            RON is available same-hour, <H>7 days a week.</H> Midnight appointments are a real thing. If you need it done right now, text us and we'll make it happen. Same-hour is not a promotional promise — it's standard.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#162040] text-center" style={{ backgroundColor: BEIGE }}>
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
