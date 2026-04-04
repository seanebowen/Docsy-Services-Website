import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

const IVORY = "#F5EFE6";
const BG = "#131929";

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#C8960A", color: "#C8960A" }}>
      {icon} {text}
    </span>
  </div>
);

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(240,185,20,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

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
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
            The questions we
            <br />
            get asked every day.
            <br />
            <HI>Answered honestly.</HI>
          </h1>
          <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
            Real questions. Real answers. No "please consult a professional for more information" non-answers.
          </p>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-3xl mx-auto">
          {faqs.map((section, si) => (
            <div key={section.category} className="mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-6 pb-4 border-b border-[#1e2a3a]" style={{ color: IVORY }}>
                {section.category}
              </p>
              <Accordion type="single" collapsible>
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.category}-${i}`}
                    className="border-b border-[#1e2a3a] last:border-b-0"
                  >
                    <AccordionTrigger
                      className="text-left text-base sm:text-lg font-bold py-5 text-white hover:no-underline hover:text-white"
                      data-testid={`faq-trigger-${section.category}-${i}`}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-white/50 leading-relaxed pb-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Still have a question?
          </h2>
          <p className="text-lg text-black/60 mb-8">Text us. We'll tell you straight — no runaround.</p>
          <Link href="/help-center" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
            Help Center
          </Link>
        </div>
      </section>

    </div>
  );
}
