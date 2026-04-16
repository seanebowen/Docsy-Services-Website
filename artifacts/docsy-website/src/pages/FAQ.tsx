import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link, useParams } from "wouter";
import { ChevronLeft, Upload, ScanLine, FileCheck, Video, MapPin, Package, Globe, FileText, Receipt, HelpCircle, FileSignature } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";
const BLUE = "#4D9FDB";
const DIV = "#1e2a3a";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const faqs = [
  {
    category: "General",
    items: [
      { q: "How much does a notary cost?", a: "It depends on the service. RON starts at $25 for the first notarization. Mobile notary visits start at $30 travel + the statutory notary fee ($10 for the first signature under Texas law). Apostilles start at $165 all-inclusive. Loan signings start at $100 for a seller package. You know your exact price before you confirm — always. Nothing starts until the number is agreed on." },
      { q: "Do you come to my location?", a: "Yes. Docsy mobile notary serves the San Antonio metro area with four travel tiers based on distance. We also go to hospitals, nursing homes, assisted living facilities, and hospice locations. For documents that don't require in-person presence, RON is available nationwide." },
      { q: "Are you available on weekends and after hours?", a: "Yes. Docsy is available 7 days a week, 7 AM to 11 PM. General hours are 9 AM–9 PM. Docsy+ members get extended access from 7 AM–9 AM and 9 PM–11 PM. Time-window promotions apply on weekdays automatically: Night Shift Seal (6–9 PM, $10 off RON) and Midday Miles (12–4 PM, $10 off mobile notary). Weekend Warrior applies on Saturdays and Sundays for loan signing appointments (20% off). After-hours appointments (9 PM–11 PM) carry a +$20 surcharge for non-members, always disclosed at booking." },
      { q: "Do I get a receipt or invoice?", a: "Yes. Every appointment comes with an itemized invoice that separates statutory notary fees from all other service fees — as required by Texas law. All fees on the invoice match the price you saw before you booked." },
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
      { q: "How long does an apostille take?", a: "Standard: 3–5 business days. Next-Day Rush: if received by 11 AM. Same-Day Sprint: mobile pickup only, returned same day or via FedEx overnight. Federal/USDOS: 2–3 weeks standard." },
    ],
  },
  {
    category: "Loan Signing",
    items: [
      { q: "What does a loan signing agent do?", a: "A certified loan signing agent facilitates the signing of mortgage and real estate documents on behalf of a title company or lender. Docsy verifies your identity, witnesses your signatures on the loan package, notarizes the documents that require it, and returns the package — including scanbacks — to the title company immediately on completion." },
      { q: "Do I need to bring anything to the signing?", a: "Valid, unexpired, government-issued photo ID — for both signers if it's a joint signing. The name on your ID should match the name on the loan documents. If there's a discrepancy, notify your lender or title company before the appointment, not during." },
      { q: "Can I pre-sign the documents before the notary arrives?", a: "No. Do not sign anything before the signing agent arrives. The agent must witness every signature on the loan documents. Pre-signing voids the notarized documents and will require a re-signing — which delays your closing." },
      { q: "How long does a loan signing take?", a: "Most signings take 45–75 minutes. HELOC packages and reverse mortgage packages may take longer. Clear at least 90 minutes to be safe. There is no rush — the signing is complete when it's complete." },
      { q: "What are your loan signing fees?", a: "Seller packages: $100. Buyer/refinance packages: $150. HELOC: $175. Reverse mortgage: $225. Scanbacks are always included. After-hours and weekend availability varies — contact us to confirm." },
    ],
  },
  {
    category: "Electronic Reporting",
    items: [
      { q: "What is electronic reporting?", a: "Electronic reporting uses certified digital capture equipment to record the full verbatim record of a deposition, EUO, board meeting, arbitration, or similar proceeding, then produces a certified transcript from that record. Docsy reporters are AAERT certified. The resulting transcript carries the same legal weight as traditional stenographic transcripts." },
      { q: "What's included in the transcript?", a: "The $8.50/page Standard rate includes: word index, certified PDF, PDF delivery, and e-transcript ASCII file. These are standard inclusions — not add-ons. No hidden fees for files that agencies typically charge extra for." },
      { q: "How quickly are transcripts delivered?", a: "Standard turnaround is 30 days. Rush delivery is available — contact Docsy to confirm availability and pricing before scheduling." },
      { q: "What are the payment terms for electronic reporting?", a: "All electronic reporting payments are NET-14. Appearance-only orders are NET-14 from the date of appearance. Transcript orders require a 50% deposit at scheduling, with the balance due upon transcript delivery — transcripts are not released until payment is complete." },
      { q: "Can you report remote depositions?", a: "Yes. Docsy supports fully remote depositions via Zoom, Teams, and other video platforms. A tech check is included at no charge. Oath administration, exhibit marking, and transcript production work identically to in-person depositions." },
    ],
  },
  {
    category: "Memberships",
    items: [
      { q: "What is Docsy+?", a: "Docsy+ is a monthly or annual membership that gives you free notarizations, priority booking, after-hours access without surcharge, and other perks depending on your tier. Plans start at $15/month for Starter. Pro ($30/month) and Elite ($49/month) include more free notarizations, a birthday bonus notarization, and extended access windows." },
      { q: "What's the difference between Docsy+ and Docsy Safe+?", a: "Docsy+ is a service membership with perks — priority access, free notarizations, after-hours access. Docsy Safe+ is encrypted document storage that holds every deliverable from every Docsy appointment automatically. They are separate products. You can have one, both, or neither." },
      { q: "Can I stack my Docsy+ discount with other promotions?", a: "Yes. Docsy+ discounts stack with time-window promotions (Night Shift Seal, Midday Miles), HonorPass, and most other active promotions. Stacking rules are listed on the Promotions page — no asterisks, no surprises." },
      { q: "What happens to my unused notarization credits if I cancel?", a: "Credits roll over within the same plan cycle. They do not roll over after cancellation. If you cancel mid-month or mid-year, unused credits are forfeited. Annual plan cancellations made 30+ days before renewal are eligible for a prorated refund. Cancellations within 30 days of renewal are non-refundable." },
      { q: "Is there an annual plan option?", a: "Yes. Annual plans are available for all Docsy+ tiers at a 15% discount versus monthly pricing. You pay annually upfront. If you cancel 30+ days before your renewal date, you're eligible for a prorated refund for the unused period." },
    ],
  },
  {
    category: "Legal Notices",
    items: [
      { q: "Are you a lawyer?", a: "No. Docsy Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only. For questions about what a document means, whether it's legally sufficient, or whether it meets a specific requirement — consult a licensed attorney." },
      { q: "What if my document is rejected after apostille?", a: "Docsy offers a free Pre-Check service to review your document before filing and confirm it qualifies. If you use the Pre-Check and your document is rejected due to something outside our control, we'll help you understand the next steps. If rejection was due to Docsy's error, we'll make it right." },
    ],
  },
];

