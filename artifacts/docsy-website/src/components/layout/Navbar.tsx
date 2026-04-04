import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, HelpCircle, MessageSquare, Tag } from "lucide-react";

const BG = "#00251b";
const CAROLINA = "#4B9CD3";
const CLOUD = "#f4ffff";
const EMERALD = "#047521";

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

  const leftLinks = [
    { href: "/ron", label: "RON" },
    { href: "/mobile-notary", label: "Mobile Notary" },
    { href: "/loan-signing", label: "Loan Signing" },
  ];

  const rightLinks = [
    { href: "/apostille", label: "Apostille" },
    { href: "/court-reporting", label: "Court Reporting" },
    { href: "/memberships", label: "Memberships" },
  ];

  const allMainLinks = [...leftLinks, ...rightLinks];

  const moreLinks = [
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/help-center", label: "Help Center", icon: MessageSquare },
    { href: "/promos", label: "Promotions", icon: Tag },
  ];

  const isActive = (href: string) => location === href;
  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-emerald/30 backdrop-blur-xl"
      style={{ backgroundColor: `${BG}ee` }}
    >
      <div className="hidden lg:flex items-center h-16 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center justify-end gap-6" style={{ flex: "1 0 0" }}>
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-[#f4ffff]"
                  : "text-[#f4ffff]/60 hover:text-[#f4ffff]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center shrink-0 px-8">
          <img
            src="/logo.png"
            alt="Docsy Notary Services"
            className="h-10 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>

        <nav className="flex items-center justify-start gap-6" style={{ flex: "1 0 0" }}>
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-[#f4ffff]"
                  : "text-[#f4ffff]/60 hover:text-[#f4ffff]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                isMoreActive || moreOpen
                  ? "text-[#f4ffff]"
                  : "text-[#f4ffff]/60 hover:text-[#f4ffff]"
              }`}
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-52 z-50 py-2 border rounded-xl overflow-hidden"
                style={{ backgroundColor: "#000F0A", borderColor: `${CLOUD}1a` }}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#f4ffff]/60 hover:text-[#f4ffff] hover:bg-[#f4ffff]/5 transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{
              backgroundColor: CAROLINA,
              color: CLOUD,
              boxShadow: `0 4px 14px ${CAROLINA}33`,
            }}
          >
            Book a Service
          </Link>
        </nav>
      </div>

      <div className="lg:hidden flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Docsy Notary Services"
            className="h-8 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <button
          className="p-2 -mr-2 text-[#f4ffff]/60 hover:text-[#f4ffff]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: BG, borderColor: `${EMERALD}66` }}>
          <nav className="px-4 py-6 flex flex-col gap-4">
            {allMainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-[#f4ffff]" : "text-[#f4ffff]/60 hover:text-[#f4ffff]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-4 mt-1 flex flex-col gap-3" style={{ borderColor: `${EMERALD}66` }}>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-sm font-medium text-[#f4ffff]/60 hover:text-[#f4ffff] transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="mt-2 px-6 py-3 text-sm font-medium text-center rounded-md transition-all duration-200"
              style={{ backgroundColor: CAROLINA, color: CLOUD }}
            >
              Book a Service
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
