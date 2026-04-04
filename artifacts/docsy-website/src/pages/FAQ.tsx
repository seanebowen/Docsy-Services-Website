import React from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

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
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>FAQ · Frequently Asked Questions</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                The questions we get asked every day.{" "}<span style={{ color: CAROLINA }}>Answered honestly.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                Real questions. Real answers. No "please consult a professional for more information" non-answers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {faqs.map((section, si) => (
            <Reveal key={section.category} delay={si * 80}>
              <div className="mb-14">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4" style={{ color: CAROLINA, borderBottom: `1px solid ${EMERALD}66` }}>
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${section.category}-${i}`}
                      className="rounded-xl px-5 md:px-6 overflow-hidden transition-colors duration-200"
                      style={{ border: `1px solid ${EMERALD}66` }}
                    >
                      <AccordionTrigger
                        className="hover:no-underline text-base md:text-lg font-semibold py-5"
                        style={{ color: CLOUD }}
                        data-testid={`faq-trigger-${section.category}-${i}`}
                      >
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base leading-relaxed pb-5" style={{ color: `${CLOUD}b3` }}>
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Still have a question?</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Text us. We'll tell you straight — no runaround.</p>
            <Link href="/help-center" className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}>
              Help Center <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
