import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, MonitorPlay, Wifi, FileText, Smartphone } from "lucide-react";

export default function RON() {
  React.useEffect(() => {
    document.title = "Remote Online Notarization (RON) | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full pb-24">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get notarized without leaving the couch.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4 font-serif italic">
              (We're serious. That's a feature, not a bug.)
            </p>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mb-8">
              Remote Online Notarization — legally binding, secure, done in under 15 minutes. Available same-hour, 7 days a week, anywhere in the US.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="btn-book-ron">
                Book RON
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" data-testid="btn-text-ron">
                Text to Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">What is RON?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  RON is exactly what it sounds like: you get notarized online, via live video, without being in the same room as the notary. It's fully legal in Texas and accepted nationwide for most document types. How it works: you open a secure video link, show your ID on camera, sign your document while the notary watches, and you're done. The notarized PDF lands in your Docsy portal usually within minutes.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">When RON makes sense</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><Check className="h-6 w-6 text-primary shrink-0" /> When you can't leave the house (or just really don't want to).</li>
                  <li className="flex gap-3"><Check className="h-6 w-6 text-primary shrink-0" /> When it's 8 PM and every bank and UPS Store is closed.</li>
                  <li className="flex gap-3"><Check className="h-6 w-6 text-primary shrink-0" /> When your co-signer is in a different city.</li>
                  <li className="flex gap-3"><Check className="h-6 w-6 text-primary shrink-0" /> When you need it done today and there's no time for a mobile visit.</li>
                  <li className="flex gap-3"><Check className="h-6 w-6 text-primary shrink-0" /> When the document is straightforward and you just want it handled.</li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-6 rounded-xl border border-secondary">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" /> When RON does NOT work
                </h2>
                <p className="text-muted-foreground">
                  Not every document type can be notarized remotely — some require in-person presence by law (certain Texas real estate transactions, for example). If you're not sure whether RON works for your document, text us before booking. We'll tell you straight.
                </p>
              </div>
            </div>

            <div>
              {/* Pricing Block */}
              <Card className="mb-12 border-primary/20 shadow-md">
                <CardHeader className="bg-secondary/30 pb-4 border-b">
                  <CardTitle className="text-2xl">Pricing</CardTitle>
                  <p className="text-sm text-muted-foreground">All fees disclosed before you book. Written estimate before we start.</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="font-medium">First notarization</span>
                      <span className="text-lg font-bold">$25</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Each additional seal, same session</span>
                      <span className="font-medium">+$5</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Same-hour priority</span>
                      <span className="font-medium">+$15</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Witness provided by Docsy (if needed)</span>
                      <span className="font-medium">+$25</span>
                    </li>
                    <li className="pt-2">
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <span className="font-bold text-primary block mb-1">Night Shift Seal™</span>
                        <span className="text-sm text-muted-foreground">Book between 6–9 PM and save $10 off your first notarization.</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* What to have ready */}
              <h3 className="text-2xl font-bold mb-6">What to have ready</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-5">
                  <h4 className="font-bold text-green-700 flex items-center gap-2 mb-4">
                    <Check className="h-5 w-5" /> DO
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><Smartphone className="h-4 w-4 mt-0.5" /> Valid unexpired govt photo ID</li>
                    <li className="flex items-start gap-2"><FileText className="h-4 w-4 mt-0.5" /> Document open and ready</li>
                    <li className="flex items-start gap-2"><MonitorPlay className="h-4 w-4 mt-0.5" /> Device with camera and mic</li>
                    <li className="flex items-start gap-2"><Wifi className="h-4 w-4 mt-0.5" /> Stable WiFi</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> Quiet private space</li>
                  </ul>
                </div>
                <div className="bg-card border rounded-xl p-5">
                  <h4 className="font-bold text-destructive flex items-center gap-2 mb-4">
                    <X className="h-5 w-5" /> DO NOT
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><X className="h-4 w-4 mt-0.5 text-destructive/70" /> Do NOT sign document first</li>
                    <li className="flex items-start gap-2"><X className="h-4 w-4 mt-0.5 text-destructive/70" /> Do NOT fill in dates ahead of time</li>
                    <li className="flex items-start gap-2"><X className="h-4 w-4 mt-0.5 text-destructive/70" /> Do NOT use a VPN</li>
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
