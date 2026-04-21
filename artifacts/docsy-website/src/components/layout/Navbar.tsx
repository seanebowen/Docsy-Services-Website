import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, HelpCircle, Tag, ChevronDown, Archive, LogOut, User, Info, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const AMBER = "#4D9FDB";

const servicesLinks = [
  { href: "/apostille",           label: "Apostille" },
  { href: "/electronic-reporting",label: "Electronic Reporting" },
  { href: "/loan-signing",        label: "Loan Signing" },
  { href: "/memberships",         label: "Memberships" },
  { href: "/notary-services",     label: "Notary Services" },
  { href: "/vault-info",          label: "Safe+" },
];

const supportLinks = [
  { href: "/faq",   label: "FAQ & Guides",    icon: HelpCircle },
  { href: "/about", label: "About & Contact", icon: Info },
  { href: "/promos",label: "Promotions",      icon: Tag },
];

export function Navbar() {
  const [isOpen,        setIsOpen]        = React.useState(false);
  const [servicesOpen,  setServicesOpen]  = React.useState(false);
  const [moreOpen,      setMoreOpen]      = React.useState(false);
  const [accountOpen,   setAccountOpen]   = React.useState(false);
  const [location]      = useLocation();
  const { user, signOut } = useAuth();

  const accountRef  = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const moreRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMoreOpen(false);
    setAccountOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current  && !accountRef.current.contains(e.target as Node))  setAccountOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (moreRef.current     && !moreRef.current.contains(e.target as Node))     setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials   = user ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "";
  const firstName  = user?.name.split(" ")[0] ?? "";
  const isService  = servicesLinks.some(l => location === l.href);
  const isSupport  = supportLinks.some(l => location === l.href);

  return (
    <header className="w-full border-b" style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="flex items-center justify-between h-14 px-5 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 select-none">
          <span className="text-[1.6rem] font-black leading-none" style={{ letterSpacing: "-0.04em", color: "#ffffff" }}>
            docsy<span style={{ color: AMBER }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">

          {/* Services dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => { setServicesOpen(o => !o); setMoreOpen(false); }}
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: isService || servicesOpen ? "#fff" : "rgba(255,255,255,0.40)" }}
            >
              Services <ChevronDown className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-52 z-50 border overflow-hidden" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
                {servicesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b last:border-b-0"
                    style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.45)", borderColor: DIV }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* More / Support dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => { setMoreOpen(o => !o); setServicesOpen(false); }}
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: isSupport || moreOpen ? "#fff" : "rgba(255,255,255,0.40)" }}
            >
              More <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 z-50 border overflow-hidden" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
                {supportLinks.map((link) => (
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
          <Link
            href="/calculate"
            className="px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ backgroundColor: AMBER, color: "#fff" }}
            data-testid="nav-get-price"
          >
            Book Now
          </Link>
          {user ? (
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
                {user.membership && (
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5"
                    style={{ backgroundColor: "rgba(77,159,219,0.2)", color: "#4D9FDB" }}
                  >
                    Docsy+ {user.membership === "starter" ? "Starter" : user.membership === "pro" ? "Pro" : "Elite"}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 z-50 border overflow-hidden" style={{ backgroundColor: "#0b1220", borderColor: DIV }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: DIV }}>
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{user.email}</p>
                  </div>
                  <Link
                    href="/vault"
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b"
                    style={{ color: AMBER, borderColor: DIV }}
                  >
                    <Archive className="h-3.5 w-3.5" /> My Safe+
                  </Link>
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

            {/* Services section label */}
            <p className="text-[9px] font-black uppercase tracking-[0.18em] pt-1 pb-2" style={{ color: "rgba(255,255,255,0.22)" }}>
              Services
            </p>
            {servicesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium border-b"
                style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.45)", borderColor: DIV }}
              >
                {link.label}
              </Link>
            ))}

            {/* Support section label */}
            <p className="text-[9px] font-black uppercase tracking-[0.18em] pt-5 pb-2" style={{ color: "rgba(255,255,255,0.22)" }}>
              Support & Company
            </p>
            {supportLinks.map((link) => (
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
              <Link href="/calculate" className="block px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center" style={{ backgroundColor: "#4D9FDB", color: "#fff" }}>
                Book Now →
              </Link>
              {user ? (
                <>
                  <Link
                    href="/vault"
                    className="block px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center border"
                    style={{ borderColor: AMBER, color: AMBER }}
                  >
                    My Safe+
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-center border"
                    style={{ borderColor: DIV, color: "rgba(255,255,255,0.4)" }}
                  >
                    Sign Out — {firstName}
                  </button>
                </>
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
