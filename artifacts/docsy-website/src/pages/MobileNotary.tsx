import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

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

export default function MobileNotary() {
  React.useEffect(() => {
    document.title = "Mobile Notary | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <span className="font-black">We come to you.</span>
              <br />
              <span className="font-light text-black/45">Not the other</span>
              <br />
              <span className="font-black"><H>way around.</H></span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
              Docsy mobile notary serves the Texas area. Home, office, hospital, nursing home, hospice — wherever you need us. <strong className="text-black">7 days, early morning to midnight.</strong>
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-mobile">
                Book Mobile Visit
              </Link>
              <Link href="/estimate" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-estimate-mobile">
                Get an Estimate
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="WHERE WE GO" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            <H>Wherever you are.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Home. Your office. A coffee shop. A law firm. A title company. A hospital bedside. A nursing home. An assisted living facility. Anywhere you need a document notarized — <H>we meet you there.</H>
            <br /><br />
            Bedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide. We don't charge extra just because it's a hospital.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="✕" text="WHAT NOT TO DO" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            Don't sign it
            <br />
            <H>before we arrive.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Your signature has to happen <H>in front of the notary.</H> If you sign before we get there, we can't notarize it — and you'll need a fresh copy. Same rule applies to dates: don't fill them in early. The notary will direct you to sign in the right place at the right time.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="⏱" text="AVAILABILITY" />
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            7 AM to midnight.
            <br />
            <H>Every day.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            After-hours and late-night appointments carry a disclosed surcharge. Rush visits (within 2 hours) carry a rush fee. <H>Both are disclosed at booking, before you confirm.</H> No surprises when we hand you the invoice.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊞" text="PRICING" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              <H>All-in.</H> Know it before you book.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e2a3a]">
            {[
              { title: "Notarization Fees", items: [{ l: "First notarization", p: "$10" }, { l: "Each additional (same doc)", p: "$1" }] },
              { title: "Travel Fees", items: [{ l: "Tier 1 (0–10 mi)", p: "$30" }, { l: "Tier 2 (11–25 mi)", p: "$45" }, { l: "Tier 3 (26–40 mi)", p: "$65" }, { l: "Tier 4 (40+ mi)", p: "$85+" }] },
              { title: "Timing Add-Ons", items: [{ l: "Rush within 2 hours", p: "+$35" }, { l: "After-hours (after 6 PM)", p: "+$20" }, { l: "Late night (10 PM–midnight)", p: "+$35" }, { l: "Weekend / holiday", p: "+$25" }] },
            ].map((col) => (
              <div key={col.title} style={{ backgroundColor: BG }}>
                <div className="px-8 py-5 border-b border-[#1e2a3a]">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">{col.title}</p>
                </div>
                {col.items.map((r) => (
                  <div key={r.l} className="flex justify-between items-center px-8 py-4 border-b border-[#1e2a3a] last:border-b-0">
                    <span className="text-sm text-white/60">{r.l}</span>
                    <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Tell us where you are.
            <br />
            <HI>We'll be there.</HI>
          </h2>
          <p className="text-lg text-black/60 mb-8">7 days · 7 AM to midnight · Know your price before you book.</p>
          <Link href="/estimate" className="inline-block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="btn-book-mobile-cta">
            Book Mobile Visit
          </Link>
        </div>
      </section>

    </div>
  );
}
