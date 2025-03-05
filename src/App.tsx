
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import EnhancedFooter from "./components/EnhancedFooter";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Cache data for 1 minute
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  },
});

const App = () => {
  // Determine if the current route is an auth page to hide navbar/footer
  const isAuthRoute = (pathname: string) => {
    return pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={
              <>
                {({ location }) => {
                  const path = location.pathname;
                  const showNavFooter = !isAuthRoute(path);
                  
                  return (
                    <>
                      {showNavFooter && <AppNavbar />}
                      <main>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            
                            {/* Authentication */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Dashboards */}
                            <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
                            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
                            <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
                            <Route path="/dashboard/analytics" element={<MarketAnalytics />} />
                            
                            {/* Agriculture */}
                            <Route path="/agriculture/crop-health" element={<CropHealthDashboard />} />
                            
                            {/* E-commerce pages */}
                            <Route path="/farmer/products" element={<ManageProducts />} />
                            <Route path="/vendor/marketplace" element={<Marketplace />} />
                            <Route path="/consumer/nearby-vendors" element={<NearbyVendors />} />
                            <Route path="/checkout" element={<Checkout />} />
                            
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </main>
                      {showNavFooter && <EnhancedFooter />}
                    </>
                  );
                }}
              </>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
