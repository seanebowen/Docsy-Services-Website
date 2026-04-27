import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const PolicyCallout = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <div className="border-l-2 pl-4 py-1 my-4 text-[14px] leading-relaxed font-light" style={{ borderColor: "#4D9FDB", color: "rgba(255,255,255,0.7)" }}>
    {children} See the full <Link href={href} className="underline" style={{ color: "#4D9FDB" }}>{label}</Link>.
  </div>
);

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const MUTE  = "rgba(255,255,255,0.55)";
const SOFT  = "rgba(255,255,255,0.42)";

const LAST_UPDATED  = "April 23, 2026";
const EFFECTIVE     = "April 23, 2026";
const COMPANY       = "Docsy Services LLC";
const TRADE_NAME    = "Docsy";
const STATE         = "Texas";
const COUNTY        = "Travis County, Texas";
const PHONE         = "(512) 555-0190";
const EMAIL         = "hello@docsynotary.com";
const LEGAL_EMAIL   = "legal@docsynotary.com";
const PRIVACY_EMAIL = "privacy@docsynotary.com";
const NOTICE_ADDR   = "Docsy Services LLC, Attn: Legal Notices, P.O. Box 12, Austin, TX 78701";

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

interface TocEntry { id: string; n: string; title: string; }

const TOC: TocEntry[] = [
  { id: "introduction",        n: "01", title: "Introduction & Acceptance of Terms" },
  { id: "services-overview",   n: "02", title: "Services Overview" },
  { id: "appointments",        n: "03", title: "Appointments & Scheduling" },
  { id: "cancellation",        n: "04", title: "Cancellation & Rescheduling Policy" },
  { id: "pricing",             n: "05", title: "Pricing, Fees & Payment Terms" },
  { id: "safe-plus",           n: "06", title: "Docsy Safe+ Membership Terms" },
  { id: "refunds",             n: "07", title: "Refund Policy" },
  { id: "documents",           n: "08", title: "Document Requirements & Customer Responsibilities" },
  { id: "ron",                 n: "09", title: "Remote Online Notarization (RON) — Specific Terms" },
  { id: "apostille",           n: "10", title: "Apostille Services — Specific Terms" },
  { id: "court-reporting",     n: "11", title: "Court Reporting — Specific Terms" },
  { id: "loan-signing",        n: "12", title: "Loan Signing — Specific Terms" },
  { id: "ip",                  n: "13", title: "Intellectual Property" },
  { id: "privacy",             n: "14", title: "Privacy & Data Use" },
  { id: "liability",           n: "15", title: "Limitation of Liability" },
  { id: "indemnification",     n: "16", title: "Indemnification" },
  { id: "arbitration",         n: "17", title: "Dispute Resolution & Arbitration" },
  { id: "accessibility",       n: "18", title: "Accessibility & Non-Discrimination" },
  { id: "termination",         n: "19", title: "Termination of Service" },
  { id: "contact",             n: "20", title: "Contact & Legal Notices" },
];

/* ─── Section building blocks ─────────────────────────── */

const SectionHeader = ({ entry }: { entry: TocEntry }) => (
  <div className="mb-6 pb-4 border-b" style={{ borderColor: DIV }}>
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: BLUE }}>Section {entry.n}</p>
    <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: IVORY, letterSpacing: "-0.02em" }}>
      {entry.title}
    </h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed font-light mb-4" style={{ color: MUTE }}>{children}</p>
);

const SubH = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-bold uppercase tracking-[0.12em] mt-8 mb-3" style={{ color: IVORY }}>{children}</h3>
);

const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2 mb-4 pl-5">
    {items.map((it, i) => (
      <li key={i} className="text-[15px] leading-relaxed font-light list-disc" style={{ color: MUTE }}>{it}</li>
    ))}
  </ul>
);

const Section = ({ entry, children }: { entry: TocEntry; children: React.ReactNode }) => (
  <section id={entry.id} className="scroll-mt-24 mb-16">
    <FadeIn delay={0}>
      <SectionHeader entry={entry} />
    </FadeIn>
    <FadeIn delay={60}>
      <div>{children}</div>
    </FadeIn>
  </section>
);

