import React from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BLUE = "#4A6FA8";
const BG = "#0a0a0a";
const SURFACE = "#111";

const hdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

const promos = [
  {
    id: "early-bird",
    name: "Early Bird Seal",
    time: "8AM – 10AM",
    tagline: "The early bird gets the notarized document.",
    desc: "Book any GNW or RON appointment that starts between 8AM and 10AM and automatically save $10. No code needed — discount is applied at booking.",
    services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"],
    savings: "$10 OFF",
    badge: "01",
  },
  {
    id: "lunch-break",
    name: "Lunch Break Seal",
    time: "11AM – 1PM",
    tagline: "Handle your documents before the soup gets cold.",
    desc: "Midday GNW or RON appointments booked between 11AM and 1PM receive $10 off. Great for clients who need something done on a lunch break.",
    services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"],
    savings: "$10 OFF",
    badge: "02",
  },
  {
    id: "night-shift",
    name: "Night Shift Seal",
    time: "7PM – 9PM",
    tagline: "Night owls get rewarded too.",
    desc: "Late-evening GNW or RON appointments booked from 7PM to 9PM save $10. Because document emergencies don't keep business hours.",
    services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"],
    savings: "$10 OFF",
    badge: "03",
  },
];

export default function Promos() {
  React.useEffect(() => {
    document.title = "Current Promotions | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="px-8 sm:px-16 py-20" style={{ backgroundColor: BG }}>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
            Current Promotions
          </p>
          <h1
            className="text-white mb-6 leading-none"
            style={{ ...hdStyle, fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Time-based discounts<br />
            that actually make sense.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
            Three daily windows. Each one gives you{" "}
            <span className="bg-yellow-200 text-black px-1 whitespace-nowrap">$10 off GNW and RON</span>{" "}
            — no codes, no hoops, no asterisks.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex gap-4">
            <Link
              href="/ron"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE }}
            >
              Book RON <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/mobile-notary"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white/70 border border-white/20 hover:text-white hover:border-white transition-colors"
            >
              Book GNW
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── BANNER ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 sm:px-16 py-4"
        style={{ backgroundColor: BLUE }}
      >
        <Tag className="h-4 w-4 text-white shrink-0" />
        <span className="flex-1 mx-6 text-xs font-black uppercase tracking-[0.25em] text-white text-center">
          All promos apply automatically at booking · No code required
        </span>
        <Tag className="h-4 w-4 text-white shrink-0" />
      </div>

      {/* ── PROMO CARDS ────────────────────────────────────────── */}
      {promos.map((promo, i) => (
        <section
          key={promo.id}
          className="px-8 sm:px-16 py-20"
          style={{ backgroundColor: i % 2 === 0 ? SURFACE : "#0e0e0e" }}
        >
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-[#555] tracking-wider">[{promo.badge}]</span>
              <div
                className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: BLUE }}
              >
                <Clock className="h-3 w-3" />
                {promo.time}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest border-2 border-white/20 text-white">
                {promo.savings}
              </div>
            </div>

            <h2
              className="text-white mb-2 leading-tight"
              style={{ ...hdStyle, fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
            >
              {promo.name}
            </h2>
            <p className="text-sm text-[#777] italic mb-6">{promo.tagline}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base text-[#999] leading-relaxed mb-8 max-w-2xl">
              {promo.desc}
            </p>

            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#555] mb-3">Applies to:</p>
              <div className="flex flex-wrap gap-3">
                {promo.services.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-[#222] text-[#999]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/ron"
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                Book RON <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mobile-notary"
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-widest border border-[#333] text-[#999] hover:border-white hover:text-white transition-colors"
              >
                Book GNW
              </Link>
            </div>
          </Reveal>
        </section>
      ))}

      {/* ── FINE PRINT ─────────────────────────────────────────── */}
      <section className="px-8 sm:px-16 py-16" style={{ backgroundColor: BG }}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-4">Terms</p>
        <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
          Time-based discounts are based on appointment start time. GNW = General Notary Work. RON = Remote Online Notarization. Discounts cannot be combined with other promotions. One discount per appointment. Docsy reserves the right to modify or discontinue promotions at any time.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
          >
            Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
}
