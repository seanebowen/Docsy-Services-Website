import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useAuth } from "@/context/AuthContext";
import { HonorPassUpsell } from "@/components/ui/HonorPassUpsell";
import { resolveIdMeVerification, isHonorPassEligible } from "@/lib/idme";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const RED   = "#e05252";

const MEMBERSHIP_LABELS: Record<string, string> = {
  starter: "Docsy+ Starter",
  pro:     "Docsy+ Pro",
  elite:   "Docsy+ Elite",
};

interface MemberCreditsState {
  membership: string | null;
  notarizationCredits: number;
  travelWaiverAvailable: boolean;
}

/* Estimated dollar value applied when a member uses a credit at checkout.
   Notarization credits cover a typical Texas notary line ($25); the starter
   tier is a 50%-off credit so it caps at half that. Travel waiver removes
   a typical mobile travel fee ($15). */
const NOTARIZATION_CREDIT_VALUE = 25;
const TRAVEL_WAIVER_VALUE       = 15;

/* ── Payment Terms copy (one block per division) ── */
const TERMS: Record<string, { heading: string; body: string[] }> = {
  ron: {
    heading: "Remote Online Notarization",
    body: [
      "Payment is required in full at the time of booking. Your appointment is not confirmed until payment is received. No session will be initiated without a completed payment.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
    ],
  },
  mobile: {
    heading: "Mobile Notary / General Notary Work",
    body: [
      "Payment is required in full at the time of booking. Travel and scheduling are committed the moment your appointment is confirmed, and no appointment is confirmed without completed payment.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
    ],
  },
  loan: {
    heading: "Loan Signing",
    body: [
      "Payment is required in full at the time of booking for all clients scheduling directly through Docsy Services. Your signing appointment is not confirmed until payment is received.",
      "Upon successful payment, you will receive an automatic booking confirmation and receipt.",
      "Signing agency partners are subject to the net terms established in their individual service agreements.",
    ],
  },
  apostille: {
    heading: "Apostille Services",
    body: [
      "Payment is required in full at the time of submission. Work on your file, including state submission and any associated processing, begins upon receipt of payment. No file will be submitted or processed without completed payment.",
      "Upon successful payment, you will receive an automatic confirmation and receipt.",
    ],
  },
  safeplus: {
    heading: "Docsy Safe+",
    body: [
      "Payment is collected at the time of enrollment via automatic subscription billing. Your subscription renews automatically on your billing cycle date. You will receive a receipt at enrollment and at each renewal.",
      "Cancellation must be submitted prior to the next billing date to avoid renewal charges.",
    ],
  },
  court: {
    heading: "Court Reporting",
    body: [
      "Docsy Services invoices all court reporting work after the deposition is complete. There is no upfront payment required for court reporting services. Billing is structured based on what was ordered at the time of the deposition.",
      "Appearance Only: If no transcript is ordered, an invoice for the appearance fee is generated on the day of the deposition and sent to the ordering party the same day. Payment is due within 14 days of the date of service.",
      "Appearance and Transcript: If a transcript is ordered, the appearance fee and transcript fee are combined into a single invoice. That invoice is generated when the transcript is complete and ready for delivery. The full balance — appearance and transcript together — is due within 7 days of the date the transcript is marked ready. The transcript will not be released, delivered, or made accessible until payment is received in full. No exceptions.",
      "Multi-Counsel Billing: When multiple attorneys order copies from the same deposition, each attorney receives their own individual invoice generated when their copy is ready. Each invoice carries its own Net-7 window and is subject to the same hold-until-paid policy.",
      "Add-On Services: Realtime feed charges, audio and transcript sync, and any other add-on services are bundled into the applicable invoice and follow the same payment terms.",
      "Late Payments: Invoices not paid within the applicable payment window are subject to a late fee of 1.5% per month on the outstanding balance. Docsy Services reserves the right to withhold transcript delivery on any account with an outstanding past-due balance until that balance is resolved.",
    ],
  },
};

