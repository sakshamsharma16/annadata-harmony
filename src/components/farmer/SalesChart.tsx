
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  salesData: Array<{
    month: string;
    sales: number;
  }>;
}

const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>Monthly revenue analysis</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
              <YAxis stroke="#888" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  border: 'none' 
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#8884d8" 
                name="Sales (₹)"
                strokeWidth={2}
                dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
