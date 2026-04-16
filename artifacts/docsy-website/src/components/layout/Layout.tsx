import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PromotionTicker } from "./PromotionTicker";
import { HomeStatusBar } from "@/components/status/HomeStatusBar";

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
      <Navbar />
      <PromotionTicker />
      <HomeStatusBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
