import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User, LogOut, HelpCircle, MessageSquare } from "lucide-react";

const DARK = "#141414";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [location] = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
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
  ];

  const accountLinks = [
    { href: "/account", label: "My Account", icon: User },
    { href: "/sign-out", label: "Sign Out", icon: LogOut },
  ];

  const isActive = (href: string) => location === href;
  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  return (
    <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: DARK }}>
      {/* Desktop layout */}
      <div className="hidden lg:flex items-center h-20 px-8 relative">

        {/* Center: logo absolutely positioned */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center"
        >
          <img
            src="/logo.png"
            alt="Docsy Notary Services"
            className="h-14 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>

        {/* Right: nav links + CTA (pushed to right) */}
        <nav className="ml-auto flex items-center gap-6">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors whitespace-nowrap ${
                isActive(link.href) ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors ${
                isMoreActive || moreOpen ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              More
              <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-52 z-50 py-1 border border-white/10"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-white/10" />
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            className="ml-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            Book a Service
          </Link>
        </nav>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4">
        {/* Logo centered on mobile */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Docsy Notary Services"
            className="h-10 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <button
          className="p-2 -mr-2 text-white/60 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: DARK }}>
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-5">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive(link.href) ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 mt-1 flex flex-col gap-4">
              {[...moreLinks, ...accountLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
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
