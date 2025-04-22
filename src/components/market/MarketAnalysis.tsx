
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketPrices from "../MarketPrices";
import MarketInsights from "./MarketInsights";
import MandiPrices from "./MandiPrices";

const MarketAnalysis = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Get tab from URL query params if present
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam) {
      if (["overview", "insights", "mandi"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Market Analysis & Pricing</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Comprehensive market data to help you make informed decisions for buying and selling agricultural products.
        </p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Current Prices</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="mandi">Mandi Prices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <MarketPrices />
        </TabsContent>
        
        <TabsContent value="insights">
          <MarketInsights />
        </TabsContent>
        
        <TabsContent value="mandi">
          <MandiPrices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketAnalysis;
