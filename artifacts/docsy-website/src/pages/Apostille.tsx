import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import apostilleImg from "@/assets/images/apostille-seal.png";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

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

const CHECK = () => (
  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: BLUE }}>✓</span>
);

const TIERS = [
  {
    name: "Standard",
    subtitle: "Mailed to TX Secretary of State",
    personal: "$165",
    business: "$190",
    note: "Turnaround subject to TX SOS processing. Typically 5–10 business days.",
    included: [
      "Prepaid inbound shipping label",
      "TX SOS filing fee",
      "USPS Priority return (tracked)",
      "Mobile pickup + delivery (SA metro)",
      "Digital certified scan",
      "30-day Safe+ trial",
    ],
  },
  {
    name: "Next-Day Rush",
    subtitle: "Docsy hand-delivers to TX SOS Austin",
    personal: "$215",
    business: "$240",
    note: "Must be received by Docsy by 11 AM. Apostilled same day in Austin. FedEx overnight return.",
    included: [
      "TX SOS filing fee",
      "In-person Austin submission",
      "Mobile pickup + delivery (SA metro)",
      "FedEx overnight return (tracked)",
      "Digital certified scan",
      "30-day Safe+ trial",
    ],
  },
  {
    name: "Same-Day Sprint",
    featured: true,
    includedLabel: "Fastest available",
    subtitle: "Docsy mobile pickup before 9 AM",
    personal: "$240",
    business: "$265",
    note: "Mobile pickup only. Docsy picks up before 9 AM, drives to Austin immediately. Return: FedEx overnight (24 hrs) or same-day drop-off by Docsy.",
    included: [
      "Mobile pickup (SA metro, before 9 AM)",
      "TX SOS filing fee",
      "In-person Austin submission",
      "FedEx overnight return (tracked) — 24 hrs",
      "OR same-day drop-off by Docsy",
      "Digital certified scan",
      "30-day Safe+ trial",
    ],
  },
];

const TIMELINE_ROWS = [
  {
    tier: "Standard",
    method: "Mail-in",
    inbound: "2–3 business days",
    sos: "5–10 business days",
    returnShip: "USPS Priority · 2–3 days",
    total: "~2–3 weeks from order",
  },
  {
    tier: "Standard",
    method: "Docsy Mobile Pickup",
    inbound: "Same day receipt",
    sos: "5–10 business days",
    returnShip: "USPS Priority · 2–3 days",
    total: "~1.5–2.5 weeks from pickup",
  },
  {
    tier: "Next-Day Rush",
    method: "Mail-in (by 11 AM cutoff)",
    inbound: "2–3 business days",
    sos: "Same day in Austin",
    returnShip: "FedEx Overnight · 1 day",
    total: "~1 week from mailing",
  },
  {
    tier: "Next-Day Rush",
    method: "Mobile Pickup (before 11 AM)",
    inbound: "Same day receipt",
    sos: "Same day in Austin",
    returnShip: "FedEx Overnight · 1 day",
    total: "Next business day (~24 hrs)",
  },
  {
    tier: "Same-Day Sprint",
    method: "Mobile Pickup (before 9 AM)",
    inbound: "Same day receipt",
    sos: "Same day in Austin",
    returnShip: "FedEx Overnight (24 hrs) or same-day drop-off by Docsy",
    total: "Same day (Docsy drop-off) or next day (FedEx)",
  },
];

const POLICIES = [
  "Every order includes a free pre-check. Docsy confirms eligibility before your document is ever submitted.",
  "Turnaround clock starts when Docsy physically receives the document — not when the order is placed.",
  "Standard turnaround subject to TX SOS processing times (typically 5–10 business days) and is not guaranteed.",
  "Next-Day and Same-Day Rush guaranteed only when cutoff times are met and document is confirmed eligible at pre-check.",
  "Once submitted to TX SOS, orders cannot be cancelled or refunded.",
  "Docsy is responsible for your document from receipt through carrier handoff. Tracking confirmation is proof of return delivery.",
];

