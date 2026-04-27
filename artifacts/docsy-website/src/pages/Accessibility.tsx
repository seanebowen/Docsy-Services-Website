import React from "react";
import { Link } from "wouter";
import {
  LegalShell, Section, P, SubH, UL,
  IVORY, BLUE, type LegalSectionEntry,
} from "@/components/legal/LegalShell";

const LAST_UPDATED   = "April 27, 2026";
const EFFECTIVE      = "April 27, 2026";
const TRADE_NAME     = "Docsy";
const PHONE          = "(512) 555-0190";
const EMAIL          = "hello@docsynotary.com";
const ACCESS_EMAIL   = "accessibility@docsynotary.com";

const TOC: LegalSectionEntry[] = [
  { id: "commitment",       n: "01", title: "Our Accessibility Commitment" },
  { id: "conformance",      n: "02", title: "Conformance Status (WCAG 2.1 AA)" },
  { id: "what-we-do",       n: "03", title: "What We've Done So Far" },
  { id: "known-limitations",n: "04", title: "Known Limitations & What We're Working On" },
  { id: "service-access",   n: "05", title: "Accessible Service Delivery (Beyond the Website)" },
  { id: "request-help",     n: "06", title: "Requesting Accommodations" },
  { id: "report-barrier",   n: "07", title: "Reporting an Accessibility Barrier" },
  { id: "assistive-tech",   n: "08", title: "Assistive Technologies We Test With" },
  { id: "third-party",      n: "09", title: "Third-Party Tools (Stripe, ID.me, RON Platform)" },
  { id: "contact",          n: "10", title: "Contact the Accessibility Team" },
];

