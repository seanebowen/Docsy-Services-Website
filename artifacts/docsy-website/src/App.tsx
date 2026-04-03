import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";

import Home from "@/pages/Home";
import RON from "@/pages/RON";
import MobileNotary from "@/pages/MobileNotary";
import Apostille from "@/pages/Apostille";
import LoanSigning from "@/pages/LoanSigning";
import CourtReporting from "@/pages/CourtReporting";
import Memberships from "@/pages/Memberships";
import FAQ from "@/pages/FAQ";
import HelpCenter from "@/pages/HelpCenter";
import Promos from "@/pages/Promos";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ron" component={RON} />
      <Route path="/mobile-notary" component={MobileNotary} />
      <Route path="/apostille" component={Apostille} />
      <Route path="/loan-signing" component={LoanSigning} />
      <Route path="/court-reporting" component={CourtReporting} />
      <Route path="/memberships" component={Memberships} />
      <Route path="/faq" component={FAQ} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/help-center/:id" component={HelpCenter} />
      <Route path="/promos" component={Promos} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
