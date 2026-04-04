import React from "react";
import { Link } from "wouter";
import {
  FileText, MapPin, Video, Briefcase, Globe, ShieldCheck,
  ArrowRight, CheckCircle2, Clock, LayoutDashboard,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

const services = [
  { icon: Video, label: "Remote Online Notarization", desc: "Sign from anywhere in minutes. Legally binding. Same-hour available.", href: "/ron" },
  { icon: MapPin, label: "Mobile Notary", desc: "We come to you. Home, office, hospital, anywhere. 7 days to midnight.", href: "/mobile-notary" },
  { icon: FileText, label: "Loan Signing", desc: "Flat rates. Scanbacks included. Texas HELOC compliant. Every time.", href: "/loan-signing" },
  { icon: Globe, label: "Apostille Services", desc: "All-inclusive. State fee in. Scan emailed. Shipping prepped. Done.", href: "/apostille" },
  { icon: Briefcase, label: "Digital Court Reporting", desc: "Below agency rates. Word index and delivery included. No surprises.", href: "/court-reporting" },
  { icon: ShieldCheck, label: "Docsy Safe+ Vault", desc: "Encrypted document storage. 90-day free trial with your first order.", href: "/memberships" },
];

export default function Home() {
  React.useEffect(() => {
    document.title = "Docsy Notary Services | Texas Remote & Mobile Notary";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: `${CAROLINA}0d` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 md:mb-20">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>
                Texas Notary Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1
                className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
                style={{ color: CLOUD }}
              >
                Hand us the documents.{" "}
                <span style={{ color: CAROLINA }}>Walk away with your sanity.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: `${CLOUD}b3` }}>
                Docsy is a Texas-based full-service document and notary company. Transparent pricing. Written estimate before every appointment. No hidden fees. No surprise invoices. No agency markup.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                  style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}
                  data-testid="btn-book-hero"
                >
                  Book a Service <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{ color: `${CLOUD}cc`, border: `1px solid ${CLOUD}33` }}
                >
                  Text to Schedule
                </button>
              </div>
              <p className="mt-6 text-sm" style={{ color: `${CLOUD}4d` }}>
                Available 7 days · 7 AM – Midnight
              </p>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-20 md:mb-24 max-w-4xl mx-auto">
              {[
                { icon: CheckCircle2, title: "Transparent Pricing", desc: "Written estimate before every appointment" },
                { icon: Clock, title: "Always Available", desc: "7 days, early morning to midnight" },
                { icon: LayoutDashboard, title: "One Stop", desc: "Notary, apostille, loan, court — all here" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group flex-1 flex items-center gap-4 p-6 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ backgroundColor: `${CLOUD}0d` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: CLOUD }} />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold transition-colors" style={{ color: CLOUD }}>{item.title}</div>
                    <div className="text-sm" style={{ color: `${CLOUD}99` }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${EMERALD}33, transparent 60%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                Everything your documents could ever need.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Six service divisions under one roof. One call handles everything.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => (
              <Reveal key={service.label} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group flex flex-col rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 p-6 md:p-8"
                  style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}
                >
                  <service.icon className="h-8 w-8 mb-5 transition-colors duration-200" style={{ color: `${CLOUD}99` }} />
                  <h3
                    className="text-lg font-bold mb-3 transition-colors duration-200 leading-snug"
                    style={{ color: CLOUD }}
                  >
                    {service.label}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: `${CLOUD}99` }}>
                    {service.desc}
                  </p>
                  <div
                    className="mt-5 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-200"
                    style={{ color: SIGNAL }}
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                The notary industry has a transparency problem.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Hidden fees. Vague invoices. Agents who confirm and disappear. Agencies that mark up everything. Docsy was built to be different.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${CLOUD}1a`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-sm font-mono" style={{ color: `${CLOUD}66` }}>the-docsy-promise.md</span>
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed block" style={{ color: `${CLOUD}cc` }}>
{`# The Docsy Promise

> "Docsy clients don't re-explain what an apostille is every time they call.
> They don't wonder if the price on the phone will match the invoice.
> They book. We handle it. They move on with their life.
> That's the whole thing."

## What you get:
- Written estimate before every appointment
- If it wasn't in the estimate, it's not on the invoice
- The price you see is the price you pay
- Available 7 days · 7 AM to midnight
- Same-hour RON available`}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <h2 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
                Use Docsy more than once?{" "}
                <span style={{ color: CAROLINA }}>There's a better way to pay.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Docsy+ memberships start at $15/month — free notarizations, priority scheduling, and discounts across every service division.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
              <div
                className="group flex-1 flex items-center gap-4 p-6 rounded-xl transition-all duration-200"
                style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${CLOUD}0d` }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: CLOUD }} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold" style={{ color: CLOUD }}>Starting at $15/mo</div>
                  <div className="text-sm" style={{ color: `${CLOUD}99` }}>Free notarizations, priority booking</div>
                </div>
              </div>
              <Link
                href="/memberships"
                className="group flex-1 flex items-center gap-4 p-6 bg-transparent rounded-xl transition-all duration-200"
                style={{ border: `1px solid ${EMERALD}` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${CLOUD}0d` }}>
                  <ArrowRight className="w-6 h-6" style={{ color: CLOUD }} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold transition-colors" style={{ color: CLOUD }}>See All Plans</div>
                  <div className="text-sm" style={{ color: `${CLOUD}99` }}>Docsy+, BrokerLink™, HonorPass™</div>
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
