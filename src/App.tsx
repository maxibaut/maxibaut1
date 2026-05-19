import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageLayout, QueryParamRedirect } from "./components/LanguageRouter";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded pages for reduced initial bundle
const Property = lazy(() => import("./pages/Property"));
const Differentiators = lazy(() => import("./pages/Differentiators"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Surroundings = lazy(() => import("./pages/Surroundings"));
const SurroundingsDetail = lazy(() => import("./pages/SurroundingsDetail"));
const SurroundingsCategoryHub = lazy(() => import("./pages/SurroundingsCategoryHub"));
const HouseRules = lazy(() => import("./pages/HouseRules"));
const Checklist = lazy(() => import("./pages/Checklist"));
const LocalTips = lazy(() => import("./pages/LocalTips"));
const EarlyArrival = lazy(() => import("./pages/EarlyArrival"));
const Privacy = lazy(() => import("./pages/Privacy"));
const RentalTerms = lazy(() => import("./pages/RentalTerms"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const Homeowners = lazy(() => import("./pages/Homeowners"));
const BrandToolkit = lazy(() => import("./pages/BrandToolkit"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalDetail = lazy(() => import("./pages/JournalDetail"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const StorybookPreview = lazy(() => import("./pages/StorybookPreview"));

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
    <Route path="surroundings/:category" element={<SurroundingsCategoryHub />} />
    <Route path="surroundings/:category/:slug" element={<SurroundingsDetail />} />
    <Route path="house-rules" element={<HouseRules />} />
    <Route path="checklist" element={<Checklist />} />
    <Route path="shops" element={<LocalTips />} />
    <Route path="early-arrival" element={<EarlyArrival />} />
    <Route path="rental-terms" element={<RentalTerms />} />
    <Route path="cancellation-policy" element={<CancellationPolicy />} />
    <Route path="privacy-policy" element={<Privacy />} />
    <Route path="homeowners" element={<Homeowners />} />
    <Route path="brand" element={<BrandToolkit />} />
    <Route path="journal" element={<Journal />} />
    <Route path="journal/:slug" element={<JournalDetail />} />
    <Route path="faq" element={<FAQ />} />
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
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            {/* Dutch (default, no prefix) */}
            <Route element={<LanguageLayout />}>
              {pageRoutes}
            </Route>
            {/* FR / EN / DE with language prefix */}
            <Route path=":lang" element={<LanguageLayout />}>
              {pageRoutes}
            </Route>
            {/* Isolated preview route — no language layout, no SEO indexing */}
            <Route path="preview/storybook" element={<StorybookPreview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
