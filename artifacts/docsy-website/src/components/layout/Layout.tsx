import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GlobalStatusBar } from "@/components/status/GlobalStatusBar";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <ScrollToTop />
      <div className="sticky top-0 z-50">
        <Navbar />
        <GlobalStatusBar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
