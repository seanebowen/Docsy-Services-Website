import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Mic, FileText, Clock, Shield } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function CourtReporting() {
  React.useEffect(() => {
    document.title = "Digital Court Reporting | Docsy Notary Services";
  }, []);

  const included = [
    "Word index",
    "Certified PDF",
    "E-transcript ASCII file",
    "Digital delivery via Docsy portal",
    "Oath administration",
    "Exhibit marking and logging",
    "Pre-deposition tech check for remote sessions",
  ];

  const agencyExtra = [
    "Word index (10–15 pages at full rate elsewhere)",
    "Litigation package ($40–$150 elsewhere)",
    "E-transcript formats ($25–$75 elsewhere)",
    "E-delivery fee",
    "Deposition officer fee",
  ];

  return (
    <div className="w-full pb-24">
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Court reporting without the agency invoice that requires a decoder ring.
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mb-8">
              Digital court reporting for depositions and legal proceedings. Soniclear certified. Below agency rates. Word index, certified PDF, and delivery included — always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="btn-schedule-depo">
                Schedule a Deposition
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" data-testid="btn-request-estimate">
                Request Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h2 className="text-2xl font-bold mb-4">What agencies don't want you to compare</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Agencies charge $5–$7.50+ per page for ordinary transcripts, then add word index fees, litigation package fees, e-delivery surcharges, vault hosting, and 'administrative processing' charges on top.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">$4.25</div>
                <div className="text-lg font-medium">per page — standard rate</div>
                <p className="text-muted-foreground mt-2 text-sm">Word index, certified PDF, e-transcript, and digital delivery all included. That's not a promotional rate. That's the standard rate.</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Who shows up to your deposition</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With an agency, you find out at the door. With Docsy, you already know — it's the same certified reporter who took your booking, confirmed your details, and is familiar with your case. Not whoever was available last minute.
              </p>
              <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-5">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  Soniclear certified. Every session recorded with professional-grade audio for transcript accuracy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" {...fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Always included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {included.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-amber-600" />
                    What agencies charge extra for (that Docsy includes)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {agencyExtra.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl mx-auto" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-10 text-center">Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Appearance Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "2-Hour Minimum", price: "$275" },
                    { label: "Half-Day (up to 4 hrs)", price: "$325" },
                    { label: "Full-Day (up to 8 hrs)", price: "$550" },
                    { label: "Remote Half-Day", price: "$250" },
                    { label: "Remote Full-Day", price: "$450" },
                    { label: "Overtime per 30 min", price: "$45" },
                    { label: "After-hours surcharge", price: "+$100" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <span className="text-muted-foreground text-sm">{item.label}</span>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transcript Page Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Ordinary (30 days)", price: "$4.25/pg" },
                    { label: "14-Day", price: "$5.00/pg" },
                    { label: "7-Day Expedited", price: "$5.75/pg" },
                    { label: "3-Day Rush (prepaid)", price: "$6.50/pg" },
                    { label: "24-Hour Rush (prepaid)", price: "$7.75/pg" },
                    { label: "Same-Day (prepaid)", price: "$9.50/pg" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <span className="text-muted-foreground text-sm">{item.label}</span>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/40 rounded-lg p-4 text-sm text-muted-foreground text-center">
              50% deposit required at scheduling for all transcript orders. Appearance-only: NET 14, no deposit.
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Book a deposition or request a written cost estimate</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Same certified reporter every time. All-inclusive pricing. No decoder ring required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg" data-testid="btn-schedule-depo-cta">
                Schedule a Deposition
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" data-testid="btn-estimate-cta">
                Request Estimate
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
