import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FileText, MapPin, Video, Briefcase, Globe, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

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

const NUM_CARDS = [
  { num: "01", title: "Written estimate before we start.", body: "You see the full price before anything is signed. Not a range — the exact number. If it wasn't in the estimate, it's not on the invoice." },
  { num: "02", title: "Same-hour RON, same-day mobile.", body: "Remote Online Notarization available same-hour. Mobile visits same-day. 7 days a week, early morning to midnight. Surcharges disclosed at booking." },
  { num: "03", title: "Six service divisions, one call.", body: "RON, mobile notary, loan signing, apostille, court reporting, and encrypted vault storage — all under one roof. One contact handles everything." },
  { num: "04", title: "No agency markup. No runaround.", body: "Docsy is direct-to-client. No middlemen. The statutory notary fee is always separated on your invoice, as required by Texas law." },
  { num: "05", title: "Itemized invoices, always.", body: "Every charge listed separately — service fee, travel tier, timing surcharge. No bundled mystery fees. No administrative processing line items." },
  { num: "06", title: "Encrypted document storage.", body: "Every notarized document uploads automatically to your Docsy Safe+ vault. 90-day free trial with your first apostille or loan signing." },
];

const SERVICES = [
  { icon: Video,       label: "Remote Online Notarization", desc: "Legally binding. Same-hour available. Anywhere in the US.", href: "/ron" },
  { icon: MapPin,      label: "Mobile Notary",              desc: "Home, office, hospital — we come to you. 7 days to midnight.", href: "/mobile-notary" },
  { icon: FileText,    label: "Loan Signing",               desc: "Flat rates. Scanbacks included. Texas HELOC compliant.", href: "/loan-signing" },
  { icon: Globe,       label: "Apostille Services",         desc: "All-inclusive. State fee in. Scan emailed. Done.", href: "/apostille" },
  { icon: Briefcase,   label: "Court Reporting",            desc: "Below agency rates. Word index and delivery always included.", href: "/court-reporting" },
  { icon: ShieldCheck, label: "Docsy Safe+ Vault",         desc: "Encrypted document storage. 90-day free trial.", href: "/memberships" },
];

export default function Home() {
  useEffect(() => { document.title = "Docsy Notary Services | Texas Remote & Mobile Notary"; }, []);

  return (
    <div className="w-full" style={{ backgroundColor: SLATE }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <Pill text="⊙ Texas Notary Services" />
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none mb-8"
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
              Texas-based full-service notary. <strong className="font-bold" style={{ color: "rgba(0,0,0,0.75)" }}>Written estimate before every appointment.</strong> No hidden fees. No agency markup.
            </p>
          </FadeIn>
          <FadeIn delay={320}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/estimate"
                className="px-8 py-4 text-sm font-bold text-white text-center"
                style={{ backgroundColor: SLATE }}
                data-testid="btn-book-hero"
              >
                Book a Service
              </Link>
              <Link
                href="/estimate"
                className="px-8 py-4 text-sm font-bold text-center border"
                style={{ borderColor: AMBER, color: AMBER }}
                data-testid="btn-estimate-hero"
              >
                Estimate Your Job →
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 text-sm font-bold text-center border"
                style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.60)" }}
              >
                Our Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TYPEWRITER STRIP ────────────────────────────────── */}
      <div className="px-5 py-3 border-b" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3 font-mono text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
          <span style={{ color: AMBER }}>→</span>
          <TypewriterLine
            text="Transparent pricing · Same-hour RON available · Written estimate before every appointment · 7 days a week"
            speed={36}
          />
        </div>
      </div>

      {/* ── NUMBERED FEATURES ───────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="mb-14 text-center">
              <Pill text="⊙ How Docsy Works" dark />
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
                The notary service it should<br />
                <span className="font-light text-white/40">have always been.</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {NUM_CARDS.map(({ num, title, body }, i) => (
              <FadeIn key={num} delay={i * 80} threshold={0.05}>
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

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Pill text="⊛ Memberships" />
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-4xl sm:text-5xl font-black text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Remove the meter.
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
