import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import { DivisionStatusBar } from "@/components/status/DivisionStatusBar";
import { useAvailability } from "@/hooks/useAvailability";
import mobileImg from "@/assets/images/mobile-notary-folio.png";

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
    document.title = "Mobile Notary | Docsy Services";
  }, []);

  const { state } = useAvailability();

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <DivisionStatusBar divisionId="mobile" state={state} />

      <section className="px-5 pt-10 pb-14 sm:pt-12 sm:pb-16" style={{ backgroundColor: IVORY }}>
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
              Docsy mobile notary serves the San Antonio metro area. Home, office, hospital, nursing home, hospice — wherever you need us. <strong className="text-black">General hours 9 AM–9 PM, 7 days a week. Docsy+ members get 7 AM–11 PM priority access.</strong>
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/calculate" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-mobile">
                Book Now →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={mobileImg} alt="Mobile notary with document folio" />

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

      {/* ── Service Area ── */}
      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊟" text="SERVICE AREA" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              <HI>San Antonio metro</HI><br />
              <span className="font-light text-white/40">and beyond.</span>
            </h2>
            <p className="text-base text-white/35 mt-4 max-w-md mx-auto">Travel fees are calculated from our home base in <strong className="text-white/55">Alamo Ranch (West San Antonio, 78253)</strong>. Not sure which tier you're in? The Price Calculator works it out exactly from your address.</p>
          </div>
          <div className="border border-[#1e2a3a] overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_220px_80px] gap-px bg-[#1e2a3a]">
              {/* Header */}
              <div className="px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Tier</p></div>
              <div className="px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Cities / Areas</p></div>
              <div className="hidden md:block px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Distance</p></div>
              <div className="px-4 py-3 text-right" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Fee</p></div>
              {/* Rows */}
              {[
                { tier: "Tier 1", cities: "San Antonio core, Alamo Heights, Terrell Hills, Castle Hills, Converse", distance: "0 – 10 mi", fee: "$30" },
                { tier: "Tier 2", cities: "Universal City, Schertz, Live Oak, Leon Valley, Balcones Heights", distance: "11 – 25 mi", fee: "$45" },
                { tier: "Tier 3", cities: "New Braunfels, Seguin, Boerne, Helotes, Pleasanton", distance: "26 – 40 mi", fee: "$65" },
                { tier: "Tier 4", cities: "Beyond 40 miles — quote required. Contact us before booking.", distance: "40+ mi", fee: "$85+" },
              ].map((row) => (
                <React.Fragment key={row.tier}>
                  <div className="px-4 py-4" style={{ backgroundColor: BG }}>
                    <span className="text-xs font-black" style={{ color: "#4D9FDB" }}>{row.tier}</span>
                  </div>
                  <div className="px-4 py-4" style={{ backgroundColor: BG }}>
                    <span className="text-sm text-white/55">{row.cities}</span>
                  </div>
                  <div className="hidden md:block px-4 py-4" style={{ backgroundColor: BG }}>
                    <span className="text-sm text-white/35">{row.distance}</span>
                  </div>
                  <div className="px-4 py-4 text-right" style={{ backgroundColor: BG }}>
                    <span className="text-sm font-bold" style={{ color: "#F5EFE6" }}>{row.fee}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/25 mt-4 text-center">Distance is calculated from Alamo Ranch (West San Antonio, 78253). The Price Calculator determines your tier automatically from your address.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center">
        <div className="max-w-2xl mx-auto">
          <Label icon="✕" text="HEADS UP" />
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
            9 AM to 9 PM.
            <br />
            <H>Every day.</H>
          </h2>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            General appointments run 9 AM–9 PM. <H>Docsy+ members</H> get access to priority hours — 7 AM–9 AM and 9 PM–11 PM — with no after-hours surcharge. After-hours bookings (9 PM–11 PM) carry a +$20 surcharge for non-members, always disclosed at booking before you confirm. Federal holidays carry an additional +$20 surcharge for all clients.
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
              { title: "Timing Add-Ons", items: [{ l: "After-hours (9 PM – 11 PM)", p: "+$20" }, { l: "Federal holiday", p: "+$20" }, { l: "Docsy+ members", p: "Exempt" }] },
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

      {/* RON vs. Mobile comparison callout */}
      <section className="py-12 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e2a3a]">
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.30)" }}>⊙ RON — Remote Online</p>
              <p className="text-2xl font-black text-white mb-2">$25 flat. No travel fee.</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Fully remote — you connect via video, sign digitally, and get a certified copy emailed. Best when your document doesn't require physical presence.
              </p>
              <a href="/ron" className="inline-block mt-4 text-xs font-bold underline underline-offset-2" style={{ color: "rgba(255,255,255,0.40)" }}>View RON →</a>
            </div>
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#4D9FDB" }}>⊙ Mobile Notary — In-Person</p>
              <p className="text-2xl font-black text-white mb-2">$10 + $30–$85 travel.</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Docsy comes to you. Required for documents that need a physical notary present — HELOCs, court filings, physical seal documents, and anything you can't sign over video.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              We come to you.<br />
              <span style={{ color: "#4D9FDB" }}>Wherever that is.</span>
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["7 days · 7AM–11PM", "Know your price before you book", "No hidden fees"].map(t => (
                <span key={t} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <span style={{ color: "#4D9FDB" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href="/calculate" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#4D9FDB" }} data-testid="btn-book-mobile-cta">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
