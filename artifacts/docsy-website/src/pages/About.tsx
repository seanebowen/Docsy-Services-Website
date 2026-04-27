import React from "react";
import { Link, useSearch } from "wouter";
import { Phone, Mail, MessageSquare, Clock, AlertTriangle, FileText, Receipt, Package, Building2, Users, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { CredentialsStrip } from "@/components/marketing/CredentialsStrip";
import seanPortrait from "@assets/Sean_Docsy_1776916203340.png";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const PHONE = "(512) 555-0190";
const EMAIL = "hello@docsynotary.com";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
      {icon} {text}
    </span>
  </div>
);

type Method = "phone" | "email" | "either";

const MethodBadge = ({ method }: { method: Method }) => {
  const config = {
    phone: { label: "Call or Text", color: BLUE },
    email: { label: "Email",        color: IVORY },
    either:{ label: "Call, Text, or Email", color: "rgba(255,255,255,0.4)" },
  }[method];
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 border"
      style={{ borderColor: config.color, color: config.color }}
    >
      {config.label}
    </span>
  );
};

const UrgencyDot = ({ urgent }: { urgent: boolean }) => (
  <span
    className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
    style={{ backgroundColor: urgent ? "#ef4444" : "rgba(255,255,255,0.2)" }}
  />
);

interface Reason {
  icon: React.ElementType;
  title: string;
  when: string;
  include: string;
  method: Method;
  urgent: boolean;
  id?: string;
}

const reasons: Reason[] = [
  { icon: AlertTriangle, title: "Cancel an Appointment", when: "As soon as you know you need to cancel — even if it's same-day.", include: "Your name, appointment date and time, and service type. Cancellations must be made before the notary departs. No-shows may be subject to a cancellation fee.", method: "phone", urgent: true },
  { icon: Clock, title: "Reschedule or Change Appointment Details", when: "When you need to change your date, time, location, or service type after booking.", include: "Your confirmation details, what you need changed, and your preferred new time. Give as much notice as possible — same-day changes are accommodated when available.", method: "phone", urgent: true },
  { icon: Phone, title: "Same-Day or Urgent Booking", when: "When you need a notary right now and can't wait for standard booking.", include: "Where you are, what you need notarized, and your ID type. Have your document ready. Same-hour RON is often available. Same-day mobile is subject to availability.", method: "phone", urgent: true },
  { icon: FileText, title: "Apostille Pre-Check", when: "Before sending any document for apostille — especially vital records or documents you only have one copy of.", include: "A photo or clear scan of the document. We'll confirm it qualifies, identify the correct apostille type, and give you a total price before you send anything.", method: "either", urgent: false, id: "apostille-precheck" },
  { icon: Receipt, title: "Billing Question or Invoice Dispute", when: "If a charge on your invoice doesn't match what you were quoted, or if you have questions about a specific line item.", include: "Your invoice number or appointment date, the charge in question, and what you were originally quoted. We'll reconcile it.", method: "email", urgent: false },
  { icon: MessageSquare, title: "Missing or Delayed Deliverable", when: "If you haven't received your notarized document, apostille certificate, transcript, or Safe+ upload within the expected timeframe.", include: "Your appointment date, service type, and where you expected the deliverable (email, physical mail, or Safe+). We'll track it down.", method: "email", urgent: false },
  { icon: Users, title: "Special Accommodations", when: "When you or a signer needs accessibility assistance — hospital bed, nursing home room, oxygen equipment, memory care unit, multi-signer coordination, or any non-standard setup.", include: "The location, any mobility or equipment requirements, and the number of signers. We've handled these before — there's no such thing as an unusual request.", method: "phone", urgent: false },
  { icon: Building2, title: "Corporate Account or Volume Work", when: "If you need recurring appointments, NET 30 billing, bulk apostille orders, a standing court reporter, or a dedicated contact for your business.", include: "Your company name, the type of work, expected volume, and preferred billing terms. Corporate accounts are set up directly — no online booking required.", method: "email", urgent: false },
  { icon: Package, title: "Docsy Safe+ Support", when: "If you can't access your Safe+, a file is missing, you need to add or remove a user, or you have questions about your plan or trial.", include: "The email address on your account and a description of the issue. Include the appointment date if a specific file is missing.", method: "email", urgent: false },
  { icon: HelpCircle, title: "General Question Before Booking", when: "If you're unsure whether your document qualifies, what service you need, or how a particular process works.", include: "A description of your situation. If it's about a document, a photo or scan is helpful. Most questions are answered on the FAQ — check there first.", method: "either", urgent: false },
];

