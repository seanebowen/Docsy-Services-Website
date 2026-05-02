import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  Building2, Briefcase, FileSignature, Globe2, Mic2, ShieldCheck,
  Receipt, Users, Calendar, Mail, Phone, Clock, User as UserIcon,
} from "lucide-react";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

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

/* ────────────────────────────────────────────────────────────────────
   Docsy Business+ tier ladder
   - Solo / Pro / Elite are individual membership tiers (backend
     storage is still `starter` / `pro` / `elite` so MembershipCheckout
     and Calculator pricing keep working unchanged).
   - Firm is the B2B title-company / law-firm tier; CTA goes to the
     apply form anchor lower on the page (or sign-in for existing).
   ──────────────────────────────────────────────────────────────────── */

interface TierCard {
  badge:    string;
  name:     string;
  price:    string;
  blurb:    string;
  features: string[];
  cta:      { label: string; href: string; testid: string };
  highlight?: boolean;
}

const TIERS: TierCard[] = [
  {
    badge:  "INDIVIDUAL",
    name:   "Solo",
    price:  "$15/mo",
    blurb:  "For one person who uses Docsy a few times a year.",
    features: [
      "5% off every booking",
      "1 half-off notarization / month",
      "10% off mobile travel fees",
      "30-day credit rollover",
      "Hours: 9 AM – 9 PM, 7 days",
    ],
    cta: { label: "Get Solo →", href: "/membership-checkout?plan=starter", testid: "tier-solo-cta" },
  },
  {
    badge:  "INDIVIDUAL",
    name:   "Pro",
    price:  "$30/mo",
    blurb:  "For freelancers, paralegals, and signing agents.",
    features: [
      "10% off every booking",
      "1 free notarization / month",
      "15% off mobile travel fees",
      "Birthday bonus notarization",
      "Hours: 9 AM – 9 PM, 7 days",
    ],
    cta: { label: "Get Pro →", href: "/membership-checkout?plan=pro", testid: "tier-pro-cta" },
  },
  {
    badge:  "INDIVIDUAL",
    name:   "Elite",
    price:  "$49/mo",
    blurb:  "For heavy individual users — frequent mobile + RON.",
    features: [
      "15% off every booking",
      "2 free notarizations / month",
      "20% off mobile travel fees",
      "1 free travel-fee waiver / month",
      "Birthday bonus notarization",
    ],
    cta: { label: "Get Elite →", href: "/membership-checkout?plan=elite", testid: "tier-elite-cta" },
  },
  {
    badge:  "BUSINESS · TITLE · LAW · LENDER",
    name:   "Firm",
    price:  "Custom",
    blurb:  "For title companies, law firms, lenders, corporate legal.",
    features: [
      "Bulk-book up to 100 jobs / batch from a spreadsheet",
      "Multi-user roster — admin + members",
      "NET 30 monthly invoicing",
      "Dedicated point of contact",
      "Extended priority hours: 24/7 RON · 6 AM – Midnight mobile",
    ],
    cta: { label: "Apply for a firm account →", href: "#apply", testid: "tier-firm-cta" },
    highlight: true,
  },
];

const SERVICE_OPTIONS: { id: string; label: string; icon: React.ElementType }[] = [
  { id: "loan-signing", label: "Loan Signing",  icon: FileSignature },
  { id: "ron",          label: "RON",            icon: Globe2 },
  { id: "mobile",       label: "Mobile / GNW",   icon: Briefcase },
  { id: "apostille",    label: "Apostille",      icon: ShieldCheck },
  { id: "court",        label: "Court Reporting",icon: Mic2 },
];

const FIRM_TYPES = [
  { id: "title-company", label: "Title Company" },
  { id: "law-firm",      label: "Law Firm" },
  { id: "lender",        label: "Lender / Mortgage" },
  { id: "corporate",     label: "Corporate Legal Dept." },
  { id: "other",         label: "Other" },
] as const;

