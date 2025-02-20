
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
          <Route path="/dashboard/vendor" element={<VendorDashboard />} />
          <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
          <Route path="/dashboard/analytics" element={<MarketAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
