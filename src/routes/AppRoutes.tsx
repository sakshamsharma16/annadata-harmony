import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import AppNavbar from "../components/AppNavbar";
import SEOHandler from "../components/SEOHandler";

// Import pages
import Index from "../pages/Index";

// Lazy load less critical routes
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const FAQ = lazy(() => import("../pages/FAQ"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Services = lazy(() => import("../pages/Services"));
const Team = lazy(() => import("../pages/Team"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const SupabaseTest = lazy(() => import("../pages/SupabaseTest"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const AdminLogin = lazy(() => import("../pages/auth/AdminLogin"));
const FarmerDashboard = lazy(() => import("../pages/dashboards/FarmerDashboard"));
const VendorDashboard = lazy(() => import("../pages/dashboards/VendorDashboard"));
const ConsumerDashboard = lazy(() => import("../pages/dashboards/ConsumerDashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const ManageProducts = lazy(() => import("../pages/farmer/ManageProducts"));
const NearbyVendors = lazy(() => import("../pages/consumer/NearbyVendors"));
const MarketAnalytics = lazy(() => import("../pages/dashboards/MarketAnalytics"));
const CropHealthDashboard = lazy(() => import("../pages/agriculture/CropHealthDashboard"));
const MarketAnalysis = lazy(() => import("../components/market/MarketAnalysis"));

const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHandler />
      <AppNavbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/about" element={
            <Suspense fallback={<LoadingSpinner />}>
              <About />
            </Suspense>
          } />
          
          <Route path="/contact" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </Suspense>
          } />
          
          <Route path="/faq" element={
            <Suspense fallback={<LoadingSpinner />}>
              <FAQ />
            </Suspense>
          } />
          
          <Route path="/services/*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Services />
            </Suspense>
          } />
          
          <Route path="/team" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Team />
            </Suspense>
          } />
          
          <Route path="/checkout" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Checkout />
            </Suspense>
          } />
          
          <Route path="/supabase-test" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SupabaseTest />
            </Suspense>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          } />
          
          <Route path="/register" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          } />
          
          <Route path="/admin-login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLogin />
            </Suspense>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/farmer" element={
            <Suspense fallback={<LoadingSpinner />}>
              <FarmerDashboard />
            </Suspense>
          } />
          
          <Route path="/dashboard/vendor" element={
            <Suspense fallback={<LoadingSpinner />}>
              <VendorDashboard />
            </Suspense>
          } />
          
          <Route path="/dashboard/consumer" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ConsumerDashboard />
            </Suspense>
          } />
          
          <Route path="/admin" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          } />
          
          {/* Feature Routes */}
          <Route path="/farmer/manage-products" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ManageProducts />
            </Suspense>
          } />
          
          <Route path="/consumer/nearby-vendors" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NearbyVendors />
            </Suspense>
          } />
          
          <Route path="/market-analytics" element={
            <Suspense fallback={<LoadingSpinner />}>
              <MarketAnalytics />
            </Suspense>
          } />
          
          <Route path="/crop-health" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CropHealthDashboard />
            </Suspense>
          } />
          
          {/* New Market Analysis Routes */}
          <Route path="/market-prices" element={
            <Suspense fallback={<LoadingSpinner />}>
              <MarketAnalysis />
            </Suspense>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