/* ════════════════════════════════════════════════════════ */
export default function Terms() {
  const [active, setActive] = useState<string>(TOC[0].id);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    document.title = "Terms of Service | Docsy Services";
  }, []);

  /* Highlight active TOC entry as user scrolls. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Scroll to deep-linked section on mount (e.g. /terms#privacy from footer). */
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    if (!TOC.some(e => e.id === hash)) return;
    const el = document.getElementById(hash);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(hash);
    });
  }, []);

  const handleTocClick = (id: string) => {
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
    setActive(id);
  };

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5 text-black/55">⊙ Legal · Terms of Service</p>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
              Terms of <HI>Service.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xl sm:text-2xl text-black/55 max-w-3xl font-medium leading-snug">
              The agreement between you and {TRADE_NAME} when you use the site, book a service, or carry a Safe+ membership. Plain English first, full legal terms below.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-wrap gap-3 mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-black/55">
              <span className="px-3 py-2 border-2 border-black">Last Updated: {LAST_UPDATED}</span>
              <span className="px-3 py-2 border-2 border-black/30">Effective: {EFFECTIVE}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Plain-English Summary ── */}
      <section className="px-5 py-14 sm:py-16 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <Label icon="⊙" text="WHAT THIS MEANS FOR YOU" />
          <FadeIn delay={80}>
            <div className="border-2 p-6 sm:p-8" style={{ borderColor: BLUE, backgroundColor: "rgba(77,159,219,0.06)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: IVORY }}>
                When you book a notary, signing, apostille, or court reporting job with {TRADE_NAME}, you are hiring a Texas-based professional services company to perform a specific task. You agree to bring valid ID, accurate documents, and pay the quoted price. We agree to show up on time, perform the service correctly, and tell you about anything that affects your appointment before we charge you. <HI>Docsy is not a law firm and does not give legal advice.</HI> If you bought (or didn't opt out of) a Safe+ membership, it renews until you cancel — Safe+ is an ongoing benefit, not a trial. Cancel any service at least 24 hours before your appointment for a full refund; less than that and a fee may apply. Disputes go through binding arbitration in {STATE}, except for small claims. The full terms below cover every detail — please read them.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body: TOC + Sections ── */}
      <section className="px-5 py-12 sm:py-16 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">

          {/* ── Mobile TOC toggle ── */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileTocOpen(o => !o)}
              className="w-full flex justify-between items-center px-4 py-3 border-2 text-sm font-bold uppercase tracking-[0.16em]"
              style={{ borderColor: BLUE, color: BLUE }}
              data-testid="terms-toc-toggle"
              aria-expanded={mobileTocOpen}
              aria-controls="terms-mobile-toc"
            >
              <span>⊙ Jump to section</span>
              <span>{mobileTocOpen ? "−" : "+"}</span>
            </button>
            {mobileTocOpen && (
              <ol id="terms-mobile-toc" aria-label="Table of contents" className="mt-3 border" style={{ borderColor: DIV }}>
                {TOC.map(e => (
                  <li key={e.id}>
                    <button
                      onClick={() => handleTocClick(e.id)}
                      className="w-full text-left flex gap-3 px-4 py-2.5 border-b text-[13px] font-light hover:bg-white/5"
                      style={{ borderColor: DIV, color: MUTE }}
                    >
                      <span style={{ color: SOFT }}>{e.n}</span>
                      <span>{e.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* ── Sticky desktop TOC ── */}
          <aside className="hidden lg:block" aria-label="Table of contents">
            <div className="sticky top-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: SOFT }}>⊙ Contents</p>
              <ol className="space-y-1.5 border-l" style={{ borderColor: DIV }}>
                {TOC.map(e => {
                  const isActive = active === e.id;
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => handleTocClick(e.id)}
                        aria-current={isActive ? "true" : undefined}
                        className="w-full text-left pl-4 py-1.5 -ml-px border-l-2 transition-colors"
                        style={{
                          borderColor: isActive ? BLUE : "transparent",
                          color: isActive ? IVORY : SOFT,
                        }}
                      >
                        <span className="text-[10px] font-bold tracking-widest mr-2" style={{ color: isActive ? BLUE : "rgba(255,255,255,0.25)" }}>{e.n}</span>
                        <span className="text-[13px] font-light">{e.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8 pt-6 border-t text-[11px] font-light leading-relaxed" style={{ borderColor: DIV, color: SOFT }}>
                Questions about these terms?<br />
                <a href={`mailto:${LEGAL_EMAIL}`} className="underline hover:text-white" style={{ color: BLUE }}>{LEGAL_EMAIL}</a>
              </div>
            </div>
          </aside>

          {/* ── Sections ── */}
          <main className="min-w-0 max-w-3xl">

            {/* 01 ────────────────────────────────── */}
            <Section entry={TOC[0]}>
              <P>
                These Terms of Service (the “Terms”) form a binding agreement between you (“you,” “your,” or “Customer”) and {COMPANY}, a {STATE} limited liability company doing business as {TRADE_NAME} (“{TRADE_NAME},” “we,” “us,” or “our”). They govern your access to and use of the {TRADE_NAME} website, the booking and price calculator tools, and every service we provide — including General Notary Work, Remote Online Notarization, Court Reporting, Loan Signing, Apostille, Mobile Notary services, the Docsy Safe+ membership, and any related features.
              </P>
              <P>
                By using the site, creating an account, requesting a quote, booking an appointment, or otherwise engaging our services, you acknowledge that you have read, understood, and agreed to these Terms and to our Privacy Policy. If you do not agree, do not use the site or our services.
              </P>
              <SubH>Eligibility</SubH>
              <P>
                You must be at least 18 years old and legally capable of entering into a contract under {STATE} law to use our services. If you are booking on behalf of a business, you represent that you have authority to bind that business to these Terms. Notarial acts may be performed for minors and other parties as permitted by law, but the booking party must be an adult with contracting capacity.
              </P>
              <SubH>Updates to These Terms</SubH>
              <P>
                We may update these Terms from time to time. The “Last Updated” date at the top of this page reflects the most recent revision. For material changes — including changes to pricing, refunds, arbitration, or membership terms — we will provide reasonable advance notice by email (to the address on file), an in-site banner, or both, at least thirty (30) days before the change takes effect. Continued use of the site or services after the effective date of an update constitutes acceptance of the updated Terms.
              </P>
            </Section>

            {/* 02 ────────────────────────────────── */}
            <Section entry={TOC[1]}>
              <P>
                {TRADE_NAME} is a multi-division professional services company offering the following services. Specific terms for each service are set out in later sections.
              </P>
              <UL items={[
                <><strong style={{ color: IVORY }}>General Notary Work (GNW) — Mobile.</strong> In-person notarization of acknowledgments, jurats, copy certifications, and similar acts performed by a commissioned {STATE} notary at the customer's chosen location.</>,
                <><strong style={{ color: IVORY }}>Remote Online Notarization (RON).</strong> Notarization conducted via secure live audio-visual session under {STATE} Government Code Chapter 406, Subchapter C, available nationwide where the underlying transaction permits.</>,
                <><strong style={{ color: IVORY }}>Mobile Notary Services.</strong> Travel-based notarization at homes, offices, hospitals, nursing facilities, and other locations within our service area.</>,
                <><strong style={{ color: IVORY }}>Loan Signing Services.</strong> Notarial acts performed by a certified loan signing agent in connection with refinances, purchases, HELOCs, sellers' packages, and similar transactions, on behalf of the customer or the customer's title company or lender.</>,
                <><strong style={{ color: IVORY }}>Apostille Services.</strong> Document preparation, state-level submission, and tracked return of documents authenticated under the Hague Apostille Convention via the {STATE} Secretary of State.</>,
                <><strong style={{ color: IVORY }}>Court Reporting & Electronic Reporting.</strong> AAERT-certified electronic reporting and transcription for depositions, examinations under oath, arbitrations, and similar proceedings.</>,
                <><strong style={{ color: IVORY }}>Docsy Safe+ Membership.</strong> An ongoing document-archive and member-benefit program included with eligible bookings unless the customer opts out at checkout (see Section 06).</>,
                <><strong style={{ color: IVORY }}>Site Tools.</strong> The price calculator, booking flow, payment processing, ID.me–powered HonorPass discount, promotional codes, and account features available on the {TRADE_NAME} website.</>,
              ]} />
              <SubH>Not Legal Advice</SubH>
              <P>
                {TRADE_NAME} is not a law firm. We do not draft, select, or interpret legal documents, and we do not provide legal, tax, immigration, or financial advice. Our notaries and signing agents act in a ministerial capacity only — verifying identity, witnessing signatures, administering oaths, and performing other authorized notarial acts. If you need legal advice, consult a licensed attorney.
              </P>
              <SubH>Geographic Availability</SubH>
              <P>
                Mobile, in-person GNW, and Loan Signing services are limited to our published {STATE} service area, with travel beyond that area available by quote. RON services are available to signers physically located anywhere in the United States, subject to the requirements of {STATE} law and the law of the state where the document will be used. Apostille services are limited to documents authenticated by the {STATE} Secretary of State; for documents originating in other states or for U.S. State Department authentications, we may decline or refer the matter. Court Reporting is available in {STATE} and remotely nationwide where permitted.
              </P>
            </Section>

            {/* 03 ────────────────────────────────── */}
            <Section entry={TOC[2]}>
              <SubH>How Appointments Are Booked</SubH>
              <P>
                Appointments may be booked through the price calculator and booking flow on the {TRADE_NAME} website, by phone at {PHONE}, or by email at {EMAIL}. Booking is complete when (a) you receive a confirmation message from {TRADE_NAME} that includes your service, date, time, location (or RON link), and price; and (b) any required deposit or upfront payment has been processed.
              </P>
              <SubH>Confirmations & Reminders</SubH>
              <P>
                You will receive an email confirmation immediately after booking and a reminder by email and/or text the day before your appointment (unless you have opted out of reminders). It is your responsibility to add the appointment to your calendar and to keep your contact information current. Failure to receive a reminder does not excuse a no-show.
              </P>
              <SubH>Customer Responsibility for Accurate Information</SubH>
              <P>
                You are responsible for providing accurate and complete information at the time of booking, including the correct service type, number of signers, number of seals, document type, signing location, and any access instructions (gate codes, suite numbers, hospital floors, etc.). If incorrect information results in additional travel, time, signers, or seals, additional fees will apply at the rates published in Section 05 and disclosed before charges are processed where reasonably possible.
              </P>
              <SubH>Late Arrival</SubH>
              <P>
                For mobile and in-person services, our notary will wait up to fifteen (15) minutes past the appointment start time. After fifteen minutes, the appointment may be treated as a no-show under the policy below, or rescheduled at our discretion with an additional travel fee. For RON sessions, the notary will remain in the session for fifteen (15) minutes past the start time before treating it as a no-show.
              </P>
              <SubH>No-Show Policy</SubH>
              <P>
                If you fail to attend a confirmed appointment without cancelling at least 24 hours in advance, a no-show fee equal to fifty percent (50%) of the quoted service price (or a minimum of $40) will apply. For mobile and loan signing appointments, the full quoted travel fee is also retained because travel time was already committed. Repeated no-shows may result in a requirement to prepay future appointments in full or, at our discretion, termination of service under Section 19.
              </P>
            </Section>

            {/* 04 ────────────────────────────────── */}
            <Section entry={TOC[3]}>
              <SubH>Cancellation Window</SubH>
              <P>
                You may cancel a confirmed appointment at no charge by giving at least twenty-four (24) hours' notice before the scheduled start time. Notice must be given by phone, text, or email to the contact information in Section 20.
              </P>
              <SubH>Late Cancellation Fees</SubH>
              <UL items={[
                <>Cancellation between 24 hours and 2 hours before the appointment: a fee equal to twenty-five percent (25%) of the quoted service price (minimum $20) plus any non-refundable third-party costs already incurred (e.g., RON platform fees, state apostille fees).</>,
                <>Cancellation less than 2 hours before the appointment, or after the notary has departed for a mobile or loan signing appointment: a fee equal to fifty percent (50%) of the quoted service price plus the full quoted travel fee, plus any non-refundable third-party costs.</>,
                <>Court reporting appointments cancelled within 48 hours of the scheduled deposition are subject to a cancellation fee of $150 plus any non-refundable third-party costs (videographer, interpreter, conference space).</>,
              ]} />
              <SubH>Rescheduling</SubH>
              <P>
                You may reschedule a confirmed appointment without charge by giving at least 24 hours' notice. Rescheduling within the late-cancellation window is treated as a cancellation followed by a new booking, but the cancellation fee will be waived if the new appointment is booked within seven (7) days of the original date and is honored. An appointment may be rescheduled up to two (2) times under this courtesy; further rescheduling requires a new booking and payment in full.
              </P>
              <SubH>Emergency & Exception Handling</SubH>
              <P>
                We understand that medical emergencies, hospitalizations, deaths in the family, severe weather, and similar events occur. If you contact us as soon as reasonably possible and provide a brief explanation, we will, in good faith, waive late-cancellation and no-show fees on a case-by-case basis. This waiver is at our discretion and is not a contractual right; we reserve the right to require reasonable documentation.
              </P>
              <SubH>Non-Refundable Items</SubH>
              <P>
                Certain charges are non-refundable once incurred regardless of cancellation timing. These include: state-paid apostille and certification fees; ID.me identity verification fees; third-party RON platform per-session fees that have been triggered; expedited shipping that has been dispatched; interpreter or videographer minimums committed to a third party; and any portion of a service that has already been rendered.
              </P>
            </Section>

            {/* 05 ────────────────────────────────── */}
            <Section entry={TOC[4]}>
              <SubH>Base Service Fees</SubH>
              <P>
                Base service fees are the prices published in our price calculator and on individual service pages, and are quoted to you in writing before you confirm a booking. Quoted prices are honored for thirty (30) days from the date of the quote unless we notify you in writing of a change.
              </P>
              <SubH>Per-Signer & Per-Seal Add-Ons</SubH>
              <UL items={[
                <><strong style={{ color: IVORY }}>RON — additional signer (same session):</strong> $5 per additional signer beyond the first.</>,
                <><strong style={{ color: IVORY }}>RON — additional seal (same session):</strong> $5 per additional notarial seal beyond the first.</>,
                <><strong style={{ color: IVORY }}>Mobile General Notary Work — additional signer (same session):</strong> $1 per additional signer beyond the first.</>,
                <><strong style={{ color: IVORY }}>Mobile General Notary Work — additional seal (same session):</strong> $5 per additional notarial seal beyond the first.</>,
                <>Additional signers or seals not disclosed at booking will be charged at the published rates above when the work is completed, and will appear as separate line items on your invoice.</>,
              ]} />
              <SubH>Other Surcharges</SubH>
              <UL items={[
                <><strong style={{ color: IVORY }}>Travel beyond included radius:</strong> charged per the published travel-tier table at the time of quote.</>,
                <><strong style={{ color: IVORY }}>After-hours surcharge:</strong> in-person services scheduled between 9:00 PM and 11:00 PM carry a $20 surcharge (waived for active Docsy+ members).</>,
                <><strong style={{ color: IVORY }}>Federal holiday surcharge:</strong> $20 added to in-person services performed on federal holidays.</>,
                <><strong style={{ color: IVORY }}>Re-trip / re-sign fee:</strong> see Section 12 for loan signing.</>,
                <><strong style={{ color: IVORY }}>Court reporting overtime:</strong> $100 per hour beyond the booked duration.</>,
              ]} />
              <SubH>Accepted Payment Methods</SubH>
              <P>
                We accept all major credit and debit cards processed by our PCI-compliant payment provider, ACH transfers for invoiced corporate accounts, and (where pre-arranged) certified business checks. We do not accept cash for online bookings; cash may be accepted in-person at the discretion of the notary, with a written receipt issued.
              </P>
              <SubH>When Payment Is Due</SubH>
              <UL items={[
                <><strong style={{ color: IVORY }}>RON, GNW, Mobile Notary, Loan Signing, Apostille:</strong> payment is due in full at the time of booking unless you carry an invoiced corporate account.</>,
                <><strong style={{ color: IVORY }}>Court Reporting:</strong> billed after the deposition is complete on standard NET-15 invoicing terms; no upfront payment required.</>,
                <><strong style={{ color: IVORY }}>Docsy Safe+ Membership:</strong> billed monthly or annually as elected at enrollment (see Section 06).</>,
                <><strong style={{ color: IVORY }}>Corporate accounts:</strong> NET 30 from invoice date; late balances accrue interest at 1.5% per month or the maximum rate permitted by law, whichever is lower.</>,
              ]} />
              <SubH>Disputed Charges</SubH>
              <P>
                If a charge on your invoice does not match what you were quoted, contact <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a> within thirty (30) days of the charge with your invoice number, the line item in question, and the original quote. We will investigate and respond within ten (10) business days. Initiating a chargeback with your card issuer before contacting us may delay resolution; we reserve the right to suspend services for accounts with unresolved chargebacks.
              </P>
              <SubH>Taxes & Surcharges</SubH>
              <P>
                Notarial fees themselves are exempt from {STATE} sales tax under current {STATE} law. Travel, copying, mailing, and certain ancillary services may be subject to state and local sales tax, which will be itemized on your invoice when applicable. Government fees (apostille, certification) are pass-through charges and are itemized separately.
              </P>
            </Section>

            {/* 06 ────────────────────────────────── */}
            <Section entry={TOC[5]}>
              <SubH>What Safe+ Includes</SubH>
              <P>
                Docsy Safe+ is an ongoing membership benefit that provides each member with: secure cloud archival of every notarized document and signing record processed through {TRADE_NAME}; on-demand re-issuance of certified copies where permitted by law; a member-only discount on covered services as published on the Memberships page; priority booking windows; waived after-hours surcharges for in-person services; and other benefits {TRADE_NAME} may add from time to time.
              </P>
              <SubH>Enrollment — Included Unless You Opt Out</SubH>
              <P>
                Safe+ is automatically included with eligible bookings. You may opt out at the checkout step by unchecking the Safe+ option, by toggling membership off in your account settings before your first billing date, or by contacting us at {EMAIL}. <strong style={{ color: IVORY }}>Safe+ is not a trial.</strong> It is a standing, ongoing membership benefit. We do not use trial language because there is no scheduled conversion event — Safe+ is the program itself, billed and renewing on the cycle you select.
              </P>
              <SubH>How To Opt Out</SubH>
              <UL items={[
                <>At booking: uncheck the Safe+ option on the booking summary or payment page.</>,
                <>After booking, before first bill: toggle Safe+ off in Account → Membership at any time before your first billing date for a full reversal.</>,
                <>Anytime: email <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a> or call {PHONE}. Cancellation takes effect at the end of the current billing period.</>,
              ]} />
              <SubH>Billing Cycle & Renewal</SubH>
              <P>
                Safe+ is offered on monthly and annual billing cycles at the price displayed on the Memberships page at the time you enroll. Your card on file is charged on the same calendar day each cycle. Membership renews automatically until cancelled. We will notify you by email at least seven (7) days before any price change takes effect on a renewal, and you may cancel at no charge before that change applies.
              </P>
              <SubH>Cancellation of Membership</SubH>
              <P>
                You may cancel your Safe+ membership at any time. Cancellation takes effect at the end of the current paid billing period; you retain full member benefits until that date. We do not pro-rate partial periods. Annual members who cancel within thirty (30) days of initial enrollment may request a pro-rated refund of unused months at our discretion.
              </P>
              <SubH>What Happens to Benefits On Cancellation</SubH>
              <UL items={[
                <>You will retain read-only download access to documents archived in your Safe+ for sixty (60) days after cancellation, after which the archive will be sealed and accessible only by written request and re-instatement of membership.</>,
                <>Member-only discounts, priority booking, and waived surcharges end on the cancellation effective date.</>,
                <>Documents you previously received from us (signed, notarized, apostilled, transcribed) remain yours regardless of membership status.</>,
              ]} />
            </Section>

            {/* 07 ────────────────────────────────── */}
            <Section entry={TOC[6]}>
              <SubH>When Refunds Are Issued</SubH>
              <UL items={[
                <>Cancellation made at least 24 hours before the appointment: full refund of the service price (less non-refundable third-party costs already incurred).</>,
                <>{TRADE_NAME} cancels or fails to perform a confirmed appointment for any reason other than your no-show or document deficiency: full refund of the service price and any travel fee charged.</>,
                <>A notarial act cannot be completed because of an error attributable to {TRADE_NAME} (e.g., the notary's seal expired, the wrong notarial certificate was attached): full refund and re-performance of the service at no charge, where re-performance is possible.</>,
                <>Duplicate or erroneous charges: full refund of the duplicate or erroneous portion within ten (10) business days of confirmation.</>,
              ]} />
              <SubH>Non-Refundable Circumstances</SubH>
              <UL items={[
                <>The signer fails to appear, refuses to sign, or cannot produce valid identification.</>,
                <>The document is incomplete, missing notarial language, or otherwise cannot be notarized through no fault of {TRADE_NAME}.</>,
                <>The signer is determined to lack capacity, is under duress, or otherwise cannot lawfully be notarized for.</>,
                <>State filing fees, ID.me verification fees, and other third-party costs already paid by {TRADE_NAME} on your behalf.</>,
                <>Court reporting time already attended, transcripts already produced, or apostille work already submitted to the Secretary of State.</>,
              ]} />
              <SubH>Refund Request Process</SubH>
              <P>
                To request a refund, email <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a> with your appointment date, invoice number, and a brief description of the reason. We will acknowledge requests within two (2) business days and resolve them within ten (10) business days. Approved refunds are issued to the original payment method.
              </P>
              <SubH>Partial Refunds</SubH>
              <P>
                Where a service is partially completed (for example, the notary completes some but not all signatures because a signer leaves the appointment), we will issue a partial refund proportional to the unperformed work, less reasonable travel and time charges actually incurred.
              </P>
            </Section>

            {/* 08 ────────────────────────────────── */}
            <Section entry={TOC[7]}>
              <SubH>Valid ID Requirements</SubH>
              <P>
                Every signer must present a current, government-issued photo identification at the time of notarization. Acceptable forms include: a state-issued driver's license or ID card; a U.S. passport or passport card; a U.S. military ID; a permanent resident card; or a foreign passport with a U.S. visa. The ID must (a) bear a photograph, (b) bear the signer's signature, (c) bear a physical description, and (d) be current or expired by no more than the period permitted under {STATE} law (currently four years for most {STATE} notarial acts).
              </P>
              <P>
                For RON sessions, identity is established through a combination of credential analysis (machine-reading the ID), knowledge-based authentication (KBA) questions, and live visual verification by the notary. If any step fails, the session cannot proceed and the reattempt and re-booking rules in Section 09 apply.
              </P>
              <SubH>Document Readiness</SubH>
              <P>
                You are responsible for bringing or uploading a complete, unsigned document with all required notarial language present. {TRADE_NAME} cannot supply, draft, modify, or recommend the substantive content of your document. If a document lacks proper notarial certificate language, the notary may, where permitted, attach a loose-leaf certificate; otherwise, the document cannot be notarized and the appointment will be rescheduled (subject to the no-show and cancellation provisions above).
              </P>
              <SubH>If a Notarization Cannot Be Completed</SubH>
              <P>
                If a notarial act cannot be lawfully completed for any reason (invalid ID, signer lacks capacity or willingness, document defect, etc.), the notary will explain the reason in writing and the appointment will end. Charges already incurred for travel, time, and platform fees are retained as set out in Section 04 and Section 07. We will gladly reschedule once the underlying issue is resolved.
              </P>
              <SubH>Customer Responsibility for Accuracy</SubH>
              <P>
                You warrant that all information you provide — including the names, addresses, and identifying information of signers, the type of document, the destination jurisdiction, and the intended use of the notarized document — is accurate and complete. {TRADE_NAME} is not responsible for losses, rejections, or delays caused by incorrect or incomplete customer-supplied information.
              </P>
            </Section>

            {/* 09 ────────────────────────────────── */}
            <Section entry={TOC[8]}>
              <SubH>Technology Requirements</SubH>
              <UL items={[
                <>A device with a working camera and microphone (laptop, desktop, tablet, or smartphone).</>,
                <>A current version of Chrome, Edge, Firefox, or Safari. Older browsers and Internet Explorer are not supported.</>,
                <>A stable broadband internet connection (minimum 5 Mbps upload/download recommended).</>,
                <>The ability to upload your unsigned document as a PDF and your government-issued photo ID.</>,
                <>A quiet, well-lit, private location during the session.</>,
              ]} />
              <SubH>Identity Verification</SubH>
              <P>
                RON identity verification combines (a) credential analysis of your ID, (b) knowledge-based authentication via dynamic public-record questions, and (c) live visual verification by the commissioned notary. You must successfully complete all three. KBA permits two attempts within a 24-hour window; if both attempts fail, the session is terminated and re-booking is required no sooner than 24 hours later, in accordance with {STATE} law.
              </P>
              <SubH>Recording & Data Retention</SubH>
              <P>
                Every RON session is recorded in audio and video, and the recording, the credential analysis result, and the KBA log are retained for the period required by {STATE} law (currently five years from the date of the notarial act). You consent to this recording as a condition of completing the session. Recordings are stored encrypted on our RON platform's compliant infrastructure. We will not release a recording except (i) on lawful subpoena, (ii) on written request from the signer who appears in the recording, or (iii) as otherwise required by law.
              </P>
              <SubH>Jurisdiction & Legal Validity</SubH>
              <P>
                {TRADE_NAME} performs RON acts under the authority of a {STATE} notarial commission. RON is recognized in all 50 states for most documents, but acceptance ultimately depends on the requirements of the receiving party (e.g., a county recorder, court, or foreign jurisdiction). It is your responsibility to confirm RON acceptance with the receiving party before booking. {TRADE_NAME} is not liable for the rejection of a RON-notarized document by a receiving party.
              </P>
              <SubH>What Voids a RON Session</SubH>
              <UL items={[
                <>Failure to complete KBA within the permitted attempts.</>,
                <>Inability to confirm the signer's identity through credential analysis or live visual verification.</>,
                <>The signer appears to be under duress, coerced, or lacks awareness of the act.</>,
                <>The signer is not physically located in a jurisdiction where the document may lawfully be notarized.</>,
                <>Loss of audio-visual connection that cannot be re-established within a reasonable time.</>,
                <>Any conduct that compromises the integrity of the act, including the presence of unauthorized third parties off-camera.</>,
              ]} />
            </Section>

            {/* 10 ────────────────────────────────── */}
            <Section entry={TOC[9]}>
              <SubH>Processing Times</SubH>
              <P>
                Our standard apostille turnaround is currently five (5) to seven (7) {STATE} Secretary of State business days from the date your documents are received in good order, plus shipping. Expedited processing is offered where the Secretary of State is accepting expedited filings, at the published expedite price. Processing times are governed entirely by the Secretary of State and are subject to change without notice; {TRADE_NAME} makes no guarantee of a specific completion date.
              </P>
              <SubH>Government Dependency Disclaimer</SubH>
              <P>
                Apostille issuance is a government act performed by the {STATE} Secretary of State, not by {TRADE_NAME}. Backlogs, system outages, holidays, fee changes, document rejections, and other government-side events are outside our control. We will keep you informed of status changes promptly and will refund the unused portion of any expedite fee if the Secretary of State suspends expedited service after we have invoiced you.
              </P>
              <SubH>Acceptance by Foreign Authorities</SubH>
              <P>
                {TRADE_NAME} does not guarantee that an apostilled document will be accepted by a foreign government, embassy, court, or other receiving party. Acceptance depends on the requirements of the destination country (Hague Convention member status, language requirements, certified translation requirements, additional consular legalization, document age, and so forth). It is your responsibility to confirm what the receiving authority requires before submitting documents to us.
              </P>
              <SubH>Document Eligibility</SubH>
              <P>
                Only documents originally issued or notarized in {STATE} can be apostilled by the {STATE} Secretary of State. Vital records (birth, death, marriage, divorce) must be certified copies issued within the period accepted by the Secretary of State. Documents with photocopied signatures, missing seals, expired notarial commissions, or other defects will be returned to you unprocessed; the apostille service fee for that document is refunded, but any state filing fee already paid is non-refundable.
              </P>
            </Section>

            {/* 11 ────────────────────────────────── */}
            <Section entry={TOC[10]}>
              <SubH>Scheduling & Notice</SubH>
              <P>
                Court reporting bookings should be made at least seventy-two (72) hours in advance to guarantee availability. Same-week and same-day bookings are accommodated when possible at our standard rates. Late-cancellation fees apply per Section 04 because court reporters commit calendar time that cannot be recovered.
              </P>
              <SubH>Transcript Delivery Timelines</SubH>
              <UL items={[
                <><strong style={{ color: IVORY }}>Rough draft (uncertified):</strong> typically within 24 hours of the close of the proceeding, at the published rough rate.</>,
                <><strong style={{ color: IVORY }}>Working copy:</strong> typically within five (5) business days, at the published working-copy rate.</>,
                <><strong style={{ color: IVORY }}>Extended Certified (6–10 business days):</strong> below standard agency rates, at the published extended rate.</>,
                <><strong style={{ color: IVORY }}>Standard:</strong> three (3) to five (5) business days at the published standard rate.</>,
                <><strong style={{ color: IVORY }}>Rush:</strong> next-business-day delivery at the published rush rate, subject to availability.</>,
                <>Witness fees and exhibit charges are billed per the published add-on schedule.</>,
              ]} />
              <SubH>Accuracy & Disputes</SubH>
              <P>
                Transcripts are produced in accordance with AAERT professional standards. If you believe a transcript contains a transcription error, submit a written errata request within fourteen (14) days of delivery, identifying the page and line, the existing text, and the proposed correction. We will review the audio recording and either issue a corrected transcript at no charge or explain why the existing transcript stands.
              </P>
              <SubH>Confidentiality</SubH>
              <P>
                We treat the contents of every proceeding as confidential. Audio recordings, transcripts, and exhibit materials are released only to the parties of record and their counsel, except as compelled by court order or written direction of all parties. Stenographic and electronic reporters serving on a deposition are bound by the same impartiality and confidentiality standards required of certified reporters in {STATE}.
              </P>
            </Section>

            {/* 12 ────────────────────────────────── */}
            <Section entry={TOC[11]}>
              <SubH>Signing Agent Role & Limitations</SubH>
              <P>
                A loan signing agent is a notary specially trained to guide borrowers through a closing or signing package. The signing agent's role is to (a) verify identity and witness signatures, (b) ensure each notarial certificate is properly executed, (c) follow the lender's or title company's signing instructions, and (d) return the package as directed. The signing agent is <strong style={{ color: IVORY }}>not</strong> permitted to explain the legal or financial effect of any document, give an opinion on the loan, advise the borrower whether to sign, or modify any term of the loan.
              </P>
              <SubH>Lender / Title Company Instructions</SubH>
              <P>
                When a loan signing is ordered by a lender, title company, or signing service on behalf of the borrower, the signing agent will follow the closing instructions provided by that party. The borrower remains the signer of record and these Terms apply; the lender or title company is responsible for the accuracy of the loan documents themselves and for the underlying transaction.
              </P>
              <SubH>Customer Responsibility for Accuracy</SubH>
              <P>
                The borrower and the lender are jointly responsible for confirming that the names, addresses, dates, and figures in the loan documents are correct before the appointment. {TRADE_NAME} is not responsible for errors in loan documents we did not draft, including incorrect spellings, wrong loan amounts, missing pages, or omitted notarial certificates.
              </P>
              <SubH>Re-Sign Fee Policy</SubH>
              <UL items={[
                <>If a re-sign is required because of an error attributable to {TRADE_NAME} (e.g., a missed signature, an improperly completed notarial certificate, an incorrect notary seal), we will perform the re-sign at no additional charge, including travel.</>,
                <>If a re-sign is required because of an error attributable to the lender, title company, or borrower (incorrect figures, missing documents, name discrepancies, etc.), the standard signing fee plus travel applies to the re-sign.</>,
                <>Expedited re-sign turnaround (same-day) is available where the notary's calendar permits, at the published expedited surcharge.</>,
              ]} />
            </Section>

            {/* 13 ────────────────────────────────── */}
            <Section entry={TOC[12]}>
              <SubH>Ownership of Site Content</SubH>
              <P>
                The {TRADE_NAME} website, including all text, graphics, logos, the “{TRADE_NAME}” trademark, the Safe+ name and badge, the HonorPass™ name and badge, the Night Shift Seal™, Midday Miles™, and Weekend Warrior™ marks, the price calculator, the booking flow, and the underlying software, are owned by {COMPANY} or its licensors and are protected by U.S. copyright, trademark, and other intellectual property laws.
              </P>
              <SubH>Restrictions on Use</SubH>
              <P>
                You may view the site and use it as needed to obtain our services. You may not (a) reproduce, distribute, modify, or create derivative works of any portion of the site without our prior written consent; (b) use the {TRADE_NAME} name, logos, or marks in a way that suggests sponsorship or endorsement; (c) scrape, mirror, or systematically harvest content from the site; or (d) reverse-engineer or attempt to extract source code from any client-side or server-side component.
              </P>
              <SubH>User-Submitted Content</SubH>
              <P>
                Any document, photograph, or other material you upload to the site for the purpose of receiving services remains your property. By uploading, you grant {TRADE_NAME} a limited, non-exclusive, worldwide, royalty-free license to store, copy, transmit, and process that material solely for the purpose of providing the services you have requested, complying with our legal obligations (including notarial recordkeeping), and operating the Safe+ archive on your behalf. We do not claim ownership of your documents.
              </P>
            </Section>

            {/* 14 ────────────────────────────────── */}
            <Section entry={TOC[13]}>
              <PolicyCallout href="/privacy" label="Privacy Policy">
                Our complete privacy practices — what we collect, how we use it, who we share it with (Stripe, ID.me, Google Calendar, Zapier, RON platform, government recipients), retention periods, and your rights — live on the standalone Privacy Policy page.
              </PolicyCallout>
              <P>
                In summary, and as a contractual commitment under these Terms: we collect only the information needed to deliver the service you booked; we use it to deliver the service, comply with notarial recordkeeping law, and prevent fraud; we do not sell your personal information; and we share data only with the vetted partners and government recipients listed in the Privacy Policy. RON session recordings and notarial journal entries are retained for the period required by {STATE} law (see Section 09 for retention specifics).
              </P>
              <P>
                The site stores a small set of strictly functional items in your browser's local and session storage to keep you signed in, hold your in-progress price calculator quote, and carry your booking through checkout. The full inventory of those items is published in our <Link href="/cookies" className="underline" style={{ color: BLUE }}>Cookie Policy</Link>.
              </P>
              <P>
                Residents of states with comprehensive privacy statutes (California, Colorado, Connecticut, Utah, Virginia, and others) may exercise their rights to access, correct, delete, and opt out of certain processing by contacting <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>. The full state-by-state notices and the procedures we follow are detailed on the <Link href="/privacy" className="underline" style={{ color: BLUE }}>Privacy Policy</Link> page.
              </P>
            </Section>

            {/* 15 ────────────────────────────────── */}
            <Section entry={TOC[14]}>
              <SubH>Maximum Liability</SubH>
              <P>
                To the fullest extent permitted by law, the total aggregate liability of {COMPANY}, its members, employees, and contractors arising out of or relating to these Terms or any service rendered shall not exceed the greater of (a) the amount you actually paid {TRADE_NAME} for the specific service that gave rise to the claim, or (b) one thousand U.S. dollars ($1,000). This cap applies regardless of the legal theory asserted (contract, tort, statute, or otherwise) and survives termination of these Terms.
              </P>
              <SubH>No Liability for Third Parties</SubH>
              <P>
                {TRADE_NAME} is not responsible for the acts, omissions, errors, delays, or fee changes of any third party involved in your transaction, including without limitation: the {STATE} Secretary of State, the U.S. Department of State, foreign governments and embassies, county recorders, courts, lenders, title companies, real estate agents, attorneys, ID.me, RON platform providers, shipping carriers, and any other person or entity not employed or controlled by {TRADE_NAME}.
              </P>
              <SubH>No Liability for Customer-Provided Errors</SubH>
              <P>
                {TRADE_NAME} is not liable for losses caused by inaccurate, incomplete, or misleading information you supply (incorrect names, wrong document type, wrong destination jurisdiction, expired ID, etc.) or by document defects existing before we received the document.
              </P>
              <SubH>No Indirect Damages</SubH>
              <P>
                In no event will {TRADE_NAME} be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including without limitation lost profits, lost business opportunities, or loss of goodwill, even if advised of the possibility of such damages.
              </P>
              <SubH>Force Majeure</SubH>
              <P>
                {TRADE_NAME} is not in breach of these Terms and is not liable for any delay or failure to perform caused by events beyond its reasonable control, including acts of God, severe weather, natural disasters, public health emergencies, fire, flood, war, civil unrest, government action (including emergency closures of the Secretary of State), labor disturbances, internet or telecommunications failures, and failures of third-party platforms required to deliver the service.
              </P>
            </Section>

            {/* 16 ────────────────────────────────── */}
            <Section entry={TOC[15]}>
              <P>
                You agree to defend, indemnify, and hold harmless {COMPANY}, its members, employees, and contractors from and against any and all claims, liabilities, losses, damages, judgments, fines, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your breach of these Terms; (b) the inaccuracy or incompleteness of any document or information you provide; (c) your misuse of the site, the services, or any deliverable; (d) your violation of any applicable law or regulation; (e) your violation of any third-party right, including any intellectual property or privacy right; and (f) any dispute between you and a lender, title company, foreign authority, or other third party regarding a document we notarized, apostilled, transcribed, or delivered.
              </P>
              <P>
                {TRADE_NAME} reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you will cooperate with our defense.
              </P>
            </Section>

            {/* 17 ────────────────────────────────── */}
            <Section entry={TOC[16]}>
              <SubH>Governing Law</SubH>
              <P>
                These Terms and any dispute arising out of or relating to them or your use of the site or services are governed by the laws of the State of {STATE}, without regard to its conflict-of-laws rules. Federal law applies where preempted (e.g., the Federal Arbitration Act).
              </P>
              <SubH>Mandatory Arbitration</SubH>
              <P>
                Except for the small claims exception below, you and {TRADE_NAME} agree that any dispute, claim, or controversy arising out of or relating to these Terms, the site, or any service we provide will be resolved by final and binding individual arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. Arbitration will be conducted in {COUNTY} (or by video where the AAA permits), in English, before a single neutral arbitrator. The arbitrator's award may be entered as a judgment in any court of competent jurisdiction.
              </P>
              <SubH>Class Action Waiver</SubH>
              <P>
                You and {TRADE_NAME} agree that each may bring claims against the other only in your or its individual capacity, and not as a plaintiff or class member in any purported class, collective, consolidated, or representative proceeding. The arbitrator may not consolidate more than one person's claims and may not preside over any form of representative or class proceeding.
              </P>
              <SubH>Small Claims Exception</SubH>
              <P>
                Either you or {TRADE_NAME} may bring an individual action in the small claims court of {COUNTY} (or your county of residence, if eligible) instead of arbitration, so long as the action remains in small claims court and proceeds only on an individual basis.
              </P>
              <SubH>Opt-Out</SubH>
              <P>
                You may opt out of the arbitration agreement and class action waiver by sending written notice of your decision to opt out to <a href={`mailto:${LEGAL_EMAIL}`} className="underline" style={{ color: BLUE }}>{LEGAL_EMAIL}</a> within thirty (30) days of first accepting these Terms. The notice must include your name, address, the email associated with your account (if any), and a clear statement that you wish to opt out of arbitration. Opting out does not affect any other provision of these Terms.
              </P>
            </Section>

            {/* 18 ────────────────────────────────── */}
            <Section entry={TOC[17]}>
              <PolicyCallout href="/accessibility" label="Accessibility Statement">
                Our complete accessibility commitments — WCAG 2.1 AA conformance status, known limitations, the assistive technologies we test with, accessible service delivery beyond the website (hospitals, hospices, interpreters), and the process to request accommodations or report a barrier — live on the standalone Accessibility Statement page.
              </PolicyCallout>
              <P>
                As a contractual commitment under these Terms: {TRADE_NAME} provides services that comply with the Americans with Disabilities Act (ADA) and analogous {STATE} law, and we provide services without discrimination on the basis of race, color, religion, national origin, ancestry, sex, gender identity, sexual orientation, age, disability, marital status, military or veteran status, source of income, or any other characteristic protected by federal, state, or local law. {STATE} notaries are bound by an oath of impartiality, and we honor that oath in every booking we accept.
              </P>
              <P>
                To request an accommodation — sign-language interpreter, reader, alternative communication method, additional time, accessible location, or anything else — contact us at {PHONE} or <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a> at least 48 hours before your appointment when possible. We will work with you to provide a reasonable accommodation at no additional charge. The full process and our contact channels are detailed on the <Link href="/accessibility" className="underline" style={{ color: BLUE }}>Accessibility Statement</Link>.
              </P>
            </Section>

            {/* 19 ────────────────────────────────── */}
            <Section entry={TOC[18]}>
              <SubH>Right to Refuse or Terminate Service</SubH>
              <P>
                {TRADE_NAME} reserves the right to refuse, suspend, or terminate any booking, account, or membership at any time when, in our reasonable judgment: (a) the customer has materially breached these Terms; (b) the customer's conduct toward our staff or notaries is abusive, threatening, or unsafe; (c) the requested service would violate {STATE} law, applicable federal law, the {STATE} notarial code of conduct, or the rules of any platform we rely on; (d) the customer has unresolved chargebacks, fraud indicators, or repeated no-shows; or (e) we have reason to believe the service is being used in furtherance of fraud, identity theft, or another unlawful purpose.
              </P>
              <SubH>Account & Membership Termination</SubH>
              <P>
                We will provide written notice of termination by email to the address on file. Where the breach is curable, we will give you a reasonable opportunity to cure before terminating. You may close your account or cancel your Safe+ membership at any time as described in Section 06.
              </P>
              <SubH>Customer Obligations on Termination</SubH>
              <P>
                Termination does not relieve you of obligations accrued before termination, including payment of services already rendered, applicable cancellation or no-show fees, and indemnification obligations. The provisions of these Terms that by their nature should survive termination — including Sections 13 (Intellectual Property), 14 (Privacy & Data Use), 15 (Limitation of Liability), 16 (Indemnification), 17 (Dispute Resolution), and 20 (Contact & Legal Notices) — will survive.
              </P>
            </Section>

            {/* 20 ────────────────────────────────── */}
            <Section entry={TOC[19]}>
              <P>
                For general questions about your account or a service: <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a> or {PHONE}.
              </P>
              <P>
                For privacy, data subject requests, and CCPA/state-privacy inquiries: <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>.
              </P>
              <P>
                For legal notices, subpoenas, arbitration demands, and other compliance correspondence: <a href={`mailto:${LEGAL_EMAIL}`} className="underline" style={{ color: BLUE }}>{LEGAL_EMAIL}</a>, or by mail to:
              </P>
              <div className="border-l-2 pl-4 my-6 text-[15px] font-light leading-relaxed" style={{ borderColor: BLUE, color: IVORY }}>
                {NOTICE_ADDR}
              </div>
              <P>
                Notice is effective upon receipt for hand-delivery and one (1) business day after dispatch for tracked email or certified mail.
              </P>
              <SubH>Effective Date & Versioning</SubH>
              <P>
                These Terms are effective as of {EFFECTIVE} and supersede all prior Terms of Service published by {TRADE_NAME}. Material changes are described in our public version history, available on request from <a href={`mailto:${LEGAL_EMAIL}`} className="underline" style={{ color: BLUE }}>{LEGAL_EMAIL}</a>.
              </P>
              <div className="mt-12 pt-8 border-t flex flex-wrap gap-3" style={{ borderColor: DIV }}>
                <Link href="/" className="px-5 py-3 text-[12px] font-bold uppercase tracking-[0.18em] border-2" style={{ borderColor: BLUE, color: BLUE }}>
                  ← Back to home
                </Link>
                <Link href="/about" className="px-5 py-3 text-[12px] font-bold uppercase tracking-[0.18em] border-2" style={{ borderColor: DIV, color: SOFT }}>
                  Contact us
                </Link>
                <Link href="/faq" className="px-5 py-3 text-[12px] font-bold uppercase tracking-[0.18em] border-2" style={{ borderColor: DIV, color: SOFT }}>
                  FAQ & guides
                </Link>
              </div>
            </Section>

          </main>
        </div>
      </section>

      {/* ── Footer note ── */}
      <section className="px-5 py-10 border-t text-center" style={{ borderColor: DIV }}>
        <p className="text-[11px] font-light max-w-2xl mx-auto" style={{ color: SOFT }}>
          {COMPANY} · Texas-based professional services. Not a law firm. All notarial acts performed in a ministerial capacity only. Last updated {LAST_UPDATED}.
        </p>
      </section>

    </div>
  );
}
