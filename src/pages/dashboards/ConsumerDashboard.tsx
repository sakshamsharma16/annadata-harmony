
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cropPrices, vendors } from "@/data/mockData";
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Star, MapPin, Package, Heart, TrendingDown, ArrowDownRight } from "lucide-react";

const orderHistory = [
  { date: "2024-02-20", product: "Rice", quantity: 25, amount: 875 },
  { date: "2024-02-22", product: "Wheat", quantity: 30, amount: 840 },
  { date: "2024-02-25", product: "Vegetables", quantity: 10, amount: 450 },
];

const priceHistory = [
  { month: "Jan", price: 35 },
  { month: "Feb", price: 34 },
  { month: "Mar", price: 36 },
  { month: "Apr", price: 33 },
  { month: "May", price: 32 },
  { month: "Jun", price: 31 },
];

const ConsumerDashboard = () => {
  const [orders] = useState([
    { id: 1, product: "Rice", quantity: 25, status: "Delivered", date: "2024-02-20" },
    { id: 2, product: "Wheat", quantity: 30, status: "In Transit", date: "2024-02-22" },
  ]);

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-purple-600">
              Expected delivery within 2 days
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nearby Vendors</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-blue-600">Within 5km radius</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,450</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowDownRight size={12} />
              saved vs. market price
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Trends</CardTitle>
            <CardDescription>Average price variations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#8884d8" 
                    name="Avg. Price (₹/kg)"
                    strokeWidth={2}
                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>Recent purchases and spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{order.product}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{order.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">₹{order.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Products</CardTitle>
                <CardDescription>Current market prices and availability</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
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
      </div>
    </div>
  );
};

export default ConsumerDashboard;

