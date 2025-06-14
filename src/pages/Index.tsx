import { lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/Hero";
import SmartDashboardHighlights from "@/components/homepage/SmartDashboardHighlights";
import UserRoleCards from "@/components/homepage/UserRoleCards";
import PlatformFeaturesSection from "@/components/homepage/PlatformFeaturesSection";
import AdminPortalLink from "@/components/homepage/AdminPortalLink";
import HomeQuickNavCircleSwitcher from "@/components/homepage/HomeQuickNavCircleSwitcher";

// Lazy load non-critical components
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts"));
const MarketPrices = lazy(() => import("@/components/MarketPrices"));
const Reviews = lazy(() => import("@/components/Reviews"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading component
const SectionLoading = () => <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="h-60 bg-gray-100 animate-pulse rounded-lg"></div>
    </div>
  </div>;

// Import new components!
import CropHealthSimulatorModal from "@/components/homepage/CropHealthSimulatorModal";
import FarmerIncomeCalculatorModal from "@/components/homepage/FarmerIncomeCalculatorModal";
import CartRouteVisualizerModal from "@/components/homepage/CartRouteVisualizerModal";
import BlogKnowledgeCentre from "@/components/homepage/BlogKnowledgeCentre";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar - LanguageSelector with microcopy for inclusivity */}
      <div className="w-full flex justify-end items-center gap-2 py-3 px-6 bg-gradient-to-r from-green-50/80 to-white sticky top-0 z-30">
        
      </div>
      <Hero />
      {/* --- NEW FEATURED QUICK NAV --- */}
      <HomeQuickNavCircleSwitcher />
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-2" variant="outline">Choose Your Role</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Select Your Portal</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Annadata offers specialized interfaces for farmers, vendors, and consumers in the agricultural ecosystem.
            </p>
          </div>
          <UserRoleCards />
          <AdminPortalLink />
          {/* --- DEMO INTERACTIVE BUTTONS --- */}
          <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:justify-center md:gap-6">
            <CropHealthSimulatorModal />
            <FarmerIncomeCalculatorModal />
            <CartRouteVisualizerModal />
          </div>
          <span className="block text-xs text-gray-400 mt-2 text-center">Interactive tools • Visual demos</span>
        </div>
      </section>
      <Suspense fallback={<SectionLoading />}>
        <Features />
      </Suspense>
      <div className="animate-fade-in">
        <SmartDashboardHighlights />
      </div>
      <PlatformFeaturesSection />
      <Suspense fallback={<SectionLoading />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <MarketPrices />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Reviews />
      </Suspense>
      {/* --- KNOWLEDGE/BLOG SECTION --- */}
      <BlogKnowledgeCentre />
      <Suspense fallback={<SectionLoading />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Footer />
      </Suspense>
    </div>
  );
};
export default Index;
