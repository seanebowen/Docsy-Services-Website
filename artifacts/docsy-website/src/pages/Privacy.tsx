import React from "react";
import { Link } from "wouter";
import {
  LegalShell, Section, P, SubH, UL,
  IVORY, BLUE, type LegalSectionEntry,
} from "@/components/legal/LegalShell";

const LAST_UPDATED  = "April 27, 2026";
const EFFECTIVE     = "April 27, 2026";
const TRADE_NAME    = "Docsy";
const COMPANY       = "Docsy Services LLC";
const STATE         = "Texas";
const PHONE         = "(512) 555-0190";
const PRIVACY_EMAIL = "privacy@docsynotary.com";
const LEGAL_EMAIL   = "legal@docsynotary.com";

const TOC: LegalSectionEntry[] = [
  { id: "scope",         n: "01", title: "Scope & Who We Are" },
  { id: "what-we-collect", n: "02", title: "Information We Collect" },
  { id: "how-we-use",    n: "03", title: "How We Use Your Information" },
  { id: "third-parties", n: "04", title: "Third Parties We Share Data With" },
  { id: "no-sale",       n: "05", title: "We Do Not Sell Your Personal Information" },
  { id: "retention",     n: "06", title: "How Long We Keep Your Information" },
  { id: "security",      n: "07", title: "How We Protect Your Information" },
  { id: "your-rights",   n: "08", title: "Your Rights & How to Exercise Them" },
  { id: "state-laws",    n: "09", title: "State Privacy Law Notices (CA, CO, CT, UT, VA, TX)" },
  { id: "children",      n: "10", title: "Children's Privacy" },
  { id: "international", n: "11", title: "International Visitors" },
  { id: "changes",       n: "12", title: "Changes to This Policy" },
  { id: "contact",       n: "13", title: "Contact Us About Privacy" },
];

