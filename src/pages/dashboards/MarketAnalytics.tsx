
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cropPrices } from "@/data/mockData";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, Leaf } from "lucide-react";

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

const marketShare = [
  { name: "Rice", value: 35 },
  { name: "Wheat", value: 25 },
  { name: "Corn", value: 20 },
  { name: "Soybeans", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const aiInsights = [
  {
    title: "Price Trend Analysis",
    description: "Rice prices show an upward trend with 8% growth expected in the next quarter.",
    icon: TrendingUp,
  },
  {
    title: "Demand Forecast",
    description: "Wheat demand is predicted to increase by 15% during the harvest season.",
    icon: Brain,
  },
  {
    title: "Crop Recommendation",
    description: "Consider diversifying into organic soybeans due to growing market demand.",
    icon: Leaf,
  },
];

const MarketAnalytics = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Market Analytics</h1>
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
      </div>

      <div className="grid gap-6">
        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-muted">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <insight.icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Price Trends (Last 5 Months)</CardTitle>
            <CardDescription>Historical price analysis of major crops</CardDescription>
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
          {/* Current Market Prices */}
          <Card>
            <CardHeader>
              <CardTitle>Current Market Prices</CardTitle>
              <CardDescription>Live market rates per kilogram</CardDescription>
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

          {/* Market Share Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Market Share Distribution</CardTitle>
              <CardDescription>Crop-wise market share percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShare}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Demand Forecast */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Demand Forecast</CardTitle>
              <CardDescription>Current vs Forecasted Demand (in tons)</CardDescription>
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
