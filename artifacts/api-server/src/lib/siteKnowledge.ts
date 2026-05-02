/**
 * Authoritative site knowledge for the Docsy AI chat assistant.
 * All pricing, hours, policies and tier data lives here so the chat
 * never has to guess — it calls tools that read from this module.
 *
 * IMPORTANT: Keep in sync with any pricing or policy changes.
 */

export const CONTACT = {
  phone: "(210) 417-9614",
  email: "hello@docsyservices.com",
  address: "San Antonio, TX (mobile & remote statewide)",
  website: "https://docsyservices.com",
};

export const HOURS = {
  standard: "9 AM – 9 PM, 7 days a week",
  standardNote: "All individual customers (members and non-members) book within standard 9 AM – 9 PM hours. No after-hours surcharges apply.",
  firmExtended: "24/7 RON · Mobile 6 AM – Midnight (7 days) · Dedicated after-hours line",
  firmNote: "Extended priority hours are exclusive to Docsy Business+ Firm accounts.",
  federalHoliday: "Federal holidays carry an additional +$20 surcharge for all clients.",
};

export const SERVICES = {
  RON: {
    name: "Remote Online Notarization (RON)",
    description: "Notarize documents remotely via secure video call. No travel required. Available same day.",
    basePrice: "$25 first notarized signature · $10 each additional",
    basePriceNumeric: { first: 25, additional: 10 },
    duration: "~30 minutes",
    availability: "9 AM – 9 PM, 7 days a week",
    promotions: ["Night Shift Seal: $10 off between 6–9 PM weekdays"],
    bookingKey: "RON",
    notes: "Signer must be in Texas. Valid government-issued ID required. Document must be suitable for RON (not all document types qualify).",
    url: "/booking",
  },
  Mobile_Local: {
    name: "Mobile Notary — Local",
    description: "Notary travels to you within local service area (San Antonio metro).",
    basePrice: "$10 notary fee + $30 travel (local tier)",
    travelTiers: {
      local: "$30 (0–15 miles)",
      standard: "$45 (15–30 miles)",
      extended: "$65 (30–50 miles)",
      longRange: "$85+ (50+ miles)",
    },
    duration: "~60 minutes",
    availability: "9 AM – 8 PM, Mon–Sat",
    promotions: ["Midday Miles: $10 off mobile between 12–4 PM weekdays"],
    bookingKey: "Mobile_Local",
    url: "/booking",
  },
  LoanSigning: {
    name: "Loan Signing (LSA)",
    description: "Certified Signing Agent for mortgage closings, refinances, HELOCs, and real estate loan packages.",
    basePrice: "$150–$200 depending on package size and travel",
    duration: "~90 minutes",
    availability: "9 AM – 9 PM, 7 days a week",
    promotions: ["Weekend Warrior: 20% off loan signings on Saturdays and Sundays"],
    bookingKey: "LSA_Local",
    url: "/booking",
  },
  Apostille: {
    name: "Texas Apostille Service",
    description: "All-inclusive apostille service via Texas Secretary of State. Includes prepaid inbound label, tracked return shipping, and mobile pickup.",
    pricing: {
      standard: "$165 (3–5 business day TX SOS processing)",
      rush: "$215 (Next-Day Rush — document received by 11 AM)",
      sprint: "$240 (Same-Day Sprint — mobile pickup, returned same day or FedEx overnight)",
      federal: "Contact for Federal/USDOS authentication (2–3 week standard)",
    },
    preCheck: "Free apostille pre-check available — confirms document type, destination country, and eligibility before submission.",
    url: "/apostille",
  },
  DocumentCheck: {
    name: "Document Check (Free)",
    description: "Free AI-powered pre-flight review of your document before booking. Identifies missing notarial blocks, incomplete signatures, wrong certificate wording, and other issues that cause rejections.",
    price: "FREE — no booking required",
    url: "/document-check",
    note: "Highly recommended before every notarization appointment. Catches problems that cost clients rescheduling fees.",
  },
  CourtReporting: {
    name: "Court Reporting (Depositions & EUOs)",
    description: "Certified court reporting for depositions and Examinations Under Oath (EUOs).",
    pricing: {
      transcriptStandard: "$8.50/page (standard 30-day delivery)",
      roughDraft: "$0.75/page",
      expedited: "$9.50/page (5 business days)",
      rush: "$12.00/page (3 business days)",
      certifiedCopies: "$2.50/page",
    },
    includes: "Word index, certified PDF, PDF delivery, and e-transcript always included on certified orders — no separate line items.",
    availability: "Mon–Fri, by appointment",
    url: "/court-reporting",
  },
  SafePlus: {
    name: "Docsy Safe+",
    description: "Secure cloud archival of every notarized document. On-demand re-issuance of certified copies. Included with Business+ memberships.",
    pricing: {
      monthly: "$5/month standalone",
      annualNote: "Included free with Business+ Pro and above",
    },
    url: "/safe-vault",
  },
};

