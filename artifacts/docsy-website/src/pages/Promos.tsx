import React from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

const promos = [
  { id: "early-bird", name: "Early Bird Seal", time: "8AM – 10AM", tagline: "The early bird gets the notarized document.", desc: "Book any GNW or RON appointment that starts between 8AM and 10AM and automatically save $10. No code needed — discount is applied at booking.", services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"], savings: "$10 OFF" },
  { id: "lunch-break", name: "Lunch Break Seal", time: "11AM – 1PM", tagline: "Handle your documents before the soup gets cold.", desc: "Midday GNW or RON appointments booked between 11AM and 1PM receive $10 off. Great for clients who need something done on a lunch break.", services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"], savings: "$10 OFF" },
  { id: "night-shift", name: "Night Shift Seal", time: "7PM – 9PM", tagline: "Night owls get rewarded too.", desc: "Late-evening GNW or RON appointments booked from 7PM to 9PM save $10. Because document emergencies don't keep business hours.", services: ["General Notary Work (GNW)", "Remote Online Notarization (RON)"], savings: "$10 OFF" },
];

export default function Promos() {
  React.useEffect(() => {
    document.title = "Current Promotions | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Current Promotions</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Time-based discounts{" "}<span style={{ color: CAROLINA }}>that actually make sense.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                Three daily windows. Each one gives you $10 off GNW and RON — no codes, no hoops, no asterisks.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ron" className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}>
                  Book RON <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/mobile-notary" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }}>
                  Book GNW
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promos.map((promo, i) => (
              <Reveal key={promo.id} delay={i * 100}>
                <div className="rounded-xl p-6 md:p-8 h-full flex flex-col" style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold" style={{ backgroundColor: CAROLINA, color: CLOUD }}>
                      <Clock className="h-3 w-3" /> {promo.time}
                    </div>
                    <div className="px-3 py-1.5 rounded-md text-xs font-bold" style={{ color: SIGNAL, border: `1px solid ${SIGNAL}4d` }}>
                      {promo.savings}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: CLOUD }}>{promo.name}</h2>
                  <p className="text-sm italic mb-4" style={{ color: `${CLOUD}66` }}>{promo.tagline}</p>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: `${CLOUD}b3` }}>{promo.desc}</p>
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${CLOUD}4d` }}>Applies to:</p>
                    <div className="flex flex-wrap gap-2">
                      {promo.services.map((s) => (
                        <span key={s} className="px-3 py-1.5 text-xs font-medium rounded-md" style={{ border: `1px solid ${EMERALD}66`, color: `${CLOUD}b3` }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/ron" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: CAROLINA, color: CLOUD }}>
                      Book RON <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/mobile-notary" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5" style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }}>
                      Book GNW
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto rounded-xl p-6 md:p-8" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${CLOUD}4d` }}>Terms</p>
          <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}66` }}>
            Time-based discounts are based on appointment start time. GNW = General Notary Work. RON = Remote Online Notarization. Discounts cannot be combined with other promotions. One discount per appointment. Docsy reserves the right to modify or discontinue promotions at any time.
          </p>
        </div>
      </section>

    </div>
  );
}