export default function Privacy() {
  return (
    <LegalShell
      toc={TOC}
      tocTestId="privacy"
      documentTitle="Privacy Policy | Docsy Services"
      metaDescription="How Docsy Services collects, uses, shares, and protects the personal information of customers using our notary, RON, apostille, loan signing, and electronic reporting services."
      eyebrow="Legal · Privacy Policy"
      titleLead="Privacy"
      titleHighlight="Policy."
      intro="What we collect when you use Docsy, why we collect it, who we share it with, and the rights you have over your data. Plain English first, full policy below."
      lastUpdated={LAST_UPDATED}
      effective={EFFECTIVE}
      contactEmail={PRIVACY_EMAIL}
      summary={
        <>
          We collect the information we need to deliver the service you booked — your name, contact info, document details, payment, and (for RON) your ID and a recorded session. We use it to deliver the service, comply with notarial recordkeeping law, and prevent fraud. <strong style={{ color: IVORY }}>We do not sell your personal information.</strong> We share data only with vetted partners required to deliver your service (Stripe for payments, ID.me for HonorPass verification, Google Calendar for appointment scheduling, Zapier for routing confirmed-booking notifications into our internal tools, the {STATE} Secretary of State for apostilles, RON platforms, and the lender or title company for a loan signing you ordered). You have the right to access, correct, and delete most of your data — write{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>.
        </>
      }
    >

      <Section entry={TOC[0]}>
        <P>
          This Privacy Policy explains how {COMPANY}, a {STATE} limited liability company doing business as {TRADE_NAME} (“{TRADE_NAME},” “we,” “us,” or “our”), collects, uses, shares, and safeguards the personal information of visitors and customers who use the {TRADE_NAME} website, mobile interfaces, price calculator, booking flow, account features, and the services we deliver — including General Notary Work, Mobile Notary, Remote Online Notarization (RON), Loan Signing, Apostille, Electronic Reporting / Court Reporting, and the Docsy Safe+ membership.
        </P>
        <P>
          This Policy supplements our <Link href="/terms" className="underline" style={{ color: BLUE }}>Terms of Service</Link>, our <Link href="/cookies" className="underline" style={{ color: BLUE }}>Cookie Policy</Link>, and our <Link href="/accessibility" className="underline" style={{ color: BLUE }}>Accessibility Statement</Link>. By using the site or our services, you consent to the practices described here.
        </P>
      </Section>

      <Section entry={TOC[1]}>
        <SubH>Information You Provide Directly</SubH>
        <UL items={[
          <><strong style={{ color: IVORY }}>Account & contact information:</strong> name, email address, phone number, and (where you create an account) a password.</>,
          <><strong style={{ color: IVORY }}>Booking information:</strong> the service you requested, appointment date and time, signing location or RON link, signer count, document type, special instructions, and any access information you provide (gate codes, suite numbers, hospital floor, etc.).</>,
          <><strong style={{ color: IVORY }}>Payment information:</strong> billing name and address, and card details. Card numbers are tokenized by Stripe (our PCI-compliant payment processor) and are not stored on Docsy servers — Docsy only retains the Stripe payment identifier returned by Stripe so the charge can be reconciled with your booking.</>,
          <><strong style={{ color: IVORY }}>Documents you upload:</strong> documents submitted for notarization, apostille processing, or storage in your Safe+ vault.</>,
          <><strong style={{ color: IVORY }}>Communications:</strong> messages you send us by email, text, contact form, or phone (calls may be recorded for quality and training where disclosed at the time).</>,
        ]} />
        <SubH>Information Collected Automatically</SubH>
        <UL items={[
          <><strong style={{ color: IVORY }}>Site usage data:</strong> pages viewed, links clicked, referring URL, and timestamps.</>,
          <><strong style={{ color: IVORY }}>Device & connection data:</strong> IP address, browser type and version, operating system, and screen size.</>,
          <><strong style={{ color: IVORY }}>Cookies and similar technologies:</strong> session and authentication cookies, calculator draft-quote persistence, and basic analytics. See our <Link href="/cookies" className="underline" style={{ color: BLUE }}>Cookie Policy</Link> for the full list.</>,
        ]} />
        <SubH>Information Collected from Third Parties</SubH>
        <UL items={[
          <><strong style={{ color: IVORY }}>ID.me HonorPass verification:</strong> when you choose to verify military, veteran, first responder, nurse, or teacher status for a HonorPass discount, ID.me confirms only the high-level group and a verification timestamp. We do not receive your underlying ID documents or other ID.me account data.</>,
          <><strong style={{ color: IVORY }}>RON platform data:</strong> when you complete a Remote Online Notarization, our RON platform performs ID credential analysis and Knowledge-Based Authentication (KBA) and shares the results with us as required to perform the notarial act. The platform also produces an audio-visual recording of the session.</>,
          <><strong style={{ color: IVORY }}>Lender / title company data:</strong> when a loan signing is ordered through a lender, title company, or signing service on your behalf, that party may share your name, contact information, and the loan documents with us so we can perform the signing.</>,
        ]} />
      </Section>

      <Section entry={TOC[2]}>
        <UL items={[
          <>To deliver the services you have requested (notarization, RON, apostille processing, loan signing, electronic reporting, Safe+ storage).</>,
          <>To communicate with you about your appointment — confirmations, reminders, status updates, and follow-up.</>,
          <>To process payments, issue refunds where applicable, and detect or prevent fraudulent transactions.</>,
          <>To comply with notarial recordkeeping obligations under {STATE} law and similar requirements in other jurisdictions.</>,
          <>To respond to your questions and provide customer support.</>,
          <>To verify eligibility for promotional discounts (e.g., HonorPass via ID.me).</>,
          <>To improve the site's usability, accessibility, performance, and security.</>,
          <>To enforce our Terms of Service and protect the rights, property, and safety of {TRADE_NAME}, our customers, and the public.</>,
          <>To comply with subpoenas, court orders, and other lawful legal process.</>,
        ]} />
      </Section>

      <Section entry={TOC[3]}>
        <P>
          We share data only with parties needed to deliver the service you requested or to operate the business lawfully. The full list of operational third parties is below.
        </P>
        <SubH>Service Providers (Processors)</SubH>
        <UL items={[
          <><strong style={{ color: IVORY }}>Stripe, Inc.</strong> (payment processing) — receives the information needed to charge your payment method and to comply with anti-fraud and PCI-DSS requirements. Stripe's privacy practices are governed at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>stripe.com/privacy</a>.</>,
          <><strong style={{ color: IVORY }}>ID.me, Inc.</strong> (HonorPass identity verification) — receives the data you provide directly to ID.me when you initiate verification; returns only your eligibility group (military / veteran / first-responder / nurse / teacher) and a verification timestamp to us. Governed by <a href="https://www.id.me/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>id.me/privacy</a>.</>,
          <><strong style={{ color: IVORY }}>Google LLC — Google Calendar API</strong> (appointment availability) — our scheduling backend uses a Google service-account credential with a read-only Calendar scope to look up existing booked events on the {TRADE_NAME} business calendar so we can compute open slots when you choose a date. The date you select is sent to Google solely to retrieve that day's events; your name, contact information, and document details are not sent to Google. Once you confirm a booking, the new appointment is added to the {TRADE_NAME} business calendar (your name and the service type are visible inside our calendar so the assigned notary can prepare). Governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>policies.google.com/privacy</a>.</>,
          <><strong style={{ color: IVORY }}>Zapier, Inc.</strong> (booking-confirmed webhook) — when your booking is confirmed, our backend POSTs a JSON payload to a Zapier webhook (configured via the <code style={{ color: BLUE }}>ZAPIER_WEBHOOK_URL</code> server secret). The payload contains your name, email, phone, service type, appointment time, amount charged, and the Stripe payment identifier. Zapier then routes that payload into our internal CRM, calendar, and notification tools. The payload does <strong style={{ color: IVORY }}>not</strong> include document contents, government-ID images, or RON session recordings. Governed by <a href="https://zapier.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>zapier.com/privacy</a>.</>,
          <><strong style={{ color: IVORY }}>RON platform provider</strong> — runs the Remote Online Notarization session, performs KBA, captures the session recording, and stores the recording for the legally required retention period.</>,
          <><strong style={{ color: IVORY }}>Hosting & infrastructure providers</strong> — store data on encrypted, access-controlled, U.S.-based infrastructure.</>,
        ]} />
        <SubH>Government & Required Recipients</SubH>
        <UL items={[
          <><strong style={{ color: IVORY }}>{STATE} Secretary of State</strong> — receives documents you have asked us to apostille, plus the state filing fee.</>,
          <><strong style={{ color: IVORY }}>Lender, title company, signing service</strong> — when a loan signing is ordered on your behalf, we exchange the executed package and signing notes with that party as part of the transaction.</>,
          <><strong style={{ color: IVORY }}>Law enforcement, courts, regulators</strong> — we will produce information when required by valid subpoena, court order, or other lawful process, and only the information actually compelled.</>,
        ]} />
        <SubH>Business Transfers</SubH>
        <P>
          If {TRADE_NAME} is involved in a merger, acquisition, financing, or sale of assets, your information may be transferred to the successor entity, subject to a privacy commitment at least as protective as this Policy. We will notify you of any such transfer that materially affects how your data is handled.
        </P>
      </Section>

      <Section entry={TOC[4]}>
        <P>
          We do not sell your personal information for money, and we do not “share” it for cross-context behavioral advertising as those terms are defined under the California Consumer Privacy Act, the California Privacy Rights Act, or analogous state laws. We do not provide your information to data brokers.
        </P>
      </Section>

      <Section entry={TOC[5]}>
        <UL items={[
          <><strong style={{ color: IVORY }}>RON session recordings, credential analysis results, and KBA logs:</strong> retained for the period required by {STATE} law (currently five years from the date of the act), then securely deleted unless subject to a litigation hold.</>,
          <><strong style={{ color: IVORY }}>Notarial journal entries:</strong> retained for the period required by the {STATE} Secretary of State (currently the entire commission term plus a statutory tail).</>,
          <><strong style={{ color: IVORY }}>Booking and transaction records:</strong> retained for at least seven (7) years for tax, accounting, and audit purposes.</>,
          <><strong style={{ color: IVORY }}>Safe+ vault documents:</strong> retained for as long as your membership is active, plus thirty (30) days after cancellation to allow you to download them. After thirty days, they are securely deleted unless you request earlier deletion or extended retention in writing.</>,
          <><strong style={{ color: IVORY }}>Account information:</strong> retained while your account is open. After closure, identifying information is deleted within ninety (90) days, except where retention is required by law or for legitimate fraud-prevention purposes.</>,
          <><strong style={{ color: IVORY }}>Marketing and analytics data:</strong> retained for no more than twenty-six (26) months from the date of collection.</>,
        ]} />
      </Section>

      <Section entry={TOC[6]}>
        <P>
          We use administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, disclosure, alteration, and destruction. These include encryption in transit (TLS) and at rest where feasible, role-based access controls, audit logging, multi-factor authentication for administrative accounts, and PCI-DSS-aligned handling of payment data through Stripe.
        </P>
        <P>
          No security program is perfect. If we ever experience a breach that affects your personal information, we will notify you promptly and as required by law, and we will provide guidance on what to do.
        </P>
      </Section>

      <Section entry={TOC[7]}>
        <P>You have the following rights regarding your personal information, subject to verification of your identity and limitations under applicable law:</P>
        <UL items={[
          <><strong style={{ color: IVORY }}>Right to know:</strong> request a summary of the categories of personal information we have collected about you and the purposes for which we use it.</>,
          <><strong style={{ color: IVORY }}>Right to access:</strong> request a copy of the specific personal information we hold about you.</>,
          <><strong style={{ color: IVORY }}>Right to correct:</strong> request that we correct information you believe is inaccurate.</>,
          <><strong style={{ color: IVORY }}>Right to delete:</strong> request deletion of your personal information, except information we must retain to comply with notarial recordkeeping law, complete an open transaction, prevent fraud, or comply with another legal obligation.</>,
          <><strong style={{ color: IVORY }}>Right to opt out of certain processing:</strong> opt out of analytics or marketing communications at any time.</>,
          <><strong style={{ color: IVORY }}>Right to non-discrimination:</strong> we will not deny you services, charge you a different price, or provide a different level of service because you exercised any of these rights.</>,
        ]} />
        <P>
          To exercise any of these rights, write to <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a> from the email address on your account, or call {PHONE}. We will respond within forty-five (45) days. You may also designate an authorized agent to submit a request on your behalf; the agent must provide written authorization and we may verify the request directly with you.
        </P>
      </Section>

      <Section entry={TOC[8]}>
        <SubH>California (CCPA / CPRA)</SubH>
        <P>
          California residents have the rights described above. We do not sell or share personal information for cross-context behavioral advertising. The categories of personal information we have collected in the preceding twelve (12) months are described in Section 02. We do not knowingly collect or process the personal information of consumers under the age of sixteen (16) without affirmative authorization. To submit a verifiable consumer request, write <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>.
        </P>
        <SubH>Texas (Texas Data Privacy and Security Act)</SubH>
        <P>
          Texas residents have the right to confirm whether we process their personal data, to access and obtain a copy of that data, to correct inaccuracies, to delete the data, and to opt out of targeted advertising, the sale of personal data, and certain profiling. Docsy does not engage in targeted advertising or sales of personal data and does not perform profiling that produces legal or similarly significant effects. Submit requests to <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>. You have the right to appeal a denial of a request; appeals may be sent to <a href={`mailto:${LEGAL_EMAIL}`} className="underline" style={{ color: BLUE }}>{LEGAL_EMAIL}</a>.
        </P>
        <SubH>Colorado, Connecticut, Utah, Virginia, and Other States</SubH>
        <P>
          Residents of Colorado, Connecticut, Utah, Virginia, and other states with comprehensive consumer privacy statutes have substantially similar rights. Submit requests to <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a>. We will treat the request consistent with the law of your state of residence.
        </P>
      </Section>

      <Section entry={TOC[9]}>
        <P>
          The {TRADE_NAME} site is intended for adults aged eighteen (18) and older. We do not knowingly collect personal information directly from children. Notarial acts may be performed for minors when an adult parent or legal guardian presents the minor and otherwise authorizes the act; in those cases the booking party (the adult) is the {TRADE_NAME} customer and the minor's information is processed only as needed to complete the notarial act and satisfy recordkeeping requirements.
        </P>
      </Section>

      <Section entry={TOC[10]}>
        <P>
          Our services are intended for users in the United States. If you access the site from outside the United States, your information will be transferred to and processed in the United States, where data-protection laws may differ from those in your country of residence. By using the site, you consent to this transfer.
        </P>
      </Section>

      <Section entry={TOC[11]}>
        <P>
          We may update this Policy from time to time. The “Last Updated” date at the top of the page reflects the most recent revision. For material changes — including additions of new third-party processors, changes to retention periods, or changes that affect your rights — we will provide reasonable advance notice by email (where we have your address) or through an in-site notice at least thirty (30) days before the change takes effect. Your continued use of the site after the effective date of an update constitutes acceptance of the updated Policy.
        </P>
      </Section>

      <Section entry={TOC[12]}>
        <P>
          For privacy questions, data subject requests, or to exercise any of the rights described in this Policy, contact our privacy team:
        </P>
        <div className="border-l-2 pl-4 my-6 text-[15px] font-light leading-relaxed" style={{ borderColor: BLUE, color: IVORY }}>
          {COMPANY} — Privacy<br />
          Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a><br />
          Phone: {PHONE}<br />
          Mail: P.O. Box 12, Austin, TX 78701, Attn: Privacy Officer
        </div>
        <P>
          For legal notices, subpoenas, and arbitration demands, see our <Link href="/terms#contact" className="underline" style={{ color: BLUE }}>Terms of Service · Section 20</Link>.
        </P>
      </Section>

    </LegalShell>
  );
}
