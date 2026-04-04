import React from "react";

const CAROLINA = "#4B9CD3";
const BG = "#0a0a0a";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: CAROLINA, color: "#000" }}>
      {icon} {text}
    </span>
  </div>
);

export default function MobileNotary() {
  React.useEffect(() => {
    document.title = "Mobile Notary | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: CAROLINA }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            We come to you.
            <br />
            Not the other
            <br />
            way around.
          </h1>
          <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
            Docsy mobile notary serves the Texas area. Home, office, hospital, nursing home, hospice — wherever you need us. 7 days, early morning to midnight.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-mobile">
              Book Mobile Visit
            </button>
            <button className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-estimate-mobile">
              Get an Estimate
            </button>
          </div>
        </div>
      </section>

      {[
        {
          icon: "⊙", label: "WHERE WE GO",
          heading: "Wherever you are.",
          body: "Home. Your office. A coffee shop. A law firm. A title company. A hospital bedside. A nursing home. An assisted living facility. Anywhere you need a document notarized — we meet you there.\n\nBedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide. We don't charge extra just because it's a hospital.",
        },
        {
          icon: "✕", label: "WHAT NOT TO DO",
          heading: "Don't sign it\nbefore we arrive.",
          body: "Your signature has to happen in front of the notary. If you sign before we get there, we can't notarize it — and you'll need a fresh copy. Same rule applies to dates: don't fill them in early. The notary will direct you to sign in the right place at the right time.",
        },
        {
          icon: "⏱", label: "AVAILABILITY",
          heading: "7 AM to midnight.\nEvery day.",
          body: "After-hours and late-night appointments carry a disclosed surcharge. Rush visits (within 2 hours) carry a rush fee. Both are disclosed at booking, before you confirm. No surprises when we hand you the invoice.",
        },
      ].map((feat, i) => (
        <section key={i} className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center">
          <div className="max-w-2xl mx-auto">
            <Label icon={feat.icon} text={feat.label} />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
              {feat.heading}
            </h2>
            <p className="text-lg text-white/50 leading-relaxed whitespace-pre-line">{feat.body}</p>
          </div>
        </section>
      ))}

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊞" text="PRICING" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>All-in. Written up front.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
            {[
              { title: "Notarization Fees", items: [{ l: "First notarization", p: "$10" }, { l: "Each additional (same doc)", p: "$1" }] },
              { title: "Travel Fees", items: [{ l: "Tier 1 (0–10 mi)", p: "$30" }, { l: "Tier 2 (11–25 mi)", p: "$45" }, { l: "Tier 3 (26–40 mi)", p: "$65" }, { l: "Tier 4 (40+ mi)", p: "$85+" }] },
              { title: "Timing Add-Ons", items: [{ l: "Rush within 2 hours", p: "+$35" }, { l: "After-hours (after 6 PM)", p: "+$20" }, { l: "Late night (10 PM–midnight)", p: "+$35" }, { l: "Weekend / holiday", p: "+$25" }] },
            ].map((col) => (
              <div key={col.title} style={{ backgroundColor: BG }}>
                <div className="px-8 py-5 border-b border-[#1a1a1a]">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">{col.title}</p>
                </div>
                {col.items.map((r) => (
                  <div key={r.l} className="flex justify-between items-center px-8 py-4 border-b border-[#1a1a1a] last:border-b-0">
                    <span className="text-sm text-white/60">{r.l}</span>
                    <span className="text-sm font-bold" style={{ color: CAROLINA }}>{r.p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/30 text-center mt-6">Early Route™ (8–10 AM) or Midday Miles™ (1–3 PM): $10 off your travel fee. Applied automatically at booking.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: CAROLINA }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Tell us where you are.<br />We'll be there.
          </h2>
          <p className="text-lg text-black/60 mb-8">7 days · 7 AM to midnight · Written estimate before we start.</p>
          <button className="px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }} data-testid="btn-book-mobile-cta">
            Book Mobile Visit
          </button>
        </div>
      </section>

    </div>
  );
}
