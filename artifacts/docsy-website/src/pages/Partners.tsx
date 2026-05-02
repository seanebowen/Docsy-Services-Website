import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const IVORY = "#F5EFE6";

type PrimaryService = "real-estate" | "legal" | "title" | "immigration" | "financial" | "other";

const SERVICE_LABELS: Record<PrimaryService, string> = {
  "real-estate":  "Real Estate Broker / Agent",
  "legal":        "Law Office / Attorney",
  "title":        "Title Company",
  "immigration":  "Immigration Consultant",
  "financial":    "Financial Advisor / CPA",
  "other":        "Other",
};

const WHO_FOR = [
  { icon: "🏠", label: "Real Estate Brokers & Agents",   desc: "RON closings, mobile signings, and loan packages—delivered around your clients' schedules." },
  { icon: "⚖️", label: "Law Offices & Attorneys",        desc: "Affidavits, powers of attorney, apostilles for international filings—handled the same day." },
  { icon: "📋", label: "Title Companies",                desc: "High-volume loan signings with Net-30 invoicing and a single point of contact." },
  { icon: "🌎", label: "Immigration Consultants",        desc: "Document notarizations, USCIS affidavits, and apostilles to any Hague Convention country." },
  { icon: "💼", label: "Financial Advisors & CPAs",      desc: "Trust documents, beneficiary forms, and brokerage paperwork—mobile or remote." },
];

const WHAT_THEY_GET = [
  { label: "10% credit per booking",        detail: "Earn a 10% credit on every Docsy booking you refer. Credits are tracked in real time in your portal and paid out monthly." },
  { label: "Dedicated tracked link",        detail: "Your unique referral link (e.g. docsyservices.com/?ref=REF-XXXXXX) auto-attributes every booking from your clients for 30 days." },
  { label: "Co-branded landing option",     detail: "Ask us about a white-label landing page for your firm—same Docsy quality, your name on it." },
  { label: "First dibs on capacity",        detail: "Partners get priority scheduling on same-day and last-minute requests before open availability is released." },
];

const STEPS = [
  { n: "01", title: "Apply",             body: "Fill out the form below. It takes two minutes. We auto-approve qualified partners and email you your link." },
  { n: "02", title: "Share your link",   body: "Send it in an email, add it to your website, put it in your email signature. Every click is tracked." },
  { n: "03", title: "Earn per booking",  body: "When a client books through your link, you earn 10% of the booking value. Watch it accumulate in your portal." },
];

const FAQ_ITEMS = [
  { q: "How do credits get paid out?", a: "Partner credits are paid monthly via ACH or check. The minimum payout threshold is $25. No automated payment platform—this is a direct relationship." },
  { q: "Is there a volume minimum?",   a: "No minimums, no quotas. Refer one booking a year or one a day—you earn on everything." },
  { q: "How long does attribution last?", a: "Your referral link sets a 30-day cookie. Any booking made within 30 days of a click is credited to you, even if the client doesn't book immediately." },
  { q: "Can I refer business clients (firms)?", a: "Absolutely. If a firm you refer signs up for a Docsy Business+ Firm account, we'll agree on a custom credit rate—contact us directly." },
  { q: "What services are eligible?",  a: "All consumer bookings: RON, mobile notary, apostille, loan signing, and electronic reporting. Firm portal jobs booked directly are handled case-by-case." },
];

interface ApplyResult {
  ok:          boolean;
  refCode?:    string;
  trackedLink?: string;
  error?:      string;
  existing?:   boolean;
}

