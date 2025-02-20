
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cropPrices } from "@/data/mockData";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const priceHistory = [
  { month: "Jan", rice: 32, wheat: 25, corn: 20 },
  { month: "Feb", rice: 35, wheat: 28, corn: 22 },
  { month: "Mar", rice: 33, wheat: 27, corn: 21 },
  { month: "Apr", rice: 36, wheat: 29, corn: 23 },
  { month: "May", rice: 34, wheat: 26, corn: 22 },
];

const demandData = [
  { crop: "Rice", current: 1200, forecast: 1400 },
  { crop: "Wheat", current: 900, forecast: 1100 },
  { crop: "Corn", current: 700, forecast: 850 },
  { crop: "Soybeans", current: 500, forecast: 600 },
];

const MarketAnalytics = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Market Analytics</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Trends (Last 5 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rice" stroke="#8884d8" name="Rice" />
                  <Line type="monotone" dataKey="wheat" stroke="#82ca9d" name="Wheat" />
                  <Line type="monotone" dataKey="corn" stroke="#ffc658" name="Corn" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cropPrices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="price" fill="#8884d8" name="Price (₹/kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demand Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current Demand" />
                    <Bar dataKey="forecast" fill="#82ca9d" name="Forecasted Demand" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics;
