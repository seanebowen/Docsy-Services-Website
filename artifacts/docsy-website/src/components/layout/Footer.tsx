import React from "react";
import { Link } from "wouter";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#4D9FDB";

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: SLATE, borderColor: DIV }}>

      <div className="px-5 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Services</p>
            <ul className="space-y-2">
              {[["/ron","RON"],["/mobile-notary","Mobile/GNW"],["/loan-signing","Loan Signing"],["/apostille","Apostille"],["/court-reporting","Court Reporting"]].map(([href,label]) => (
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
            <strong className="font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>Legal Notice:</strong> Docsy Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only.
          </p>
          <p className="text-xs font-light whitespace-nowrap" style={{ color: "rgba(255,255,255,0.18)" }}>
            &copy; {new Date().getFullYear()} Docsy Services
          </p>
        </div>
      </div>
    </footer>
  );
}
