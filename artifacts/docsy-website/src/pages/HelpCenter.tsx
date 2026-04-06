import React from "react";
import { Link, useParams } from "wouter";
import { ChevronLeft, Upload, ScanLine, FileCheck, Video, MapPin, Package, Globe, FileText, Receipt, HelpCircle, FileSignature } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG = "#131929";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

const guides = [
  {
    id: "how-to-book-ron",
    icon: Video,
    title: "How to Book a Remote Online Notarization (RON)",
    summary: "Step-by-step guide to booking and completing your first RON appointment.",
    content: [
      { heading: "Step 1 — Check your equipment", body: "You need: a device with a working front-facing camera and microphone (laptop, phone, or tablet), a stable internet connection, a valid unexpired government-issued photo ID, and your document accessible as a file or ready to share on screen." },
      { heading: "Step 2 — Book your appointment", body: "Contact Docsy directly. Tell us: what document you need notarized, whether you're available now (same-hour) or need a specific time. You'll know your price before you confirm — always. RON is $25 for the first notarization, $10 for each additional signature in the same session." },
      { heading: "Step 3 — Join the session", body: "Docsy will send a secure video link to your email or phone. Click it at your appointment time. You don't need to install anything — it works in your browser." },
      { heading: "Step 4 — Complete the notarization", body: "The notary will verify your ID on camera. Do NOT sign your document before the session — your signature must happen live in front of the notary. Follow the notary's instructions for signing and dating. The notary will apply the digital seal during the session." },
      { heading: "Step 5 — Receive your documents", body: "You'll receive a certified digital copy via email immediately. If you have Docsy Safe+, the document uploads automatically to your vault." },
    ],
  },
  {
    id: "how-to-book-mobile",
    icon: MapPin,
    title: "How to Book a Mobile Notary Visit",
    summary: "What to do before, during, and after your mobile notary appointment.",
    content: [
      { heading: "Step 1 — Know your location", body: "Tell us the address where you need the notary to come. This can be your home, office, hospital, nursing home, or any other location in our service area. Travel fees are calculated by distance tier (0–10 mi, 11–25 mi, 26–40 mi, 40+ mi)." },
      { heading: "Step 2 — Have your ID ready", body: "Valid, unexpired, government-issued photo ID. No expired IDs. If your name has changed since the ID was issued, bring proof of the name change too." },
      { heading: "Step 3 — Do NOT pre-sign", body: "This is the most common mistake. Do not sign your document before the notary arrives. Your signature must happen in front of the notary. Don't fill in dates early either — the notary will tell you when and where to sign." },
      { heading: "Step 4 — Confirm your appointment", body: "You'll know your full price before the appointment is confirmed. Review it. Make sure you understand all fees. Reply to confirm, and we'll be there." },
      { heading: "Step 5 — Complete and pay", body: "The notary will guide you through signing. You'll receive an itemized invoice after. Payment methods: check, ACH/wire (no fee), card (3% fee), Zelle." },
    ],
  },
  {
    id: "what-id-is-accepted",
    icon: FileCheck,
    title: "What ID Is Accepted for Notarization?",
    summary: "Exactly what qualifies. No guessing.",
    content: [
      { heading: "Accepted IDs", body: "Valid, unexpired, government-issued photo ID only. Specifically: U.S. driver's license, U.S. state-issued ID card, U.S. passport or passport card, U.S. military ID (active or retired), Permanent Resident Card (Green Card), and some tribal IDs." },
      { heading: "Expired ID", body: "Cannot be accepted. No exceptions. If your ID is expired, the notarization cannot proceed until you have valid ID." },
      { heading: "Foreign passports", body: "Generally accepted for RON with additional identity verification steps. Contact Docsy before booking if you only have a foreign passport." },
      { heading: "Name discrepancies", body: "If the name on your document doesn't match your ID exactly — due to a name change, marriage, divorce, or clerical error — bring documentation proving the name change (marriage certificate, court order, divorce decree). Without it, notarization may not be possible." },
      { heading: "Photographed or scanned IDs", body: "For in-person notarizations, only physical IDs are accepted. For RON, the ID is shown on camera and must be legible, unexpired, and authentic." },
    ],
  },
  {
    id: "how-to-send-apostille",
    icon: Upload,
    title: "How to Send Documents for Apostille",
    summary: "Original documents only. Here's exactly what to do.",
    content: [
      { heading: "Step 1 — Use the Free Pre-Check", body: "Before sending anything, use Docsy's free Pre-Check service. Text or email us a photo or scan of your document and we'll tell you whether it qualifies, what kind of apostille it needs, and the total cost — before you send anything. This prevents costly mistakes.\n\n📱 Text: (512) 555-0190\n📧 Email: hello@docsynotary.com" },
      { heading: "Step 2 — Get the right copy", body: "For vital records (birth certificates, marriage licenses, death certificates, divorce decrees): you need a certified copy issued by the county or state. Not a personal photocopy. Not a scan. A certified copy with a raised seal or official stamp. For notarized documents: the original signed and notarized document." },
      { heading: "Step 3 — Ship safely", body: "Do not laminate documents. Use a padded mailer or document sleeve. Use a trackable shipping method — we recommend USPS Priority Mail with tracking, or FedEx. Keep your tracking number." },
      { heading: "Step 4 — What happens next", body: "Docsy reviews the document on receipt. If anything is off, we'll contact you immediately. Otherwise we file it at the Texas Secretary of State. You'll receive a digital certified scan the moment it's complete. The original is returned to you via trackable mail." },
    ],
  },
  {
    id: "how-to-read-your-invoice",
    icon: Receipt,
    title: "How to Read Your Docsy Invoice",
    summary: "Every line item explained.",
    content: [
      { heading: "Statutory Notary Fee", body: "This is the state-regulated notary fee: $10 for the first notarized signature, $1 for each additional signature on the same document. These are set by Texas law and cannot be waived." },
      { heading: "Service Fee", body: "Docsy's fee for the service type: RON session fee, mobile visit coordination, apostille processing, loan signing fee, court reporting appearance fee, etc. This is what varies by service and is itemized separately from the statutory notary fee, as required by law." },
      { heading: "Travel Fee (mobile only)", body: "Based on your distance tier from the notary. Listed at booking before you confirm." },
      { heading: "Timing Add-Ons", body: "Rush, after-hours, and late-night surcharges — only if applicable. Always disclosed at booking. Never added after the fact." },
      { heading: "Discounts Applied", body: "If you booked with a promotion (Early Bird, HonorPass, etc.), it appears as a line item discount. The final total matches the price you saw before booking." },
    ],
  },
  {
    id: "apostille-what-qualifies",
    icon: Globe,
    title: "What Documents Can Be Apostilled?",
    summary: "A plain-language guide to apostille eligibility.",
    content: [
      { heading: "Texas-origin documents", body: "Any document issued by a Texas authority — birth certificates, marriage licenses, death certificates, divorce decrees, court orders, school transcripts, diplomas, business filings — is eligible for a Texas apostille." },
      { heading: "Documents notarized by a Texas notary", body: "Powers of attorney, affidavits, agreements, or any other document that was signed in front of a Texas notary public can receive a Texas apostille." },
      { heading: "Federal documents", body: "FBI background checks, Social Security documents, federal agency documents — these require a USDOS apostille (not a Texas apostille). Docsy handles federal apostilles at $275." },
      { heading: "What cannot be apostilled", body: "Photocopies, scans, laminated documents, documents from other states (need to apostille in the issuing state), or documents for countries not in the Hague Convention." },
    ],
  },
  {
    id: "loan-signing-what-to-expect",
    icon: FileSignature,
    title: "What to Expect at a Loan Signing",
    summary: "For borrowers — what to bring and what not to do.",
    content: [
      { heading: "Bring valid ID", body: "Both signers (if applicable) must have valid, unexpired, government-issued photo ID. Check the name on your ID against the loan documents — they should match. If they don't, notify your lender or title company before the appointment." },
      { heading: "Do NOT pre-sign", body: "Do not sign anything before the signing agent arrives. The agent must witness every signature on the loan documents. Pre-signing voids the document and will require a re-signing." },
      { heading: "Clear 60–90 minutes", body: "A typical loan package has 80–150+ pages. Most signings take 45–75 minutes depending on the package size and how many questions come up. HELOC and reverse mortgage signings sometimes take longer." },
      { heading: "The notary can't give legal advice", body: "The signing agent is there to facilitate the signing, not to explain what the loan terms mean. If you have questions about the loan itself, contact your lender before the appointment — not during." },
      { heading: "Scanbacks (title companies)", body: "Docsy returns scanbacks immediately on completion of refinance and buyer packages. You'll have them before the borrowers have left the table." },
    ],
  },
  {
    id: "docsy-safe-plus",
    icon: ScanLine,
    title: "How Docsy Safe+ Works",
    summary: "Encrypted storage for all Docsy appointment deliverables.",
    content: [
      { heading: "What it is", body: "Docsy Safe+ is an encrypted file vault that automatically stores every deliverable from every Docsy appointment. No uploading required. Every RON notarization, every apostille, every loan signing, every court reporting session — transcripts and audio included — stored automatically." },
      { heading: "Free trial", body: "Docsy Safe+ starts automatically with your first service — no signup, no credit card required, unless you opt out. 30 days free. After 30 days, continue for $7/month or stop — no automatic charge." },
      { heading: "Access", body: "Access your vault from any device, any time. Download or share documents, transcripts, and audio files directly from your vault. Grant family members access (Family plan)." },
      { heading: "Plans", body: "Free (up to 5 files), Personal $7/month (up to 50 files), Family $18/month (up to 150 files, 4 users), Professional $29/month (up to 500 files), Business/Enterprise (custom pricing, contact Docsy)." },
    ],
  },
  {
    id: "court-reporting-how-it-works",
    icon: FileText,
    title: "How Docsy Court Reporting Works",
    summary: "For attorneys and legal teams — from booking to transcript delivery.",
    content: [
      { heading: "Booking", body: "Contact Docsy at least 48 hours before the deposition when possible. Provide: case name, deposition date and time, location or video platform (Zoom, Teams, etc.), names of witnesses, estimated duration, and whether you need a transcript." },
      { heading: "Appearance", body: "The certified digital reporter arrives at least 10 minutes before the scheduled start. For remote depositions, a tech check is included at no charge. The reporter administers the oath, marks exhibits, and manages the transcript record." },
      { heading: "Transcript delivery", body: "Ordinary (30-day) transcripts are $4.75/page. Rush options available. Word index, certified PDF, and e-transcript are always included. No separate line items for these. Transcripts are delivered via secure portal." },
      { heading: "Payment", body: "Appearance-only: NET 14, no deposit required. Transcript orders: 50% deposit at scheduling, balance on delivery. Corporate accounts: NET 30 available, contact Docsy." },
    ],
  },
  {
    id: "what-notaries-cant-do",
    icon: HelpCircle,
    title: "What Notaries Can't Do",
    summary: "Important limitations to know before your appointment.",
    content: [
      { heading: "Notaries can't provide legal advice", body: "A notary's role is ministerial — we verify identity, witness signatures, and apply a seal. We can't tell you whether a document is legally sufficient, whether it meets a specific legal requirement, or what it means. For those questions, consult a licensed attorney." },
      { heading: "Notaries can't notarize documents they have a financial interest in", body: "A notary cannot notarize a document in which they are a named beneficiary, party, or have a financial stake." },
      { heading: "Notaries can't notarize without the signer present", body: "The signer must be physically present (or on camera for RON). No exceptions. We cannot notarize a signature that was already applied, or for someone who isn't there." },
      { heading: "Notaries can't accept expired ID", body: "No matter the circumstances. If your ID is expired, the notarization cannot proceed." },
      { heading: "Notaries can't notarize incomplete documents", body: "Documents with blank spaces that are intended to be filled in cannot be notarized. Every blank space must either be filled in or crossed out and initialed." },
    ],
  },
  {
    id: "safe-plus-trial-faq",
    icon: Package,
    title: "Docsy Safe+ Trial — What You Need to Know",
    summary: "Exactly how the 30-day trial works.",
    content: [
      { heading: "How do I get the trial?", body: "Complete your first service with Docsy. Safe+ activates automatically — no signup, no credit card required. You can opt out before your appointment if you prefer." },
      { heading: "What's included in the trial?", body: "Full Personal plan access (up to 50 files, 4 users) for 30 days. All files from your Docsy appointment — documents, transcripts, and audio recordings — upload automatically. You can also upload other files manually." },
      { heading: "What happens after 30 days?", body: "Nothing automatic. There is no auto-charge. You'll receive a reminder before the trial ends. If you want to continue, choose a plan and subscribe. If you don't, your files remain accessible in read-only mode for 30 more days, then require a subscription to access." },
      { heading: "Can I use the trial more than once?", body: "The free trial applies to your first apostille or loan signing order. Repeat orders don't trigger another trial. If you need a trial extension for any reason, contact Docsy." },
    ],
  },
  {
    id: "billing-and-payments",
    icon: Receipt,
    title: "Billing & Payment Methods",
    summary: "Every payment option and when it applies.",
    content: [
      { heading: "Payment methods", body: "Check (personal or business), ACH/wire transfer (preferred — no processing fee), credit or debit card (3% processing fee, disclosed before charging), and Zelle (no fee)." },
      { heading: "Know your price before you book", body: "Every appointment is priced before you confirm. The invoice total will match what you saw at booking. If it doesn't, call us." },
      { heading: "Deposit policy", body: "Court reporting transcript orders: 50% deposit at scheduling. All other services: no deposit required unless specified." },
      { heading: "When is payment due?", body: "For most services: at or immediately after completion. Court reporting appearances: NET 14. Corporate accounts: NET 30 available upon request." },
      { heading: "Itemized invoices", body: "Every invoice separates the statutory notary fee from the service fee, as required by Texas law. All other charges (travel, rush, timing) are listed separately. No bundled mystery fees." },
    ],
  },
];

