import React from "react";
import { Link } from "wouter";
import {
  FileText,
  MapPin,
  Video,
  Briefcase,
  Globe,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  LayoutDashboard,
} from "lucide-react";

const services = [
  { icon: Video,       label: "Remote Online Notarization", href: "/ron" },
  { icon: MapPin,      label: "Mobile Notary",              href: "/mobile-notary" },
  { icon: FileText,    label: "Loan Signing",               href: "/loan-signing" },
  { icon: Globe,       label: "Apostille Services",         href: "/apostille" },
  { icon: Briefcase,   label: "Court Reporting",            href: "/court-reporting" },
  { icon: ShieldCheck, label: "Safe+ Document Vault",       href: "/memberships" },
];

/* Navbar = 80px, Ticker = 36px → sticky offset = 116px */
const STICKY_TOP = "116px";

function stickyStyle(z: number): React.CSSProperties {
  return { position: "sticky", top: STICKY_TOP, zIndex: z };
}

export default function Home() {
  React.useEffect(() => {
    document.title = "Docsy Notary Services | Texas Remote & Mobile Notary";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO: Split-panel ─────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row min-h-[92vh]" style={stickyStyle(1)}>

        {/* Left cream panel */}
        <div
          className="flex flex-col justify-between w-full md:w-[44%] px-8 sm:px-12 py-12"
          style={{ backgroundColor: "#f2f0e3" }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-10" style={{ color: "#4A6FA8" }}>
              Texas Notary Services
            </p>

            <h1
              className="text-4xl sm:text-5xl leading-tight mb-6"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              Hand us the documents.<br />
              Walk away with your sanity.
            </h1>

            <p className="text-sm leading-relaxed text-neutral-600 mb-8 max-w-sm">
              Docsy is a Texas-based full-service document and notary company. Transparent pricing. Written estimate before every appointment. No hidden fees. No surprise invoices. No agency markup.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#4A6FA8" }}
              data-testid="btn-book-hero"
            >
              Book a Service <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-6 text-xs text-neutral-500 uppercase tracking-widest font-semibold">
              ● Available 7 days · 7 AM – Midnight
            </p>
          </div>

          {/* Service category list */}
          <div className="mt-12 border-t border-neutral-300">
            {services.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center gap-4 py-4 border-b border-neutral-300 group"
              >
                <s.icon className="h-5 w-5 text-neutral-400 group-hover:text-black transition-colors shrink-0" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 group-hover:text-black transition-colors">
                  {s.label}
                </span>
                <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-black shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right dark panel */}
        <div
          className="hidden md:flex flex-col justify-end w-[56%] p-12"
          style={{ backgroundColor: "#141414" }}
        >
          <h2
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 6vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            No hidden fees.<br />
            No runaround.<br />
            No surprises.
          </h2>
          <p className="text-white/40 text-sm uppercase tracking-widest font-semibold max-w-xs">
            That's not a tagline. That's literally what happens.
          </p>
        </div>
      </section>

      {/* ── BLUE BANNER ───────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 sm:px-16 py-5"
        style={{ backgroundColor: "#4A6FA8", ...stickyStyle(2) }}
      >
        <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">
          See All Services
        </span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <ArrowRight className="h-6 w-6 text-white shrink-0" />
      </div>

      {/* ── WHY DOCSY: Numbered section ──────────────────────────────── */}
      <section className="flex flex-col md:flex-row" style={{ backgroundColor: "#f2f0e3", ...stickyStyle(3) }}>

        {/* Left number column */}
        <div
          className="hidden md:flex items-start justify-center w-32 py-16 shrink-0"
          style={{ backgroundColor: "#141414" }}
        >
          <span
            className="text-white text-5xl font-black"
            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em" }}
          >
            1:
          </span>
        </div>

        {/* Right content */}
        <div className="flex-1 px-8 sm:px-16 py-16 border-b border-neutral-300">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#4A6FA8" }}>
            Why Docsy
          </p>
          <h2 className="text-4xl sm:text-5xl mb-6 leading-tight">
            The notary industry has a transparency problem.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed max-w-2xl mb-10">
            Hidden fees. Vague invoices. 'Administrative processing' charges that aren't real. Agents who confirm appointments and then disappear. Agencies that mark up everything and pass the cost to you.{" "}
            <span className="bg-yellow-200 px-1">Docsy was built to be the thing</span> the industry pretends it already is:{" "}
            <span className="bg-yellow-200 px-1">straightforward, accountable, and worth booking again.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-neutral-300">
            {[
              {
                icon: CheckCircle2,
                title: "The price you see is the price you pay.",
                desc: "Written estimate before every appointment. If it wasn't in the estimate, it's not on the invoice.",
              },
              {
                icon: Clock,
                title: "Available when you actually need us.",
                desc: "7 days a week. Early morning to midnight. Same-hour RON available.",
              },
              {
                icon: LayoutDashboard,
                title: "One call handles everything.",
                desc: "Notary, apostille, loan signing, court reporting, document storage — all under one roof.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-8 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-neutral-300" : ""}`}
              >
                <item.icon className="h-8 w-8 mb-5" style={{ color: "#4A6FA8" }} />
                <h3 className="text-xl mb-3 leading-tight">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES: Numbered section ───────────────────────────────── */}
      <section id="services" className="flex flex-col md:flex-row" style={{ backgroundColor: "#f8f7f0", ...stickyStyle(4) }}>

        <div
          className="hidden md:flex items-start justify-center w-32 py-16 shrink-0"
          style={{ backgroundColor: "#4A6FA8" }}
        >
          <span
            className="text-white text-5xl font-black"
            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em" }}
          >
            2:
          </span>
        </div>

        <div className="flex-1 px-8 sm:px-16 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#4A6FA8" }}>
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl mb-12 leading-tight">
            Everything your documents could ever need.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-neutral-300">
            {[
              {
                icon: Video,
                title: "Remote Online Notarization",
                desc: "Sign from anywhere in minutes. Legally binding. Same-hour available.",
                link: "/ron",
              },
              {
                icon: MapPin,
                title: "Mobile Notary",
                desc: "We come to you. Home, office, hospital, anywhere. 7 days to midnight.",
                link: "/mobile-notary",
              },
              {
                icon: FileText,
                title: "Loan Signing",
                desc: "Flat rates. Scanbacks included. Texas HELOC compliant. Every time.",
                link: "/loan-signing",
              },
              {
                icon: Globe,
                title: "Apostille Services",
                desc: "All-inclusive. State fee in. Scan emailed. Shipping prepped. Done.",
                link: "/apostille",
              },
              {
                icon: Briefcase,
                title: "Digital Court Reporting",
                desc: "Below agency rates. Word index and delivery included. No surprises.",
                link: "/court-reporting",
              },
              {
                icon: ShieldCheck,
                title: "Docsy Safe+ Vault",
                desc: "Encrypted document storage. 90-day free trial with your first order.",
                link: "/memberships",
              },
            ].map((service, i) => (
              <Link
                key={service.title}
                href={service.link}
                className={`group block p-8 border-neutral-300 hover:bg-white transition-colors ${
                  i % 3 !== 2 ? "border-r" : ""
                } ${i < 3 ? "border-b" : ""}`}
              >
                <service.icon className="h-7 w-7 mb-5 text-neutral-400 group-hover:text-black transition-colors" />
                <h3 className="text-xl mb-2 leading-tight">{service.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">{service.desc}</p>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#4A6FA8" }}>
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BLOCK ──────────────────────────────────────────────── */}
      <section
        className="px-8 sm:px-16 py-20"
        style={{ backgroundColor: "#141414", ...stickyStyle(5) }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-8">
            The Docsy Promise
          </p>
          <blockquote
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            "Docsy clients don't re-explain what an apostille is every time they call. They don't wonder if the price on the phone will match the invoice.{" "}
            <span style={{ color: "#4A6FA8" }}>They book. We handle it. They move on with their life.</span>{" "}
            That's the whole thing."
          </blockquote>
        </div>
      </section>

      {/* ── MEMBERSHIPS TEASER ───────────────────────────────────────── */}
      <section
        className="flex flex-col md:flex-row items-stretch border-t border-neutral-300"
        style={{ backgroundColor: "#f2f0e3", ...stickyStyle(6) }}
      >
        <div className="flex-1 px-8 sm:px-16 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#4A6FA8" }}>
            Memberships & Safe+
          </p>
          <h2 className="text-4xl sm:text-5xl mb-6 leading-tight">
            Use Docsy more than once?<br />There's a better way to pay.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed mb-10 max-w-xl">
            Docsy+ memberships start at $15/month — free notarizations, priority scheduling, and discounts across every service division. Built for clients who've realized this isn't going to be a one-time thing.
          </p>
          <Link
            href="/memberships"
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#4A6FA8" }}
            data-testid="btn-memberships-teaser"
          >
            See Membership Options <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="hidden md:flex flex-col justify-center w-72 p-12 shrink-0"
          style={{ backgroundColor: "#4A6FA8" }}
        >
          <ShieldCheck className="h-16 w-16 text-white/30 mb-6" />
          <p className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Starting at<br />
            <span className="text-5xl">$15</span><br />
            per month.
          </p>
        </div>
      </section>

    </div>
  );
}
