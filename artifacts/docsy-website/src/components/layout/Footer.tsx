import React from "react";
import { Link } from "wouter";
import { CredentialsStrip } from "@/components/marketing/CredentialsStrip";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#4D9FDB";

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: SLATE, borderColor: DIV }}>

      <div className="px-5 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Services</p>
            <ul className="space-y-2">
              {[["/notary-services","Notary Services (RON & Mobile/GNW)"],["/loan-signing","Loan Signing"],["/apostille","Apostille"],["/electronic-reporting","Electronic Reporting"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Company</p>
            <ul className="space-y-2">
              {[["/memberships","Memberships"],["/vault-info","Safe+"],["/faq","FAQ & Guides"],["/about","About & Contact"],["/promos","Promotions"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Account</p>
            <ul className="space-y-2">
              {[["/login","Sign In"],["/faq","Help Guides"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Legal</p>
            <ul className="space-y-2">
              {[["/terms","Terms of Service"],["/privacy","Privacy Policy"],["/cookies","Cookie Policy"],["/accessibility","Accessibility"],["/terms#refunds","Refund Policy"],["/terms#arbitration","Dispute Resolution"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm font-light transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 pb-6" style={{ borderColor: DIV }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            ⊙ Credentials &amp; Trust
          </p>
          <CredentialsStrip variant="footer" />
          <p className="text-[11px] font-light mt-4 max-w-3xl" style={{ color: "rgba(255,255,255,0.32)" }}>
            Military, veteran, and first responder verification powered by <Link href="/promos" className="underline hover:text-white">ID.me</Link> — the same federal credential service used by the VA &amp; IRS. Texas notary commission and surety bond on file with the Texas Secretary of State.
          </p>
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
