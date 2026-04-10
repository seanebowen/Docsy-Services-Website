import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "How much does a notary cost?",
        a: "It depends on the service. RON starts at $25 for the first notarization. Mobile notary visits start at $30 travel + the statutory notary fee ($10 for the first signature under Texas law). Apostilles start at $165 all-inclusive. Loan signings start at $100 for a seller package. You know your exact price before you confirm — always. Nothing starts until the number is agreed on.",
      },
      {
        q: "Do you come to my location?",
        a: "Yes. Docsy mobile notary serves the San Antonio metro area with four travel tiers based on distance. We also go to hospitals, nursing homes, assisted living facilities, and hospice locations. For documents that don't require in-person presence, RON is available nationwide.",
      },
      {
        q: "Are you available on weekends and after hours?",
        a: "Yes. Docsy is available 7 days a week. General mobile notary hours are 9 AM–9 PM. RON is available from 7 AM to midnight daily. Time-window promotions apply to qualifying appointments: Night Shift Seal (6–9 PM, $10 off RON and mobile) and Midday Mile (12–4 PM, $10 off RON). After-hours appointments (9 PM–midnight) carry a +$20 surcharge, always disclosed at booking. Docsy+ members are exempt from the after-hours surcharge.",
      },
      {
        q: "Do I get a receipt or invoice?",
        a: "Yes. Every appointment comes with an itemized invoice that separates statutory notary fees from all other service fees — as required by Texas law. All fees on the invoice match the price you saw before you booked.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Check, ACH/wire transfer (preferred — no fee), credit or debit card (3% processing fee), and Zelle.",
      },
    ],
  },
  {
    category: "Identification",
    items: [
      {
        q: "What ID do I need?",
        a: "A valid, unexpired, government-issued photo ID. That means: U.S. driver's license, state-issued ID, U.S. passport or passport card, U.S. military ID, or Permanent Resident Card (Green Card). Expired ID = no notarization. No exceptions.",
      },
      {
        q: "My name on the document doesn't match my ID. What do I do?",
        a: "If your name has changed due to marriage, divorce, or any other reason, bring documentation proving the name change (marriage certificate, court order, etc.). Without it, we may not be able to complete the notarization.",
      },
      {
        q: "Can someone else present their ID for me?",
        a: "No. You must be physically present (or on camera for RON) and present your own ID. We can't notarize a signature we didn't witness, and we can't accept an ID for someone who isn't there.",
      },
    ],
  },
  {
    category: "Apostille",
    items: [
      {
        q: "What is an apostille and do I need one?",
        a: "An apostille is a certificate that makes your US document legally recognized in other countries that are part of the Hague Convention. If you're using a US document abroad — for immigration, education, business, marriage, or anything official — you almost certainly need one.",
      },
      {
        q: "What documents can be apostilled?",
        a: "Any Texas-origin document or document notarized by a Texas notary. Common ones: birth certificates, marriage licenses, divorce decrees, death certificates, diplomas, transcripts, powers of attorney, business documents. Federal documents (like FBI background checks) require USDOS apostille — Docsy handles those too at $275.",
      },
      {
        q: "Can I send a photocopy?",
        a: "No. For recordable documents (birth certificates, marriage licenses, etc.) you need a certified copy issued by the county or state — not a personal copy or scan. For other documents, the original notarized document is required. When in doubt, use the free Pre-Check service before sending anything.",
      },
      {
        q: "How long does an apostille take?",
        a: "Standard: 3–5 business days. Next-Day Rush: if received by 11 AM. Same-Day Sprint: mobile pickup only, returned same day or via FedEx overnight. Federal/USDOS: 2–3 weeks standard.",
      },
    ],
  },
  {
    category: "Loan Signing",
    items: [
      {
        q: "What does a loan signing agent do?",
        a: "A certified loan signing agent facilitates the signing of mortgage and real estate documents on behalf of a title company or lender. Docsy verifies your identity, witnesses your signatures on the loan package, notarizes the documents that require it, and returns the package — including scanbacks — to the title company immediately on completion.",
      },
      {
        q: "Do I need to bring anything to the signing?",
        a: "Valid, unexpired, government-issued photo ID — for both signers if it's a joint signing. The name on your ID should match the name on the loan documents. If there's a discrepancy, notify your lender or title company before the appointment, not during.",
      },
      {
        q: "Can I pre-sign the documents before the notary arrives?",
        a: "No. Do not sign anything before the signing agent arrives. The agent must witness every signature on the loan documents. Pre-signing voids the notarized documents and will require a re-signing — which delays your closing.",
      },
      {
        q: "How long does a loan signing take?",
        a: "Most signings take 45–75 minutes. HELOC packages and reverse mortgage packages may take longer. Clear at least 90 minutes to be safe. There is no rush — the signing is complete when it's complete.",
      },
      {
        q: "What are your loan signing fees?",
        a: "Seller packages: $100. Buyer/refinance packages: $150. HELOC: $175. Reverse mortgage: $225. Scanbacks are always included. After-hours and weekend availability varies — contact us to confirm.",
      },
    ],
  },
  {
    category: "Court Reporting",
    items: [
      {
        q: "What is digital court reporting?",
        a: "Digital court reporting uses certified audio recording equipment to capture the full verbatim record of a deposition, then produces a certified transcript from that recording. Docsy reporters are AAERT certified. The resulting transcript carries the same legal weight as traditional stenographic transcripts.",
      },
      {
        q: "What's included in the transcript?",
        a: "The $4.75/page rate includes: word index, certified PDF, and e-transcript ASCII file. These are standard inclusions — not add-ons. No hidden fees for files that agencies typically charge extra for.",
      },
      {
        q: "How quickly are transcripts delivered?",
        a: "Standard turnaround is 30 days. Rush delivery is available — contact Docsy to confirm availability and pricing before scheduling.",
      },
      {
        q: "What are the payment terms for court reporting?",
        a: "All court reporting orders — appearance-only and transcript orders — are NET-14. Transcript orders require a 50% deposit at scheduling. The remaining balance is due within 14 days of completion. Corporate accounts with NET-30 terms are available upon request.",
      },
      {
        q: "Can you report remote depositions?",
        a: "Yes. Docsy supports fully remote depositions via Zoom, Teams, and other video platforms. A tech check is included at no charge. Oath administration, exhibit marking, and transcript production work identically to in-person depositions.",
      },
    ],
  },
  {
    category: "Memberships",
    items: [
      {
        q: "What is Docsy+?",
        a: "Docsy+ is a monthly or annual membership that gives you free notarizations, priority booking, after-hours access without surcharge, and other perks depending on your tier. Plans start at $15/month for Starter. Pro ($30/month) and Elite ($49/month) include more free notarizations, a birthday bonus notarization, and extended access windows.",
      },
      {
        q: "What's the difference between Docsy+ and Docsy Safe+?",
        a: "Docsy+ is a service membership with perks — priority access, free notarizations, after-hours access. Docsy Safe+ is a document storage subscription — an encrypted vault that stores every deliverable from every Docsy appointment automatically. They are separate products. You can have one, both, or neither.",
      },
      {
        q: "Can I stack my Docsy+ discount with other promotions?",
        a: "Yes. Docsy+ discounts stack with time-window promotions (Night Shift Seal, Midday Mile, Early Bird), HonorPass, and most other active promotions. Stacking rules are listed on the Promotions page — no asterisks, no surprises.",
      },
      {
        q: "What happens to my unused notarization credits if I cancel?",
        a: "Credits roll over within the same plan cycle. They do not roll over after cancellation. If you cancel mid-month or mid-year, unused credits are forfeited. Annual plan cancellations made 30+ days before renewal are eligible for a prorated refund. Cancellations within 30 days of renewal are non-refundable.",
      },
      {
        q: "Is there an annual plan option?",
        a: "Yes. Annual plans are available for all Docsy+ tiers at a 15% discount versus monthly pricing. You pay annually upfront. If you cancel 30+ days before your renewal date, you're eligible for a prorated refund for the unused period.",
      },
    ],
  },
  {
    category: "Legal Notices",
    items: [
      {
        q: "Are you a lawyer?",
        a: "No. Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only. For questions about what a document means, whether it's legally sufficient, or whether it meets a specific requirement — consult a licensed attorney.",
      },
      {
        q: "What if my document is rejected after apostille?",
        a: "Docsy offers a free Pre-Check service to review your document before filing and confirm it qualifies. If you use the Pre-Check and your document is rejected due to something outside our control, we'll help you understand the next steps. If rejection was due to Docsy's error, we'll make it right.",
      },
    ],
  },
];

export default function FAQ() {
  React.useEffect(() => {
    document.title = "FAQ | Docsy Services";
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              The questions we
              <br />
              get asked every day.
              <br />
              <HI>Answered honestly.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Real questions. Real answers. No "please consult a professional for more information" non-answers.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-3xl mx-auto">
          {faqs.map((section, si) => (
            <FadeIn key={section.category} delay={si * 60} threshold={0.05}>
            <div className="mb-16">
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
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Still have a question?
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 mb-8">Text us. We'll tell you straight — no runaround.</p>
          </FadeIn>
          <FadeIn delay={160}>
            <Link href="/help-center" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
              Help Center
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
