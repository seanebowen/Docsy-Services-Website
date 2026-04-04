import React from "react";
import { Link } from "wouter";
import { FileText, MapPin, Video, Briefcase, Globe, ShieldCheck } from "lucide-react";

const CAROLINA = "#4B9CD3";
const BG = "#0a0a0a";
const DIV = "#1a1a1a";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
      style={{ backgroundColor: CAROLINA, color: "#000" }}
    >
      {icon} {text}
    </span>
  </div>
);

export default function Home() {
  React.useEffect(() => {
    document.title = "Docsy Notary Services | Texas Remote & Mobile Notary";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: CAROLINA }}>
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-[3.2rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-black leading-none text-black mb-8"
            style={{ letterSpacing: "-0.03em" }}
          >
            Hand us the documents.
            <br />
            Walk away with
            <br />
            your sanity.
          </h1>
          <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-xl font-medium">
            Docsy is a Texas-based full-service notary company. Transparent pricing. Written estimate before every appointment. No hidden fees. No agency markup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="px-8 py-4 text-base font-bold text-white text-center"
              style={{ backgroundColor: "#000" }}
              data-testid="btn-book-hero"
            >
              Book a Service
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: BG }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="✕" text="THE PROBLEM" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            You don't own your notary experience.
            <br />
            And you're being charged for it.
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Hidden fees. Vague invoices. Agents who confirm and disappear. Agencies that mark up everything and explain nothing. The notary industry runs on information asymmetry — and it charges you accordingly.
          </p>
        </div>
      </section>

      {/* ── OUR APPROACH ──────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: BG }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="◎" text="OUR APPROACH" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            Purpose beats
            <br />
            scale.
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Docsy is not trying to be the biggest notary company. We're trying to be the one you actually trust — because every quote is written up front, every invoice matches the quote, and the person who picks up the phone knows your case.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section id="features" className="border-t border-[#1a1a1a]" style={{ backgroundColor: BG }}>
        {[
          {
            icon: "⊙",
            label: "TRANSPARENT PRICING",
            heading: "Know the price\nbefore we start.",
            body: "Every appointment gets a written estimate. If it wasn't in the estimate, it's not on the invoice. That's not a policy — that's just how it works. No surprise line items. No 'administrative processing' charges. Ever.",
          },
          {
            icon: "⏱",
            label: "AVAILABILITY",
            heading: "Remove the\nwaiting.",
            body: "Same-hour RON available. Mobile notary visits same-day. 7 days a week, early morning to midnight. After-hours and late-night surcharges are disclosed at booking — not discovered on the invoice.",
          },
          {
            icon: "⊞",
            label: "ONE STOP",
            heading: "Everything your\ndocuments need.",
            body: "Remote online notarization. Mobile notary. Loan signing. Apostille. Court reporting. Encrypted vault storage. Six service divisions under one roof. One call handles everything.",
          },
        ].map((feat, i) => (
          <section key={i} className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: BG }}>
            <div className="max-w-2xl mx-auto">
              <Label icon={feat.icon} text={feat.label} />
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white mb-6 whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
                {feat.heading}
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">{feat.body}</p>
            </div>
          </section>
        ))}
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a]" style={{ backgroundColor: BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Label icon="⊟" text="SERVICES" />
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
              Six divisions. One call.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
            {[
              { icon: Video, label: "Remote Online Notarization", desc: "Legally binding. Same-hour available. Anywhere in the US.", href: "/ron" },
              { icon: MapPin, label: "Mobile Notary", desc: "Home, office, hospital — we come to you. 7 days to midnight.", href: "/mobile-notary" },
              { icon: FileText, label: "Loan Signing", desc: "Flat rates. Scanbacks included. Texas HELOC compliant.", href: "/loan-signing" },
              { icon: Globe, label: "Apostille Services", desc: "All-inclusive. State fee in. Scan emailed. Done.", href: "/apostille" },
              { icon: Briefcase, label: "Court Reporting", desc: "Below agency rates. Word index and delivery always included.", href: "/court-reporting" },
              { icon: ShieldCheck, label: "Docsy Safe+ Vault", desc: "Encrypted document storage. 90-day free trial.", href: "/memberships" },
            ].map((svc) => (
              <Link
                key={svc.label}
                href={svc.href}
                className="group block p-8 hover:bg-white/[0.03] transition-colors"
                style={{ backgroundColor: BG }}
              >
                <svc.icon className="h-7 w-7 mb-5 text-white/30 group-hover:text-white/60 transition-colors" />
                <h3 className="text-lg font-black text-white mb-2 leading-tight">{svc.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{svc.desc}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: CAROLINA }}>
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIPS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t border-[#1a1a1a] text-center" style={{ backgroundColor: BG }}>
        <div className="max-w-2xl mx-auto">
          <Label icon="⊛" text="MEMBERSHIPS" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
            Remove the meter.
          </h2>
          <p className="text-lg text-white/50 leading-relaxed mb-10">
            Docsy+ memberships start at $15/month. Free notarizations, priority scheduling, and discounts across every service division. Use Docsy more than once? There's a tier for that.
          </p>
          <Link href="/memberships" className="inline-block px-8 py-4 text-sm font-bold text-black" style={{ backgroundColor: CAROLINA }}>
            See Membership Plans
          </Link>
        </div>
      </section>

    </div>
  );
}
