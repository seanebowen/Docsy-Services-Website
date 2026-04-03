import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/ron", label: "RON" },
    { href: "/mobile-notary", label: "Mobile Notary" },
    { href: "/loan-signing", label: "Loan Signing" },
    { href: "/apostille", label: "Apostille" },
    { href: "/court-reporting", label: "Court Reporting" },
    { href: "/memberships", label: "Memberships" },
    { href: "/faq", label: "FAQ" },
    { href: "/help-center", label: "Help Center" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: "#141414" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Docsy Notary Services" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                location === link.href
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="ml-4 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            Book a Service
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-white/60 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: "#141414" }}>
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                  location === link.href ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="mt-2 px-6 py-3 text-sm font-bold uppercase tracking-widest text-center text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
            >
              Book a Service
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
