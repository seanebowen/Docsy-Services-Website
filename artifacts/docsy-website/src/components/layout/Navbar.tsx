import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, HelpCircle, MessageSquare, Tag, Calculator, ChevronDown, Phone } from "lucide-react";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#4D9FDB";

const allLinks = [
  { href: "/ron",            label: "RON" },
  { href: "/mobile-notary",  label: "Mobile Notary" },
  { href: "/loan-signing",   label: "Loan Signing" },
  { href: "/apostille",      label: "Apostille" },
  { href: "/court-reporting",label: "Court Reporting" },
  { href: "/memberships",    label: "Memberships" },
];

const moreLinks = [
  { href: "/estimate",    label: "Estimate Your Cost", icon: Calculator },
  { href: "/faq",         label: "FAQ",                icon: HelpCircle },
  { href: "/help-center", label: "Help Center",        icon: MessageSquare },
  { href: "/promos",      label: "Promotions",         icon: Tag },
  { href: "/contact",     label: "Contact Us",         icon: Phone },
];

export function Navbar() {
  const [isOpen,   setIsOpen]   = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [location] = useLocation();

  useEffect(() => { setIsOpen(false); setMoreOpen(false); }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="flex items-center justify-between h-14 px-5 max-w-7xl mx-auto">

        <Link href="/" className="flex items-center shrink-0 select-none">
          <span
            className="text-[1.6rem] font-black leading-none"
            style={{ letterSpacing: "-0.04em", color: "#ffffff" }}
          >
            docsy<span style={{ color: AMBER }}>.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.40)" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: moreLinks.some(l => location === l.href) || moreOpen ? "#fff" : "rgba(255,255,255,0.40)" }}
            >
              More <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 z-50 border overflow-hidden"
                style={{ backgroundColor: "#0b1220", borderColor: DIV }}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b last:border-b-0"
                    style={{ color: "rgba(255,255,255,0.45)", borderColor: DIV }}
                  >
                    <link.icon className="h-3.5 w-3.5" /> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.40)" }}>
            Sign In
          </Link>
          <Link
            href="/estimate"
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors hover:bg-white/10"
            style={{ borderColor: AMBER, color: AMBER }}
            data-testid="btn-book-nav"
          >
            Book a Service
          </Link>
        </div>

        <button className="md:hidden p-1 transition-colors" style={{ color: "rgba(255,255,255,0.45)" }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: SLATE, borderColor: DIV }}>
          <nav className="px-5 py-4 flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b last:border-b-0"
                style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.45)", borderColor: DIV }}
              >
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b last:border-b-0"
                style={{ color: "rgba(255,255,255,0.35)", borderColor: DIV }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/estimate"
                className="block px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center border"
                style={{ borderColor: AMBER, color: AMBER }}
              >
                Book a Service
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
