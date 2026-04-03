import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  FileText, 
  MapPin, 
  Video, 
  Briefcase, 
  Globe, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  LayoutDashboard
} from "lucide-react";

export default function Home() {
  React.useEffect(() => {
    document.title = "Docsy Notary Services | Texas Remote & Mobile Notary";
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Hand us the documents. <br className="hidden md:block" />
              Walk away with your sanity.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium"
            >
              That's not a tagline. That's literally what happens.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Docsy is a Texas-based full-service document and notary company. We come to you, sign you online, handle your apostille, close your loan, report your deposition, and store your documents — all under one roof. Transparent pricing. Written estimate before every appointment. No hidden fees. No surprise invoices. No agency markup.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg h-14 px-8" data-testid="btn-book-hero">
                Book a Service
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild data-testid="btn-services-hero">
                <a href="#services">See What We Do</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Docsy Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The notary industry has a transparency problem.</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Hidden fees. Vague invoices. 'Administrative processing' charges that aren't real. Agents who confirm appointments and then disappear. Agencies that mark up everything and pass the cost to you. Docsy was built to be the thing the industry pretends it already is: straightforward, accountable, and worth booking again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-primary-foreground/10 border-none text-primary-foreground">
              <CardHeader>
                <CheckCircle2 className="h-12 w-12 text-primary-foreground/80 mb-4" />
                <CardTitle className="text-xl">The price you see is the price you pay.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/70">
                  Written estimate before every appointment. If it wasn't in the estimate, it's not on the invoice. That's not a policy — that's just how it works.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-none text-primary-foreground">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary-foreground/80 mb-4" />
                <CardTitle className="text-xl">Available when you actually need us.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/70">
                  7 days a week. Early morning to midnight. Same-hour RON available. Because documents don't only need notarizing between 9 and 5.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-none text-primary-foreground">
              <CardHeader>
                <LayoutDashboard className="h-12 w-12 text-primary-foreground/80 mb-4" />
                <CardTitle className="text-xl">One call handles everything.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/70">
                  Notary, apostille, loan signing, court reporting, document storage — all of it under one roof. Stop coordinating between four different vendors for one transaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Everything your documents could ever need.</h2>
            <p className="text-xl text-muted-foreground">
              None of the things that waste your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "Remote Online Notarization",
                desc: "Sign from anywhere in minutes. Legally binding. Same-hour available.",
                link: "/ron"
              },
              {
                icon: MapPin,
                title: "Mobile Notary",
                desc: "We come to you. Home, office, hospital, anywhere. 7 days to midnight.",
                link: "/mobile-notary"
              },
              {
                icon: FileText,
                title: "Loan Signing",
                desc: "Flat rates. Scanbacks included. Texas HELOC compliant. Every time.",
                link: "/loan-signing"
              },
              {
                icon: Globe,
                title: "Apostille Services",
                desc: "All-inclusive. State fee in. Scan emailed. Shipping prepped. Done.",
                link: "/apostille"
              },
              {
                icon: Briefcase,
                title: "Digital Court Reporting",
                desc: "Below agency rates. Word index and delivery included. No surprises.",
                link: "/court-reporting"
              },
              {
                icon: ShieldCheck,
                title: "Docsy Safe+ Vault",
                desc: "Encrypted document storage. 90-day free trial with your first order.",
                link: "/memberships"
              }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow border-border/50 group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.desc}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <Link href={service.link}>Learn more &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
              "Docsy clients don't re-explain what an apostille is every time they call. They don't wonder if the price on the phone will match the invoice. They don't have to follow up three times to find out where their transcript is. They book. We handle it. They move on with their life. That's the whole thing."
            </h2>
          </div>
        </div>
      </section>

      {/* Memberships Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-card border rounded-2xl p-8 md:p-12 shadow-sm">
            <ShieldCheck className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Use Docsy more than once?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              There's a better way to pay for it. Docsy+ memberships start at $15/month — free notarizations, priority scheduling, and discounts across every service division. Built for clients who've realized this isn't going to be a one-time thing.
            </p>
            <Button size="lg" asChild data-testid="btn-memberships-teaser">
              <Link href="/memberships">See Membership Options</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