function GuideDetail({ guide }: { guide: typeof guides[0] }) {
  return (
    <div className="w-full" style={{ backgroundColor: BG }}>
      <div className="border-b border-[#1e2a3a] px-5 py-4">
        <Link href="/help-center" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Help Center
        </Link>
      </div>

      <section className="px-5 pt-14 pb-12 border-b border-[#1e2a3a]" style={{ backgroundColor: IVORY }}>
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
              <div className="border-b border-[#1e2a3a] last:border-b-0 pb-10 mb-10 last:pb-0 last:mb-0">
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

export default function HelpCenter() {
  const params = useParams<{ id?: string }>();
  const id = params?.id;

  const guide = id ? guides.find((g) => g.id === id) : null;
  if (guide) return <GuideDetail guide={guide} />;

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      <section className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <HI>Help Center.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg sm:text-xl text-black/60 max-w-xl font-medium">
              Step-by-step guides for every Docsy service. Plain language. No runaround.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-[#1e2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e2a3a]">
            {guides.map((guide, i) => (
              <FadeIn key={guide.id} delay={i * 50} threshold={0.05}>
                <Link
                  href={`/help-center/${guide.id}`}
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

      <section className="py-20 sm:py-24 px-5 border-t border-[#1e2a3a] text-center" style={{ backgroundColor: IVORY }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Still have a question?
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-lg text-black/60 mb-8">Text us. We'll tell you straight.</p>
          </FadeIn>
          <FadeIn delay={160}>
            <Link href="/faq" className="inline-block px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: "#000" }}>
              Browse FAQ
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
