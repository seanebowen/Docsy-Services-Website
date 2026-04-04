import React from "react";
import { Link } from "wouter";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#C8960A";

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: SLATE, borderColor: DIV }}>

      <div className="py-16 px-5 border-b text-center" style={{ borderColor: DIV }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border"
              style={{ borderColor: AMBER, color: AMBER }}
            >
              ◎ Get Started
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to get started?
          </h2>
          <p className="text-base font-light mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Tell us what you need. We'll tell you exactly what it costs.<br />No hidden fees, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-4 text-sm font-bold text-white text-center border"
              style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)" }}
              data-testid="btn-book-footer"
            >
              Book a Service
            </Link>
            <button
              className="px-8 py-4 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors hover:bg-white/10"
              style={{ borderColor: AMBER, color: AMBER }}
            >
              Text Us Now
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <img src="/logo.png" alt="Docsy" className="h-6 w-auto brightness-0 invert mb-4" />
            </Link>
            <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
              Hand us the documents.<br />Walk away with your sanity.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Services</p>
            <ul className="space-y-2">
              {[["/ron","RON"],["/mobile-notary","Mobile Notary"],["/loan-signing","Loan Signing"],["/apostille","Apostille"],["/court-reporting","Court Reporting"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Company</p>
            <ul className="space-y-2">
              {[["/memberships","Memberships"],["/faq","FAQ"],["/help-center","Help Center"],["/promos","Promotions"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Account</p>
            <ul className="space-y-2">
              {[["/login","Sign In"],["/help-center","Help Guides"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-start gap-4" style={{ borderColor: DIV }}>
          <p className="text-xs font-light leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.18)" }}>
            <strong className="font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>Legal Notice:</strong> Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only.
          </p>
          <p className="text-xs font-light whitespace-nowrap" style={{ color: "rgba(255,255,255,0.18)" }}>
            &copy; {new Date().getFullYear()} Docsy Notary Services
          </p>
        </div>
      </div>
    </footer>
  );
}