export default function About() {
  const search = useSearch();
  const inquiryType = new URLSearchParams(search).get("inquiry");
  const highlightId = inquiryType ?? null;

  React.useEffect(() => {
    document.title = "About & Contact | Docsy Services";
    if (highlightId) {
      setTimeout(() => {
        const el = document.getElementById(highlightId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [highlightId]);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              About Docsy.<br /><HI>Reach us fast.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xl sm:text-2xl text-black/55 max-w-2xl font-medium leading-snug">
              Short for document sanity — and yes, we named it that on purpose. Below: who we are, how we work, and the right way to reach us depending on what you need.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#contact" className="px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "#000" }}>
                Contact us →
              </a>
              <a href="#story" className="px-6 py-3 text-sm font-bold text-black border-2 border-black">
                Our story →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section id="story" className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}><Label icon="⊙" text="OUR STORY" /></FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Docsy exists because legal and professional documents are stressful enough without adding confusion, delays, or a notary who ghosts you. We built a multi-division document services operation around one idea: show up, do the work right, and make the whole thing feel less like a nightmare.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              We handle Remote Online Notarization, mobile notary and general notary work, loan signings, apostille processing, and electronic reporting & transcription — all under one roof, all with the same standard of care.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Who's Behind It ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}><Label icon="⊙" text="WHO'S BEHIND IT" /></FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">

            {/* ── Portrait ── */}
            <FadeIn delay={80}>
              <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
                {/* Offset accent block (Haring-style geometry) */}
                <div
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    top: 14,
                    left: 14,
                    right: -14,
                    bottom: -14,
                    backgroundColor: BLUE,
                    opacity: 0.18,
                  }}
                />
                {/* Image frame */}
                <div className="relative" style={{ backgroundColor: BLUE }}>
                  <img
                    src={seanPortrait}
                    alt="Sean Bowen, owner and operator of Docsy Services"
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                    style={{ mixBlendMode: "luminosity", filter: "contrast(1.05)" }}
                  />
                  {/* Bottom name plate */}
                  <div className="absolute left-0 right-0 bottom-0 px-4 py-3 backdrop-blur-sm" style={{ backgroundColor: "rgba(19,25,41,0.78)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: BLUE }}>⊙ Owner & Operator</p>
                    <p className="text-base font-black text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>Sean Bowen</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── Bio ── */}
            <div>
              <FadeIn delay={120}>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Hi, I'm <HI>Sean.</HI>
                </h3>
                <p className="text-sm font-bold uppercase tracking-[0.18em] mb-6" style={{ color: BLUE }}>
                  Founder · Texas Notary · AAERT CER
                </p>
              </FadeIn>
              <FadeIn delay={180}>
                <p className="text-lg font-light leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  I'm the owner and sole operator of Docsy Services LLC, a Texas-based professional services company. Every appointment you book — RON, mobile notary, loan signing, apostille, or court reporting — is performed by me, personally. No subcontractors, no rotating cast, no guesswork about who's showing up.
                </p>
              </FadeIn>
              <FadeIn delay={240}>
                <p className="text-base font-light leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Docsy is structured as a professional services brand — not a one-off freelancer. That means documented processes, consistent pricing, and accountability baked into how the business runs.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Commissioned Texas Notary",
                    "Remote Online Notary (RON)",
                    "AAERT CER · Court Reporter",
                    "Certified Loan Signing Agent",
                    "Apostille Specialist",
                  ].map((credential) => (
                    <span
                      key={credential}
                      className="inline-block px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] border"
                      style={{ borderColor: DIV, color: "rgba(255,255,255,0.55)" }}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials & Trust ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}><Label icon="⊙" text="CREDENTIALS & TRUST" /></FadeIn>
          <FadeIn delay={60}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-3" style={{ letterSpacing: "-0.02em" }}>
              The credentials that <HI>actually matter.</HI>
            </h2>
            <p className="text-base font-light text-center mb-12 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Every credential below is current, verifiable, and on file with the relevant authority. We list them because clients — especially title companies and attorneys — should be able to confirm them in 30 seconds.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <CredentialsStrip variant="expanded" />
          </FadeIn>
        </div>
      </section>

      {/* ── Why It's Built This Way ── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}><Label icon="⊙" text="WHY WE'RE BUILT THIS WAY" /></FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Most document professionals are solo operators with no infrastructure behind them. Docsy was built differently — with a formal operating structure, defined service divisions, and professional-grade systems — because the clients we serve (title companies, attorneys, lenders, and individuals navigating serious legal matters) deserve more than improvisation.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-base font-light leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Based in Texas. RON services available nationwide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact: Methods ── */}
      <section id="contact" className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto pt-16 px-5">
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
              <HI>Reach out.</HI> We respond fast.
            </h2>
            <p className="text-base text-white/50 max-w-xl">
              Cancellations, reschedules, urgent bookings, billing questions — the right way to contact us depends on what you need.
            </p>
          </FadeIn>
        </div>
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
          <FadeIn delay={0} threshold={0.05}>
            <div className="px-8 py-10" style={{ backgroundColor: BG }}>
              <Phone className="h-5 w-5 mb-5" style={{ color: BLUE }} />
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Call or Text</p>
              <p className="text-3xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="hover:opacity-80 transition-opacity">{PHONE}</a>
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Use for anything time-sensitive: cancellations, reschedules, same-day bookings, urgent questions, and special accommodations. Fastest response. Available 7 days, 7 AM to 11 PM.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={60} threshold={0.05}>
            <div className="px-8 py-10" style={{ backgroundColor: BG }}>
              <Mail className="h-5 w-5 mb-5" style={{ color: IVORY }} />
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: IVORY }}>Email</p>
              <p className="text-3xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                <a href={`mailto:${EMAIL}`} className="hover:opacity-80 transition-opacity">{EMAIL}</a>
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Use for billing questions, invoice disputes, missing deliverables, corporate account inquiries, Safe+ support, and anything where you need a written record. Response within 4 business hours.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Reason grid ── */}
      <section className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>What do you need help with?</p>
              <div className="flex items-center gap-5 text-xs text-white/30 mt-3">
                <span><UrgencyDot urgent={true} />Time-sensitive — call or text</span>
                <span><UrgencyDot urgent={false} />Can wait — email works</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {reasons.map((r, i) => {
              const isHighlighted = highlightId && r.id === highlightId;
              return (
                <FadeIn key={r.title} delay={i * 40} threshold={0.04}>
                  <div
                    id={r.id}
                    className="p-8 h-full transition-all duration-500"
                    style={{
                      backgroundColor: isHighlighted ? `${BLUE}14` : BG,
                      outline: isHighlighted ? `1px solid ${BLUE}55` : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <UrgencyDot urgent={r.urgent} />
                        <r.icon className="h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                        <h3 className="text-base font-black text-white leading-tight">{r.title}</h3>
                      </div>
                      <MethodBadge method={r.method} />
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed mb-3">{r.when}</p>
                    <p className="text-xs text-white/25 leading-relaxed border-t pt-3" style={{ borderColor: DIV }}>
                      <span className="font-bold text-white/35">Include: </span>{r.include}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Self-service nudge ── */}
      <section className="py-12 px-5 border-t border-b" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} threshold={0.05}>
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              Before you reach out
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { label: "FAQ & Guides", desc: "Quick answers to the most common notary, apostille, ID, and billing questions — plus step-by-step service guides.", href: "/faq" },
              { label: "Price Calculator", desc: "Know your price before you call. Configure your services and get a line-item estimate.", href: "/calculate" },
            ].map((item, i) => (
              <FadeIn key={item.href} delay={i * 60} threshold={0.05}>
                <Link
                  href={item.href}
                  className="block p-7 group hover:bg-white/[0.03] transition-colors h-full"
                  style={{ backgroundColor: BG }}
                >
                  <p className="text-sm font-black text-white mb-2 group-hover:opacity-80 transition-opacity">{item.label} →</p>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Ready to hand off the documents?
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 mb-10">Text us. We'll point you in the right direction in under a minute.</p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="inline-block px-10 py-4 text-base font-bold text-white"
                style={{ backgroundColor: "#000" }}
              >
                {PHONE}
              </a>
              <Link
                href="/calculate"
                className="inline-block px-10 py-4 text-base font-bold text-black border-2 border-black"
              >
                Book a service →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
