import React from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";

const CAROLINA = "#4B9CD3";
const CLOUD = "#f4ffff";
const EMERALD = "#047521";
const TERMINAL = "#00251b";

export function Footer() {
  return (
    <footer style={{ backgroundColor: TERMINAL }}>
      <div className="py-16 px-4 sm:px-6">
        <div
          className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${EMERALD}, ${TERMINAL})`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${CAROLINA}15, transparent 60%)`,
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: CLOUD }}>
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: `${CLOUD}b3` }}>
              Tell us what you need. We'll tell you exactly what it costs. No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                style={{
                  backgroundColor: CAROLINA,
                  color: CLOUD,
                  boxShadow: `0 4px 14px ${CAROLINA}33`,
                }}
              >
                Book a Service <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "transparent",
                  color: `${CLOUD}cc`,
                  border: `1px solid ${CLOUD}33`,
                }}
              >
                <MessageCircle className="h-4 w-4" /> Text Us Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="block">
              <img src="/logo.png" alt="Docsy Notary Services" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: `${CLOUD}66` }}>
              Hand us the documents. Walk away with your sanity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: `${CLOUD}99` }}>
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/ron", label: "Remote Online Notarization" },
                { href: "/mobile-notary", label: "Mobile Notary" },
                { href: "/loan-signing", label: "Loan Signing" },
                { href: "/apostille", label: "Apostille Services" },
                { href: "/court-reporting", label: "Court Reporting" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors duration-200" style={{ color: `${CLOUD}4d` }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: `${CLOUD}99` }}>
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/memberships", label: "Memberships & Safe+" },
                { href: "/faq", label: "FAQ" },
                { href: "/help-center", label: "Help Center" },
                { href: "/promos", label: "Promotions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors duration-200" style={{ color: `${CLOUD}4d` }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: `${CLOUD}99` }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "Book a Service" },
                { href: "/help-center", label: "Help Center Guides" },
                { href: "/faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center gap-1.5 transition-colors duration-200" style={{ color: `${CLOUD}4d` }}>
                    <ArrowRight className="h-3 w-3" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ borderTop: `1px solid ${EMERALD}40` }}
        >
          <p className="text-xs leading-relaxed max-w-2xl" style={{ color: `${CLOUD}33` }}>
            <strong style={{ color: `${CLOUD}4d` }}>Legal Notice:</strong> Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only.
          </p>
          <p className="text-xs whitespace-nowrap" style={{ color: `${CLOUD}33` }}>
            &copy; {new Date().getFullYear()} Docsy Notary Services
          </p>
        </div>
      </div>
    </footer>
  );
}
