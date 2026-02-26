import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageLayout, QueryParamRedirect } from "./components/LanguageRouter";
import Index from "./pages/Index";
import Property from "./pages/Property";
import Differentiators from "./pages/Differentiators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Surroundings from "./pages/Surroundings";
import SurroundingsDetail from "./pages/SurroundingsDetail";
import HouseRules from "./pages/HouseRules";
import Checklist from "./pages/Checklist";
import LocalTips from "./pages/LocalTips";
import EarlyArrival from "./pages/EarlyArrival";
import Privacy from "./pages/Privacy";
import RentalTerms from "./pages/RentalTerms";
import CancellationPolicy from "./pages/CancellationPolicy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// All page routes — defined once, rendered for both /:lang and / prefixes
const pageRoutes = (
  <>
    <Route index element={<Index />} />
    <Route path="property" element={<Property />} />
    <Route path="differentiators" element={<Differentiators />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="booking" element={<Booking />} />
    <Route path="surroundings" element={<Surroundings />} />
    <Route path="surroundings/:category/:slug" element={<SurroundingsDetail />} />
    <Route path="house-rules" element={<HouseRules />} />
    <Route path="checklist" element={<Checklist />} />
    <Route path="shops" element={<LocalTips />} />
    <Route path="early-arrival" element={<EarlyArrival />} />
    <Route path="rental-terms" element={<RentalTerms />} />
    <Route path="cancellation-policy" element={<CancellationPolicy />} />
    <Route path="privacy-policy" element={<Privacy />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <QueryParamRedirect />
        <Routes>
          {/* Dutch (default, no prefix) */}
          <Route element={<LanguageLayout />}>
            {pageRoutes}
          </Route>
          {/* FR / EN / DE with language prefix */}
          <Route path=":lang" element={<LanguageLayout />}>
            {pageRoutes}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