interface ServiceLine { name: string; amount: number; }
interface PromoResult  { label: string; amount: number; }
interface BookingData {
  date:             string;
  time:             string;
  note:             string;
  promoCode?:       string;
  promoDiscount?:   PromoResult | null;
  autoPromos?:      { label: string; amount: number }[];
  discountedTotal?: number;
  estimate:         { services: ServiceLine[]; total: number; hasRON: boolean; baseTotal?: number; } | null;
  memberTier?:      string | null;
}

/* ── Contact + Card helpers ── */
function fmtPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d.length ? `(${d}` : "";
}
function fmtCardNumber(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})(?=.)/g, "$1 ");
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
function detectTermKeys(booking: BookingData): string[] {
  const keys: string[] = [];
  const svcs = booking.estimate?.services ?? [];
  if (svcs.some(s => s.name.toLowerCase().includes("remote online")))  keys.push("ron");
  if (svcs.some(s => s.name.toLowerCase().includes("general notary work"))) keys.push("mobile");
  if (svcs.some(s => s.name.toLowerCase().includes("loan signing")))   keys.push("loan");
  if (svcs.some(s => s.name.toLowerCase().includes("apostille")))      keys.push("apostille");
  if (svcs.some(s => s.name.toLowerCase().includes("court reporting"))) keys.push("court");
  return keys;
}
function needsUpfrontPayment(keys: string[]) {
  return keys.some(k => k !== "court");
}

