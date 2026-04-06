import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FileText, MapPin, Video, Briefcase, Globe, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageBand } from "@/components/ui/ImageBand";
import homeImg from "@/assets/images/home-workspace.png";

const IVORY  = "#F5EFE6";
const SLATE  = "#131929";
const DIV    = "#1e2a3a";
const AMBER  = "#4D9FDB";

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 4px" }}>{children}</span>
);

const Pill = ({ text, dark }: { text: string; dark?: boolean }) => (
  <div className="flex justify-center mb-8">
    <span
      className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border"
      style={dark
        ? { borderColor: AMBER, color: AMBER }
        : { borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.40)" }
      }
    >
      {text}
    </span>
  </div>
);

function TypewriterLine({ text, speed = 38 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const ref                       = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    ref.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(ref.current!); setDone(true); }
    }, speed);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse opacity-50">█</span>}
    </span>
  );
}

const STATS = [
  { value: "< 15 min", label: "Average RON session" },
  { value: "7 days",   label: "Every week, 7AM–midnight" },
  { value: "$0",       label: "Hidden fees, ever" },
  { value: "5",        label: "Service types, one number" },
];

const NUM_CARDS = [
  {
    num: "01",
    title: "You see the exact total before confirming.",
    body: "Not a range. Not an estimate. The exact dollar amount — service fee, travel tier, timing add-on — all itemized before you pay. If it wasn't quoted, it won't be invoiced. Ever.",
  },
  {
    num: "02",
    title: "Same-hour RON. Anywhere in the US.",
    body: "Need it notarized today? Remote Online Notarization is available same-hour, 7 days a week. No office visit. No printer. No travel. Done in under 15 minutes from your phone or laptop.",
  },
  {
    num: "03",
    title: "Mobile notary to midnight, 7 days a week.",
    body: "We come to you — home, office, hospital, hospice, curbside. Any day of the week, up to midnight. Same-day availability in most of the San Antonio metro area.",
  },
  {
    num: "04",
    title: "No middlemen. No agency cut.",
    body: "Docsy is direct-to-client. No staffing agency skimming 40%. The Texas statutory notary fee is always a separate line item on your invoice — as required by law — so you always know exactly what goes where.",
  },
  {
    num: "05",
    title: "One provider for every Texas notary need.",
    body: "RON, mobile notary, loan signing, apostille, court reporting. One phone number. One invoice format. No 'let me connect you with someone else.' If it needs a Texas notary, Docsy handles it.",
  },
  {
    num: "06",
    title: "Encrypted file vault — auto-started, 30 days free.",
    body: "Every document, recording, and transcript from every appointment uploads automatically to your Docsy Safe+ vault. No action required. It starts the day of your first service — no card, no signup.",
  },
];

const SERVICES = [
  { icon: Video,       label: "Remote Online Notarization", desc: "Legally binding. Same-hour available. Anywhere in the US.", href: "/ron" },
  { icon: MapPin,      label: "Mobile Notary",              desc: "Home, office, hospital — we come to you. 7 days to midnight.", href: "/mobile-notary" },
  { icon: FileText,    label: "Loan Signing",               desc: "Flat rates. Scanbacks included. Texas HELOC compliant.", href: "/loan-signing" },
  { icon: Globe,       label: "Apostille Services",         desc: "All-inclusive. State fee in. Scan emailed. Done.", href: "/apostille" },
  { icon: Briefcase,   label: "Court Reporting",            desc: "Below agency rates. Word index and delivery always included.", href: "/court-reporting" },
  { icon: ShieldCheck, label: "Docsy Safe+ Vault",         desc: "Encrypted file storage for all appointment deliverables. 30-day free trial.", href: "/memberships" },
];