export default function Apostille() {
  React.useEffect(() => {
    document.title = "Apostille Services | Docsy Services";
  }, []);


  return (
    <div className="w-full" style={{ backgroundColor: BG }}>


      {/* ── Hero ── */}
      <section className="px-5 pt-10 pb-14 sm:pt-12 sm:pb-16" style={{ backgroundColor: IVORY }}>
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
            <p className="text-lg sm:text-xl text-black/60 mb-6 max-w-xl font-medium">
              All-inclusive Texas apostille services. Prepaid inbound label, tracked return shipping, and mobile pickup included. Personal documents starting at $165.
            </p>
            <p className="text-sm text-black/55 mb-10 max-w-xl border-l-2 pl-4" style={{ borderColor: BLUE }}>
              <strong className="text-black">Heads up:</strong> Docsy does not control Texas Secretary of State processing times. Standard turnaround estimates are based on current TX SOS guidance and may shift without notice.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/about?inquiry=apostille-precheck#apostille-precheck" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="btn-precheck-apostille">
                Free Pre-Check
              </Link>
            </div>
            <p className="text-sm text-black/45 mt-4 max-w-sm">
              The free pre-check confirms your document type, destination country, and eligibility before anything is submitted. No charge, no commitment.
            </p>
          </FadeIn>
        </div>
      </section>

      <ImageBand src={apostilleImg} alt="Apostille wax seal on official document" />

      {/* ── Testimonial ── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border" style={{ borderColor: DIV }}>
            <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
              &ldquo;I needed an apostille for a work visa and didn't know where to start. The pre-check saved me from sending the wrong document. Everything was handled in three days.&rdquo;
            </p>
            <p className="text-xs font-bold text-white">A. Nguyen</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Houston, TX</p>
          </div>
        </div>
      </section>

      {/* ── Info sections ── */}
      {[
        {
          icon: "⊙", label: "THE BASICS",
          heading: "The certificate that\nmakes your document\nwork abroad.",
          body: "An apostille is an official certificate that authenticates a document for use in another country — specifically in countries that are part of the 1961 Hague Convention (which is most of them). If you're moving abroad, applying for dual citizenship, getting married internationally, sending your diploma to a foreign employer, or adopting internationally — you probably need an apostille.",
        },
        {
          icon: "⊟", label: "COVERAGE",
          heading: "Everything.",
          body: "You send us the original certified document. We review it before filing (our free Pre-Check makes sure it qualifies before we submit anything), file it at the Texas Secretary of State, email you a digital certified scan the moment it's done, and send the original back to you. All fees are included in the flat rate — state filing fee, scan, and return shipping.",
        },
        {
          icon: "✕", label: "CRITICAL LIMITATION",
          heading: "Originals only.\nNo photocopies.",
          body: "Texas apostilles can only be placed on Texas-origin documents or documents notarized by a Texas notary. Originals only — photocopies, scans, and laminated documents cannot be apostilled. If you're not sure what qualifies, use the free Pre-Check before sending anything.",
        },
      ].map((feat, i) => (
        <section key={i} className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
          <div className="max-w-2xl mx-auto">
            <FadeIn delay={0}>
              <Label icon={feat.icon} text={feat.label} />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
                {feat.heading}
              </h2>
              <p className="text-lg font-light text-white/50 leading-relaxed">{feat.body}</p>
            </FadeIn>
          </div>
        </section>
      ))}

      {/* ── Delivery Timeline ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="⊞" text="DELIVERY TIMELINE" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
                Estimated timeframes.
              </h2>
              <p className="text-base text-white/40 mt-3">All estimates account for inbound transit, TX SOS processing, and return shipping. Times shown are business days unless noted.</p>
            </div>
          </FadeIn>

          {/* Timeline table */}
          <FadeIn delay={80} threshold={0.05}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                    {["Service", "How It Gets to Docsy", "Inbound Transit", "TX SOS Processing", "Return Shipping", "Estimated Delivery"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b border-r last:border-r-0" style={{ borderColor: DIV, color: "rgba(255,255,255,0.35)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIMELINE_ROWS.map((row, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: DIV }}>
                      <td className="px-4 py-3 border-r" style={{ borderColor: DIV }}>
                        <span className="font-bold text-white text-xs">{row.tier}</span>
                        <span className="block text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{row.method}</span>
                      </td>
                      <td className="px-4 py-3 border-r text-white/40" style={{ borderColor: DIV }}>{row.method}</td>
                      <td className="px-4 py-3 border-r text-white/40" style={{ borderColor: DIV }}>{row.inbound}</td>
                      <td className="px-4 py-3 border-r text-white/40" style={{ borderColor: DIV }}>{row.sos}</td>
                      <td className="px-4 py-3 border-r text-white/40" style={{ borderColor: DIV }}>{row.returnShip}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: IVORY }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Real-world example */}
          <FadeIn delay={0} threshold={0.05}>
            <div className="mt-10 border px-8 py-7" style={{ borderColor: DIV }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: BLUE }}>Real-World Example — Order Placed Monday</p>
              <div className="space-y-4">
                {[
                  {
                    label: "Standard Mail-in",
                    desc: "You mail your birth certificate Monday. Document arrives at Docsy Wed–Thu → Mailed to TX SOS → SOS processes 5–10 business days → Returns to Docsy → USPS Priority back to you.",
                    result: "You receive: ~3 weeks from Monday.",
                  },
                  {
                    label: "Next-Day Rush Mail-in",
                    desc: "Document arrives at Docsy Wednesday → Docsy drives to Austin Wednesday → Apostilled Wednesday → FedEx overnight.",
                    result: "You receive: Thursday.",
                  },
                  {
                    label: "Same-Day Sprint",
                    desc: "Docsy mobile pickup Monday before 9 AM → Drives to Austin Monday → Apostilled Monday → FedEx overnight (Tuesday) or Docsy drops it off to you same day (Monday).",
                    result: "You receive: Monday (Docsy drops it off) or Tuesday (FedEx overnight).",
                  },
                ].map((ex) => (
                  <div key={ex.label} className="flex gap-4 border-l-2 pl-5" style={{ borderColor: DIV }}>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{ex.label}</p>
                      <p className="text-sm text-white/40 leading-relaxed">{ex.desc}</p>
                      <p className="text-sm font-semibold mt-1" style={{ color: IVORY }}>{ex.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Important notes */}
          <FadeIn delay={0} threshold={0.05}>
            <div className="mt-6 px-8 py-6 border" style={{ borderColor: DIV }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Important Notes</p>
              <ul className="space-y-2">
                {[
                  "TX SOS processing times are estimates and subject to change. Docsy cannot control or guarantee SOS turnaround for Standard orders.",
                  "Rush estimates assume document arrives eligible and complete. A free pre-check is required before any Rush order is confirmed.",
                  "Business days are Monday–Friday, excluding Texas state holidays.",
                  "FedEx Overnight delivery times are guaranteed by FedEx to most US addresses by 10:30 AM–3:00 PM next business day.",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/35">
                    <span className="shrink-0 mt-0.5 text-white/20">•</span> {note}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Label icon="⊞" text="PRICING" />
              <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
                All-inclusive. No agency markup.
              </h2>
              <p className="text-base text-white/40 mt-3">Prepaid inbound label, tracked return shipping, and mobile pickup + delivery included in every order.</p>
            </div>
          </FadeIn>

          {/* 3 tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {TIERS.map((tier) => (
              <FadeIn key={tier.name} delay={80} threshold={0.05}>
                <div className="h-full flex flex-col" style={{ backgroundColor: BG }}>
                  <div className="px-7 py-6 border-b" style={{ borderColor: DIV }}>
                    {tier.featured && (
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>{tier.includedLabel}</p>
                    )}
                    <p className="text-base font-black text-white">{tier.name}</p>
                    <p className="text-xs text-white/35 mt-1">{tier.subtitle}</p>
                    <div className="mt-4 flex items-baseline gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-1">Personal</p>
                        <p className="text-2xl font-black" style={{ color: IVORY }}>{tier.personal}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-1">Business</p>
                        <p className="text-2xl font-black" style={{ color: IVORY }}>{tier.business}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="px-7 py-6 space-y-2 flex-1">
                    {tier.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                        <CHECK /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="px-7 pb-6">
                    <p className="text-xs leading-relaxed text-white/25">{tier.note}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Document types + Add-ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-px" style={{ backgroundColor: DIV }}>
            {/* Document types */}
            <FadeIn delay={0} threshold={0.05}>
              <div style={{ backgroundColor: BG }}>
                <div className="px-7 py-5 border-b" style={{ borderColor: DIV }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">Document Types</p>
                </div>
                {[
                  { l: "Birth certificate", p: "Personal rate" },
                  { l: "Marriage certificate", p: "Personal rate" },
                  { l: "Divorce decree", p: "Personal rate" },
                  { l: "Diploma / transcript", p: "Personal rate" },
                  { l: "Death certificate", p: "Personal rate" },
                  { l: "Business docs / corporate", p: "Business rate" },
                  { l: "Federal / USDOS apostille", p: "$275" },
                ].map((r) => (
                  <div key={r.l} className="flex justify-between items-center px-7 py-3 border-b last:border-b-0" style={{ borderColor: DIV }}>
                    <span className="text-sm text-white/55">{r.l}</span>
                    <span className="text-sm font-bold" style={{ color: IVORY }}>{r.p}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Add-ons */}
            <FadeIn delay={0} threshold={0.05}>
              <div style={{ backgroundColor: BG }}>
                <div className="px-7 py-5 border-b" style={{ borderColor: DIV }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">Add-Ons & Multi-Document</p>
                </div>
                {[
                  { l: "Each additional (same order)", p: "+$75", note: "" },
                  { l: "Shipping insurance", p: "+$20", note: "$500 declared value on return shipment" },
                  { l: "Extended mobile radius (21–40 mi)", p: "+$30", note: "Pickup or delivery beyond SA metro" },
                  { l: "Free pre-check", p: "Always free", note: "" },
                ].map((r) => (
                  <div key={r.l} className="flex justify-between items-start px-7 py-3 border-b last:border-b-0 gap-4" style={{ borderColor: DIV }}>
                    <div>
                      <span className="text-sm text-white/55">{r.l}</span>
                      {r.note && <p className="text-xs text-white/25 mt-0.5">{r.note}</p>}
                    </div>
                    <span className="text-sm font-bold shrink-0" style={{ color: IVORY }}>{r.p}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Policies ── */}
      <section className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-12">
              <Label icon="⊟" text="POLICIES" />
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>How it works.</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0} threshold={0.05}>
            <ul className="space-y-4">
              {POLICIES.map((p, i) => (
                <li key={i} className="flex items-start gap-4 border-t pt-5" style={{ borderColor: DIV }}>
                  <span className="shrink-0 text-[10px] font-black uppercase tracking-widest mt-0.5 pt-0.5" style={{ color: BLUE }}>0{i + 1}</span>
                  <p className="text-sm text-white/50 leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-5 border-t" style={{ borderColor: DIV, backgroundColor: BG }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              All-inclusive. Nothing hidden.<br />
              <span style={{ color: BLUE }}>State fee in. Scan emailed. Done.</span>
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["State filing fee included", "Digital scan emailed", "Free Pre-Check", "Tracked return shipping"].map(t => (
                <span key={t} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <span style={{ color: BLUE }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href="/calculate" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: BLUE }} data-testid="btn-book-apostille-cta">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