interface ApplyForm {
  name:    string;
  ein:     string;
  type:    string;
  address: string;
  contactName:  string;
  contactEmail: string;
  contactPhone: string;
  expectedMonthlyVolume: string;
  serviceMix: string[];
  notes:   string;
}

const EMPTY_FORM: ApplyForm = {
  name: "", ein: "", type: "title-company", address: "",
  contactName: "", contactEmail: "", contactPhone: "",
  expectedMonthlyVolume: "10",
  serviceMix: ["loan-signing"],
  notes: "",
};

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-widest text-black/70 mb-1.5 block">
        {label}{required ? <span className="text-red-700"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export default function Business() {
  const [form,        setForm]        = useState<ApplyForm>(EMPTY_FORM);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted,   setSubmitted]   = useState<string | null>(null);

  useEffect(() => {
    document.title = "Docsy Business+ — Memberships & Firm Accounts | Docsy Services";
  }, []);

  function toggleService(id: string) {
    setForm(f => ({
      ...f,
      serviceMix: f.serviceMix.includes(id)
        ? f.serviceMix.filter(s => s !== id)
        : [...f.serviceMix, id],
    }));
  }

  async function submitApplication(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = {
        name:    form.name.trim(),
        ein:     form.ein.trim(),
        type:    form.type,
        address: form.address.trim(),
        primaryContact: {
          name:  form.contactName.trim(),
          email: form.contactEmail.trim(),
          phone: form.contactPhone.trim(),
        },
        expectedMonthlyVolume: Number(form.expectedMonthlyVolume) || 0,
        serviceMix: form.serviceMix,
        notes:      form.notes.trim(),
      };
      const res  = await fetch("/api/firms/apply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json() as { ok: boolean; firm?: { name: string }; error?: string };
      if (!data.ok) {
        setSubmitError(data.error ?? "Could not submit your application. Please try again.");
        return;
      }
      setSubmitted(data.firm?.name ?? form.name.trim());
      setForm(EMPTY_FORM);
      setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch {
      setSubmitError("Network error. Please try again or call us at (210) 417-9614.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-5 pt-12 pb-14 sm:pt-16 sm:pb-20" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6" style={{ borderColor: "#000", color: "#000" }}>
              ◆ Docsy Business+
            </span>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.75rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              <HI>One product</HI><br />
              for individuals and firms.
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-lg sm:text-xl text-black/65 mb-10 max-w-2xl font-medium leading-snug">
              Docsy Business+ is a tiered subscription. <strong>Solo, Pro, and Elite</strong> are built for individuals — discounts, free monthly notarizations, priority booking. <strong>Firm</strong> is built for title companies, law firms, lenders, and corporate legal teams — bulk-booking, NET 30, multi-user rosters, and extended priority hours.
            </p>
          </FadeIn>
          <FadeIn delay={220}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#tiers" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }} data-testid="hero-see-tiers">
                See the tiers →
              </a>
              <a href="#apply" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black" data-testid="hero-apply-firm">
                Apply for a firm account →
              </a>
              <Link href="/firm/portal" className="px-8 py-4 text-base font-bold text-center border-2" style={{ borderColor: BLUE, color: BLUE, backgroundColor: "rgba(255,255,255,0.6)" }}>
                Existing firm? Sign in →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Tier ladder ───────────────────────────────────── */}
      <section id="tiers" className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-6xl mx-auto">
          <Label icon="⊟" text="THE TIER LADDER" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-3" style={{ letterSpacing: "-0.02em" }}>
              Pick the tier that <HI>matches how you use Docsy.</HI>
            </h2>
            <p className="text-base text-white/45 text-center max-w-2xl mx-auto mb-14">
              Three tiers for individuals, one tier for firms. Cancel any time. Annual plans for individual tiers come with a 15% discount.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: DIV }}>
            {TIERS.map((tier) => (
              <FadeIn key={tier.name} delay={60} threshold={0.05}>
                <div
                  className="h-full flex flex-col"
                  style={{
                    backgroundColor: tier.highlight ? "#0f1a2c" : BG,
                    boxShadow: tier.highlight ? `inset 0 0 0 1px ${BLUE}` : undefined,
                  }}
                  data-testid={`tier-card-${tier.name.toLowerCase()}`}
                >
                  <div className="px-6 pt-6 pb-5 border-b" style={{ borderColor: DIV }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: tier.highlight ? BLUE : "rgba(255,255,255,0.32)" }}>
                      {tier.badge}
                    </p>
                    <p className="text-2xl font-black text-white mb-1" style={{ letterSpacing: "-0.01em" }}>{tier.name}</p>
                    <p className="text-2xl font-black" style={{ color: tier.highlight ? BLUE : IVORY, letterSpacing: "-0.02em" }}>{tier.price}</p>
                    <p className="text-xs font-light mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{tier.blurb}</p>
                  </div>
                  <ul className="px-6 py-5 space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="text-sm text-white/55 flex items-start gap-2 leading-snug">
                        <span className="mt-0.5 shrink-0" style={{ color: tier.highlight ? BLUE : "rgba(255,255,255,0.25)" }}>—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-6">
                    {tier.cta.href.startsWith("#") ? (
                      <a
                        href={tier.cta.href}
                        className="block w-full py-3 text-sm font-bold text-center"
                        style={{ backgroundColor: tier.highlight ? BLUE : "#000", color: "#fff" }}
                        data-testid={tier.cta.testid}
                      >
                        {tier.cta.label}
                      </a>
                    ) : (
                      <Link
                        href={tier.cta.href}
                        className="block w-full py-3 text-sm font-bold text-center"
                        style={{ backgroundColor: tier.highlight ? BLUE : "#000", color: "#fff" }}
                        data-testid={tier.cta.testid}
                      >
                        {tier.cta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0} threshold={0.05}>
            <p className="text-center text-sm text-white/35 mt-6">
              Annual plans available at 15% off for individual tiers. All tiers cancel any time. Firm pricing is quoted per account based on volume + service mix.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Hours strip — consumer 9-9 vs Firm extended priority ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="◐" text="HOURS" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
              Standard hours for <HI>everyone.</HI><br />
              Extended priority hours for <HI>firms.</HI>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            <FadeIn delay={0}>
              <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                <UserIcon className="h-5 w-5 mb-5" style={{ color: "rgba(255,255,255,0.55)" }} />
                <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>SOLO · PRO · ELITE · NON-MEMBERS</p>
                <p className="text-2xl font-black text-white mb-3" style={{ letterSpacing: "-0.01em" }}>9 AM – 9 PM</p>
                <p className="text-sm font-light leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Standard booking window for every individual customer — members and non-members alike. 7 days a week. RON same-hour during these windows.
                </p>
                <p className="text-xs font-light leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  No after-hours surcharges. No member-only night slots. Same hours, same price, every day.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="p-8 h-full" style={{ backgroundColor: "#0f1a2c", boxShadow: `inset 0 0 0 1px ${BLUE}` }}>
                <Clock className="h-5 w-5 mb-5" style={{ color: BLUE }} />
                <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FIRM ACCOUNTS — EXTENDED PRIORITY</p>
                <p className="text-2xl font-black text-white mb-3" style={{ letterSpacing: "-0.01em" }}>24/7 RON · 6 AM – Midnight mobile</p>
                <p className="text-sm font-light leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Title companies and law firms can request appointments around the clock. RON is available 24/7. Mobile signings available 6 AM – Midnight, 7 days a week, by request through the firm portal.
                </p>
                <p className="text-xs font-light leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Dedicated after-hours line. Same-hour response on weekday signings. No after-hours surcharges on the firm contract.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Firm-only capability strip ────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="⊞" text="WHAT FIRM ACCOUNTS UNLOCK" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-3" style={{ letterSpacing: "-0.02em" }}>
              Designed around <HI>how your office actually books work.</HI>
            </h2>
            <p className="text-base text-white/45 text-center max-w-2xl mx-auto mb-14">
              Stop chasing down individual notaries. Run your document operations from one dashboard, with billing on terms that match how your AP team already pays vendors.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { icon: Calendar,    title: "Bulk book from a spreadsheet",  body: "Paste rows for the week's signings — signer, doc type, address, time window — and submit them in one shot. Up to 100 jobs per submission." },
              { icon: Users,       title: "A roster you control",          body: "Add or remove paralegals, processors, and closers from your firm portal. They sign in with email + a one-time code. No shared credentials." },
              { icon: Receipt,     title: "Monthly NET 30 invoicing",       body: "Every job for the month rolls into a single itemized invoice. Pay by ACH, check, wire, or card. No per-job credit-card surcharges." },
              { icon: Briefcase,   title: "Same operator. Documented processes.", body: "Sean handles every job personally — notary, loan signing, apostille, court reporting. No rotating cast, no last-minute reassignments." },
              { icon: Clock,       title: "Extended priority hours",        body: "24/7 RON access, 6 AM – Midnight mobile signings. Dedicated after-hours line for time-sensitive closings, 7 days a week." },
              { icon: ShieldCheck, title: "Credentialed & bonded",          body: "Texas notary commission, surety bond, RON authorization, AAERT CER, and loan-signing certification — all current and verifiable." },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 50}>
                <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                  <c.icon className="h-5 w-5 mb-5" style={{ color: BLUE }} />
                  <p className="text-base font-black text-white mb-3" style={{ letterSpacing: "-0.01em" }}>{c.title}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison: Individual tiers vs Firm tier ─────── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="⊞" text="INDIVIDUAL VS. FIRM" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
              What changes when you upgrade to a <HI>Firm account.</HI>
            </h2>
          </FadeIn>
          <div className="border" style={{ borderColor: DIV }}>
            <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-px" style={{ backgroundColor: DIV }}>
              <div className="px-5 py-4" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Capability</p>
              </div>
              <div className="px-5 py-4 text-center" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Solo · Pro · Elite</p>
              </div>
              <div className="px-5 py-4 text-center" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>Firm</p>
              </div>
              {[
                { cap: "Per-job booking",              ind: "✓",          firm: "✓" },
                { cap: "Hours",                        ind: "9 AM – 9 PM", firm: "24/7 RON · 6 AM – Midnight mobile" },
                { cap: "Bulk booking (paste a list)",   ind: "—",          firm: "✓ Up to 100/batch" },
                { cap: "Multi-user roster",             ind: "—",          firm: "✓ Admin + members" },
                { cap: "Payment at booking",            ind: "Card / ACH", firm: "Optional" },
                { cap: "NET 30 monthly invoicing",      ind: "—",          firm: "✓ Standard" },
                { cap: "Itemized monthly statements",   ind: "—",          firm: "✓ Downloadable" },
                { cap: "Dedicated point of contact",    ind: "Shared",     firm: "✓ Direct line" },
                { cap: "Free notarizations / mo",       ind: "1 – 2",      firm: "Bundled at quote" },
                { cap: "Volume pricing",                ind: "—",          firm: "Quoted at 25+/mo" },
              ].map((row) => (
                <React.Fragment key={row.cap}>
                  <div className="px-5 py-4" style={{ backgroundColor: BG }}>
                    <span className="text-sm text-white/65">{row.cap}</span>
                  </div>
                  <div className="px-5 py-4 text-center" style={{ backgroundColor: BG }}>
                    <span className="text-sm font-light" style={{ color: row.ind === "—" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)" }}>{row.ind}</span>
                  </div>
                  <div className="px-5 py-4 text-center" style={{ backgroundColor: BG }}>
                    <span className="text-sm font-bold" style={{ color: row.firm.startsWith("✓") || row.firm === "Optional" ? BLUE : IVORY }}>{row.firm}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Firm tier is for ──────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="◆" text="FIRM TIER — WHO WE WORK WITH" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
              Built for the offices that actually <HI>move documents.</HI>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { icon: Building2,     title: "Title Companies",        body: "Loan signings, refis, HELOCs, wet-ink closings on tight schedules. Standard package handling, scanbacks within the hour." },
              { icon: Briefcase,     title: "Law Firms",              body: "Estate planning, real estate, family law, corporate filings. Bedside notarizations for elderly or hospitalized clients." },
              { icon: FileSignature, title: "Lenders & Brokers",      body: "Refi closings, second mortgages, reverse mortgages. Witness handling and post-closing audit-ready documentation." },
              { icon: ShieldCheck,   title: "Corporate Legal Depts.", body: "Apostille for international filings, board resolutions, M&A document execution, and employee on/off-boarding paperwork." },
              { icon: Mic2,          title: "Litigation Support Cos.",body: "Electronic court reporting, depositions, certified transcripts. AAERT CER credentialed; fast turnaround." },
              { icon: Globe2,        title: "Cross-Border Practices", body: "Texas Secretary of State apostille processing, with optional notarization beforehand. Ship-back service available." },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 60}>
                <div className="p-8 h-full" style={{ backgroundColor: BG }}>
                  <c.icon className="h-5 w-5 mb-5" style={{ color: BLUE }} />
                  <p className="text-base font-black text-white mb-3">{c.title}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <div className="p-8 border" style={{ borderColor: DIV }}>
              <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                &ldquo;We used to call three different notaries to make sure one of them would actually show up. Switched to Docsy six months ago — one bulk-booked spreadsheet on Monday morning, one invoice at the end of the month, zero no-shows.&rdquo;
              </p>
              <p className="text-xs font-bold text-white">V. Chen</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Hill Country Title Co. · San Antonio</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Apply form (Firm tier) ────────────────────────── */}
      <section id="apply" className="py-20 sm:py-24 px-5 border-t" style={{ backgroundColor: IVORY, borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <FadeIn delay={0}>
              <div className="border-2 border-black p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-5" style={{ borderColor: "#000", color: "#000" }}>
                  ✓ APPLICATION RECEIVED
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Thanks, <HI>{submitted}.</HI>
                </h2>
                <p className="text-base text-black/65 leading-relaxed mb-6">
                  We've logged your application and our team will review it within one business day. You'll receive an email at the contact you provided with your portal sign-in instructions and your account manager's direct number once the account is provisioned.
                </p>
                <p className="text-sm text-black/55 leading-relaxed mb-8">
                  Need to talk through anything before your account goes live — pricing, volume, escrow company integrations, recurring schedules — just call or email and we'll work it through with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:2104179614" className="px-6 py-3 text-sm font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                    <Phone className="inline h-4 w-4 mr-2 -mt-0.5" />(210) 417-9614
                  </a>
                  <a href="mailto:firms@docsynotary.com" className="px-6 py-3 text-sm font-bold text-black text-center border-2 border-black">
                    <Mail className="inline h-4 w-4 mr-2 -mt-0.5" />firms@docsynotary.com
                  </a>
                  <button onClick={() => setSubmitted(null)} className="px-6 py-3 text-sm font-bold text-center" style={{ color: "rgba(0,0,0,0.55)" }}>
                    Submit another application
                  </button>
                </div>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn delay={0}>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6" style={{ borderColor: "#000", color: "#000" }}>
                  ◆ FIRM APPLICATION
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-black mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Open a firm account.
                </h2>
                <p className="text-base text-black/55 mb-10 max-w-xl">
                  Tell us about your firm and we'll provision your portal within one business day. No long-term contracts, no setup fees.
                </p>
              </FadeIn>

              {submitError && (
                <div className="border-2 border-red-700 bg-red-50 p-4 mb-6" data-testid="firm-apply-error">
                  <p className="text-sm font-bold text-red-900">{submitError}</p>
                </div>
              )}

              <form onSubmit={submitApplication} className="space-y-6" data-testid="firm-apply-form">
                {/* Firm */}
                <fieldset className="border-2 border-black p-6">
                  <legend className="px-2 text-[10px] font-bold uppercase tracking-widest text-black">Firm</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Firm name" required>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="form-input" data-testid="input-firm-name" />
                    </FormField>
                    <FormField label="EIN (optional)">
                      <input value={form.ein} onChange={e => setForm({ ...form, ein: e.target.value })} className="form-input" placeholder="74-1234567" data-testid="input-firm-ein" />
                    </FormField>
                    <FormField label="Firm type" required>
                      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required className="form-input" data-testid="input-firm-type">
                        {FIRM_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Expected jobs / month" required>
                      <input type="number" min={1} value={form.expectedMonthlyVolume} onChange={e => setForm({ ...form, expectedMonthlyVolume: e.target.value })} required className="form-input" data-testid="input-firm-volume" />
                    </FormField>
                  </div>
                  <div className="mt-4">
                    <FormField label="Office address" required>
                      <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required className="form-input" placeholder="Street, City, TX, ZIP" data-testid="input-firm-address" />
                    </FormField>
                  </div>
                </fieldset>

                {/* Contact */}
                <fieldset className="border-2 border-black p-6">
                  <legend className="px-2 text-[10px] font-bold uppercase tracking-widest text-black">Primary Contact</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Full name" required>
                      <input value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} required className="form-input" data-testid="input-contact-name" />
                    </FormField>
                    <FormField label="Title (optional)">
                      <input className="form-input" placeholder="e.g. Closing Coordinator" />
                    </FormField>
                    <FormField label="Email" required>
                      <input type="email" value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} required className="form-input" data-testid="input-contact-email" />
                    </FormField>
                    <FormField label="Phone" required>
                      <input type="tel" value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} required className="form-input" placeholder="(210) 555-1234" data-testid="input-contact-phone" />
                    </FormField>
                  </div>
                </fieldset>

                {/* Service mix */}
                <fieldset className="border-2 border-black p-6">
                  <legend className="px-2 text-[10px] font-bold uppercase tracking-widest text-black">Services You'll Use</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {SERVICE_OPTIONS.map(s => {
                      const active = form.serviceMix.includes(s.id);
                      return (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => toggleService(s.id)}
                          data-testid={`toggle-service-${s.id}`}
                          className="px-3 py-3 text-xs font-bold border-2 transition-colors"
                          style={{
                            borderColor: "#000",
                            backgroundColor: active ? "#000" : "transparent",
                            color: active ? "#fff" : "#000",
                          }}
                        >
                          <s.icon className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Notes */}
                <fieldset className="border-2 border-black p-6">
                  <legend className="px-2 text-[10px] font-bold uppercase tracking-widest text-black">Anything else?</legend>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    placeholder="Recurring schedules, escrow integrations, accounting workflow, etc."
                    className="form-input resize-none"
                    data-testid="input-firm-notes"
                  />
                </fieldset>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 text-base font-bold text-white disabled:opacity-50"
                  style={{ backgroundColor: "#000" }}
                  data-testid="btn-firm-apply-submit"
                >
                  {submitting ? "Submitting…" : "Submit application →"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 border-t text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
              Not sure which tier?
            </h2>
            <p className="text-base text-white/55 mb-8">
              Run a free Document Check first, or use the calculator to see your exact price with each tier applied.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/document-check" className="px-10 py-4 text-base font-bold text-center border-2" style={{ borderColor: BLUE, color: BLUE }}>
                Free Document Check →
              </Link>
              <Link href="/calculate" className="px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: BLUE }}>
                Open the calculator →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