const guides = [
  { id: "how-to-book-ron", icon: Video, title: "How to Book a Remote Online Notarization (RON)", summary: "Step-by-step guide to booking and completing your first RON appointment.",
    content: [
      { heading: "Step 1 — Check your equipment", body: "You need: a device with a working front-facing camera and microphone (laptop, phone, or tablet), a stable internet connection, a valid unexpired government-issued photo ID, and your document accessible as a file or ready to share on screen." },
      { heading: "Step 2 — Book your appointment", body: "Contact Docsy directly. Tell us: what document you need notarized, whether you're available now (same-hour) or need a specific time. You'll know your price before you confirm — always. RON is $25 for the first notarization, $10 for each additional signature in the same session." },
      { heading: "Step 3 — Join the session", body: "Docsy will send a secure video link to your email or phone. Click it at your appointment time. You don't need to install anything — it works in your browser." },
      { heading: "Step 4 — Complete the notarization", body: "The notary will verify your ID on camera. Do NOT sign your document before the session — your signature must happen live in front of the notary. Follow the notary's instructions for signing and dating. The notary will apply the digital seal during the session." },
      { heading: "Step 5 — Receive your documents", body: "You'll receive a certified digital copy via email immediately. If you have Docsy Safe+, the document uploads automatically to your Safe+." },
    ],
  },
  { id: "how-to-book-mobile", icon: MapPin, title: "How to Book a Mobile Notary Visit", summary: "What to do before, during, and after your mobile notary appointment.",
    content: [
      { heading: "Step 1 — Know your location", body: "Tell us the address where you need the notary to come. This can be your home, office, hospital, nursing home, or any other location in our service area. Travel fees are calculated by distance tier (0–10 mi, 11–25 mi, 26–40 mi, 40+ mi)." },
      { heading: "Step 2 — Have your ID ready", body: "Valid, unexpired, government-issued photo ID. No expired IDs. If your name has changed since the ID was issued, bring proof of the name change too." },
      { heading: "Step 3 — Do NOT pre-sign", body: "This is the most common mistake. Do not sign your document before the notary arrives. Your signature must happen in front of the notary. Don't fill in dates early either — the notary will tell you when and where to sign." },
      { heading: "Step 4 — Confirm your appointment", body: "You'll know your full price before the appointment is confirmed. Review it. Make sure you understand all fees. Reply to confirm, and we'll be there." },
      { heading: "Step 5 — Complete and pay", body: "The notary will guide you through signing. You'll receive an itemized invoice after. Payment methods: check, ACH/wire (no fee), card (3% fee), Zelle." },
    ],
  },
  { id: "what-id-is-accepted", icon: FileCheck, title: "What ID Is Accepted for Notarization?", summary: "Exactly what qualifies. No guessing.",
    content: [
      { heading: "Accepted IDs", body: "Valid, unexpired, government-issued photo ID only. Specifically: U.S. driver's license, U.S. state-issued ID card, U.S. passport or passport card, U.S. military ID (active or retired), Permanent Resident Card (Green Card), and some tribal IDs." },
      { heading: "Expired ID", body: "Cannot be accepted. No exceptions. If your ID is expired, the notarization cannot proceed until you have valid ID." },
      { heading: "Foreign passports", body: "Generally accepted for RON with additional identity verification steps. Contact Docsy before booking if you only have a foreign passport." },
      { heading: "Name discrepancies", body: "If the name on your document doesn't match your ID exactly — due to a name change, marriage, divorce, or clerical error — bring documentation proving the name change (marriage certificate, court order, divorce decree). Without it, notarization may not be possible." },
      { heading: "Photographed or scanned IDs", body: "For in-person notarizations, only physical IDs are accepted. For RON, the ID is shown on camera and must be legible, unexpired, and authentic." },
    ],
  },
  { id: "how-to-send-apostille", icon: Upload, title: "How to Send Documents for Apostille", summary: "Original documents only. Here's exactly what to do.",
    content: [
      { heading: "Step 1 — Use the Free Pre-Check", body: "Before sending anything, use Docsy's free Pre-Check service. Text or email us a photo or scan of your document and we'll tell you whether it qualifies, what kind of apostille it needs, and the total cost — before you send anything. This prevents costly mistakes.\n\n📱 Text: (512) 555-0190\n📧 Email: hello@docsynotary.com" },
      { heading: "Step 2 — Get the right copy", body: "For vital records (birth certificates, marriage licenses, death certificates, divorce decrees): you need a certified copy issued by the county or state. Not a personal photocopy. Not a scan. A certified copy with a raised seal or official stamp. For notarized documents: the original signed and notarized document." },
      { heading: "Step 3 — Ship safely", body: "Do not laminate documents. Use a padded mailer or document sleeve. Use a trackable shipping method — we recommend USPS Priority Mail with tracking, or FedEx. Keep your tracking number." },
      { heading: "Step 4 — What happens next", body: "Docsy reviews the document on receipt. If anything is off, we'll contact you immediately. Otherwise we file it at the Texas Secretary of State. You'll receive a digital certified scan the moment it's complete. The original is returned to you via trackable mail." },
    ],
  },
  { id: "how-to-read-your-invoice", icon: Receipt, title: "How to Read Your Docsy Invoice", summary: "Every line item explained.",
    content: [
      { heading: "Statutory Notary Fee", body: "This is the state-regulated notary fee: $10 for the first notarized signature, $1 for each additional signature on the same document. These are set by Texas law and cannot be waived." },
      { heading: "Service Fee", body: "Docsy's fee for the service type: RON session fee, mobile visit coordination, apostille processing, loan signing fee, electronic reporting appearance fee, etc. This is what varies by service and is itemized separately from the statutory notary fee, as required by law." },
      { heading: "Travel Fee (mobile only)", body: "Based on your distance tier from the notary. Listed at booking before you confirm." },
      { heading: "Timing Add-Ons", body: "Rush and after-hours surcharges — only if applicable. Always disclosed at booking. Never added after the fact." },
      { heading: "Discounts Applied", body: "If you booked with a promotion (HonorPass, Night Shift Seal, etc.), it appears as a line item discount. The final total matches the price you saw before booking." },
    ],
  },
  { id: "apostille-what-qualifies", icon: Globe, title: "What Documents Can Be Apostilled?", summary: "A plain-language guide to apostille eligibility.",
    content: [
      { heading: "Texas-origin documents", body: "Any document issued by a Texas authority — birth certificates, marriage licenses, death certificates, divorce decrees, court orders, school transcripts, diplomas, business filings — is eligible for a Texas apostille." },
      { heading: "Documents notarized by a Texas notary", body: "Powers of attorney, affidavits, agreements, or any other document that was signed in front of a Texas notary public can receive a Texas apostille." },
      { heading: "Federal documents", body: "FBI background checks, Social Security documents, federal agency documents — these require a USDOS apostille (not a Texas apostille). Docsy handles federal apostilles at $275." },
      { heading: "What cannot be apostilled", body: "Photocopies, scans, laminated documents, documents from other states (need to apostille in the issuing state), or documents for countries not in the Hague Convention." },
    ],
  },
  { id: "loan-signing-what-to-expect", icon: FileSignature, title: "What to Expect at a Loan Signing", summary: "For borrowers — what to bring and what not to do.",
    content: [
      { heading: "Bring valid ID", body: "Both signers (if applicable) must have valid, unexpired, government-issued photo ID. Check the name on your ID against the loan documents — they should match. If they don't, notify your lender or title company before the appointment." },
      { heading: "Do NOT pre-sign", body: "Do not sign anything before the signing agent arrives. The agent must witness every signature on the loan documents. Pre-signing voids the document and will require a re-signing." },
      { heading: "Clear 60–90 minutes", body: "A typical loan package has 80–150+ pages. Most signings take 45–75 minutes depending on the package size and how many questions come up. HELOC and reverse mortgage signings sometimes take longer." },
      { heading: "The notary can't give legal advice", body: "The signing agent is there to facilitate the signing, not to explain what the loan terms mean. If you have questions about the loan itself, contact your lender before the appointment — not during." },
      { heading: "Scanbacks (title companies)", body: "Docsy returns scanbacks immediately on completion of refinance and buyer packages. You'll have them before the borrowers have left the table." },
    ],
  },
  { id: "docsy-safe-plus", icon: ScanLine, title: "How Docsy Safe+ Works", summary: "Encrypted storage for all Docsy appointment deliverables — included free.",
    content: [
      { heading: "What it is", body: "Docsy Safe+ is encrypted document storage that automatically holds every deliverable from every Docsy appointment. No uploading required. Every RON notarization, every apostille, every loan signing, every electronic reporting session — transcripts included — stored automatically." },
      { heading: "Always included, always free", body: "Safe+ is included free with every Docsy service for every client. No paid tiers, no trial countdown, no upsells. Confirm your booking and an account is created automatically — your files arrive there." },
      { heading: "Access", body: "Access your Safe+ from any device, any time. Download or share documents and transcripts directly from your Safe+ using the email you booked with." },
      { heading: "Member benefits", body: "Active Docsy+ members get extended retention windows on stored files plus priority support on any Safe+-related issue. Membership is optional — Safe+ access itself is free for everyone." },
    ],
  },
  { id: "court-reporting-how-it-works", icon: FileText, title: "How Docsy Electronic Reporting Works", summary: "For attorneys and legal teams — from booking to transcript delivery.",
    content: [
      { heading: "Booking", body: "Contact Docsy at least 48 hours before the deposition when possible. Provide: case name, deposition date and time, location or video platform (Zoom, Teams, etc.), names of witnesses, estimated duration, and whether you need a transcript." },
      { heading: "Appearance", body: "The certified digital reporter arrives at least 10 minutes before the scheduled start. For remote depositions, a tech check is included at no charge. The reporter administers the oath, marks exhibits, and manages the transcript record." },
      { heading: "Transcript delivery", body: "Standard (10-business-day) transcripts are $7.50/page. Rough Draft is $0.75/page, Expedited (5 business days) is $8.50/page, Rush (3 business days) is $12.00/page, certified copies are $2.50/page. Word index, certified PDF, PDF delivery, and e-transcript are always included on certified orders — no separate line items. Transcripts are delivered via secure portal once payment is complete." },
      { heading: "Payment", body: "All payments are NET-14. Appearance-only orders: NET-14 from the date of appearance. Transcript orders: 50% deposit at scheduling; balance due upon transcript delivery. Transcripts are not released until payment is complete." },
    ],
  },
  { id: "what-notaries-cant-do", icon: HelpCircle, title: "What Notaries Can't Do", summary: "Important limitations to know before your appointment.",
    content: [
      { heading: "Notaries can't provide legal advice", body: "A notary's role is ministerial — we verify identity, witness signatures, and apply a seal. We can't tell you whether a document is legally sufficient, whether it meets a specific legal requirement, or what it means. For those questions, consult a licensed attorney." },
      { heading: "Notaries can't notarize documents they have a financial interest in", body: "A notary cannot notarize a document in which they are a named beneficiary, party, or have a financial stake." },
      { heading: "Notaries can't notarize without the signer present", body: "The signer must be physically present (or on camera for RON). No exceptions. We cannot notarize a signature that was already applied, or for someone who isn't there." },
      { heading: "Notaries can't accept expired ID", body: "No matter the circumstances. If your ID is expired, the notarization cannot proceed." },
      { heading: "Notaries can't notarize incomplete documents", body: "Documents with blank spaces that are intended to be filled in cannot be notarized. Every blank space must either be filled in or crossed out and initialed." },
    ],
  },
  { id: "billing-and-payments", icon: Receipt, title: "Billing & Payment Methods", summary: "Every payment option and when it applies.",
    content: [
      { heading: "Payment methods", body: "Check (personal or business), ACH/wire transfer (preferred — no processing fee), credit or debit card (3% processing fee, disclosed before charging), and Zelle (no fee)." },
      { heading: "Know your price before you book", body: "Every appointment is priced before you confirm. The invoice total will match what you saw at booking. If it doesn't, call us." },
      { heading: "Deposit policy", body: "Electronic reporting transcript orders: 50% deposit at scheduling. All other services: no deposit required unless specified." },
      { heading: "When is payment due?", body: "For most services: at or immediately after completion. Electronic reporting: all payments are NET-14 — appearance-only orders run NET-14 from the date of appearance, and transcript orders are due upon transcript delivery (transcripts are not released until payment is complete)." },
      { heading: "Itemized invoices", body: "Every invoice separates the statutory notary fee from the service fee, as required by Texas law. All other charges (travel, rush, timing) are listed separately. No bundled mystery fees." },
    ],
  },
];

