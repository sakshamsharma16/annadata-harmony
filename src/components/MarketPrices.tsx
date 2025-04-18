
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MarketPriceChart from "@/components/farmer/MarketPriceChart";

const cropPriceData = [
  { name: "Rice", price: 55 },
  { name: "Wheat", price: 42 },
  { name: "Potatoes", price: 28 },
  { name: "Tomatoes", price: 35 },
  { name: "Onions", price: 32 },
  { name: "Corn", price: 38 }
];

const MarketPrices: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-2" variant="outline">Market Insights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Market Prices</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest market rates for agricultural products across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <MarketPriceChart cropPrices={cropPriceData} />
          
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>Weekly price analysis</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Market Highlights</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Tomato prices up by 8% from last week</li>
                    <li>Rice prices stable with minimal fluctuation</li>
                    <li>Onion prices showing downward trend</li>
                    <li>Wheat demand increasing in northern regions</li>
                    <li>Potato supply exceeding demand in western markets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Price Forecasts</h4>
                  <p className="text-sm text-gray-600">
                    Based on current trends and seasonal patterns, we expect staple crop prices 
                    to remain stable through the month, with potential increases in vegetable prices 
                    due to expected rainfall in major growing regions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketPrices;
