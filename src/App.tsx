import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppNavbar from "./components/AppNavbar";
import EnhancedFooter from "./components/EnhancedFooter";
import KrishiMitra from "./components/KrishiMitra";

// Lazy load pages to improve initial load time
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

// Add a loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#138808] border-t-transparent"></div>
  </div>
);

// Layout component to handle logic for showing/hiding navbar and footer
const AppLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate checking if resources are loaded
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Determine if the current route is an auth page to hide navbar/footer
  const isAuthRoute = location.pathname === "/login" || 
                     location.pathname === "/register" || 
                     location.pathname === "/forgot-password";
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="bg-[#F2FCE2] min-h-screen">
      {!isAuthRoute && <AppNavbar />}
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
            <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
            <Route path="/dashboard/analytics" element={<MarketAnalytics />} />
            <Route path="/agriculture/crop-health" element={<CropHealthDashboard />} />
            <Route path="/farmer/products" element={<ManageProducts />} />
            <Route path="/vendor/marketplace" element={<Marketplace />} />
            <Route path="/consumer/nearby-vendors" element={<NearbyVendors />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAuthRoute && <EnhancedFooter />}
      <KrishiMitra />
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Cache data for 1 minute
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      retry: 1, // Reduce retry attempts
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
