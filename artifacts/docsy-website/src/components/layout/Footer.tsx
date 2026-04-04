import React from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0a0a0a" }}>

      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 sm:px-16 py-8 gap-4"
        style={{ backgroundColor: "#4A6FA8" }}
      >
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-1 opacity-60">
            Ready to get started?
          </p>
          <p className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}>
            Tell us what you need. We'll tell you exactly what it costs.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-white/90 transition-colors shrink-0"
        >
          Book a Service <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="container mx-auto px-8 sm:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div className="space-y-5">
            <Link href="/" className="block">
              <img src="/logo.png" alt="Docsy Notary Services" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Hand us the documents. Walk away with your sanity.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
              <MessageCircle className="h-4 w-4" />
              Text Us Now
            </button>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ron" className="text-white/40 hover:text-white transition-colors">Remote Online Notarization</Link></li>
              <li><Link href="/mobile-notary" className="text-white/40 hover:text-white transition-colors">Mobile Notary</Link></li>
              <li><Link href="/loan-signing" className="text-white/40 hover:text-white transition-colors">Loan Signing</Link></li>
              <li><Link href="/apostille" className="text-white/40 hover:text-white transition-colors">Apostille Services</Link></li>
              <li><Link href="/court-reporting" className="text-white/40 hover:text-white transition-colors">Court Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/memberships" className="text-white/40 hover:text-white transition-colors">Memberships & Safe+</Link></li>
              <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help-center" className="text-white/40 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/promos" className="text-white/40 hover:text-white transition-colors">Promotions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-5">See All Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                  <ArrowRight className="h-3 w-3" /> Book a Service
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                  <ArrowRight className="h-3 w-3" /> Help Center Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                  <ArrowRight className="h-3 w-3" /> FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-white/25 text-xs leading-relaxed max-w-2xl">
            <strong className="text-white/40">Legal Notice:</strong> Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only. For questions about what a document means or whether it's legally sufficient — consult a licensed attorney.
          </p>
          <p className="text-white/25 text-xs whitespace-nowrap">
            &copy; {new Date().getFullYear()} Docsy Notary Services
          </p>
        </div>
      </div>
    </footer>
  );
}