export default function Partners() {
  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    name:           "",
    business:       "",
    email:          "",
    phone:          "",
    primaryService: "" as PrimaryService | "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState<ApplyResult | null>(null);
  const [errors,     setErrors]     = useState<Partial<Record<keyof typeof form, string>>>({});
  const [openFaq,    setOpenFaq]    = useState<number | null>(null);

  useEffect(() => { document.title = "Partner Program | Docsy Services"; }, []);

  function validate(): boolean {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim())                         e.name           = "Required";
    if (!form.business.trim())                     e.business       = "Required";
    if (!form.email.includes("@"))                 e.email          = "Enter a valid email";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone          = "Enter a 10-digit phone";
    if (!form.primaryService)                      e.primaryService = "Please select one";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/partners/apply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json() as ApplyResult;
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function field(
    key: keyof typeof form,
    label: string,
    type: "text" | "email" | "tel" = "text",
    placeholder = "",
  ) {
    return (
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </label>
        <input
          type={type}
          value={form[key] as string}
          onChange={ev => setForm(f => ({ ...f, [key]: ev.target.value }))}
          placeholder={placeholder}
          className="w-full bg-transparent border px-4 py-3 text-sm text-white outline-none focus:border-[#4D9FDB] transition-colors"
          style={{ borderColor: errors[key] ? "#e05252" : DIV }}
        />
        {errors[key] && <p className="text-xs mt-1" style={{ color: "#e05252" }}>{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>

      {/* ── Hero ── */}
      <section className="px-5 pt-20 pb-16 sm:pt-28 sm:pb-20" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-8" style={{ borderColor: BLUE, color: BLUE }}>
              Partner Program
            </div>
            <h1 className="text-[3rem] sm:text-[5rem] font-black leading-none text-black mb-5" style={{ letterSpacing: "-0.03em" }}>
              Refer clients.<br />Earn on every booking.
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-xl text-black/60 max-w-2xl font-medium mb-8">
              Docsy partners earn a 10% credit on every booking they refer — tracked automatically, paid monthly, no minimums.
            </p>
            <a
              href="#apply"
              className="inline-block px-7 py-4 text-sm font-bold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: BG }}
            >
              Apply in 2 minutes →
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="px-5 py-20 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Who it's for</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12" style={{ letterSpacing: "-0.02em" }}>
              Built for professionals who refer document work daily.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border" style={{ borderColor: DIV, backgroundColor: DIV }}>
            {WHO_FOR.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="p-7" style={{ backgroundColor: BG }}>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <p className="text-sm font-bold text-white mb-2">{item.label}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
            {/* 6th cell */}
            <FadeIn delay={WHO_FOR.length * 60}>
              <div className="p-7 flex flex-col justify-between" style={{ backgroundColor: BG }}>
                <div>
                  <p className="text-sm font-bold text-white mb-2">Any professional who refers notary work.</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    If your clients ever need a notary, apostille, or signing — you qualify.
                  </p>
                </div>
                <a href="#apply" className="mt-6 inline-block text-xs font-bold uppercase tracking-widest transition-colors hover:text-white" style={{ color: BLUE }}>
                  Apply now →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── What partners get ── */}
      <section className="px-5 py-20 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>What you get</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12" style={{ letterSpacing: "-0.02em" }}>
              More than a link.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border" style={{ borderColor: DIV, backgroundColor: DIV }}>
            {WHAT_THEY_GET.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="p-8 border-b sm:border-b-0" style={{ backgroundColor: BG, borderColor: DIV }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: BLUE }}>
                    0{i + 1}
                  </div>
                  <p className="text-base font-bold text-white mb-2">{item.label}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-5 py-20 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12" style={{ letterSpacing: "-0.02em" }}>
              Three steps. That's it.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border" style={{ borderColor: DIV, backgroundColor: DIV }}>
            {STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="p-8" style={{ backgroundColor: BG }}>
                  <p className="text-4xl font-black mb-4" style={{ color: "rgba(255,255,255,0.08)" }}>{step.n}</p>
                  <p className="text-base font-bold text-white mb-2">{step.title}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply form ── */}
      <section id="apply" className="px-5 py-20 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Become a partner</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
              Apply in 2 minutes.
            </h2>
            <p className="text-sm font-light mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
              We'll create your account, generate your tracked link, and send you everything you need to start earning.
            </p>
          </FadeIn>

          {result?.ok ? (
            <FadeIn delay={0}>
              <div className="border p-8 text-center" style={{ borderColor: BLUE }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6" style={{ borderColor: BLUE, color: BLUE }}>
                  ✓ Application Received
                </div>
                <h3 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>Welcome to the program.</h3>
                <p className="text-sm font-light mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Your partner code is ready. Sign in with your email to access your portal and tracked link.
                </p>
                <div className="border p-4 mb-6 text-center" style={{ borderColor: DIV }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Your Referral Code</p>
                  <p className="text-2xl font-black tracking-widest text-white">{result.refCode}</p>
                  <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your tracked link: docsyservices.com{result.trackedLink}
                  </p>
                </div>
                <button
                  onClick={() => setLocation("/login?next=/partners/portal")}
                  className="inline-block px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: BLUE }}
                >
                  Sign in to your portal →
                </button>
              </div>
            </FadeIn>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {result && !result.ok && (
                <div className="border p-4 text-sm" style={{ borderColor: "#e05252", color: "#e05252" }}>
                  {result.existing
                    ? <>An application already exists for this email. <Link href="/login?next=/partners/portal" className="underline">Sign in to your portal</Link>.</>
                    : result.error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field("name",     "Full Name",     "text", "Jane Smith")}
                {field("business", "Business Name", "text", "Smith Realty Group")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field("email", "Email Address", "email", "jane@smithrealty.com")}
                {field("phone", "Phone Number",  "tel",   "(210) 555-0100")}
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  I primarily refer…
                </label>
                <select
                  value={form.primaryService}
                  onChange={ev => setForm(f => ({ ...f, primaryService: ev.target.value as PrimaryService }))}
                  className="w-full bg-transparent border px-4 py-3 text-sm text-white outline-none focus:border-[#4D9FDB] transition-colors appearance-none"
                  style={{ borderColor: errors.primaryService ? "#e05252" : DIV }}
                >
                  <option value="" disabled style={{ backgroundColor: BG }}>Select a category</option>
                  {(Object.entries(SERVICE_LABELS) as [PrimaryService, string][]).map(([v, l]) => (
                    <option key={v} value={v} style={{ backgroundColor: BG }}>{l}</option>
                  ))}
                </select>
                {errors.primaryService && <p className="text-xs mt-1" style={{ color: "#e05252" }}>{errors.primaryService}</p>}
              </div>
              <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
                By applying you agree to the{" "}
                <Link href="/terms" className="underline hover:text-white">Partner Terms</Link>{" "}
                included in Docsy's Terms of Service.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 text-sm font-bold text-white transition-opacity"
                style={{ backgroundColor: BLUE, opacity: submitting ? 0.5 : 1 }}
              >
                {submitting ? "Submitting…" : "Apply & Get My Link →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 py-20 border-t" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="text-2xl font-black text-white mb-8" style={{ letterSpacing: "-0.02em" }}>Common questions</h2>
          </FadeIn>
          <div className="divide-y" style={{ borderColor: DIV }}>
            {FAQ_ITEMS.map((item, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="py-5">
                  <button
                    className="w-full flex items-start justify-between gap-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-bold text-white">{item.q}</span>
                    <span className="shrink-0 text-base leading-none transition-transform" style={{ color: BLUE, transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.a}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-5 py-16 border-t" style={{ borderColor: DIV, backgroundColor: "#0e1520" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0}>
            <p className="text-2xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
              Already a partner?
            </p>
            <p className="text-sm font-light mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sign in to view your referral stats, copy your tracked link, and check your earnings.
            </p>
            <Link
              href="/login?next=/partners/portal"
              className="inline-block px-7 py-3.5 text-sm font-bold text-white border transition-colors hover:bg-white/5"
              style={{ borderColor: DIV }}
            >
              Sign in to Partner Portal →
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
