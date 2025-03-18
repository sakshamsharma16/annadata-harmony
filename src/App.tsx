
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
import FastBotsChat from "./components/FastBotsChat";
import AdminDashboard from "./components/AdminDashboard";

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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#138808] border-t-transparent"></div>
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
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
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/market-prices" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAuthRoute && <EnhancedFooter />}
      
      {/* KrishiMitra chatbot token is always visible */}
      <KrishiMitra />
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const [useFastBots, setUseFastBots] = useState(false);

  useEffect(() => {
    const preference = localStorage.getItem('preferredChatbot');
    if (preference === 'krishiMitra') {
      setUseFastBots(false);
    } else if (preference === 'fastBots') {
      setUseFastBots(true);
    }
  }, []);

  useEffect(() => {
    if (useFastBots && window.FastBots) {
      window.FastBots.init({
        rasaProLicenseToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmRkMTRhZC1kMmVkLTRlZTItODJkNS0xNTliZjFjMjM0NDUiLCJpYXQiOjE3NDIzMTk3ODgsIm5iZiI6MTc0MjMxOTc4OCwic2NvcGUiOiJyYXNhOnBybyByYXNhOnBybzpjaGFtcGlvbiByYXNhOnZvaWNlIiwiZXhwIjoxODM3MDE0MTg4LCJlbWFpbCI6ImtycmlzaGdhdXIwMDAwQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJSYXNhIENoYW1waW9ucyJ9.di37RXJshZJvCgau0W-XVhnnYldGY23TC_suNb_hHaKSTHMIXr93-NdElWVt_3-JdJjVtU8GABKCmYqAkIdPTnOHYHbq8oUVxGNwvaY9OcL3toxLa-RNbdb3O4i_0-CC8lDtJgBLZNfuLEF1P3L_l8K9Dj9wBIxniUehySnMTQMroH6pmgf9VPGkvae9NzQPXoj6YJMlt2eLe_jODw7gt4olpy6mSp-jRVe56tzWNmPlSYmEfLs7UraI7dgbMM3kXINicCyJy1bhffebWnFH6Q5_NSkItiEDqE6FmEg_xSpVtHVGQN5n7Dusf0gp3ioXnsQA-RuP88wtOCv83LtpBg",
        multilingual: true,
        voiceEnabled: true
      });
    }
  }, [useFastBots]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
