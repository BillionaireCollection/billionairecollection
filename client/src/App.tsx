/* ============================================================
   BILLIONAIRE COLLECTION — App Router
   All pages registered here. Dark theme enforced globally.
   ============================================================ */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

// Pages
import Home from "./pages/Home";
import Estates from "./pages/Estates";
import Boat from "./pages/Boat";
import Air from "./pages/Air";
import Car from "./pages/Car";
import Art from "./pages/Art";
import Crypto from "./pages/Crypto";
import Media from "./pages/Media";
import Technology from "./pages/Technology";
import Services from "./pages/Services";
import Champagne from "./pages/Champagne";
import Vodka from "./pages/Vodka";
import Cigar from "./pages/Cigar";
import Oud from "./pages/Oud";
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import CardConcierge from "./pages/CardConcierge";
import Card from "./pages/Card";
import Funding from "./pages/Funding";
import Golf from "./pages/Golf";
import Travel from "./pages/Travel";
import Television from "./pages/Television";
import Magazine from "./pages/Magazine";
import Radio from "./pages/Radio";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import GoldenTicket from "./pages/GoldenTicket";
import Admin from "./pages/Admin";
import XOffer from "./pages/XOffer";
import BillionaireWisdom from "./pages/BillionaireWisdom";
import BillionaireTutor from "./pages/BillionaireTutor";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column" }}>
      <ScrollToTop />
      <BackToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Admin dashboard — outside public Layout (no Navbar/Footer) */}
      <Route path="/admin" component={Admin} />
      {/* X (Twitter) offer page — standalone, no Navbar/Footer */}
      <Route path="/x-offer" component={XOffer} />
      <Route path="/offer" component={XOffer} />
      <Route>
        {/* All public pages wrapped in the luxury Layout */}
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/estates" component={Estates} />
            <Route path="/boat" component={Boat} />
            <Route path="/air" component={Air} />
            <Route path="/car" component={Car} />
            <Route path="/art" component={Art} />
            <Route path="/crypto" component={Crypto} />
            <Route path="/media" component={Media} />
            <Route path="/television" component={Television} />
            <Route path="/magazine" component={Magazine} />
            <Route path="/radio" component={Radio} />
            <Route path="/technology" component={Technology} />
            <Route path="/services" component={Services} />
            <Route path="/funding" component={Funding} />
            <Route path="/golf" component={Golf} />
            <Route path="/travel" component={Travel} />
            <Route path="/card" component={Card} />
            <Route path="/card-concierge" component={CardConcierge} />
            <Route path="/champagne" component={Champagne} />
            <Route path="/vodka" component={Vodka} />
            <Route path="/cigar" component={Cigar} />
            <Route path="/oud" component={Oud} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/news" component={News} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/golden-ticket" component={GoldenTicket} />
            <Route path="/billionaire-wisdom" component={BillionaireWisdom} />
            <Route path="/billionaire-tutor" component={BillionaireTutor} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
