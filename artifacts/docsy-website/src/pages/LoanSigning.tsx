import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Briefcase, Users, Building2 } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function LoanSigning() {
  React.useEffect(() => {
    document.title = "Loan Signing Agent | Docsy Notary Services";
  }, []);

  return (
    <div className="w-full pb-24">
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Loan signings done right.{" "}
              <span className="block mt-2">Flat rates. No surprises. Scanbacks back fast.</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mb-8">
              Certified loan signing agent for refinance, buyer, seller, HELOC, reverse mortgage, and commercial packages. Texas-compliant. Reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="btn-book-signing">
                Book a Signing
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" data-testid="btn-brokerlink">
                BrokerLink™ Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">For borrowers</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Closing on a home is stressful enough without having to worry about whether the signing agent is going to show up, know what they're doing, and return the documents on time. Docsy handles the signing side so your closing team can focus on funding.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Docsy sends every borrower a pre-appointment guide before every signing — what ID to bring, what not to sign early, what to have ready. Prepared borrowers mean cleaner signings and faster fundings.
              </p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">For title companies and real estate agents</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Published flat rates. No negotiating every assignment. Scanbacks included with refinance and buyer packages and returned immediately on completion — not hours later.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Texas HELOC law compliance handled proactively on every qualifying assignment. And if a re-sign is needed because of a lender or title error — that gets billed to the party at fault, not automatically to you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Texas HELOC — the one nobody warns you about</h2>
                <p className="text-amber-800 text-lg leading-relaxed">
                  Texas law prohibits home equity loan signings at the borrower's residence. Docsy flags every HELOC assignment and confirms a compliant signing location (title company, lender branch, or attorney office) before accepting it. If your signing agent doesn't know this, your closing is at risk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl mx-auto" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-10 text-center">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Refinance Package", price: "$175" },
                { label: "Buyer Purchase Package", price: "$200" },
                { label: "Seller Package", price: "$125" },
                { label: "HELOC/Home Equity", price: "$175" },
                { label: "Reverse Mortgage", price: "$225" },
                { label: "Loan Modification", price: "$100" },
              ].map((item) => (
                <Card key={item.label} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{item.price}</div>
                    <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Add-ons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">+$35</div>
                    <div className="text-sm text-muted-foreground">Rush (under 4 hrs)</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">+$30</div>
                    <div className="text-sm text-muted-foreground">After-hours</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">$75 flat</div>
                    <div className="text-sm text-muted-foreground">Re-sign (lender error)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/40 rounded-lg p-6 space-y-3">
              {[
                "Scanbacks included with refinance and buyer packages",
                "90-day Docsy Safe+ vault trial included with every signing",
                "BrokerLink™ preferred pricing available for real estate agents and title companies — $35/month",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Book a loan signing or ask about BrokerLink™ preferred pricing</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Written estimate before every appointment. All fees disclosed before you start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg" data-testid="btn-book-signing-cta">
                Book a Signing
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" data-testid="btn-brokerlink-cta">
                BrokerLink™ Info
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
