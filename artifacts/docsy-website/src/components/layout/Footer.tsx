import React from "react";
import { Link } from "wouter";

const CAROLINA = "#D4B896";

export function Footer() {
  return (
    <footer className="border-t border-[#162040]" style={{ backgroundColor: "#0d1b3e" }}>

      <div className="py-16 px-5 border-b border-[#162040] text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: CAROLINA, color: "#000" }}>
              ◎ GET STARTED
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-base text-white/50 mb-8 max-w-md mx-auto">
            Tell us what you need. We'll tell you exactly what it costs. No hidden fees, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-8 py-4 text-sm font-bold text-white text-center" style={{ backgroundColor: "#000", border: "1px solid #fff" }} data-testid="btn-book-footer">
              Book a Service
            </Link>
            <button className="px-8 py-4 text-sm font-bold text-black text-center" style={{ backgroundColor: CAROLINA }}>
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
            <p className="text-xs text-white/30 leading-relaxed">Hand us the documents. Walk away with your sanity.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Services</p>
            <ul className="space-y-2">
              {[
                ["/ron", "RON"],
                ["/mobile-notary", "Mobile Notary"],
                ["/loan-signing", "Loan Signing"],
                ["/apostille", "Apostille"],
                ["/court-reporting", "Court Reporting"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Company</p>
            <ul className="space-y-2">
              {[
                ["/memberships", "Memberships"],
                ["/faq", "FAQ"],
                ["/help-center", "Help Center"],
                ["/promos", "Promotions"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Account</p>
            <ul className="space-y-2">
              {[
                ["/login", "Sign In"],
                ["/help-center", "Help Center Guides"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#162040] pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="text-xs text-white/20 leading-relaxed max-w-2xl">
            <strong className="text-white/30">Legal Notice:</strong> Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only.
          </p>
          <p className="text-xs text-white/20 whitespace-nowrap">
            &copy; {new Date().getFullYear()} Docsy Notary Services
          </p>
        </div>
      </div>
    </footer>
  );
}