export default function Accessibility() {
  return (
    <LegalShell
      documentTitle="Accessibility Statement | Docsy Services"
      metaDescription="Docsy Services' accessibility commitment, WCAG 2.1 AA conformance status, known limitations, and how to request accommodations or report a barrier."
      eyebrow="Legal · Accessibility"
      titleLead="Accessibility"
      titleHighlight="Statement."
      intro="What we've built, what's still in progress, and how to ask for help — for the website, our service delivery, and every channel in between."
      lastUpdated={LAST_UPDATED}
      effective={EFFECTIVE}
      contactEmail={ACCESS_EMAIL}
      summaryLabel="WHAT THIS MEANS FOR YOU"
      summary={
        <>
          We aim to meet <strong style={{ color: IVORY }}>WCAG 2.1 Level AA</strong> across the {TRADE_NAME} website and to deliver our notarial, RON, apostille, loan-signing, and reporting services without barriers — including in homes, hospitals, memory-care environments, and workplaces. We routinely accommodate sign-language interpreters, oxygen equipment, hospital beds, large-print materials, and additional time. If you encounter any barrier, write{" "}
          <a href={`mailto:${ACCESS_EMAIL}`} className="underline" style={{ color: BLUE }}>{ACCESS_EMAIL}</a> or call {PHONE} and we will respond within five business days.
        </>
      }
    >

      <Section entry={TOC[0]}>
        <P>
          {TRADE_NAME} is committed to digital and service accessibility for all customers, including people with disabilities. Accessibility is not an after-thought for us — it is part of how a notary practice should operate. Texas notaries are bound by an oath of impartiality, and we honor that oath by removing the practical barriers that can make notarial and document services hard to access for people with vision, hearing, mobility, cognitive, or other disabilities.
        </P>
      </Section>

      <Section entry={TOC[1]}>
        <P>
          The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. They define three levels of conformance: Level A, Level AA, and Level AAA.
        </P>
        <P>
          The {TRADE_NAME} website is designed and tested to meet <strong style={{ color: IVORY }}>WCAG 2.1 Level AA</strong>. "Partial conformance" means that some content does not yet fully conform; those areas are listed in Section 04. We treat this statement as a living document — it is updated when we ship significant accessibility improvements or when we identify a new barrier.
        </P>
      </Section>

      <Section entry={TOC[2]}>
        <UL items={[
          <><strong style={{ color: IVORY }}>Color and contrast.</strong> We use a high-contrast palette across the site (slate / ivory / brand-blue) and verify text and interactive controls against the WCAG 2.1 AA contrast ratios.</>,
          <><strong style={{ color: IVORY }}>Keyboard navigation.</strong> All primary navigation, the booking flow, the price calculator, the membership selector, and the Safe+ vault are operable using only a keyboard, with visible focus indicators.</>,
          <><strong style={{ color: IVORY }}>Semantic HTML and headings.</strong> Pages use proper heading order, landmark regions (header, main, footer), and meaningful link text so screen-reader users can scan and skip.</>,
          <><strong style={{ color: IVORY }}>Form labels and error messages.</strong> Every form input has an associated label, and validation errors are announced to assistive technology rather than relying on color alone.</>,
          <><strong style={{ color: IVORY }}>Image alt text.</strong> Informative images have descriptive alt text; decorative images are marked as such so screen readers skip them.</>,
          <><strong style={{ color: IVORY }}>Reduced motion.</strong> Animations are short, non-essential, and respect the user's <code style={{ color: BLUE }}>prefers-reduced-motion</code> system setting where motion would otherwise be distracting.</>,
          <><strong style={{ color: IVORY }}>Responsive layout.</strong> All pages reflow cleanly down to a 320 px viewport without horizontal scrolling, and text scales up to 200% without loss of content or function.</>,
          <><strong style={{ color: IVORY }}>Plain-language summaries.</strong> Our Terms of Service, <Link href="/privacy" className="underline" style={{ color: BLUE }}>Privacy Policy</Link>, and <Link href="/cookies" className="underline" style={{ color: BLUE }}>Cookie Policy</Link> each open with a plain-English summary in addition to the full legal text.</>,
        ]} />
      </Section>

      <Section entry={TOC[3]}>
        <P>
          We are transparent about what is not yet fully conformant. The known items below are tracked and addressed in our normal release cadence.
        </P>
        <UL items={[
          <><strong style={{ color: IVORY }}>Embedded third-party widgets.</strong> Components served by third parties (Stripe payment fields, the ID.me verification flow, and the RON platform) follow their own accessibility roadmaps. We monitor each vendor's published accessibility conformance and raise issues directly when we detect a regression. See Section 09.</>,
          <><strong style={{ color: IVORY }}>Long-form legal pages.</strong> Our Terms of Service is intentionally exhaustive. We provide a sticky table of contents and per-section anchors, but extended legal copy is harder to navigate by screen reader than shorter pages. We continue to refine section headings and intra-page navigation.</>,
          <><strong style={{ color: IVORY }}>Auto-updating timing components.</strong> The "Next available" division status indicator and the promotional ticker auto-rotate; we are working to add a user-controlled pause toggle.</>,
          <><strong style={{ color: IVORY }}>Captioning of future media.</strong> Any video testimonials we publish in future will ship with full captions and a text transcript.</>,
        ]} />
        <P>
          Our target is to address each known limitation within ninety (90) days of identification. If you rely on a specific accommodation that is blocked by one of the items above, contact us — we will provide the same information or service through an alternative channel at no additional charge.
        </P>
      </Section>

      <Section entry={TOC[4]}>
        <P>
          Accessibility is not just about the website — it shapes how we deliver every service.
        </P>
        <UL items={[
          <><strong style={{ color: IVORY }}>Hospital, hospice, memory-care, and home settings.</strong> Our mobile notary routinely works with patients in beds, on oxygen, with feeding tubes, and with cognitive support needs. We do not charge a "complex setting" surcharge for ADA-related accommodations.</>,
          <><strong style={{ color: IVORY }}>Sign-language interpreters.</strong> We will arrange for a qualified ASL interpreter (or accept one you bring) at no additional notarial-service cost. Interpreter fees, when billed by an outside service, are passed through at cost.</>,
          <><strong style={{ color: IVORY }}>Large-print and read-aloud documents.</strong> On request, we will read every document aloud at the appointment for vision-impaired signers, or produce large-print copies of standard certificates.</>,
          <><strong style={{ color: IVORY }}>Additional time at appointments.</strong> Where the signer needs extra time to read, ask questions, or rest, we will not rush. We block additional time at no additional charge for ADA accommodations requested at booking.</>,
          <><strong style={{ color: IVORY }}>Communication preferences.</strong> Confirmations and reminders can be delivered by email, SMS, or phone call — whichever channel works best for you.</>,
        ]} />
      </Section>

      <Section entry={TOC[5]}>
        <P>
          To request an accommodation for an upcoming appointment, the easiest path is to mention it when you book and again on the confirmation reply. You can also reach us directly:
        </P>
        <UL items={[
          <>Phone: {PHONE}</>,
          <>Email: <a href={`mailto:${EMAIL}`} className="underline" style={{ color: BLUE }}>{EMAIL}</a></>,
          <>Accessibility-specific email: <a href={`mailto:${ACCESS_EMAIL}`} className="underline" style={{ color: BLUE }}>{ACCESS_EMAIL}</a></>,
        ]} />
        <P>
          When possible, please request accommodations at least forty-eight (48) hours before your appointment so we can coordinate with interpreters or schedule additional time. Same-day and short-notice requests are still welcome — we will do everything reasonable to honor them.
        </P>
      </Section>

      <Section entry={TOC[6]}>
        <SubH>How to Report</SubH>
        <P>
          If you encounter any feature on the website or in our service delivery that is difficult or impossible to use because of a disability, please tell us. We treat accessibility reports as priority issues.
        </P>
        <SubH>What to Include</SubH>
        <UL items={[
          <>The page or feature where you encountered the barrier (URL is helpful).</>,
          <>A short description of what you were trying to do and what blocked you.</>,
          <>The assistive technology you were using, if any (screen reader name and version, voice-control software, magnifier, etc.).</>,
          <>Your preferred contact method for our follow-up.</>,
        ]} />
        <SubH>Our Response Commitment</SubH>
        <P>
          We will acknowledge your report within five (5) business days and provide an estimated resolution timeline within ten (10) business days. Where we cannot fully fix the underlying issue immediately, we will provide an alternative way to complete the same task at no additional cost.
        </P>
      </Section>

      <Section entry={TOC[7]}>
        <P>
          We routinely test the {TRADE_NAME} site against the following assistive technology configurations:
        </P>
        <UL items={[
          <>VoiceOver on macOS (Safari) and iOS (Safari)</>,
          <>NVDA on Windows (Firefox and Chrome)</>,
          <>JAWS on Windows (Chrome) — periodically</>,
          <>TalkBack on Android (Chrome)</>,
          <>Keyboard-only navigation across all primary flows</>,
          <>Browser zoom up to 200% and 400% reflow checks</>,
          <>System-level dark-mode and reduced-motion settings</>,
        ]} />
      </Section>

      <Section entry={TOC[8]}>
        <P>
          Some parts of the booking experience rely on third-party components that maintain their own accessibility commitments and roadmaps:
        </P>
        <UL items={[
          <><strong style={{ color: IVORY }}>Stripe</strong> (payment processing) — Stripe's accessibility statement is published at <a href="https://stripe.com/accessibility" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>stripe.com/accessibility</a>. If a signer's assistive technology is not supported by Stripe's hosted payment fields, we will arrange a phone booking and an alternative payment method (check, ACH, or in-person card swipe at signing) at no extra cost.</>,
          <><strong style={{ color: IVORY }}>ID.me</strong> (HonorPass identity verification) — ID.me's accessibility commitment is at <a href="https://www.id.me/about/accessibility" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>id.me/about/accessibility</a>.</>,
          <><strong style={{ color: IVORY }}>RON platform</strong> (audio-visual notarial sessions) — captioning availability and supported assistive tech vary by platform; if you need a specific accommodation for a RON session, mention it at booking and we will arrange a compatible session or an in-person mobile alternative at no additional cost.</>,
        ]} />
        <P>
          When we receive a credible report that a third-party component is blocking accessibility, we raise it directly with the vendor and offer an alternative channel (typically a phone booking and in-person appointment) so the customer is not stuck waiting on a fix outside our control.
        </P>
      </Section>

      <Section entry={TOC[9]}>
        <P>
          Our accessibility coordinator can be reached at:
        </P>
        <div className="border-l-2 pl-4 my-6 text-[15px] font-light leading-relaxed" style={{ borderColor: BLUE, color: IVORY }}>
          Email: <a href={`mailto:${ACCESS_EMAIL}`} className="underline" style={{ color: BLUE }}>{ACCESS_EMAIL}</a><br />
          Phone: {PHONE}<br />
          Mail: P.O. Box 12, Austin, TX 78701, Attn: Accessibility Coordinator
        </div>
        <P>
          For our broader Terms of Service, see <Link href="/terms" className="underline" style={{ color: BLUE }}>/terms</Link>. For data and privacy questions, see our <Link href="/privacy" className="underline" style={{ color: BLUE }}>Privacy Policy</Link>.
        </P>
      </Section>

    </LegalShell>
  );
}
