import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PromotionTicker } from "./PromotionTicker";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <PromotionTicker />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
