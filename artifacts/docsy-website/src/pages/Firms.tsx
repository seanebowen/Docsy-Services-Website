import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { Building2, Briefcase, FileSignature, Globe2, Mic2, ShieldCheck, Receipt, Users, Zap, Calendar, Mail, Phone } from "lucide-react";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);
const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "#000", padding: "0 5px" }}>{children}</span>
);

const Label = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex justify-center mb-8">
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: BLUE, color: BLUE }}>
      {icon} {text}
    </span>
  </div>
);

const SERVICE_OPTIONS: { id: string; label: string; icon: React.ElementType }[] = [
  { id: "loan-signing", label: "Loan Signing", icon: FileSignature },
  { id: "ron",          label: "RON",           icon: Globe2 },
  { id: "mobile",       label: "Mobile / GNW",  icon: Briefcase },
  { id: "apostille",    label: "Apostille",     icon: ShieldCheck },
  { id: "court",        label: "Court Reporting", icon: Mic2 },
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

export default function Firms() {
  const [form,        setForm]        = useState<ApplyForm>(EMPTY_FORM);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted,   setSubmitted]   = useState<string | null>(null);

  useEffect(() => {
    document.title = "For Title Companies & Law Firms | Docsy Services";
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
      setSubmitError("Network error. Please try again or call us at (512) 555-0190.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-10 pb-14 sm:pt-12 sm:pb-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6" style={{ borderColor: "#000", color: "#000" }}>
              ◆ For Firms · Title · Law · Lenders
            </span>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.75rem] font-black leading-none text-black mb-8" style={{ letterSpacing: "-0.03em" }}>
              Your firm's<br />
              <HI>document operations,</HI><br />
              on tap.
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-lg sm:text-xl text-black/60 mb-10 max-w-2xl font-medium leading-snug">
              One vetted operator. NET 30 billing. Bulk booking from a spreadsheet. A roster you control. Built for title companies, law firms, lenders, and corporate legal teams that don't have time to chase down a different notary every Tuesday.
            </p>
          </FadeIn>
          <FadeIn delay={220}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#apply" className="px-8 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                Apply for an account →
              </a>
              <a href="#how" className="px-8 py-4 text-base font-bold text-black text-center border-2 border-black">
                How it works →
              </a>
              <Link href="/firm/portal" className="px-8 py-4 text-base font-bold text-center border-2" style={{ borderColor: BLUE, color: BLUE, backgroundColor: "rgba(255,255,255,0.6)" }}>
                Existing firm? Sign in →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: DIV }}>
          {[
            { stat: "NET 30",      label: "Standard billing terms" },
            { stat: "100 jobs",    label: "Per bulk-book submission" },
            { stat: "1 operator",  label: "No subcontractors. Same person every time." },
            { stat: "5 services",  label: "Notary · RON · loan signing · apostille · court reporting" },
          ].map(({ stat, label }) => (
            <div key={stat} className="px-6 py-10 text-center" style={{ backgroundColor: BG }}>
              <p className="text-2xl sm:text-3xl font-black mb-2" style={{ color: BLUE, letterSpacing: "-0.02em" }}>{stat}</p>
              <p className="text-xs font-light leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How firm accounts work ── */}
      <section id="how" className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="⊙" text="HOW FIRM ACCOUNTS WORK" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-3" style={{ letterSpacing: "-0.02em" }}>
              Designed around <HI>how your office actually books work.</HI>
            </h2>
            <p className="text-base text-white/45 text-center max-w-2xl mx-auto mb-14">
              Stop chasing down individual notaries on Slack. Run your document operations from one dashboard, with billing on terms that match how your AP team already pays vendors.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { icon: Calendar, title: "Bulk book from a spreadsheet",       body: "Paste rows for the week's signings — signer, doc type, address, time window — and submit them in one shot. No more one-at-a-time form fills." },
              { icon: Users,    title: "A roster you control",                body: "Add or remove paralegals, processors, and closers from your firm portal. They each sign in with email + a one-time code; no shared credentials." },
              { icon: Receipt,  title: "Monthly invoicing on NET 30",         body: "Every job for the month rolls into a single itemized invoice. Pay by ACH, check, wire, or card. No per-job credit-card surcharges." },
              { icon: Briefcase, title: "Same operator. Documented processes.", body: "Sean handles every job personally — notary, loan signing, apostille, court reporting. No rotating cast, no last-minute reassignments." },
              { icon: Zap,      title: "Same-hour RON, same-day mobile",       body: "Rush something across town for a 4 PM closing? Tell us in the morning. RON is available same-hour, 7 days a week, 7 AM–11 PM." },
              { icon: ShieldCheck, title: "Credentialed & bonded",             body: "Texas notary commission, surety bond, RON authorization, AAERT CER, and loan-signing certification — all current and verifiable." },
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

      {/* ── Comparison: solo vs firm account ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="⊞" text="FIRM VS. INDIVIDUAL ACCOUNTS" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
              What's <HI>different</HI> about a firm account.
            </h2>
          </FadeIn>
          <div className="border" style={{ borderColor: DIV }}>
            <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-px" style={{ backgroundColor: DIV }}>
              <div className="px-5 py-4" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Capability</p>
              </div>
              <div className="px-5 py-4 text-center" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Individual</p>
              </div>
              <div className="px-5 py-4 text-center" style={{ backgroundColor: "#0d1521" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>Firm Account</p>
              </div>
              {[
                { cap: "Per-job booking",              ind: "✓",          firm: "✓" },
                { cap: "Bulk booking (paste a list)",   ind: "—",          firm: "✓ Up to 100/batch" },
                { cap: "Multi-user roster",             ind: "—",          firm: "✓ Admin + members" },
                { cap: "Payment at booking",            ind: "Card / ACH", firm: "Optional" },
                { cap: "NET 30 monthly invoicing",      ind: "—",          firm: "✓ Standard" },
                { cap: "Itemized monthly statements",   ind: "—",          firm: "✓ Downloadable" },
                { cap: "Dedicated point of contact",     ind: "Shared",     firm: "✓ Direct line" },
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
                    <span className="text-sm font-bold" style={{ color: row.firm.startsWith("✓") ? BLUE : IVORY }}>{row.firm}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we work with ── */}
      <section className="py-20 sm:py-24 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <Label icon="◆" text="WHO WE WORK WITH" />
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
              Built for the offices that actually <HI>move documents.</HI>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: DIV }}>
            {[
              { icon: Building2,    title: "Title Companies",       body: "Loan signings, refis, HELOCs, wet-ink closings on tight schedules. Standard package handling, scanbacks within the hour." },
              { icon: Briefcase,    title: "Law Firms",              body: "Estate planning, real estate, family law, corporate filings. Bedside notarizations for elderly or hospitalized clients." },
              { icon: FileSignature, title: "Lenders & Brokers",      body: "Refi closings, second mortgages, reverse mortgages. Witness handling and post-closing audit-ready documentation." },
              { icon: ShieldCheck,  title: "Corporate Legal Depts.", body: "Apostille for international filings, board resolutions, M&A document execution, and employee on/off-boarding paperwork." },
              { icon: Mic2,         title: "Litigation Support Cos.", body: "Electronic court reporting, depositions, certified transcripts. AAERT CER credentialed; fast turnaround." },
              { icon: Globe2,       title: "Cross-Border Practices",  body: "Texas Secretary of State apostille processing, with optional notarization beforehand. Ship-back service available." },
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

      {/* ── Testimonial ── */}
      <section className="py-12 px-5 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <div className="p-8 border" style={{ borderColor: DIV }}>
              <p className="text-base sm:text-lg font-light leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                &ldquo;We used to call three different notaries to make sure one of them would actually show up. Switched to Docsy six months ago — one bulk-booked spreadsheet on Monday morning, one invoice at the end of the month, zero no-shows. The AP team thinks we hired a new vendor manager.&rdquo;
              </p>
              <p className="text-xs font-bold text-white">V. Chen</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Hill Country Title Co. · San Antonio</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Apply form ── */}
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
                  <a href="tel:5125550190"   className="px-6 py-3 text-sm font-bold text-white text-center" style={{ backgroundColor: "#000" }}>
                    <Phone className="inline h-4 w-4 mr-2 -mt-0.5" />(512) 555-0190
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
                  <FormField label="Office address" required>
                    <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required className="form-input" placeholder="Street, City, TX, ZIP" data-testid="input-firm-address" />
                  </FormField>
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
                            color: active ? IVORY : "#000",
                          }}
                        >
                          <s.icon className="h-4 w-4 mb-1.5 mx-auto" />
                          <span className="block">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-black/45 mt-3">Pick all that apply — you can add more later from the firm portal.</p>
                </fieldset>

                {/* Notes */}
                <fieldset className="border-2 border-black p-6">
                  <legend className="px-2 text-[10px] font-bold uppercase tracking-widest text-black">Anything Else We Should Know?</legend>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="form-input min-h-[120px] resize-y" placeholder="Standing schedules, integrations (e.g. Qualia, Closing Pro), bedside frequency, multilingual signers, etc." data-testid="input-firm-notes" />
                </fieldset>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-10 py-4 text-base font-bold text-white disabled:opacity-50"
                    style={{ backgroundColor: "#000" }}
                    data-testid="btn-submit-firm-apply"
                  >
                    {submitting ? "Submitting…" : "Submit application →"}
                  </button>
                  <a href="tel:5125550190" className="px-10 py-4 text-base font-bold text-black text-center border-2 border-black">
                    Or call us · (512) 555-0190
                  </a>
                </div>
                <p className="text-xs text-black/45 leading-relaxed">
                  By submitting, you agree we may contact your firm to discuss volume, billing, and onboarding. We don't share firm applications with third parties. <Link href="/privacy" className="underline">Privacy policy</Link>.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-5 border-t" style={{ backgroundColor: BG, borderColor: DIV }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              <H>One operator.</H> Every job.<br />
              <span style={{ color: BLUE }}>One invoice at the end of the month.</span>
            </h2>
            <p className="text-sm text-white/45">Firms get a real human reply within one business hour, M–F.</p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <a href="mailto:firms@docsynotary.com" className="block px-6 py-4 text-sm font-bold text-center border" style={{ borderColor: BLUE, color: BLUE }}>
              firms@docsynotary.com
            </a>
            <a href="#apply" className="block px-10 py-4 text-base font-bold text-white text-center" style={{ backgroundColor: BLUE }}>
              Apply now →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background-color: #ffffff;
          border: 1.5px solid #000;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          outline: none;
        }
        .form-input:focus { border-color: ${BLUE}; box-shadow: inset 0 0 0 1px ${BLUE}; }
        .form-input::placeholder { color: rgba(0,0,0,0.35); font-weight: 400; }
      `}</style>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-bold uppercase tracking-widest text-black/65 mb-1.5">
        {label}{required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