export default function Home() {
  useEffect(() => { document.title = "Docsy Notary Services | Texas Remote & Mobile Notary"; }, []);

  return (
    <div className="w-full" style={{ backgroundColor: SLATE }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <div>
            <FadeIn delay={0}>
              <Pill text="⊙ Texas Notary Services" />
            </FadeIn>
            <FadeIn delay={80}>
              <h1
                className="text-[3rem] sm:text-[4rem] md:text-[5rem] leading-none mb-8"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span className="font-black text-black">Hand us the documents.</span>
                <br />
                <span className="font-light text-black/40">Walk away with</span>
                <br />
                <span className="font-black text-black"><H>your sanity.</H></span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-base sm:text-lg font-light mb-10 max-w-lg" style={{ color: "rgba(0,0,0,0.50)" }}>
                Texas-based full-service notary. <strong className="font-bold" style={{ color: "rgba(0,0,0,0.75)" }}>Always know your price before you book.</strong> No hidden fees. No agency markup.
              </p>
            </FadeIn>
            <FadeIn delay={320}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/estimate"
                  className="px-8 py-4 text-sm font-bold text-center border"
                  style={{ borderColor: AMBER, color: AMBER }}
                  data-testid="btn-estimate-hero"
                >
                  Calculate Your Price →
                </Link>
                <button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 text-sm font-bold text-center border"
                  style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.60)" }}
                >
                  Our Services
                </button>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ── IMAGE BAND ──────────────────────────────────────── */}
      <ImageBand src={homeImg} alt="Texas legal workspace" />

      {/* ── TYPEWRITER STRIP ────────────────────────────────── */}
      <div className="px-5 py-3 border-b" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3 font-mono text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
          <span style={{ color: AMBER }}>→</span>
          <TypewriterLine
            text="Transparent pricing · Same-hour RON available · Always know your price before you book · 7 days a week"
            speed={36}
          />
        </div>
      </div>

      {/* ── NUMBERED FEATURES ───────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="mb-14 text-center">
              <Pill text="⊙ Why Docsy" dark />
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
                The notary service it should<br />
                <span className="font-light text-white/40">have always been.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Stat strip */}
          <FadeIn delay={60}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-14" style={{ backgroundColor: DIV }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="py-8 px-6 text-center" style={{ backgroundColor: SLATE }}>
                  <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: AMBER, letterSpacing: "-0.03em" }}>{value}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {NUM_CARDS.map(({ num, title, body }, i) => (
              <FadeIn key={num} delay={i * 70} threshold={0.05}>
                <div
                  className="p-7 border transition-colors hover:bg-white/[0.025] h-full"
                  style={{ borderColor: DIV, backgroundColor: "rgba(255,255,255,0.015)" }}
                >
                  <p className="font-mono text-xs mb-4 tracking-widest" style={{ color: AMBER }}>[ {num} ]</p>
                  <h3 className="text-xl font-black text-white mb-3 leading-snug" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-24 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-14">
              <Pill text="⊟ Services" dark />
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
                Six divisions. <H>One call.</H>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {SERVICES.map((svc, i) => (
              <FadeIn key={svc.label} delay={i * 60} threshold={0.05}>
                <Link
                  href={svc.href}
                  className="group block p-8 hover:bg-white/[0.04] transition-colors h-full"
                  style={{ backgroundColor: SLATE }}
                >
                  <svc.icon className="h-5 w-5 mb-5 transition-colors" style={{ color: "rgba(255,255,255,0.22)" }} />
                  <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wide">{svc.label}</h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>{svc.desc}</p>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: AMBER }}>
                    Learn more →
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET STARTED CTA ──────────────────────────────── */}
      <section className="py-16 px-5 border-b text-center" style={{ backgroundColor: SLATE, borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border"
              style={{ borderColor: AMBER, color: AMBER }}
            >
              ◎ Get Started
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to get started?
          </h2>
          <p className="text-base font-light mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Tell us what you need. We'll tell you exactly what it costs.<br />No hidden fees, no surprises.
          </p>
          <Link
            href="/estimate"
            className="inline-block px-8 py-4 text-sm font-bold text-white text-center"
            style={{ backgroundColor: AMBER }}
            data-testid="btn-book-footer"
          >
            Book Now →
          </Link>
        </div>
      </section>

      {/* ── MEMBERSHIPS CTA ──────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Pill text="⊛ Memberships" />
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-4xl sm:text-5xl font-black text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Your notary, on retainer.
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base font-light mb-10 max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.50)" }}>
              Docsy+ memberships from <strong className="font-bold" style={{ color: "rgba(0,0,0,0.75)" }}>$15/month.</strong> Free notarizations, priority scheduling, and discounts across every service division.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Link
              href="/memberships"
              className="inline-block px-8 py-4 text-sm font-bold text-white"
              style={{ backgroundColor: SLATE }}
            >
              See Membership Plans
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