export const BUSINESS_PLUS = {
  overview: "Docsy Business+ is a tiered subscription covering individuals (Solo/Pro/Elite) and B2B firms (Firm). All tiers get member discounts on services. Firm tier gets extended priority hours.",
  tiers: {
    Solo: {
      price: "$15/month",
      priceNumeric: 15,
      backendKey: "starter",
      highlights: [
        "5% discount on all services",
        "1 free RON per month",
        "Priority booking queue",
        "Docsy Safe+ document archival",
      ],
    },
    Pro: {
      price: "$30/month",
      priceNumeric: 30,
      backendKey: "pro",
      highlights: [
        "10% discount on all services",
        "3 free RONs per month",
        "Priority booking queue",
        "Docsy Safe+ included",
        "HonorPass promos included",
      ],
    },
    Elite: {
      price: "$49/month",
      priceNumeric: 49,
      backendKey: "elite",
      highlights: [
        "15% discount on all services",
        "Unlimited free RONs",
        "Priority booking queue",
        "Docsy Safe+ included",
        "All active promos included",
        "Dedicated support line",
      ],
    },
    Firm: {
      price: "Custom-quoted",
      backendKey: "firm",
      highlights: [
        "Bulk-booking up to 100 jobs/batch",
        "NET 30 invoicing",
        "Multi-user roster",
        "24/7 RON access",
        "Mobile signings 6 AM – Midnight, 7 days",
        "Dedicated after-hours line",
        "Same-hour response on weekday signings",
        "No after-hours surcharges on firm contract",
        "Volume discounts",
      ],
      applyUrl: "/business#apply",
      note: "Designed for title companies, law firms, lenders, and corporate legal teams.",
    },
  },
  url: "/business",
};

export const PROMOTIONS = [
  { name: "HonorPass", desc: "Military, veterans, first responders: 15% off all services", eligibility: "Active/retired military, veterans, first responders with valid ID" },
  { name: "Night Shift Seal", desc: "Book RON between 6–9 PM on weekdays — $10 off", eligibility: "All customers, automatically applied" },
  { name: "Midday Miles", desc: "Book mobile notary between 12–4 PM weekdays — $10 off", eligibility: "All customers, automatically applied" },
  { name: "Weekend Warrior", desc: "20% off loan signings on Saturdays and Sundays", eligibility: "All customers, automatically applied" },
  { name: "Refer a Friend", desc: "$10 credit when a friend books using your referral code", eligibility: "Existing customers" },
];

export const POLICIES = {
  cancellation: "Cancel or reschedule at any time before your confirmation email is received — no charge. After confirmation, cancellations within 4 hours of the appointment incur a $25 late-cancel fee. No-shows are billed in full.",
  rescheduling: "Free rescheduling up to 4 hours before appointment.",
  refund: "Refunds are issued for: cancelled-by-Docsy appointments (full refund, within 3–5 business days), billing errors (full refund), and same-day technical failure on RON appointments (full refund). Partial refunds at Docsy's discretion for partial service completion.",
  payment: "Payment is required upfront for all consumer bookings. Business+ Firm accounts may qualify for NET 30 invoicing.",
  legalDisclaimer: "Docsy provides notarial services only — not legal advice. Always consult a licensed attorney for legal questions. Docsy does not draft or review legal documents.",
  stateRestrictions: "RON signers must be physically located in Texas at the time of the session. Apostille services are for Texas-issued documents submitted to the Texas Secretary of State (or Federal USDOS for federal documents).",
};

export const DOCUMENT_CHECK_FAQ = [
  { q: "What is the Document Check?", a: "A free AI-powered pre-flight review. Upload your document (PDF or image) and our system checks for missing notarial blocks, incomplete signatures, wrong certificate wording, and other common rejection triggers — before your appointment." },
  { q: "Is the Document Check required?", a: "No, but it's strongly recommended. It catches issues that cause rescheduling fees and wasted trips." },
  { q: "How long does it take?", a: "Usually under 60 seconds." },
  { q: "What can't it check?", a: "The Document Check is not a legal review. It cannot verify the legal sufficiency of contract terms, confirm identity fraud, or guarantee apostille approval. It's a pre-flight screening tool, not a legal opinion." },
];

