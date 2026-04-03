import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Apostille() {
  React.useEffect(() => {
    document.title = "Apostille Services | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full pb-24">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Abstract globe pattern could go here */}
          <Globe className="w-96 h-96 absolute -right-20 -top-20" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your document needs to work in another country. We make that happen.
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
              All-inclusive Texas apostille services — state filing fee, digital scan, and shipping prep included. Personal documents starting at $150. No hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="btn-order-apostille">
                Order Apostille
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" data-testid="btn-precheck-apostille">
                Free Pre-Check
              </Button>
              <Button size="lg" variant="ghost" className="h-14 px-8 text-lg text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" data-testid="btn-ask-apostille">
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">What is an apostille?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  An apostille is an official certificate that authenticates a document for use in another country — specifically in countries that are part of the 1961 Hague Convention (which is most of them). It's essentially the government saying: 'Yes, this document is real, and the signature and seal on it are legitimate.' If you're moving abroad, applying for dual citizenship, getting married internationally, sending your diploma to a foreign employer, adopting internationally, or doing anything legal in another country that requires a US document — you probably need an apostille.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">What Docsy handles</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Everything. You send us the original certified document, we review it before filing (our free Pre-Check makes sure it qualifies before we submit anything), file it at the Texas Secretary of State, email you a digital certified scan the moment it's done, and send the original back to you.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-xl border border-amber-200 dark:border-amber-900/50 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-2">Important Notes</h3>
                  <p className="text-amber-800 dark:text-amber-500/80 text-sm leading-relaxed">
                    Texas apostilles can only be placed on Texas-origin documents or documents notarized by a Texas notary. Originals only — photocopies, scans, and laminated documents cannot be apostilled.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-border shadow-sm sticky top-24">
                <CardHeader className="bg-secondary/30 pb-4 border-b">
                  <CardTitle className="text-xl">Pricing</CardTitle>
                  <p className="text-sm text-muted-foreground">All-inclusive. No surprise agency fees.</p>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border/50 text-sm">
                    <li className="p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Apostille Pre-Check</span>
                        <span className="font-bold">$25</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Free for retainer clients. Review before filing.</span>
                    </li>
                    <li className="p-4 flex justify-between items-center">
                      <span>Standard Personal Documents</span>
                      <span className="font-bold">$150</span>
                    </li>
                    <li className="p-4 flex justify-between items-center">
                      <span>Standard Business Documents</span>
                      <span className="font-bold">$175</span>
                    </li>
                    <li className="p-4 flex flex-col gap-2 bg-secondary/20">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Next-Day</span>
                        <span className="font-medium">$190</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Same-Day Rush (before 10 AM)</span>
                        <span className="font-medium">$225</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Federal/USDOS</span>
                        <span className="font-medium">$275</span>
                      </div>
                    </li>
                    <li className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Each additional doc (same order)</span>
                        <span className="font-medium">$100</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Bundle of 5 or more</span>
                        <span className="font-medium">$90 each</span>
                      </div>
                    </li>
                  </ul>
                  <div className="p-4 bg-primary/5 rounded-b-lg border-t border-primary/10">
                    <h4 className="font-bold text-xs text-primary mb-2 uppercase tracking-wider">Included in every order</h4>
                    <ul className="space-y-1">
                      <li className="text-xs text-muted-foreground flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> Texas SOS state filing fee</li>
                      <li className="text-xs text-muted-foreground flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> Digital certified scan</li>
                      <li className="text-xs text-muted-foreground flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> Return shipping prep</li>
                      <li className="text-xs text-muted-foreground flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> Free Pre-Check</li>
                      <li className="text-xs text-muted-foreground flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> 90-day Safe+ vault trial</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
