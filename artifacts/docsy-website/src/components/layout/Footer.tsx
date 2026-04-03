import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="font-serif text-3xl font-bold tracking-tight block">
              Docsy
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-sm">
              Hand us the documents. Walk away with your sanity.
            </p>
            <div className="pt-4">
              <Button variant="secondary" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Text Us Now
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/ron" className="hover:text-primary-foreground transition-colors">Remote Online Notarization</Link></li>
              <li><Link href="/mobile-notary" className="hover:text-primary-foreground transition-colors">Mobile Notary</Link></li>
              <li><Link href="/loan-signing" className="hover:text-primary-foreground transition-colors">Loan Signing</Link></li>
              <li><Link href="/apostille" className="hover:text-primary-foreground transition-colors">Apostille Services</Link></li>
              <li><Link href="/court-reporting" className="hover:text-primary-foreground transition-colors">Court Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/memberships" className="hover:text-primary-foreground transition-colors">Memberships & Safe+</Link></li>
              <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/help-center" className="hover:text-primary-foreground transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">Ready to get started?</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Tell us what you need. We'll tell you exactly what it costs, when we can do it, and what you need to bring. No runaround. No waiting on hold.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="default" className="bg-background text-foreground hover:bg-background/90 w-full justify-start">
                <Link href="/">Book a Service</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full justify-start">
                <Link href="/">See All Services</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>
            <strong>Legal Notice:</strong> Docsy Notary Services is not a law firm and does not provide legal advice. All notarial acts are performed in a ministerial capacity only. For questions about what a document means, whether it's legally sufficient, or whether it meets a specific requirement — consult a licensed attorney.
          </p>
          <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} Docsy Notary Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
