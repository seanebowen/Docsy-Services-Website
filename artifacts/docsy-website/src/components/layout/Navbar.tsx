import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, HelpCircle, MessageSquare, Tag, ChevronDown } from "lucide-react";

const BG = "#0a0a0a";
const CAROLINA = "#E5A020";

const allLinks = [
  { href: "/ron", label: "RON" },
  { href: "/mobile-notary", label: "Mobile Notary" },
  { href: "/loan-signing", label: "Loan Signing" },
  { href: "/apostille", label: "Apostille" },
  { href: "/court-reporting", label: "Court Reporting" },
  { href: "/memberships", label: "Memberships" },
];

const moreLinks = [
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/help-center", label: "Help Center", icon: MessageSquare },
  { href: "/promos", label: "Promotions", icon: Tag },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a]" style={{ backgroundColor: BG }}>
      <div className="flex items-center justify-between h-14 px-5 max-w-7xl mx-auto">

        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Docsy" className="h-7 w-auto brightness-0 invert" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.45)" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: moreLinks.some(l => location === l.href) || moreOpen ? "#fff" : "rgba(255,255,255,0.45)" }}
            >
              More <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 z-50 border border-[#222] overflow-hidden"
                style={{ backgroundColor: "#111" }}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <link.icon className="h-3.5 w-3.5" /> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-bold text-black"
            style={{ backgroundColor: CAROLINA }}
            data-testid="btn-book-nav"
          >
            Book a Service
          </Link>
        </div>

        <button
          className="md:hidden p-1 text-white/50 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#1a1a1a]" style={{ backgroundColor: BG }}>
          <nav className="px-5 py-4 flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b border-[#1a1a1a] last:border-b-0"
                style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.50)" }}
              >
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b border-[#1a1a1a] last:border-b-0"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/"
                className="block px-5 py-3 text-sm font-bold text-black text-center"
                style={{ backgroundColor: CAROLINA }}
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
