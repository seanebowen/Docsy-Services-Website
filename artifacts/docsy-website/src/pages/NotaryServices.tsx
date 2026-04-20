import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import ronImg from "@/assets/images/ron-laptop.png";
import mobileImg from "@/assets/images/mobile-notary-folio.png";

const IVORY = "#F5EFE6";
const BG = "#131929";
const BLUE = "#4D9FDB";
const DIV = "#1e2a3a";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
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

const SectionDivider = ({ id, kicker, title }: { id: string; kicker: string; title: string }) => (
  <section id={id} className="px-5 pt-20 pb-10 border-t" style={{ backgroundColor: BG, borderColor: DIV }}>
    <div className="max-w-5xl mx-auto text-center">
      <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] border mb-6" style={{ borderColor: BLUE, color: BLUE }}>
        ◆ {kicker}
      </span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
        {title}
      </h2>
    </div>
  </section>
);

export default function NotaryServices() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = "Notary Services — RON & Mobile/GNW | Docsy Services";
  }, []);

  // Smooth-scroll to hash anchors on mount and when hash changes
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [location]);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Top Hero ── */}

      <section className="px-5 pt-10 pb-14 sm:pt-12 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Notary services.
              <br />
              <HI>Two ways to get it done.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-2xl font-medium">
              <strong className="text-black">Remote Online Notarization (RON)</strong> for everything that doesn't require an in-person notary, and <strong className="text-black">Mobile Notary &amp; General Notary Work (GNW)</strong> when it does. Same provider. Same transparent pricing. Same know-your-price-before-you-book promise.
            </p>
          </FadeIn>
          <FadeIn delay={260}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#ron" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                Jump to RON →
              </a>
              <a href="#mobile" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black">
                Jump to Mobile / GNW →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────────────── RON SECTION ───────────────────────── */}
      <SectionDivider id="ron" kicker="Remote Online Notarization" title="Get notarized without leaving the couch." />

      <ImageBand src={ronImg} alt="Remote online notarization video call" />

      {/* ── Testimonial — RON ── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border" style={{ borderColor: DIV }}>
            <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
              &ldquo;The RON session took nine minutes. I signed my power of attorney from a coffee shop in Austin. Easiest notary experience I've ever had.&rdquo;
            </p>
            <p className="text-xs font-bold text-white">K. Mitchell</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Austin, TX</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="HOW IT WORKS" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What is RON — and <H>when can you use it?</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            You get notarized online, via <H>live video</H>, without being in the same room as the notary. Fully legal in Texas and about 45 other US states. You sign, we witness, your document is notarized — all without leaving wherever you are. Done in <strong className="text-white">under 15 minutes</strong>, available same-hour, 7 days a week.
          </p>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: IVORY }}>✓ Works great for RON</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Powers of attorney", "Affidavits and sworn statements", "Real estate documents (most types)", "Business agreements", "Medical authorizations", "Vehicle titles (many types)"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-white/20 mt-0.5">—</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-10" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40">✕ Requires in-person</p>
              <ul className="space-y-3 text-sm text-white/60">
                {["Texas HELOC (must be at title company or lender)", "Some court-filed documents", "Documents requiring physical witness only", "Documents requiring physical embossed seal only"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-white/20 mt-0.5">—</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⊞" text="RON PRICING" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
            <H>All in.</H> No surprises.
          </h3>
          <div className="text-left border divide-y mb-8" style={{ borderColor: DIV }}>
            {[
              { l: "First notarization", p: "$25" },
              { l: "Each additional signature (same session)", p: "$10" },
              { l: "Same-hour availability", p: "Included" },
              { l: "Docsy Safe+ 30-day trial", p: "Included" },
              { l: "Digital certified copy", p: "Included" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-4" style={{ borderColor: DIV }}>
                <span className="text-sm text-white/60">{row.l}</span>
                <span className="text-sm font-bold" style={{ color: IVORY }}>{row.p}</span>
              </div>
            ))}
            <div className="px-6 py-2.5 bg-white/[0.03]" style={{ borderColor: DIV }}>
              <span className="text-xs font-bold uppercase tracking-widest text-white/25">Available Add-ons</span>
            </div>
            {[
              { l: "Witness", p: "+$10" },
              { l: "Additional signer", p: "+$5" },
              { l: "Additional seal / document", p: "+$5" },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center px-6 py-4" style={{ borderColor: DIV }}>
                <span className="text-sm text-white/60">{row.l}</span>
                <span className="text-sm font-bold text-white/40">{row.p}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/30 leading-relaxed">
            <H>Always know your price before you book.</H> If it wasn't in your price, it's not on the invoice.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="REQUIREMENTS" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            What you <H>need.</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            A device with a working front-facing camera and microphone. A stable internet connection. A <H>valid, unexpired government-issued photo ID.</H> Your document accessible as a file or ready to share on screen. That's it.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⏱" text="RON AVAILABILITY" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
            Same-hour. <H>Every day.</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            RON is available same-hour, <H>7 days a week,</H> from 7 AM to 11 PM. If you need it done right now, text us and we'll make it happen. Same-hour is not a promotional promise — it's standard. In the rare event of a scheduling conflict, you'll be notified immediately and not charged.
          </p>
        </div>
      </section>

      {/* ───────────────────────── MOBILE / GNW SECTION ───────────────────────── */}
      <SectionDivider id="mobile" kicker="Mobile Notary & GNW" title="We come to you. Not the other way around." />


      <ImageBand src={mobileImg} alt="Mobile notary with document folio" />

      {/* ── Testimonial — Mobile ── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border" style={{ borderColor: DIV }}>
            <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
              &ldquo;We had to close on a Friday evening. Docsy showed up on time, had everything organized, and the scanbacks were back to our title office before I left the parking lot.&rdquo;
            </p>
            <p className="text-xs font-bold text-white">R. Salazar</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>San Antonio, TX</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⊙" text="WHERE WE GO" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            <H>Wherever you are.</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Home. Your office. A coffee shop. A law firm. A title company. A hospital bedside. A nursing home. An assisted living facility. Anywhere you need a document notarized — <H>we meet you there.</H>
            <br /><br />
            Bedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide. We don't charge extra just because it's a hospital. Docsy mobile notary serves the San Antonio metro area. <strong className="text-white">General hours 9 AM–9 PM, 7 days a week. Docsy+ members get 7 AM–11 PM priority access.</strong>
          </p>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊟" text="SERVICE AREA" />
            <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              <HI>San Antonio metro</HI><br />
              <span className="font-light text-white/40">and beyond.</span>
            </h3>
            <p className="text-base text-white/35 mt-4 max-w-md mx-auto">Travel fees are calculated from our home base in <strong className="text-white/55">Alamo Ranch (West San Antonio, 78253)</strong>. Not sure which tier you're in? The Price Calculator works it out exactly from your address.</p>
          </div>
          <div className="border overflow-hidden" style={{ borderColor: DIV }}>
            <div className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_220px_80px] gap-px" style={{ backgroundColor: DIV }}>
              <div className="px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Tier</p></div>
              <div className="px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Cities / Areas</p></div>
              <div className="hidden md:block px-4 py-3" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Distance</p></div>
              <div className="px-4 py-3 text-right" style={{ backgroundColor: "#0d1521" }}><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Fee</p></div>
              {[
                { tier: "Tier 1", cities: "San Antonio core, Alamo Heights, Terrell Hills, Castle Hills, Converse", distance: "0 – 10 mi", fee: "$30" },
                { tier: "Tier 2", cities: "Universal City, Schertz, Live Oak, Leon Valley, Balcones Heights", distance: "11 – 25 mi", fee: "$45" },
                { tier: "Tier 3", cities: "New Braunfels, Seguin, Boerne, Helotes, Pleasanton", distance: "26 – 40 mi", fee: "$65" },
                { tier: "Tier 4", cities: "Beyond 40 miles — quote required. Contact us before booking.", distance: "40+ mi", fee: "$85+" },
              ].map((row) => (
                <React.Fragment key={row.tier}>
                  <div className="px-4 py-4" style={{ backgroundColor: BG }}><span className="text-xs font-black" style={{ color: BLUE }}>{row.tier}</span></div>
                  <div className="px-4 py-4" style={{ backgroundColor: BG }}><span className="text-sm text-white/55">{row.cities}</span></div>
                  <div className="hidden md:block px-4 py-4" style={{ backgroundColor: BG }}><span className="text-sm text-white/35">{row.distance}</span></div>
                  <div className="px-4 py-4 text-right" style={{ backgroundColor: BG }}><span className="text-sm font-bold" style={{ color: IVORY }}>{row.fee}</span></div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/25 mt-4 text-center">Distance is calculated from Alamo Ranch (West San Antonio, 78253). The Price Calculator determines your tier automatically from your address.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="✕" text="HEADS UP" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            Don't sign it
            <br />
            <H>before we arrive.</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            Your signature has to happen <H>in front of the notary.</H> If you sign before we get there, we can't notarize it — and you'll need a fresh copy. Same rule applies to dates: don't fill them in early. The notary will direct you to sign in the right place at the right time.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⏱" text="MOBILE AVAILABILITY" />
          <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            9 AM to 9 PM.
            <br />
            <H>Every day.</H>
          </h3>
          <p className="text-lg font-light text-white/50 leading-relaxed">
            General appointments run 9 AM–9 PM. <H>Docsy+ members</H> get access to priority hours — 7 AM–9 AM and 9 PM–11 PM — with no after-hours surcharge. After-hours bookings (9 PM–11 PM) carry a +$20 surcharge for non-members, always disclosed at booking before you confirm. Federal holidays carry an additional +$20 surcharge for all clients.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊞" text="MOBILE / GNW PRICING" />
            <h3 className="text-3xl sm:text-4xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              <H>All-in.</H> Know it before you book.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { title: "Notarization Fees", items: [{ l: "First notarization", p: "$10" }, { l: "Additional signer (same session)", p: "$1" }, { l: "Additional seal (same session)", p: "$5" }, { l: "Each additional (same doc)", p: "$1" }] },
              { title: "Travel Fees", items: [{ l: "Tier 1 (0–10 mi)", p: "$30" }, { l: "Tier 2 (11–25 mi)", p: "$45" }, { l: "Tier 3 (26–40 mi)", p: "$65" }, { l: "Tier 4 (40+ mi)", p: "$85+" }] },
              { title: "Timing Add-Ons", items: [{ l: "After-hours (9 PM – 11 PM)", p: "+$20" }, { l: "Federal holiday", p: "+$20" }, { l: "Docsy+ members", p: "Exempt" }] },
            ].map((col) => (
              <div key={col.title} style={{ backgroundColor: BG }}>
                <div className="px-8 py-5 border-b" style={{ borderColor: DIV }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">{col.title}</p>
                </div>
                {col.items.map((r) => (
                  <div key={r.l} className="flex justify-between items-center px-8 py-4 border-b last:border-b-0" style={{ borderColor: DIV }}>
                    <span className="text-sm text-white/60">{r.l}</span>
                    <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RON vs Mobile comparison callout ── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BLUE }}>⊙ RON — Remote Online</p>
              <p className="text-2xl font-black text-white mb-2">$25 flat. No travel fee.</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Fully remote — you connect via video, sign digitally, and get a certified copy emailed. No one comes to you. No mileage. Best for documents that don't require physical presence.
              </p>
            </div>
            <div className="p-8" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BLUE }}>⊙ Mobile / GNW — In-Person</p>
              <p className="text-2xl font-black text-white mb-2">$10 + $30–$85 travel.</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Docsy comes to your location — home, office, hospital, or law firm. Required for documents that must be signed in front of a notary in person (HELOCs, some court filings, physical seal required).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-5 border-t" style={{ backgroundColor: BG, borderColor: DIV }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              Two ways. One promise.<br />
              <span style={{ color: BLUE }}>Know your price before you book.</span>
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["Same-hour RON", "Mobile across the SA metro", "No hidden fees"].map(t => (
                <span key={t} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <span style={{ color: BLUE }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href="/calculate" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: BLUE }} data-testid="btn-book-notary-cta">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
