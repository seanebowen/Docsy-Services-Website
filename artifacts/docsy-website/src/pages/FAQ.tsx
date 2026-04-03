import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const BLUE = "#4A6FA8";
const DARK = "#141414";
const CREAM = "#f2f0e3";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 text-black px-0.5">{children}</span>
);

const hdStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
};

const faqs = [
  {
    category: "General",
    items: [
      { q: "How much does a notary cost?", a: "It depends on the service. RON starts at $25 for the first notarization. Mobile notary visits start at $30 travel + the statutory notary fee ($10 for the first signature under Texas law). Apostilles start at $150 all-inclusive. Loan signings start at $125 for a seller package. Every appointment gets a written estimate before we start — so you know the exact number before anything is confirmed." },
      { q: "Do you come to my location?", a: "Yes. Docsy mobile notary serves the Texas area with four travel tiers based on distance. We also go to hospitals, nursing homes, assisted living facilities, and hospice locations. For documents that don't require in-person presence, RON is available nationwide." },
      { q: "Are you available on weekends and after hours?", a: "Yes. Docsy is available 7 days a week from early morning to midnight. After-hours and late-night appointments carry a surcharge (disclosed at booking). Same-hour RON is available when you need it done right now." },
      { q: "Do I get a receipt or invoice?", a: "Yes. Every appointment comes with an itemized invoice that separates statutory notary fees from all other service fees — as required by Texas law. All fees on the invoice match the written estimate provided before the appointment." },
      { q: "What payment methods do you accept?", a: "Check, ACH/wire transfer (preferred — no fee), credit or debit card (3% processing fee), and Zelle." },
    ],
  },
  {
    category: "Identification",
    items: [
      { q: "What ID do I need?", a: "A valid, unexpired, government-issued photo ID. That means: U.S. driver's license, state-issued ID, U.S. passport or passport card, U.S. military ID, or Permanent Resident Card (Green Card). Expired ID = no notarization. No exceptions." },
      { q: "My name on the document doesn't match my ID. What do I do?", a: "If your name has changed due to marriage, divorce, or any other reason, bring documentation proving the name change (marriage certificate, court order, etc.). Without it, we may not be able to complete the notarization." },
      { q: "Can someone else present their ID for me?", a: "No. You must be physically present (or on camera for RON) and present your own ID. We can't notarize a signature we didn't witness, and we can't accept an ID for someone who isn't there." },
    ],
  },
  {
    category: "Apostille",
    items: [
      { q: "What is an apostille and do I need one?", a: "An apostille is a certificate that makes your US document legally recognized in other countries that are part of the Hague Convention. If you're using a US document abroad — for immigration, education, business, marriage, or anything official — you almost certainly need one." },
      { q: "What documents can be apostilled?", a: "Any Texas-origin document or document notarized by a Texas notary. Common ones: birth certificates, marriage licenses, divorce decrees, death certificates, diplomas, transcripts, powers of attorney, business documents. Federal documents (like FBI background checks) require USDOS apostille — Docsy handles those too at $275." },
      { q: "Can I send a photocopy?", a: "No. For recordable documents (birth certificates, marriage licenses, etc.) you need a certified copy issued by the county or state — not a personal copy or scan. For other documents, the original notarized document is required. When in doubt, use the free Pre-Check service before sending anything." },
      { q: "How long does an apostille take?", a: "Standard: 3–5 business days. Next-Day: if received by 11 AM. Same-Day Rush: if received by 10 AM. Federal/USDOS: 2–3 weeks standard." },
    ],
  },
  {
    category: "Legal Notices",
    items: [
      { q: "Are you a lawyer?", a: "No. Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only. For questions about what a document means, whether it's legally sufficient, or whether it meets a specific requirement — consult a licensed attorney." },
      { q: "What if my document is rejected after apostille?", a: "Docsy offers a free Pre-Check service to review your document before filing and confirm it qualifies. If you use the Pre-Check and your document is rejected due to something outside our control, we'll help you understand the next steps. If rejection was due to Docsy's error, we'll make it right." },
    ],
  },
];

export default function FAQ() {
  React.useEffect(() => {
    document.title = "FAQ | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
          FAQ · Frequently Asked Questions
        </p>
        <h1 style={{ ...hdStyle, fontSize: "clamp(2.5rem, 5vw, 5rem)" }} className="text-white mb-8 max-w-3xl">
          The questions we get asked every day.<br />Answered honestly.
        </h1>
        <p className="text-white/60 text-base leading-relaxed max-w-xl">
          <HL>Real questions. Real answers.</HL> No "please consult a professional for more information" non-answers.
        </p>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 sm:px-16 py-4" style={{ backgroundColor: BLUE }}>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Common Questions</span>
        <div className="flex-1 mx-8 h-px bg-white/30" />
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">If your question isn't here, text us →</span>
      </div>

      {/* ── FAQ SECTIONS ─────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }}>
        <div className="max-w-4xl mx-auto px-8 sm:px-16 py-16">
          {faqs.map((section) => (
            <div key={section.category} className="mb-14">
              <h2
                className="text-xs font-bold uppercase tracking-[0.25em] mb-6 pb-4 border-b border-neutral-300"
                style={{ color: BLUE }}
              >
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-0">
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.category}-${i}`}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <AccordionTrigger
                      className="text-left font-semibold hover:no-underline py-5 text-base leading-snug"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      data-testid={`faq-trigger-${section.category}-${i}`}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 leading-relaxed pb-5 text-sm">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 style={{ ...hdStyle, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }} className="text-white mb-3">
            Still have a question?
          </h2>
          <p className="text-white/50 text-sm">Text us. We'll tell you straight — no runaround.</p>
        </div>
        <button
          className="inline-flex items-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: BLUE }}
        >
          Help Center <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
