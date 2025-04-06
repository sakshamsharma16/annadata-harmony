
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import SEOHead from "./components/SEOHead";
import AppNavbar from "./components/AppNavbar";
import EnhancedFooter from "./components/EnhancedFooter";
import KrishiMitra from "./components/KrishiMitra";
import FastBotsChat from "./components/FastBotsChat";
import NavigationMenu from "./components/NavigationMenu";
import SupabaseTestLink from "./components/SupabaseTestLink";
import { getCacheItem, setCacheItem } from "./utils/cacheUtils";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FarmerDashboard = lazy(() => import("./pages/dashboards/FarmerDashboard"));
const VendorDashboard = lazy(() => import("./pages/dashboards/VendorDashboard"));
const ConsumerDashboard = lazy(() => import("./pages/dashboards/ConsumerDashboard"));
const MarketAnalytics = lazy(() => import("./pages/dashboards/MarketAnalytics"));
const ManageProducts = lazy(() => import("./pages/farmer/ManageProducts"));
const Marketplace = lazy(() => import("./pages/vendor/Marketplace"));
const NearbyVendors = lazy(() => import("./pages/consumer/NearbyVendors"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const CropHealthDashboard = lazy(() => import("./pages/agriculture/CropHealthDashboard"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

// Route-based code splitting helps reduce initial load time
const AboutPage = lazy(() => import("./pages/About"));
const TeamPage = lazy(() => import("./pages/Team"));
const ContactPage = lazy(() => import("./pages/Contact"));
const FaqPage = lazy(() => import("./pages/FAQ"));
const ServicesPage = lazy(() => import("./pages/Services"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#138808] border-t-transparent"></div>
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Home");
  const [pageDescription, setPageDescription] = useState("");
  
  useEffect(() => {
    // Check if we have a cached version of this page to show immediately
    const cachedContent = getCacheItem(`page-content-${location.pathname}`);
    if (cachedContent) {
      setIsLoading(false);
    } else {
      // Add artificial delay to show loading spinner (can be removed in production)
      const timer = setTimeout(() => setIsLoading(false), 300); // Reduced from 500ms to 300ms for faster transitions
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  // Update page metadata based on current route
  useEffect(() => {
    // Set title and description based on current path
    const path = location.pathname;
    
    if (path === "/") {
      setPageTitle("Home");
      setPageDescription("An integrated digital platform connecting farmers, vendors, and consumers");
    } else if (path.includes("/dashboard/farmer")) {
      setPageTitle("Farmer Dashboard");
      setPageDescription("Manage your farm business, products and analytics");
    } else if (path.includes("/dashboard/vendor")) {
      setPageTitle("Vendor Dashboard");
      setPageDescription("Access your marketplace analytics and manage orders");
    } else if (path.includes("/dashboard/consumer")) {
      setPageTitle("Consumer Dashboard");
      setPageDescription("Track your orders and find fresh local produce");
    } else if (path.includes("/dashboard/admin")) {
      setPageTitle("Admin Dashboard");
      setPageDescription("Manage the platform, users and analytics");
    } else if (path.includes("/about")) {
      setPageTitle("About Us");
      setPageDescription("Learn about our mission to transform agriculture");
    } else if (path.includes("/contact")) {
      setPageTitle("Contact");
      setPageDescription("Get in touch with our team");
    } else if (path.includes("/services")) {
      setPageTitle("Services");
      setPageDescription("Explore our range of services for the agricultural ecosystem");
    }
    
    // Cache current path after navigation
    setCacheItem(`last-visited-${path}`, new Date().toISOString());
  }, [location]);
  
  // Check if we're on an authentication route
  const isAuthRoute = location.pathname === "/login" || 
                     location.pathname === "/register" || 
                     location.pathname === "/forgot-password";
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        ogUrl={`https://annadata.com${location.pathname}`}
      />
      <div className="bg-[#F2FCE2] min-h-screen">
        {!isAuthRoute && <NavigationMenu />}
        <main className={!isAuthRoute ? "pt-20" : ""}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
              <Route path="/dashboard/vendor" element={<VendorDashboard />} />
              <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
              <Route path="/dashboard/analytics" element={<MarketAnalytics />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/agriculture/crop-health" element={<CropHealthDashboard />} />
              <Route path="/farmer/products" element={<ManageProducts />} />
              <Route path="/vendor/marketplace" element={<Marketplace />} />
              <Route path="/consumer/nearby-vendors" element={<NearbyVendors />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/market-prices" element={<MarketAnalytics />} />
              
              {/* Routes for About section */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              
              {/* Routes for Services section */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:service" element={<ServicesPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {!isAuthRoute && <EnhancedFooter />}
        
        <KrishiMitra />
        <SupabaseTestLink />
      </div>
    </>
  );
};

// Create and configure query client with caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data remains fresh for 1 minute
      gcTime: 5 * 60 * 1000, // Cache persists for 5 minutes (replaced cacheTime with gcTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Create basic placeholder pages for new sections
const App = () => {
  const [useFastBots, setUseFastBots] = useState(true);

  useEffect(() => {
    const preference = localStorage.getItem('preferredChatbot');
    if (preference === 'krishiMitra') {
      setUseFastBots(false);
    } else if (preference === 'fastBots' || !preference) {
      setUseFastBots(true);
      localStorage.setItem('preferredChatbot', 'fastBots');
    }
    
    // Preload important resources
    const preloadLinks = [
      { href: '/og-image.png', as: 'image' },
      { href: 'https://app.fastbots.ai/embed.js', as: 'script' }
    ];
    
    // Add preload links to document head
    preloadLinks.forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      document.head.appendChild(preloadLink);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
            
            {useFastBots && (
              <FastBotsChat botId="cm4bojr9l0j5zsvbm6faemmyn" />
            )}
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
