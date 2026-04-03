import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, MapPin } from "lucide-react";

export default function MobileNotary() {
  React.useEffect(() => {
    document.title = "Mobile Notary | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full pb-24">
      {/* Hero Section */}
      <section className="bg-background text-foreground py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            We come to you. Not the other way around.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Home. Office. Hospital. Nursing home. Wherever you are — Docsy mobile notary comes to you. 7 days, early morning to midnight.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg" data-testid="btn-book-mobile">Book Mobile Visit</Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg" data-testid="btn-estimate-mobile">Get an Estimate</Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center text-lg leading-relaxed">
            <p>
              A mobile notary is a commissioned Texas Notary Public who travels to your location instead of making you come to an office. Same legal validity. Same certified stamp. Infinitely more convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="h-6 w-6 text-primary" /> Where we go</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Home. Your office. A coffee shop. A law firm. A title company. A hospital bedside. A nursing home. An assisted living facility. Anywhere you need a document notarized — we'll meet you there. Bedside notarizations for power of attorney, healthcare directives, and urgent documents are one of the most important services we provide. If someone you love needs documents signed and can't leave a care facility, we handle it.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What we can notarize</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Powers of attorney. Wills and trusts. Real estate documents. Affidavits. Vehicle titles. Medical authorizations. Business agreements. Immigration documents. Anything that needs a notary seal — if it's legal to notarize, we can do it.
                </p>
              </div>

              <div className="bg-secondary p-6 rounded-xl border border-border">
                <h2 className="text-xl font-bold mb-2">What we can't do</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We can't give you legal advice. We can't draft your documents. We can't tell you if your document will be accepted by a third party. Those things require an attorney. If you need one, we'll tell you — and we won't pretend otherwise.
                </p>
              </div>
            </div>

            <div>
              <Card className="border-border shadow-sm mb-8">
                <CardHeader className="bg-secondary/30 pb-4 border-b">
                  <CardTitle className="text-xl">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border/50">
                    <h4 className="font-bold mb-3 text-sm tracking-wider uppercase text-muted-foreground">Notarization Fees (Statutory)</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span>First notarization</span>
                      <span className="font-medium">$10</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Each additional signature, same document</span>
                      <span>$1</span>
                    </div>
                  </div>

                  <div className="p-4 border-b border-border/50">
                    <h4 className="font-bold mb-3 text-sm tracking-wider uppercase text-muted-foreground">Travel Fees</h4>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm">Tier 1 (0–10 miles)</span><span className="font-medium">$30</span></div>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm">Tier 2 (11–25 miles)</span><span className="font-medium">$45</span></div>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm">Tier 3 (26–40 miles)</span><span className="font-medium">$65</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Tier 4 (40+ miles)</span><span className="font-medium">$85+</span></div>
                  </div>

                  <div className="p-4 border-b border-border/50">
                    <h4 className="font-bold mb-3 text-sm tracking-wider uppercase text-muted-foreground">Timing Add-Ons</h4>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm text-muted-foreground">Rush within 2 hours</span><span className="font-medium">+$35</span></div>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm text-muted-foreground">After-hours (after 6 PM)</span><span className="font-medium">+$20</span></div>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm text-muted-foreground">Late night (10 PM–midnight)</span><span className="font-medium">+$35</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Weekend/holiday</span><span className="font-medium">+$25</span></div>
                  </div>

                  <div className="p-4 bg-primary/5">
                    <h4 className="font-bold mb-1 text-sm text-primary">Time-Based Discounts</h4>
                    <p className="text-sm text-muted-foreground">Early Route™ (8–10 AM) or Midday Miles™ (1–3 PM): <strong className="text-foreground">$10 off travel fee</strong></p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border rounded-xl p-4">
                  <h4 className="font-bold text-green-700 flex items-center gap-1.5 mb-3 text-sm">
                    <Check className="h-4 w-4" /> DO
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>Valid unexpired govt photo ID</li>
                    <li>Original document (not a copy)</li>
                    <li>All co-signers present with their own ID</li>
                    <li>Payment ready</li>
                  </ul>
                </div>
                <div className="bg-card border rounded-xl p-4">
                  <h4 className="font-bold text-destructive flex items-center gap-1.5 mb-3 text-sm">
                    <X className="h-4 w-4" /> DO NOT
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>Don't sign before we arrive</li>
                    <li>Don't fill in dates</li>
                    <li>Don't bring incomplete documents</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