export default function BookingPayment() {
  const [, setLocation] = useLocation();
  const { user, token, signIn } = useAuth();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [termKeys, setTermKeys] = useState<string[]>([]);
  const [upfront, setUpfront]   = useState(false);

  /* contact info state — prefilled from signed-in user when available */
  const [clientName,  setClientName]  = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [contactTouched, setContactTouched] = useState(false);

  /* Account-creation opt-in (default ON, hidden when already signed in) */
  const [createAccount, setCreateAccount] = useState(true);

  /* Member credits (loaded for signed-in members) */
  const [credits, setCredits] = useState<MemberCreditsState | null>(null);
  /* Explicitly applied credits — only these are consumed on confirm */
  const [applyNotarization, setApplyNotarization] = useState(false);
  const [applyTravelWaiver, setApplyTravelWaiver] = useState(false);

  /* card form state */
  const [name,    setName]    = useState("");
  const [number,  setNumber]  = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [cvv,     setCvv]     = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Payment | Docsy Services";
    try {
      const stored = sessionStorage.getItem("docsy_booking");
      if (stored) {
        const b: BookingData = JSON.parse(stored);
        setBooking(b);
        const keys = detectTermKeys(b);
        setTermKeys(keys);
        setUpfront(needsUpfrontPayment(keys));
      }
    } catch {}
  }, []);

  /* If the user verified ID.me from this page (or any page during the
     funnel) and HonorPass isn't yet on the booking, fold it in so the
     payment-step totals reflect the discount immediately on return. */
  useEffect(() => {
    if (!booking?.estimate) return;
    const verif = resolveIdMeVerification(user?.idMeVerification ?? null);
    if (!isHonorPassEligible(verif)) return;

    const promoLabelMatch = (s: string) => s.toLowerCase().includes("honorpass");
    const alreadyApplied =
      (booking.autoPromos ?? []).some(p => promoLabelMatch(p.label)) ||
      booking.estimate.services.some(s => promoLabelMatch(s.name)) ||
      (booking.promoCode ?? "").toUpperCase() === "HONORPASS";
    if (alreadyApplied) return;

    const base = booking.estimate.baseTotal ?? booking.estimate.total;
    if (!base) return;
    const off = Math.round(base * 0.10 * 100) / 100;
    if (off <= 0) return;

    const newAutoPromos = [
      ...(booking.autoPromos ?? []),
      { label: "HonorPass™ — 10% off base service fees", amount: -off },
    ];
    const newDiscounted = Math.max(0, (booking.discountedTotal ?? booking.estimate.total) - off);
    const next: BookingData = { ...booking, autoPromos: newAutoPromos, discountedTotal: newDiscounted };
    setBooking(next);
    try { sessionStorage.setItem("docsy_booking", JSON.stringify(next)); } catch { /* ignore */ }
  }, [user?.idMeVerification, booking]);

  /* Prefill contact info from authenticated user */
  useEffect(() => {
    if (user) {
      if (!clientName)  setClientName(user.name);
      if (!clientEmail) setClientEmail(user.email);
      if (!clientPhone) {
        const d = user.phone.replace(/\D/g, "");
        setClientPhone(d.length === 10 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : user.phone);
      }
    }
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [user]);

  /* Load member credits for signed-in members */
  useEffect(() => {
    if (!token || !user?.membership) { setCredits(null); return; }
    fetch("/api/vault/credits", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data?.ok) {
          setCredits({
            membership: data.membership,
            notarizationCredits: data.notarizationCredits,
            travelWaiverAvailable: data.travelWaiverAvailable,
          });
        }
      })
      .catch(() => { /* non-blocking */ });
  }, [token, user]);

  /* Effective per-credit values, derived from tier rules */
  const notarizationCreditValue =
    user?.membership === "starter" ? NOTARIZATION_CREDIT_VALUE * 0.5 : NOTARIZATION_CREDIT_VALUE;
  const creditAdjustment =
    (applyNotarization ? notarizationCreditValue : 0) +
    (applyTravelWaiver ? TRAVEL_WAIVER_VALUE     : 0);

  const hasDiscount  = (booking?.autoPromos?.length ?? 0) > 0 || !!booking?.promoDiscount || creditAdjustment > 0;
  const baseDisplay  = (booking?.autoPromos?.length ?? 0) > 0 || !!booking?.promoDiscount
    ? (booking?.discountedTotal ?? booking?.estimate?.total ?? 0)
    : (booking?.estimate?.total ?? 0);
  const displayTotal = Math.max(0, baseDisplay - creditAdjustment);

  /* Contact validation */
  const contactNameOk  = clientName.trim().length > 1;
  const contactEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim());
  const contactPhoneOk = clientPhone.replace(/\D/g, "").length === 10;
  const contactOk      = contactNameOk && contactEmailOk && contactPhoneOk;

  /* Card validation */
  const nameOk   = name.trim().length > 2;
  const numOk    = number.replace(/\s/g, "").length === 16;
  const expOk    = /^\d{2}\/\d{2}$/.test(expiry);
  const cvvOk    = cvv.length >= 3;
  const formOk   = nameOk && numOk && expOk && cvvOk;

  /* ── Build Zapier webhook payload from booking + form state ── */
  function buildZapierPayload(b: BookingData, cardLast4: string | null) {
    const svcNames = (b.estimate?.services ?? []).map(s => s.name.toLowerCase()).join(" ");
    const inferDivision = () => {
      if (svcNames.includes("remote online"))  return "RON";
      if (svcNames.includes("loan signing"))   return "Loan Signing";
      if (svcNames.includes("general notary")) return "Mobile Notary";
      if (svcNames.includes("apostille"))      return "Apostille";
      if (svcNames.includes("court"))          return "Court Reporting";
      return "General";
    };
    const inferDuration = () => {
      if (svcNames.includes("remote online"))  return 30;
      if (svcNames.includes("loan signing"))   return 90;
      if (svcNames.includes("general notary")) return 60;
      if (svcNames.includes("apostille"))      return 30;
      if (svcNames.includes("court"))          return 240;
      return 60;
    };
    const inferLocationType = () => {
      if (svcNames.includes("remote online") || svcNames.includes("apostille")) return "remote";
      if (svcNames.includes("travel"))  return "inperson_travel";
      return "inperson_local";
    };
    const nightShift = (b.autoPromos ?? []).some(p => p.label.toLowerCase().includes("night shift"));
    const honorPass  = (b.promoCode ?? "").toUpperCase() === "HONORPASS";
    const division   = inferDivision();

    return {
      client_name:       clientName.trim(),
      client_email:      clientEmail.trim(),
      client_phone:      clientPhone.replace(/\D/g, ""),
      division,
      service_type:      division,
      job_date:          b.date ? new Date(b.date).toLocaleDateString("en-US") : "",
      job_time:          b.time ?? "",
      duration_min:      inferDuration(),
      location_type:     inferLocationType(),
      location_address:  b.note ?? "",
      amount_charged:    b.discountedTotal ?? b.estimate?.total ?? 0,
      stripe_payment_id: cardLast4 ? `mock_${cardLast4}` : "deferred_invoice",
      booking_source:    "Replit Form" as const,
      night_shift_seal:  nightShift,
      honor_pass:        honorPass,
    };
  }

  const handlePay = useCallback(async () => {
    /* Validate contact info first */
    if (!contactOk) { setContactTouched(true); return; }
    /* Then validate card if upfront payment required */
    if (upfront && !formOk) { setTouched(true); return; }
    setSubmitting(true);

    const last4 = upfront ? number.replace(/\s/g, "").slice(-4) : null;

    /* Step 1 — reuse-or-create the user's Docsy account when opted in.
       The /upsert endpoint returns a session token for both newly-created
       and existing accounts so the user is signed in immediately. */
    let accountCreated  = false;
    let accountExisting = false;
    if (!user && createAccount) {
      try {
        const res = await fetch("/api/auth/upsert", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            name:  clientName.trim(),
            email: clientEmail.trim(),
            phone: clientPhone.replace(/\D/g, ""),
          }),
        });
        const data = await res.json();
        if (data?.ok && data.token && data.user) {
          signIn(data.token, data.user);
          accountCreated  = !!data.created;
          accountExisting = !!data.existing;
        }
      } catch {
        /* non-blocking — booking still proceeds even if account creation fails */
      }
    }

    /* Step 2 — consume only credits the user explicitly applied */
    if (token && user?.membership && (applyNotarization || applyTravelWaiver)) {
      fetch("/api/vault/credits/consume", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({
          useNotarization: applyNotarization,
          useTravelWaiver: applyTravelWaiver,
        }),
      }).catch(() => { /* non-blocking */ });
    }

    /* Step 3 — persist booking + fire Zapier (fire-and-forget) */
    try {
      const current = JSON.parse(sessionStorage.getItem("docsy_booking") || "{}");
      const appliedCreditLines: { label: string; amount: number }[] = [];
      if (applyNotarization) {
        appliedCreditLines.push({
          label:  user?.membership === "starter"
            ? `${MEMBERSHIP_LABELS[user.membership]} Member Credit — 50% Off Notarization`
            : `${MEMBERSHIP_LABELS[user!.membership!]} Member Credit — Free Notarization`,
          amount: -notarizationCreditValue,
        });
      }
      if (applyTravelWaiver) {
        appliedCreditLines.push({
          label:  `${MEMBERSHIP_LABELS[user!.membership!]} Member Credit — Travel Waiver`,
          amount: -TRAVEL_WAIVER_VALUE,
        });
      }
      const mergedAutoPromos = [...(current.autoPromos ?? []), ...appliedCreditLines];
      const updated = {
        ...current,
        autoPromos: mergedAutoPromos,
        discountedTotal: displayTotal,
        paymentCompleted: true,
        cardLast4: last4,
        clientName:  clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.replace(/\D/g, ""),
        accountCreated,
        accountExisting,
        appliedCredits: { notarization: applyNotarization, travelWaiver: applyTravelWaiver },
      };
      sessionStorage.setItem("docsy_booking", JSON.stringify(updated));

      if (booking) {
        const payload = buildZapierPayload(booking, last4);
        fetch("/api/zapier/booking-confirmed", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        }).catch(() => { /* webhook failure must never affect the booking UX */ });
      }
    } catch {}

    setTimeout(() => setLocation("/booking/confirmation"), 600);
  }, [contactOk, upfront, formOk, number, clientName, clientEmail, clientPhone, booking, setLocation, user, token, createAccount, signIn, applyNotarization, applyTravelWaiver, displayTotal, notarizationCreditValue]);

  const fieldBorder = (ok: boolean) =>
    touched && !ok ? RED : DIV;
  const fieldColor  = (ok: boolean) =>
    touched && !ok ? RED : IVORY;

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: IVORY }}>

      {/* ── Header ── */}
      <section className="px-5 pt-20 pb-10 sm:pt-28 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <Link href="/booking" className="text-xs font-bold uppercase tracking-widest mb-8 inline-block" style={{ color: "rgba(0,0,0,0.35)" }}>
              ← Back to Booking
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border mb-6 ml-0 block" style={{ borderColor: BLUE, color: BLUE }}>
              Step 3 of 3 — Payment
            </div>
            <h1 className="text-[2.8rem] sm:text-[4rem] font-black leading-none text-black" style={{ letterSpacing: "-0.03em" }}>
              {upfront ? "Review & pay." : "Review & confirm."}
            </h1>
            {user?.membership && (
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "rgba(0,0,0,0.25)", color: "rgba(0,0,0,0.65)", backgroundColor: "rgba(77,159,219,0.12)" }}>
                ◆ {MEMBERSHIP_LABELS[user.membership]} — Perks Auto-Applied
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* ── Payment Terms ── */}
          <FadeIn delay={0}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Payment Terms</p>
              </div>
              {termKeys.map((key, idx) => {
                const t = TERMS[key];
                if (!t) return null;
                return (
                  <div key={key} className={idx < termKeys.length - 1 ? "px-8 py-6 border-b" : "px-8 py-6"} style={{ borderColor: DIV }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>{t.heading}</p>
                    <div className="space-y-3">
                      {t.body.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.55)" }}>{para}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
              {termKeys.length === 0 && (
                <div className="px-8 py-6">
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No payment terms applicable.</p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* ── Contact Information ── */}
          <FadeIn delay={40}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              <div className="px-8 py-5 border-b" style={{ borderColor: DIV }}>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Contact Information
                </p>
              </div>
              <div className="px-8 py-6 space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                    style={{
                      borderColor: contactTouched && !contactNameOk ? RED : contactNameOk ? BLUE : DIV,
                      color:       contactTouched && !contactNameOk ? RED : IVORY,
                      caretColor:  BLUE,
                    } as React.CSSProperties}
                    data-testid="input-client-name"
                  />
                  {contactTouched && !contactNameOk && (
                    <p className="text-[10px] mt-1.5" style={{ color: RED }}>Please enter your full name.</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                    style={{
                      borderColor: contactTouched && !contactEmailOk ? RED : contactEmailOk ? BLUE : DIV,
                      color:       contactTouched && !contactEmailOk ? RED : IVORY,
                      caretColor:  BLUE,
                    } as React.CSSProperties}
                    data-testid="input-client-email"
                  />
                  {contactTouched && !contactEmailOk && (
                    <p className="text-[10px] mt-1.5" style={{ color: RED }}>Please enter a valid email address.</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={clientPhone}
                    onChange={e => setClientPhone(fmtPhone(e.target.value))}
                    placeholder="(210) 555-1234"
                    autoComplete="tel"
                    className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                    style={{
                      borderColor: contactTouched && !contactPhoneOk ? RED : contactPhoneOk ? BLUE : DIV,
                      color:       contactTouched && !contactPhoneOk ? RED : IVORY,
                      caretColor:  BLUE,
                    } as React.CSSProperties}
                    data-testid="input-client-phone"
                  />
                  {contactTouched && !contactPhoneOk && (
                    <p className="text-[10px] mt-1.5" style={{ color: RED }}>Please enter a valid 10-digit phone number.</p>
                  )}
                </div>

                {/* Account-creation opt-in (only when not signed in) */}
                {!user && (
                  <div className="border-t pt-5" style={{ borderColor: DIV }}>
                    <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setCreateAccount(v => !v)}>
                      <div
                        className="mt-0.5 w-5 h-5 shrink-0 border-2 flex items-center justify-center transition-colors"
                        style={{
                          borderColor:     createAccount ? BLUE : "rgba(255,255,255,0.2)",
                          backgroundColor: createAccount ? BLUE : "transparent",
                        }}
                      >
                        {createAccount && <span className="text-black text-[11px] font-black leading-none">✓</span>}
                      </div>
                      <span className="text-sm font-medium leading-snug" style={{ color: createAccount ? IVORY : "rgba(255,255,255,0.5)" }}>
                        Create my Docsy account so I can access my Safe+ and track this booking.
                      </span>
                    </label>
                    <p className="text-[10px] mt-2 ml-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Free, no card. Your Safe+ is included with every Docsy service. We'll email you a one-time verification code so you can sign in from any device.
                    </p>
                  </div>
                )}
                {user && (
                  <div className="border-t pt-4 flex items-center gap-2" style={{ borderColor: DIV }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>✓ Signed in</span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                      as {user.name}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </FadeIn>

          {/* ── Available Member Credits panel — explicit Apply / Remove ── */}
          {credits && credits.membership && (credits.notarizationCredits > 0 || credits.travelWaiverAvailable) && (
            <FadeIn delay={50}>
              <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
                <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Available Member Credits — This Cycle
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>
                    ◆ {MEMBERSHIP_LABELS[credits.membership] ?? credits.membership}
                  </span>
                </div>
                <div className="px-8 py-5 space-y-4">

                  {credits.notarizationCredits > 0 && (
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-sm font-medium" style={{ color: IVORY }}>
                          {credits.membership === "starter"
                            ? "50% off notarization"
                            : `Free notarization${credits.notarizationCredits > 1 ? "s" : ""}`}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {credits.membership === "starter" ? "1 available" : `${credits.notarizationCredits} available`} ·
                          Worth −${notarizationCreditValue.toFixed(2)} on this booking
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setApplyNotarization(v => !v)}
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors"
                        style={{
                          borderColor:     applyNotarization ? BLUE : "rgba(255,255,255,0.2)",
                          color:           applyNotarization ? "#000" : BLUE,
                          backgroundColor: applyNotarization ? BLUE : "transparent",
                        }}
                        data-testid="toggle-credit-notarization"
                      >
                        {applyNotarization ? "Remove" : "Use this credit"}
                      </button>
                    </div>
                  )}

                  {credits.travelWaiverAvailable && (
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-sm font-medium" style={{ color: IVORY }}>Mobile travel waiver</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          1 available · Worth −${TRAVEL_WAIVER_VALUE.toFixed(2)} on this booking
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setApplyTravelWaiver(v => !v)}
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors"
                        style={{
                          borderColor:     applyTravelWaiver ? BLUE : "rgba(255,255,255,0.2)",
                          color:           applyTravelWaiver ? "#000" : BLUE,
                          backgroundColor: applyTravelWaiver ? BLUE : "transparent",
                        }}
                        data-testid="toggle-credit-travel"
                      >
                        {applyTravelWaiver ? "Remove" : "Use this credit"}
                      </button>
                    </div>
                  )}

                  {(applyNotarization || applyTravelWaiver) && (
                    <div className="pt-3 border-t" style={{ borderColor: DIV }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Applied to this booking
                      </p>
                      {applyNotarization && (
                        <div className="flex items-baseline justify-between text-xs mb-1">
                          <span style={{ color: IVORY }}>Notarization credit</span>
                          <span className="font-black" style={{ color: BLUE }}>−${notarizationCreditValue.toFixed(2)}</span>
                        </div>
                      )}
                      {applyTravelWaiver && (
                        <div className="flex items-baseline justify-between text-xs">
                          <span style={{ color: IVORY }}>Travel waiver</span>
                          <span className="font-black" style={{ color: BLUE }}>−${TRAVEL_WAIVER_VALUE.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-[10px] leading-relaxed pt-2 border-t" style={{ color: "rgba(255,255,255,0.3)", borderColor: DIV }}>
                    Credits are only consumed when you complete the booking. Toggle off to keep them for a future appointment.
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* ── HonorPass upsell — last chance before payment ── */}
          <FadeIn delay={70}>
            <div className="mb-6">
              <HonorPassUpsell returnTo="/booking/payment" variant="panel" />
            </div>
          </FadeIn>

          {/* ── Card form or court-only message ── */}
          <FadeIn delay={80}>
            <div className="border-2 border-black overflow-hidden" style={{ backgroundColor: BG }}>
              {upfront ? (
                <>
                  <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: DIV }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Card Details</p>
                    <div className="flex items-center gap-2">
                      {["VISA", "MC", "AMEX", "DISC"].map(b => (
                        <span key={b} className="text-[9px] font-black px-1.5 py-0.5 border" style={{ borderColor: DIV, color: "rgba(255,255,255,0.2)" }}>{b}</span>
                      ))}
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-5">
                    {/* Name on card */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jane Smith"
                        autoComplete="cc-name"
                        className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-medium"
                        style={{ borderColor: fieldBorder(nameOk), color: fieldColor(nameOk), caretColor: BLUE } as React.CSSProperties}
                      />
                      {touched && !nameOk && (
                        <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the name as it appears on your card.</p>
                      )}
                    </div>

                    {/* Card number */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={number}
                        onChange={e => setNumber(fmtCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                        className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                        style={{ borderColor: fieldBorder(numOk), color: fieldColor(numOk), caretColor: BLUE } as React.CSSProperties}
                      />
                      {touched && !numOk && (
                        <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid 16-digit card number.</p>
                      )}
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          Expiry
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={expiry}
                          onChange={e => setExpiry(fmtExpiry(e.target.value))}
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                          style={{ borderColor: fieldBorder(expOk), color: fieldColor(expOk), caretColor: BLUE } as React.CSSProperties}
                        />
                        {touched && !expOk && (
                          <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter a valid expiry (MM/YY).</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          CVV
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cvv}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          autoComplete="cc-csc"
                          className="w-full px-4 py-3 text-sm bg-transparent border outline-none font-mono tracking-widest"
                          style={{ borderColor: fieldBorder(cvvOk), color: fieldColor(cvvOk), caretColor: BLUE } as React.CSSProperties}
                        />
                        {touched && !cvvOk && (
                          <p className="text-[10px] mt-1.5" style={{ color: RED }}>Enter the 3- or 4-digit security code.</p>
                        )}
                      </div>
                    </div>

                    {/* Amount + Pay button */}
                    <div className="pt-2 border-t" style={{ borderColor: DIV }}>
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-sm font-bold text-white">Amount due today</span>
                        <div className="text-right">
                          {hasDiscount && (
                            <span className="text-sm line-through mr-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                              ${booking?.estimate?.total.toFixed(2)}
                            </span>
                          )}
                          <span className="text-2xl font-black" style={{ color: BLUE }}>
                            ${displayTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handlePay}
                        disabled={submitting}
                        className="w-full py-4 text-base font-bold text-white transition-opacity"
                        style={{ backgroundColor: "#000", opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}
                      >
                        {submitting ? "Processing…" : `Pay $${displayTotal.toFixed(2)}`}
                      </button>
                      <p className="text-[10px] mt-4 leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                        Your payment is processed securely. Docsy does not store your card details.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Court reporting only — no upfront payment */
                <div className="px-8 py-8">
                  <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>No Upfront Payment Required</p>
                  <p className="text-sm leading-relaxed font-light mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Court reporting services are billed after the deposition is complete. You will receive an invoice per the terms above — no card is required to confirm this booking.
                  </p>
                  <button
                    onClick={handlePay}
                    disabled={submitting}
                    className="w-full py-4 text-base font-bold text-white transition-opacity"
                    style={{ backgroundColor: "#000", opacity: submitting ? 0.5 : 1, cursor: submitting ? "wait" : "pointer" }}
                  >
                    {submitting ? "Confirming…" : "Complete Booking"}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
