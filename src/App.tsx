
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import MotionProvider from "./components/MotionProvider";
import SEOHead from "./components/SEOHead";
import NavigationMenu from "./components/NavigationMenu";
import SupabaseTestLink from "./components/SupabaseTestLink";
import { getCacheItem, setCacheItem } from "./utils/cacheUtils";
import { supabase } from "@/integrations/supabase/client";

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
const SupabaseTest = lazy(() => import("./pages/SupabaseTest"));

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

// Route guard for authenticated routes
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        setIsAuthenticated(true);
        
        // Get user role
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        if (userData) {
          setUserRole(userData.role);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Home");
  const [pageDescription, setPageDescription] = useState("");
  
  useEffect(() => {
    const cachedContent = getCacheItem(`page-content-${location.pathname}`);
    if (cachedContent) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  useEffect(() => {
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
    
    setCacheItem(`last-visited-${path}`, new Date().toISOString());
  }, [location]);
  
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
              
              {/* Protected routes with role-based access */}
              <Route path="/dashboard/farmer" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/vendor" element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/consumer" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <ConsumerDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute allowedRoles={['farmer', 'vendor', 'admin']}>
                  <MarketAnalytics />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/agriculture/crop-health" element={
                <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                  <CropHealthDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/farmer/products" element={
                <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                  <ManageProducts />
                </ProtectedRoute>
              } />
              
              <Route path="/vendor/marketplace" element={
                <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                  <Marketplace />
                </ProtectedRoute>
              } />
              
              <Route path="/consumer/nearby-vendors" element={
                <ProtectedRoute allowedRoles={['consumer', 'admin']}>
                  <NearbyVendors />
                </ProtectedRoute>
              } />
              
              <Route path="/checkout" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <Checkout />
                </ProtectedRoute>
              } />
              
              <Route path="/market-prices" element={
                <ProtectedRoute>
                  <MarketAnalytics />
                </ProtectedRoute>
              } />
              
              {/* Public accessible pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:service" element={<ServicesPage />} />
              <Route path="/supabase-test" element={<SupabaseTest />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <SupabaseTestLink />
      </div>
    </>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <MotionProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            </MotionProvider>
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
