
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MarketPriceChartProps {
  cropPrices: Array<{
    name: string;
    price: number;
  }>;
}

const MarketPriceChart: React.FC<MarketPriceChartProps> = ({ cropPrices }) => {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Market Prices</CardTitle>
        <CardDescription>Current market rates for various crops</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cropPrices}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
              <YAxis stroke="#888" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  border: 'none' 
                }} 
              />
              <Legend />
              <Bar 
                dataKey="price" 
                fill="#8884d8" 
                name="Price (₹/kg)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPriceChart;
