
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import VendorDashboard from "./pages/dashboards/VendorDashboard";
import ConsumerDashboard from "./pages/dashboards/ConsumerDashboard";
import MarketAnalytics from "./pages/dashboards/MarketAnalytics";
import ManageProducts from "./pages/farmer/ManageProducts";
import Marketplace from "./pages/vendor/Marketplace";
import NearbyVendors from "./pages/consumer/NearbyVendors";
import Checkout from "./pages/checkout/Checkout";
import ProductShowcase from "./components/ProductShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import CropHealthDashboard from "./pages/agriculture/CropHealthDashboard";
import AppNavbar from "./components/AppNavbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EnhancedFooter from "./components/EnhancedFooter";

const queryClient = new QueryClient();

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
