import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Home from "@/pages/Home";
import NotaryServices from "@/pages/NotaryServices";
import Apostille from "@/pages/Apostille";
import LoanSigning from "@/pages/LoanSigning";
import CourtReporting from "@/pages/CourtReporting";
import Memberships from "@/pages/Memberships";
import FAQ from "@/pages/FAQ";
import Promos from "@/pages/Promos";
import Login from "@/pages/Login";
import Verify from "@/pages/Verify";
import SafeVault from "@/pages/SafeVault";
import VaultInfo from "@/pages/VaultInfo";
import Calculator from "@/pages/Calculator";
import InternalBook from "@/pages/InternalBook";
import Booking from "@/pages/Booking";
import BookingPayment from "@/pages/BookingPayment";
import BookingConfirmation from "@/pages/BookingConfirmation";
import MembershipCheckout from "@/pages/MembershipCheckout";
import About from "@/pages/About";
import IdMeCallback from "@/pages/IdMeCallback";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import Accessibility from "@/pages/Accessibility";
import Glossary from "@/pages/Glossary";
import DocumentCheck from "@/pages/DocumentCheck";
import Firms from "@/pages/Firms";
import FirmPortal from "@/pages/FirmPortal";
import InternalFirms from "@/pages/InternalFirms";

const queryClient = new QueryClient();

function VaultGuard() {
  const { token } = useAuth();
  if (!token) return <Redirect to="/vault-info" />;
  return <SafeVault />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculate" component={Calculator} />
      <Route path="/estimate"><Redirect to="/calculate" /></Route>
      <Route path="/internal-book" component={InternalBook} />
      <Route path="/electronic-reporting" component={CourtReporting} />
      <Route path="/booking/confirmation" component={BookingConfirmation} />
      <Route path="/booking/payment" component={BookingPayment} />
      <Route path="/booking" component={Booking} />
      <Route path="/notary-services" component={NotaryServices} />
      <Route path="/ron"><Redirect to="/notary-services#ron" /></Route>
      <Route path="/mobile-notary"><Redirect to="/notary-services#mobile" /></Route>
      <Route path="/apostille" component={Apostille} />
      <Route path="/apostille/wizard" component={Apostille} />
      <Route path="/loan-signing" component={LoanSigning} />
      <Route path="/court-reporting"><Redirect to="/electronic-reporting" /></Route>
      <Route path="/memberships" component={Memberships} />
      <Route path="/faq" component={FAQ} />
      <Route path="/faq/:id" component={FAQ} />
      <Route path="/help-center"><Redirect to="/faq" /></Route>
      <Route path="/help-center/:id">{(p: { id: string }) => <Redirect to={`/faq/${p.id}`} />}</Route>
      <Route path="/promos" component={Promos} />
      <Route path="/login" component={Login} />
      <Route path="/verify" component={Verify} />
      <Route path="/vault" component={VaultGuard} />
      <Route path="/vault-info" component={VaultInfo} />
      <Route path="/contact"><Redirect to="/about#contact" /></Route>
      <Route path="/about" component={About} />
      <Route path="/language-line"><Redirect to="/calculate" /></Route>
      <Route path="/membership-checkout" component={MembershipCheckout} />
      <Route path="/idme/callback" component={IdMeCallback} />
      <Route path="/terms" component={Terms} />
      <Route path="/terms-of-service"><Redirect to="/terms" /></Route>
      <Route path="/legal"><Redirect to="/terms" /></Route>
      <Route path="/privacy" component={Privacy} />
      <Route path="/privacy-policy"><Redirect to="/privacy" /></Route>
      <Route path="/cookies" component={Cookies} />
      <Route path="/cookie-policy"><Redirect to="/cookies" /></Route>
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/accessibility-statement"><Redirect to="/accessibility" /></Route>
      <Route path="/glossary" component={Glossary} />
      <Route path="/glossary/:slug" component={Glossary} />
      <Route path="/document-check" component={DocumentCheck} />
      <Route path="/firms" component={Firms} />
      <Route path="/firm/portal" component={FirmPortal} />
      <Route path="/internal-firms" component={InternalFirms} />
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