function GuideDetail({ guide }: { guide: typeof guides[0] }) {
  return (
    <div className="w-full" style={{ backgroundColor: BG }}>
      <div className="border-b px-5 py-4" style={{ borderColor: DIV }}>
        <Link href="/faq" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to FAQ & Guides
        </Link>
      </div>

      <section className="px-5 pt-14 pb-12 border-b" style={{ borderColor: DIV, backgroundColor: IVORY }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              {guide.title}
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 font-medium">{guide.summary}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="max-w-3xl mx-auto">
          {guide.content.map((section, i) => (
            <FadeIn key={i} delay={i * 80} threshold={0.05}>
              <div className="border-b last:border-b-0 pb-10 mb-10 last:pb-0 last:mb-0" style={{ borderColor: DIV }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: IVORY }}>STEP {String(i + 1).padStart(2, "0")}</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>{section.heading}</h2>
                <p className="text-base text-white/50 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function FAQ() {
  const params = useParams<{ id?: string }>();
  const id = params?.id;
  const guide = id ? guides.find((g) => g.id === id) : null;

  React.useEffect(() => {
    if (guide) {
      document.title = `${guide.title} | FAQ & Guides | Docsy Services`;
    } else {
      document.title = "FAQ & Help Guides | Docsy Services";
    }
  }, [guide]);

  if (guide) return <GuideDetail guide={guide} />;

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              FAQ &
              <br />
              <HI>Help Guides.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium mb-6">
              Real questions, real answers — plus step-by-step guides for every Docsy service. Plain language. No runaround.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-wrap gap-3">
              <a href="#faqs" className="px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "#000" }}>
                Browse FAQs →
              </a>
              <a href="#guides" className="px-6 py-3 text-sm font-bold text-black border-2 border-black">
                Step-by-step guides →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest mb-8 pb-4 border-b" style={{ color: BLUE, borderColor: DIV }}>
              ⊙ Frequently Asked Questions
            </p>
          </FadeIn>
          {faqs.map((section, si) => (
            <FadeIn key={section.category} delay={si * 60} threshold={0.05}>
              <div className="mb-16">
                <p className="text-xs font-bold uppercase tracking-widest mb-6 pb-4 border-b" style={{ color: IVORY, borderColor: DIV }}>
                  {section.category}
                </p>
                <Accordion type="single" collapsible>
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${section.category}-${i}`}
                      className="border-b last:border-b-0"
                      style={{ borderColor: DIV }}
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

      {/* ── Guides ── */}
      <section id="guides" className="py-16 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest mb-8 pb-4 border-b" style={{ color: BLUE, borderColor: DIV }}>
              ⊟ Step-by-Step Guides
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {guides.map((guide, i) => (
              <FadeIn key={guide.id} delay={i * 50} threshold={0.05}>
                <Link
                  href={`/faq/${guide.id}`}
                  className="group block p-8 hover:bg-white/[0.03] transition-colors h-full"
                  style={{ backgroundColor: BG }}
                  data-testid={`guide-link-${guide.id}`}
                >
                  <guide.icon className="h-6 w-6 mb-5 text-white/25 group-hover:text-white/50 transition-colors" />
                  <h3 className="text-base font-black text-white mb-2 leading-tight group-hover:text-white transition-colors">{guide.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{guide.summary}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: IVORY }}>
                    Read guide →
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV, backgroundColor: IVORY }}>
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
            <Link href="/about#contact" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
              Contact us →
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
