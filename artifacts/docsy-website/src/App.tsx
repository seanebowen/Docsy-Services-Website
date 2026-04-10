import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";

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
import Login from "@/pages/Login";
import Verify from "@/pages/Verify";
import SafeVault from "@/pages/SafeVault";
import VaultInfo from "@/pages/VaultInfo";
import Estimator from "@/pages/Estimator";
import Booking from "@/pages/Booking";
import BookingPayment from "@/pages/BookingPayment";
import BookingConfirmation from "@/pages/BookingConfirmation";
import Contact from "@/pages/Contact";
import MembershipCheckout from "@/pages/MembershipCheckout";
import About from "@/pages/About";
import LanguageLine from "@/pages/LanguageLine";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/estimate" component={Estimator} />
      <Route path="/booking/confirmation" component={BookingConfirmation} />
      <Route path="/booking/payment" component={BookingPayment} />
      <Route path="/booking" component={Booking} />
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
      <Route path="/login" component={Login} />
      <Route path="/verify" component={Verify} />
      <Route path="/vault" component={SafeVault} />
      <Route path="/vault-info" component={VaultInfo} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/language-line" component={LanguageLine} />
      <Route path="/membership-checkout" component={MembershipCheckout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