export const TOP_FAQ = [
  { q: "What ID do I need for a notarization?", a: "A valid, unexpired government-issued photo ID: driver's license, state ID, passport, or military ID. For RON, the ID is verified digitally — no need to hold it up to the camera." },
  { q: "Can I notarize a document for someone in another state?", a: "For RON: the signer must be physically in Texas at the time of the session, but the document can be destined for any state. For mobile/in-person: both the notary and signer must be in Texas." },
  { q: "How fast can I get a RON appointment?", a: "Same-hour RON is often available. Check availability on the booking page." },
  { q: "What documents can't be notarized?", a: "Vital records (birth/death/marriage certificates issued by a government) cannot be notarized — they must be certified copies from the issuing authority. Wills require in-person witnesses in Texas and cannot be done via RON. I-9 employment verification cannot be notarized." },
  { q: "Do I sign before or during the notary session?", a: "DURING. Never sign a document before meeting the notary — the notary must witness your signature (or your acknowledgment of it). Signing beforehand can invalidate the notarization." },
  { q: "What is an apostille?", a: "An apostille is an authentication certificate issued by the Texas Secretary of State that certifies a document's origin for use in countries that are part of the Hague Convention. It's required for documents used internationally — not for domestic use." },
  { q: "How long does an apostille take?", a: "Standard: 3–5 business days (TX SOS processing). Next-Day Rush: if received by 11 AM. Same-Day Sprint: mobile pickup only, returned same day or via FedEx overnight. Federal/USDOS: 2–3 weeks standard." },
  { q: "What is a jurat vs. an acknowledgment?", a: "An acknowledgment certifies that the signer voluntarily signed the document. A jurat certifies that the signer swore an oath and signed in the notary's presence. Many people use the wrong one — the Document Check can help identify which your document needs." },
];

/** Returns a concise text block the LLM can quote verbatim. */
export function buildKnowledgeBlock(): string {
  return `
=== DOCSY SERVICES — AUTHORITATIVE KNOWLEDGE BASE ===

CONTACT
Phone: ${CONTACT.phone} | Email: ${CONTACT.email} | Location: ${CONTACT.address}

HOURS
Standard (all individual customers, members and non-members): ${HOURS.standard}
${HOURS.standardNote}
Business+ Firm accounts: ${HOURS.firmExtended}
Federal holidays: ${HOURS.federalHoliday}

SERVICES & PRICING
1. Remote Online Notarization (RON) — ${SERVICES.RON.basePrice}
   ${SERVICES.RON.description}
   Promotions: ${SERVICES.RON.promotions.join("; ")}

2. Mobile Notary — ${SERVICES.Mobile_Local.basePrice}
   Travel tiers: Local (0–15 mi) $30 · Standard (15–30 mi) $45 · Extended (30–50 mi) $65 · Long range (50+ mi) $85+
   Promotions: ${SERVICES.Mobile_Local.promotions.join("; ")}

3. Loan Signing (LSA) — ${SERVICES.LoanSigning.basePrice}
   ${SERVICES.LoanSigning.description}
   Promotions: ${SERVICES.LoanSigning.promotions.join("; ")}

4. Apostille Service
   Standard: ${SERVICES.Apostille.pricing.standard}
   Next-Day Rush: ${SERVICES.Apostille.pricing.rush}
   Same-Day Sprint: ${SERVICES.Apostille.pricing.sprint}
   ${SERVICES.Apostille.preCheck}

5. Court Reporting (Depositions & EUOs)
   Transcript: $8.50/page standard · Rough draft $0.75/pg · Expedited $9.50/pg · Rush $12/pg
   Mon–Fri by appointment.

6. Document Check — FREE
   ${SERVICES.DocumentCheck.description}
   URL: ${SERVICES.DocumentCheck.url}

DOCSY BUSINESS+ (memberships)
Solo: $15/mo — 5% discount, 1 free RON/month, priority queue, Safe+
Pro: $30/mo — 10% discount, 3 free RONs/month, priority queue, Safe+, promos
Elite: $49/mo — 15% discount, unlimited free RONs, all promos, dedicated support
Firm: Custom — bulk booking (up to 100/batch), NET 30, multi-user roster, extended priority hours (24/7 RON, 6 AM–Midnight mobile), no after-hours surcharges
Memberships page: /business

ACTIVE PROMOTIONS
${PROMOTIONS.map(p => `• ${p.name}: ${p.desc}`).join("\n")}

KEY POLICIES
Cancellation: ${POLICIES.cancellation}
Refunds: ${POLICIES.refund}
Payment: ${POLICIES.payment}
Legal disclaimer: ${POLICIES.legalDisclaimer}
State restrictions: ${POLICIES.stateRestrictions}

BOOKING
All bookings start at /booking — the calculator at /calculate shows estimated pricing before you commit.
Document Check (free, always recommended first): /document-check
`.trim();
}
