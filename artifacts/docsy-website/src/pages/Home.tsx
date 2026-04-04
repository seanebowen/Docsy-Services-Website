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
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";
const SURFACE = "#111";
const BORDER = "#222";

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

const services = [
  { icon: Video,       label: "Remote Online Notarization", href: "/ron" },
  { icon: MapPin,      label: "Mobile Notary",              href: "/mobile-notary" },
  { icon: FileText,    label: "Loan Signing",               href: "/loan-signing" },
  { icon: Globe,       label: "Apostille Services",         href: "/apostille" },
  { icon: Briefcase,   label: "Court Reporting",            href: "/court-reporting" },
  { icon: ShieldCheck, label: "Safe+ Document Vault",       href: "/memberships" },
];

export default function Home() {
  React.useEffect(() => {
    document.title = "Docsy Notary Services | Texas Remote & Mobile Notary";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row min-h-[92vh]">
        <div
          className="flex flex-col justify-between w-full md:w-[44%] px-8 sm:px-12 py-12"
          style={{ backgroundColor: SURFACE }}
        >
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-10" style={{ color: BLUE }}>
                Texas Notary Services
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1
                className="text-4xl sm:text-5xl leading-tight mb-6 text-white"
                style={hdStyle}
              >
                Hand us the documents.<br />
                Walk away with your sanity.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-sm leading-relaxed text-[#888] mb-8 max-w-sm">
                Docsy is a Texas-based full-service document and notary company. Transparent pricing. Written estimate before every appointment. No hidden fees. No surprise invoices. No agency markup.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE }}
                data-testid="btn-book-hero"
              >
                Book a Service <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-6 text-xs text-[#555] uppercase tracking-widest font-semibold">
                ● Available 7 days · 7 AM – Midnight
              </p>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-[#222]">
            {services.map((s, i) => (
              <Reveal key={s.label} delay={100 * i}>
                <Link
                  href={s.href}
                  className="flex items-center gap-4 py-4 border-b border-[#222] group"
                >
                  <s.icon className="h-5 w-5 text-[#555] group-hover:text-white transition-colors shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          className="hidden md:flex flex-col justify-end w-[56%] p-12"
          style={{ backgroundColor: BG }}
        >
          <Reveal>
            <h2
              className="text-white leading-none mb-6"
              style={{
                ...hdStyle,
                fontSize: "clamp(3rem, 6vw, 6rem)",
              }}
            >
              No hidden fees.<br />
              No runaround.<br />
              No surprises.
            </h2>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold max-w-xs">
              That's not a tagline. That's literally what happens.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BLUE BANNER ──────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 sm:px-16 py-5"
        style={{ backgroundColor: BLUE }}
      >
        <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">
          See All Services
        </span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <ArrowRight className="h-6 w-6 text-white shrink-0" />
      </div>

      {/* ── WHY DOCSY ────────────────────────────────────────── */}
      <section className="px-8 sm:px-16 py-20" style={{ backgroundColor: SURFACE }}>
        <Reveal>
          <span className="font-mono text-xs text-[#555] tracking-wider">[01]</span>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 mt-2" style={{ color: BLUE }}>
            Why Docsy
          </p>
          <h2 className="text-4xl sm:text-5xl mb-6 leading-tight text-white" style={hdStyle}>
            The notary industry has a transparency problem.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-base text-[#999] leading-relaxed max-w-2xl mb-10">
            Hidden fees. Vague invoices. 'Administrative processing' charges that aren't real. Agents who confirm appointments and then disappear. Agencies that mark up everything and pass the cost to you.{" "}
            <span className="bg-yellow-200 text-black px-1">Docsy was built to be the thing</span> the industry pretends it already is:{" "}
            <span className="bg-yellow-200 text-black px-1">straightforward, accountable, and worth booking again.</span>
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#222]">
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
            <Reveal key={item.title} delay={i * 120}>
              <div
                className={`p-8 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-[#222]" : ""}`}
              >
                <item.icon className="h-8 w-8 mb-5" style={{ color: BLUE }} />
                <h3 className="text-xl mb-3 leading-tight text-white" style={hdStyle}>{item.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="px-8 sm:px-16 py-20" style={{ backgroundColor: "#0e0e0e" }}>
        <Reveal>
          <span className="font-mono text-xs text-[#555] tracking-wider">[02]</span>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 mt-2" style={{ color: BLUE }}>
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl mb-12 leading-tight text-white" style={hdStyle}>
            Everything your documents could ever need.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#222]">
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
            <Reveal key={service.title} delay={i * 80}>
              <Link
                href={service.link}
                className={`group block p-8 border-[#222] hover:bg-[#1a1a1a] transition-colors ${
                  i % 3 !== 2 ? "border-r" : ""
                } ${i < 3 ? "border-b" : ""}`}
              >
                <service.icon className="h-7 w-7 mb-5 text-[#555] group-hover:text-white transition-colors" />
                <h3 className="text-xl mb-2 leading-tight text-white" style={hdStyle}>{service.title}</h3>
                <p className="text-sm text-[#777] leading-relaxed mb-4">{service.desc}</p>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: BLUE }}>
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── QUOTE BLOCK ──────────────────────────────────────── */}
      <section className="px-8 sm:px-16 py-20" style={{ backgroundColor: BG }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-8">
              The Docsy Promise
            </p>
            <blockquote
              className="text-white leading-tight mb-6"
              style={{
                ...hdStyle,
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.01em",
              }}
            >
              "Docsy clients don't re-explain what an apostille is every time they call. They don't wonder if the price on the phone will match the invoice.{" "}
              <span style={{ color: BLUE }}>They book. We handle it. They move on with their life.</span>{" "}
              That's the whole thing."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── MEMBERSHIPS TEASER ───────────────────────────────── */}
      <section
        className="flex flex-col md:flex-row items-stretch border-t border-[#222]"
        style={{ backgroundColor: SURFACE }}
      >
        <div className="flex-1 px-8 sm:px-16 py-16">
          <Reveal>
            <span className="font-mono text-xs text-[#555] tracking-wider">[03]</span>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 mt-2" style={{ color: BLUE }}>
              Memberships & Safe+
            </p>
            <h2 className="text-4xl sm:text-5xl mb-6 leading-tight text-white" style={hdStyle}>
              Use Docsy more than once?<br />There's a better way to pay.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base text-[#999] leading-relaxed mb-10 max-w-xl">
              Docsy+ memberships start at $15/month — free notarizations, priority scheduling, and discounts across every service division. Built for clients who've realized this isn't going to be a one-time thing.
            </p>
            <Link
              href="/memberships"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE }}
              data-testid="btn-memberships-teaser"
            >
              See Membership Options <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div
          className="hidden md:flex flex-col justify-center w-72 p-12 shrink-0"
          style={{ backgroundColor: BLUE }}
        >
          <ShieldCheck className="h-16 w-16 text-white/30 mb-6" />
          <p className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
            Starting at<br />
            <span className="text-5xl">$15</span><br />
            per month.
          </p>
        </div>
      </section>

    </div>
  );
}
