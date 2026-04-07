import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, HelpCircle, MessageSquare, Tag, Calculator, ChevronDown, Phone, Archive, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#4D9FDB";

const allLinks = [
  { href: "/ron",            label: "RON" },
  { href: "/mobile-notary",  label: "Mobile/GNW" },
  { href: "/loan-signing",   label: "Loan Signing" },
  { href: "/apostille",      label: "Apostille" },
  { href: "/court-reporting",label: "Court Reporting" },
  { href: "/memberships",    label: "Memberships" },
];

const moreLinks = [
  { href: "/estimate",    label: "Price Calculator", icon: Calculator },
  { href: "/faq",         label: "FAQ",              icon: HelpCircle },
  { href: "/help-center", label: "Help Center",      icon: MessageSquare },
  { href: "/promos",      label: "Promotions",       icon: Tag },
  { href: "/contact",     label: "Contact Us",       icon: Phone },
];

export function Navbar() {
  const [isOpen,      setIsOpen]      = React.useState(false);
  const [moreOpen,    setMoreOpen]    = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [location]    = useLocation();
  const { user, signOut } = useAuth();

  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsOpen(false); setMoreOpen(false); setAccountOpen(false); }, [location]);

  /* Close account dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user
    ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
    : "";
  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="flex items-center justify-between h-14 px-5 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 select-none">
          <span className="text-[1.6rem] font-black leading-none" style={{ letterSpacing: "-0.04em", color: "#ffffff" }}>
            docsy<span style={{ color: AMBER }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
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

          {/* Safe+ Vault — only shown when signed in */}
          {user?.safePlusActive && (
            <Link
              href="/vault"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: location === "/vault" ? AMBER : "rgba(77,159,219,0.7)" }}
            >
              <Archive className="h-3.5 w-3.5" />
              Safe+
            </Link>
          )}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: moreLinks.some(l => location === l.href) || moreOpen ? "#fff" : "rgba(255,255,255,0.40)" }}
            >
              More <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 z-50 border overflow-hidden" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
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

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            /* ── Signed-in account widget ── */
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(o => !o)}
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: accountOpen ? "#fff" : "rgba(255,255,255,0.6)" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                  style={{ backgroundColor: AMBER, color: "#000" }}
                >
                  {initials}
                </span>
                {firstName}
                <ChevronDown className={`h-3 w-3 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 z-50 border overflow-hidden" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: DIV }}>
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{user.email}</p>
                  </div>
                  {user.safePlusActive && (
                    <Link
                      href="/vault"
                      className="flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b"
                      style={{ color: AMBER, borderColor: DIV }}
                    >
                      <Archive className="h-3.5 w-3.5" /> My Safe+ Vault
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.40)" }}>
              <User className="h-3.5 w-3.5" /> Sign In
            </Link>
          )}

          <Link
            href="/estimate"
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:opacity-90"
            style={{ backgroundColor: "#4D9FDB", color: "#fff" }}
            data-testid="btn-book-nav"
          >
            Book Now →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1 transition-colors" style={{ color: "rgba(255,255,255,0.45)" }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: SLATE, borderColor: DIV }}>
          <nav className="px-5 py-4 flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b"
                style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.45)", borderColor: DIV }}
              >
                {link.label}
              </Link>
            ))}

            {/* Safe+ Vault in mobile nav */}
            {user?.safePlusActive && (
              <Link
                href="/vault"
                className="py-3 text-sm font-medium border-b flex items-center gap-2"
                style={{ color: AMBER, borderColor: DIV }}
              >
                <Archive className="h-3.5 w-3.5" /> My Safe+ Vault
              </Link>
            )}

            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b"
                style={{ color: "rgba(255,255,255,0.35)", borderColor: DIV }}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link href="/estimate" className="block px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center" style={{ backgroundColor: "#4D9FDB", color: "#fff" }}>
                Book Now →
              </Link>
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="block w-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center border"
                  style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}
                >
                  Sign Out — {firstName}
                </button>
              ) : (
                <Link href="/login" className="block px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center border" style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}>
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
