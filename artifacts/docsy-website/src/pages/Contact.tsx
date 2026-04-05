import React from "react";
import { Link } from "wouter";
import { Phone, Mail, MessageSquare, Clock, AlertTriangle, FileText, Receipt, Package, Building2, Users, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const PHONE = "(512) 555-0190";
const EMAIL = "hello@docsynotary.com";

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
}

const reasons: Reason[] = [
  {
    icon: AlertTriangle,
    title: "Cancel an Appointment",
    when: "As soon as you know you need to cancel — even if it's same-day.",
    include: "Your name, appointment date and time, and service type. Cancellations must be made before the notary departs. No-shows may be subject to a cancellation fee.",
    method: "phone",
    urgent: true,
  },
  {
    icon: Clock,
    title: "Reschedule or Change Appointment Details",
    when: "When you need to change your date, time, location, or service type after booking.",
    include: "Your confirmation details, what you need changed, and your preferred new time. Give as much notice as possible — same-day changes are accommodated when available.",
    method: "phone",
    urgent: true,
  },
  {
    icon: Phone,
    title: "Same-Day or Urgent Booking",
    when: "When you need a notary right now and can't wait for standard booking.",
    include: "Where you are, what you need notarized, and your ID type. Have your document ready. Same-hour RON is often available. Same-day mobile is subject to availability.",
    method: "phone",
    urgent: true,
  },
  {
    icon: FileText,
    title: "Apostille Pre-Check",
    when: "Before sending any document for apostille — especially vital records or documents you only have one copy of.",
    include: "A photo or clear scan of the document. We'll confirm it qualifies, identify the correct apostille type, and give you a total price before you send anything.",
    method: "either",
    urgent: false,
  },
  {
    icon: Receipt,
    title: "Billing Question or Invoice Dispute",
    when: "If a charge on your invoice doesn't match what you were quoted, or if you have questions about a specific line item.",
    include: "Your invoice number or appointment date, the charge in question, and what you were originally quoted. We'll reconcile it.",
    method: "email",
    urgent: false,
  },
  {
    icon: MessageSquare,
    title: "Missing or Delayed Deliverable",
    when: "If you haven't received your notarized document, apostille certificate, transcript, or Safe+ upload within the expected timeframe.",
    include: "Your appointment date, service type, and where you expected the deliverable (email, physical mail, or Safe+ vault). We'll track it down.",
    method: "email",
    urgent: false,
  },
  {
    icon: Users,
    title: "Special Accommodations",
    when: "When you or a signer needs accessibility assistance — hospital bed, nursing home room, oxygen equipment, memory care unit, multi-signer coordination, or any non-standard setup.",
    include: "The location, any mobility or equipment requirements, and the number of signers. We've handled these before — there's no such thing as an unusual request.",
    method: "phone",
    urgent: false,
  },
  {
    icon: Building2,
    title: "Corporate Account or Volume Work",
    when: "If you need recurring appointments, NET 30 billing, bulk apostille orders, a standing court reporter, or a dedicated contact for your business.",
    include: "Your company name, the type of work, expected volume, and preferred billing terms. Corporate accounts are set up directly — no online booking required.",
    method: "email",
    urgent: false,
  },
  {
    icon: Package,
    title: "Docsy Safe+ Vault Support",
    when: "If you can't access your vault, a file is missing, you need to add or remove a user, or you have questions about your plan or trial.",
    include: "The email address on your account and a description of the issue. Include the appointment date if a specific file is missing.",
    method: "email",
    urgent: false,
  },
  {
    icon: HelpCircle,
    title: "General Question Before Booking",
    when: "If you're unsure whether your document qualifies, what service you need, or how a particular process works.",
    include: "A description of your situation. If it's about a document, a photo or scan is helpful. Most questions are answered on the FAQ and Help Center — check there first.",
    method: "either",
    urgent: false,
  },
];

export default function Contact() {
  React.useEffect(() => {
    document.title = "Contact | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Reach out.
              <br />
              <HI>We respond fast.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Cancellations, reschedules, urgent bookings, billing questions — the right way to contact us depends on what you need. Use this page to get to the right channel fast.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact methods ── */}
      <section className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>

          <FadeIn delay={0} threshold={0.05}>
            <div className="px-8 py-10" style={{ backgroundColor: BG }}>
              <Phone className="h-5 w-5 mb-5" style={{ color: BLUE }} />
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Call or Text</p>
              <p className="text-3xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="hover:opacity-80 transition-opacity">{PHONE}</a>
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Use for anything time-sensitive: cancellations, reschedules, same-day bookings, urgent questions, and special accommodations. Fastest response. Available 7 days, early morning to midnight.
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
                Use for billing questions, invoice disputes, missing deliverables, corporate account inquiries, Safe+ vault support, and anything where you need a written record. Response within 4 business hours.
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
            {reasons.map((r, i) => (
              <FadeIn key={r.title} delay={i * 40} threshold={0.04}>
                <div className="p-8 h-full" style={{ backgroundColor: BG }}>
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
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { label: "FAQ", desc: "Quick answers to the most common notary, apostille, ID, and billing questions.", href: "/faq" },
              { label: "Help Center", desc: "Step-by-step guides for every service — from booking RON to sending apostille documents.", href: "/help-center" },
              { label: "Job Estimator", desc: "Know your price before you call. Configure your services and get a line-item estimate.", href: "/estimate" },
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

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-24 px-5 text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Still not sure where to start?
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
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block px-10 py-4 text-base font-bold text-black border border-black"
              >
                {EMAIL}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
