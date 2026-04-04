import React from "react";
import { Link, useParams } from "wouter";
import { ChevronLeft, Upload, ScanLine, FileCheck, Video, MapPin, Package, Globe, FileText, Receipt, HelpCircle, FileSignature, AlertCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const EMERALD = "#047521";
const SIGNAL = "#40ff7d";
const CLOUD = "#f4ffff";

const guides = [
  {
    id: "upload-document-ron",
    icon: <Upload className="h-6 w-6" />,
    title: "How to Upload a Document for a RON Session",
    desc: "Getting your document ready for a RON session takes about two minutes.",
    steps: [
      { title: "Have your document as a PDF or image file", body: "Before your session, your document needs to be in a format you can share on screen or upload. PDFs work best. If you only have a paper copy, scan it first (see Guide 02: How to Scan a Document)." },
      { title: "Find your session link in your booking confirmation", body: "Docsy sends you a session link when your RON appointment is confirmed. Check your email or text messages for a message from Docsy Notary Services. The link will look something like a Zoom or Teams invite." },
      { title: "Option A — Screen share your document", body: "If your document is already open on your device (phone, laptop, or tablet), you can share your screen during the RON session. When the session starts, the notary will ask you to share your screen. On most devices: look for a 'Share Screen' button in the video call controls." },
      { title: "Option B — Upload through the session link", body: "Some RON platforms allow document uploads before the session. If the session link has an upload option, you'll see a prompt to attach your document. Click it, find your PDF or image file, and upload it. The notary will review it with you during the session." },
      { title: "During the session — sign where the notary directs you", body: "The notary will walk you through exactly where to sign. Do not sign anything before they direct you to. That's the whole reason the session exists." },
      { title: "Get your completed document", body: "After the session, your notarized document will be uploaded to your Docsy portal — usually within minutes. You'll get an email when it's ready. Download it, save it, or let Docsy Safe+ store it for you." },
    ],
    note: "Can't find your document? Check your Downloads folder, your email attachments, or your Google Drive/iCloud depending on where it was created. Document won't upload? Make sure it's a PDF, JPG, or PNG. Files over 25MB may need to be compressed first.",
  },
  {
    id: "scan-document",
    icon: <ScanLine className="h-6 w-6" />,
    title: "How to Scan a Document",
    desc: "You have a paper document. You need a digital version. Here are the fastest ways to do it — no scanner required.",
    steps: [
      { title: "The easiest option: use your phone", body: "Your phone camera is a scanner. Both iPhone and Android have built-in scanning tools that turn a photo of a document into a clean, flat PDF." },
      { title: "iPhone — Notes app scanner", body: "Open the Notes app. Create a new note. Tap the camera icon at the bottom. Select 'Scan Documents.' Hold your phone over the document — it auto-detects the edges and captures it. Tap Save. The scan saves to that note as a PDF." },
      { title: "Android — Google Drive scanner", body: "Open the Google Drive app. Tap the '+' button at the bottom right. Select 'Scan.' Point your camera at the document. Tap the shutter button. Adjust the crop if needed, then tap the checkmark. It saves as a PDF in your Google Drive." },
      { title: "Third option — Adobe Scan (free app)", body: "Adobe Scan is a free app for iPhone and Android that does one thing extremely well: scan documents. Download it, open it, point it at the document, and it automatically captures and flattens it into a high-quality PDF. Best option for multi-page documents." },
      { title: "Make sure the scan is readable", body: "Hold your phone steady. Good lighting makes a big difference — natural light or a well-lit room works better than a dim corner. The text should be clear and legible. If it's blurry, scan it again." },
      { title: "Send or share the PDF", body: "Once scanned, you can email it to yourself, upload it to Google Drive or iCloud, or share it directly from the app. For a RON session, you'll either share your screen or upload it to the session portal." },
    ],
    note: "For apostille orders: if you only have a personal copy of a vital record (birth certificate, marriage license, etc.), a scan is NOT sufficient. Those documents require a certified copy issued by the county or state. Contact us before ordering if you're not sure.",
  },
  {
    id: "certified-copy",
    icon: <FileCheck className="h-6 w-6" />,
    title: "How to Get a Certified Copy of a Vital Record",
    desc: "A certified copy is an officially issued copy of a document that comes directly from the government agency that issued the original.",
    steps: [
      { title: "Birth certificate", body: "Order from the vital statistics office of the state where you were born. In Texas: Texas DSHS Vital Statistics Unit at dshs.texas.gov. You'll need to provide ID and pay a fee (usually $22 in Texas). Processing takes 2–4 weeks by mail; same-day in person at Austin." },
      { title: "Marriage certificate", body: "Order from the county clerk's office in the county where the marriage took place. In Texas, search '[county name] county clerk Texas' and look for their vital records section. Fees and timelines vary by county." },
      { title: "Divorce decree", body: "Order from the district clerk's office in the county where the divorce was finalized. Search '[county name] district clerk Texas.' You may need the case number." },
      { title: "Death certificate", body: "Order from the Texas DSHS Vital Statistics Unit or from the county clerk in the county where the death occurred." },
      { title: "Diploma or transcript", body: "Contact the registrar's office at the school directly. Ask for a 'certified copy' or an 'official certified transcript.' It usually needs to come in a sealed envelope or with the registrar's original signature and seal." },
      { title: "How long does it take?", body: "Plan for at least 2–4 weeks for mail orders. If you have a hard deadline, ask about expedited options when you order. For apostille orders with tight timelines, contact Docsy first — we can often advise on the fastest path." },
    ],
  },
  {
    id: "ron-prep",
    icon: <Video className="h-6 w-6" />,
    title: "How to Prepare for Your RON Session",
    desc: "First time doing a Remote Online Notarization? Here's everything you need to do before you click that link.",
    steps: [
      { title: "Check your ID", body: "Your ID must be valid and not expired. Government-issued, with your photo on it. Driver's license, passport, state ID, or military ID all work. If your name on the document is different from your ID, have documentation of the name change ready." },
      { title: "Have your document ready", body: "Your document needs to be accessible — either as a file on your device or accessible to share on screen. If it's a paper document, scan it first (see Guide 02). Do NOT sign it yet." },
      { title: "Get your tech ready", body: "You need: a device with a working front-facing camera and microphone (phone, tablet, or laptop), a stable internet connection (WiFi preferred over cellular), and the session link from your Docsy confirmation. Test your camera and mic before the session if you can." },
      { title: "Find a private, quiet space", body: "RON sessions are legal proceedings. You need to be alone (or only with co-signers who are supposed to be there), in a quiet space, where you can speak and be heard clearly. The coffee shop is not the move here." },
      { title: "Turn off your VPN", body: "If you use a VPN, turn it off before the session. VPNs can interfere with the identity verification step and cause the session to fail. You can turn it back on after." },
      { title: "Wait for the notary to direct you", body: "When the session starts, the notary will walk you through every step. Do not sign anything, fill in any dates, or make any changes to the document until directed to do so." },
    ],
  },
  {
    id: "mobile-notary-prep",
    icon: <MapPin className="h-6 w-6" />,
    title: "How to Prepare for a Mobile Notary Visit",
    desc: "A mobile notary visit takes 15–30 minutes when everything is ready. Here's how to make sure it goes that smoothly.",
    steps: [
      { title: "Check your ID — before the day of the appointment", body: "Not the day of. The day before. If your ID is expired, there is nothing a notary can do to help you until you get a valid one. Check it now." },
      { title: "Have the original document", body: "Not a copy. Not a scan. The original. If you're not sure whether what you have counts as an 'original,' ask us before the appointment — not when we're standing at your door." },
      { title: "Make sure all signers are present", body: "If more than one person needs to sign, everyone needs to be there at the same time with their own valid ID. There's no 'she'll sign it later' — the signature has to happen in front of the notary." },
      { title: "Review the document but don't sign it", body: "Read through it. Make sure you understand what you're signing. Ask questions before the appointment if you have them. But don't sign anything — your signature needs to happen while the notary watches." },
      { title: "Have payment ready", body: "Cash, card, or Zelle as confirmed at booking. The estimated total was provided in your confirmation message." },
      { title: "The day of — be ready when we arrive", body: "The appointment time is when we show up, not when we start looking for a parking spot. If you need a few minutes to gather documents, that's fine — but know that wait time after the grace period is billed." },
    ],
  },
  {
    id: "apostille-submission",
    icon: <Package className="h-6 w-6" />,
    title: "How to Send Documents for Apostille",
    desc: "Sending original documents through the mail is nerve-wracking — we know. Here's how to do it safely.",
    steps: [
      { title: "Use the free Pre-Check before you send anything", body: "Text or email us a photo of your document first. We'll confirm it qualifies for apostille before you mail the original. This takes a few minutes and saves you from sending the wrong thing." },
      { title: "Make a copy for your records", body: "Before mailing anything, scan or photograph the document. Store it somewhere safe. You don't want to be in a situation where your only copy is in transit." },
      { title: "Package the document carefully", body: "Place it flat in a rigid envelope or between cardboard backing. Do not fold the document. Do not laminate it (laminated originals cannot be apostilled — ever). Use a rigid mailer or 9x12 envelope with cardboard stiffener." },
      { title: "Ship with tracking — always", body: "Use FedEx, UPS, or USPS Priority Mail with tracking and signature confirmation. Keep the tracking number. 'I sent it' is not useful if it doesn't show up." },
      { title: "Email us your tracking number", body: "Once shipped, email or text your tracking number to Docsy. This allows us to anticipate arrival, confirm receipt, and begin processing immediately." },
      { title: "Your document comes back the same way", body: "Docsy ships your apostilled original back to you via your preferred carrier. Shipping cost is billed at actual carrier rate. A pre-paid return label option is available — ask when ordering." },
    ],
  },
  {
    id: "client-portal",
    icon: <Globe className="h-6 w-6" />,
    title: "How to Access Your Docsy Client Portal",
    desc: "Your Docsy portal is where everything lives — your completed documents, invoices, appointment history, referral credits, and vault storage.",
    steps: [
      { title: "Check your confirmation email", body: "When you booked your first Docsy appointment, a portal access link was sent to the email you provided. Search your inbox for 'Docsy Notary Services' if you can't find it." },
      { title: "Click the activation link", body: "The first time you access your portal, you'll need to click the activation link and create a password. This only happens once." },
      { title: "Your documents are already there", body: "After every completed appointment, your documents are uploaded automatically. You don't have to request them — they're just there. Click the document to download or view." },
      { title: "Check your Safe+ vault", body: "If you received a free 90-day Safe+ trial (included with every apostille and loan signing order), your vault is already active. You can upload additional documents directly through the portal." },
      { title: "Find your referral code", body: "Your unique referral code is in your portal dashboard. Share it with anyone who needs Docsy services — when they book and complete an appointment, you get $10 off your next service." },
      { title: "Can't log in?", body: "Use the 'Forgot Password' option on the login page. If you're still stuck, text us and we'll get you sorted." },
    ],
  },
  {
    id: "after-notarization",
    icon: <FileText className="h-6 w-6" />,
    title: "What Happens After Your Document Is Notarized?",
    desc: "The notarization is done. Now what? Here's what to do with your document depending on what you needed it for.",
    steps: [
      { title: "For standard personal use (affidavits, POA, etc.)", body: "Keep the original in a safe place. A certified copy or scan stored in your Docsy Safe+ vault gives you access to it forever. Share or use the document as required by whoever requested it." },
      { title: "For real estate transactions", body: "The notarized document goes to your title company or lender as directed. Docsy returns scanbacks immediately after a loan signing — your title team will have them fast." },
      { title: "For apostille (next steps after notarization)", body: "If your notarized document also needs an apostille, the notarization is the first step — not the final one. Docsy can handle both in sequence. If you need to get an apostille on a document that was just notarized, let us know and we'll proceed directly." },
      { title: "For court reporting / deposition transcripts", body: "Your transcript will be delivered via your Docsy portal on the delivery schedule you selected at booking. New clients: access activates when the invoice balance is paid. Established clients: access on delivery, NET 30 on the balance." },
      { title: "Store it — don't lose it", body: "Original notarized documents are a pain to replace. Your Docsy portal automatically stores a copy of every completed document. If you also want long-term storage, activate or upgrade your Docsy Safe+ vault." },
      { title: "Share your experience", body: "If everything went the way it was supposed to — which is the goal every time — a Google review goes a long way. It takes 60 seconds. Leave one and get $5 off your next service." },
    ],
  },
  {
    id: "read-invoice",
    icon: <Receipt className="h-6 w-6" />,
    title: "How to Read Your Docsy Invoice",
    desc: "Docsy invoices are itemized. Every line has a reason. Here's how to read them — and what to do if something doesn't look right.",
    steps: [
      { title: "Statutory notary fees are listed first and separately", body: "Texas law (Gov. Code §406.024) requires that notary fees be listed separately from all other service fees. The first section of your invoice will show the statutory notary fee: $10 for the first signature, $1 for each additional signature on the same document. These are legally capped amounts." },
      { title: "Travel fees are listed separately too", body: "Travel fees are non-statutory — they're not regulated by Texas law. They'll appear as a separate line item with the travel tier or distance. This is also required by Texas law when charging both notary fees and travel fees." },
      { title: "Service fees are everything else", body: "RON platform time, loan signing package, apostille processing, court reporting appearance, add-ons — these all appear as individual line items with the rate that was disclosed at booking." },
      { title: "Discounts show up as negative lines", body: "Membership discounts, promo codes (Night Shift Seal™, Early Route™, etc.), and referral credits all appear as negative line items so you can see exactly what was applied." },
      { title: "If something doesn't match your estimate", body: "All disputes must be submitted in writing within 7 calendar days of invoice receipt. Email or text us with the specific line item in question. Good faith disputes are resolved within 10 business days. Undisputed portions remain due regardless of any open dispute." },
      { title: "How to pay", body: "Check (payable to Docsy Notary Services), ACH/wire transfer (preferred, no fee), credit or debit card (3% processing fee), or Zelle. Payment details are on every invoice." },
    ],
  },
  {
    id: "need-apostille",
    icon: <HelpCircle className="h-6 w-6" />,
    title: "Does My Document Need an Apostille?",
    desc: "If you're using a US document in another country for anything official, probably yes. Here's the longer answer.",
    steps: [
      { title: "Is the country you're sending the document to a Hague Convention member?", body: "The apostille system only works between countries in the 1961 Hague Convention — which covers 125+ countries including most of Europe, Latin America, and many others. If the destination country is NOT a Hague member (like China, UAE, or several others), an apostille won't work — you'll need a different authentication process. Google the country name + 'Hague Convention member' to check." },
      { title: "What are you using the document for?", body: "Immigration, visa, or citizenship application: almost certainly yes. Employment abroad: usually yes. Education (foreign university): usually yes. Business registration in another country: yes. Personal family matters (marriage, adoption): yes. Just traveling: probably no." },
      { title: "Who issued the document?", body: "Texas-origin documents (issued by a Texas government office) can be apostilled by the Texas Secretary of State. Documents from other US states need to be apostilled by that state's Secretary of State. Federal documents (FBI background checks, State Department docs) go through the US Department of State." },
      { title: "Does your document have a notarization on it?", body: "Non-recordable documents (diplomas, transcripts, powers of attorney, affidavits) need an original Texas notarization before they can be apostilled. If your document doesn't have a Texas notary seal, we can handle the notarization first and then proceed to apostille." },
      { title: "Still not sure? Use the free Pre-Check", body: "Send Docsy a photo of your document and tell us what country it's going to. We'll tell you exactly what it needs — whether that's an apostille, a different authentication process, or nothing. Free. No commitment." },
      { title: "What if you need multiple documents apostilled?", body: "Bundle pricing is available for 5 or more documents at $90 each. Each additional document added to the same order is $100. Contact us to start the process." },
    ],
  },
  {
    id: "power-of-attorney",
    icon: <FileSignature className="h-6 w-6" />,
    title: "What Is a Power of Attorney and When Do I Need One?",
    desc: "We notarize a lot of powers of attorney. Here's the plain-language version — note that this is educational information, not legal advice.",
    steps: [
      { title: "What it is", body: "A Power of Attorney (POA) is a legal document that gives one person (the agent) the authority to act on behalf of another person (the principal) for specific purposes. It can be broad (general POA) or limited to specific transactions (limited POA)." },
      { title: "Common types", body: "General POA: broad authority over financial and legal matters. Limited/Special POA: authority for a specific transaction or time period. Durable POA: remains effective if the principal becomes incapacitated. Healthcare POA: authority to make medical decisions." },
      { title: "When you might need one", body: "You're traveling and need someone to handle a transaction for you. You're buying or selling real estate remotely. You're aging and want a family member to manage your affairs. You're deployed or otherwise unavailable. A family member needs medical decisions made if they're incapacitated." },
      { title: "What the notary does", body: "A notary's role is to verify your identity and witness your signature — not to evaluate the document's content or legality. We confirm you are who you say you are and that you're signing voluntarily. Whether the POA is legally sufficient for your specific purpose is a legal question for an attorney." },
      { title: "What to have ready for the notarization", body: "The completed document (drafted by you or an attorney — Docsy cannot draft legal documents). All parties who need to sign present with valid ID. Witnesses if required by your state." },
      { title: "Docsy's role", body: "We provide the notarization — the official witness and seal. We don't advise on whether the document is legally sufficient for your situation. If you're not sure, consult an attorney before your appointment." },
    ],
  },
  {
    id: "appointment-issues",
    icon: <AlertCircle className="h-6 w-6" />,
    title: "What to Do If Your Appointment Didn't Go as Planned",
    desc: "Sometimes things happen. ID is expired. Document is incomplete. Wrong type of copy. Here's what to do in each scenario.",
    steps: [
      { title: "Expired or missing ID", body: "You'll need to get a valid ID before we can complete the notarization. In Texas, a new driver's license or state ID takes 2–3 weeks to arrive by mail; same-day at a DPS office if you can get an appointment. A passport can be expedited. Text us when you have valid ID — we'll rebook at no additional cancellation fee if this was the reason for the original failed appointment." },
      { title: "You already signed the document", body: "If you signed before the notary arrived or the RON session began, we generally cannot notarize it. The signature must be witnessed. You'll need a new copy of the document to sign in front of us. Check with whoever provided the document about getting a fresh copy." },
      { title: "Wrong type of document (copy instead of original)", body: "For apostilles and many notarizations, a personal copy or scan isn't enough. You need the original or a certified copy issued by the relevant government agency. See Guide 03 for how to get a certified copy of a vital record." },
      { title: "Document has blank fields or is incomplete", body: "A document with blank required fields generally can't be notarized. Fill in all required fields before the appointment. If you're not sure what goes in a field, consult whoever gave you the document — or an attorney." },
      { title: "Missing co-signer or witness", body: "All signers must be present at the same time. If a required co-signer couldn't make it, we'll need to reschedule for when everyone can be there. For RON, co-signers can join remotely from a different location." },
      { title: "Contact Docsy directly", body: "Whatever happened — text or email us. We'll tell you exactly what needs to happen before we can rebook, what the fees are (cancellation and travel fees may apply per the rate schedule), and what the fastest path forward looks like." },
    ],
  },
];

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <Link
      href={`/help-center/${guide.id}`}
      className="group flex flex-col rounded-xl p-6 md:p-8 h-full transition-all duration-200 hover:-translate-y-1"
      style={{ backgroundColor: TERMINAL, border: `1px solid ${EMERALD}` }}
      data-testid={`guide-card-${guide.id}`}
    >
      <div className="mb-4" style={{ color: `${CLOUD}99` }}>{guide.icon}</div>
      <h3 className="font-bold text-base leading-snug mb-3" style={{ color: CLOUD }}>{guide.title}</h3>
      <p className="text-xs leading-relaxed flex-1" style={{ color: `${CLOUD}66` }}>{guide.desc}</p>
      <div className="mt-5 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-200" style={{ color: SIGNAL }}>
        Read guide <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

function GuideArticle({ id }: { id: string }) {
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: TERMINAL }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: `${CLOUD}66` }}>Guide not found.</p>
          <Link href="/help-center" className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium" style={{ backgroundColor: CAROLINA, color: CLOUD }}>
            Back to Help Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>
      <section className="relative pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/help-center" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors" style={{ color: `${CLOUD}4d` }} data-testid="btn-back-help">
            <ChevronLeft className="h-3.5 w-3.5" /> Help Center
          </Link>
          <div className="mb-4" style={{ color: CAROLINA }}>{guide.icon}</div>
          <h1 className="text-[1.8rem] leading-[1.15] sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: CLOUD }}>
            {guide.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: `${CLOUD}b3` }}>{guide.desc}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          {guide.steps.map((step, i) => (
            <div key={i} className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${EMERALD}66` }}>
              <div className="flex items-start justify-center w-16 shrink-0 pt-6 pb-6" style={{ backgroundColor: CAROLINA }}>
                <span className="text-xl font-bold" style={{ color: CLOUD }}>{i + 1}</span>
              </div>
              <div className="flex-1 p-6">
                <h3 className="font-bold text-base mb-2" style={{ color: CLOUD }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>{step.body}</p>
              </div>
            </div>
          ))}

          {guide.note && (
            <div className="rounded-xl p-6 mt-8 flex items-start gap-4" style={{ backgroundColor: "#000F0A", border: `1px solid ${CLOUD}1a` }}>
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: CAROLINA }} />
              <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}b3` }}>{guide.note}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function HelpCenter() {
  const params = useParams<{ id?: string }>();
  const id = params?.id;

  React.useEffect(() => {
    if (id) {
      const guide = guides.find((g) => g.id === id);
      document.title = guide ? `${guide.title} | Docsy Help Center` : "Help Center | Docsy Notary Services";
    } else {
      document.title = "Help Center | Docsy Notary Services";
    }
  }, [id]);

  if (id) return <GuideArticle id={id} />;

  return (
    <div className="w-full" style={{ backgroundColor: TERMINAL }}>

      <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${CAROLINA}0d` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Reveal>
              <p className="text-sm font-medium mb-6" style={{ color: SIGNAL }}>Help Center · Step-by-Step Guides</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: CLOUD }}>
                Guides that actually{" "}<span style={{ color: CAROLINA }}>explain things.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: `${CLOUD}b3` }}>
                We built these guides because most legal document resources are written for lawyers, not for the person who just found out they need an apostille by Friday.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {guides.map((guide, i) => (
              <Reveal key={guide.id} delay={i * 60}>
                <GuideCard guide={guide} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})` }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)` }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>Didn't find what you need?</h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>Text us directly and we'll explain it. No runaround.</p>
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}>
              Contact Us <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
