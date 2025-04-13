
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../components/ProtectedRoute";
import SEOHandler from "../components/SEOHandler";
import { getCacheItem } from "../utils/cacheUtils";

// Lazy-loaded components
const Index = lazy(() => import("../pages/Index"));
const NotFound = lazy(() => import("../pages/NotFound"));
const FarmerDashboard = lazy(() => import("../pages/dashboards/FarmerDashboard"));
const VendorDashboard = lazy(() => import("../pages/dashboards/VendorDashboard"));
const ConsumerDashboard = lazy(() => import("../pages/dashboards/ConsumerDashboard"));
const MarketAnalytics = lazy(() => import("../pages/dashboards/MarketAnalytics"));
const ManageProducts = lazy(() => import("../pages/farmer/ManageProducts"));
const Marketplace = lazy(() => import("../pages/vendor/Marketplace"));
const NearbyVendors = lazy(() => import("../pages/consumer/NearbyVendors"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const CropHealthDashboard = lazy(() => import("../pages/agriculture/CropHealthDashboard"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const SupabaseTest = lazy(() => import("../pages/SupabaseTest"));

const AboutPage = lazy(() => import("../pages/About"));
const TeamPage = lazy(() => import("../pages/Team"));
const ContactPage = lazy(() => import("../pages/Contact"));
const FaqPage = lazy(() => import("../pages/FAQ"));
const ServicesPage = lazy(() => import("../pages/Services"));

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const cachedContent = getCacheItem(`page-content-${location.pathname}`);
    if (cachedContent) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  const isAuthRoute = location.pathname === "/login" || 
                      location.pathname === "/register" || 
                      location.pathname === "/forgot-password";
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <>
      <SEOHandler />
      <div className="bg-gradient-to-br from-[#F8FFF2] via-[#F2FCE2] to-[#EDFAD7] min-h-screen">
        {!isAuthRoute && <NavigationMenu />}
        <main className={!isAuthRoute ? "pt-20" : ""}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
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
              
              {/* Admin route - strictly only accessible to users with admin role */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']} strictMode={true}>
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
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:service" element={<ServicesPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default AppRoutes;
