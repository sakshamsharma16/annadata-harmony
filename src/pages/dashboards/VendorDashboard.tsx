
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, Map, ShoppingCart, Users } from "lucide-react";
import LocationMap from "@/components/maps/LocationMap";

// Mock data for charts
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

// Mock recent orders
const recentOrders = [
  { id: 1, customer: "Rahul Singh", product: "Potatoes", quantity: 25, total: "₹500", status: "Delivered" },
  { id: 2, customer: "Priya Sharma", product: "Tomatoes", quantity: 15, total: "₹375", status: "Processing" },
  { id: 3, customer: "Amit Kumar", product: "Onions", quantity: 30, total: "₹750", status: "Pending" },
];

const VendorDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-[#F8FFF2] via-white to-[#F9FFF4]">
      <div className="max-w-7xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="fixed top-32 -right-20 w-80 h-80 bg-[#FFDEE2] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="fixed bottom-20 -left-10 w-64 h-64 bg-[#D3E4FD] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Header */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600 mb-8">Manage your inventory and track orders</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹24,500</div>
              <p className="text-xs text-green-600 mt-2">+5% from last week</p>
              <ShoppingCart className="h-8 w-8 text-purple-500 opacity-20 absolute bottom-2 right-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">New Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              <Users className="h-8 w-8 text-blue-500 opacity-20 absolute bottom-2 right-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-none hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-green-600 mt-2">+2 new this week</p>
              <ShoppingCart className="h-8 w-8 text-amber-500 opacity-20 absolute bottom-2 right-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-orange-500 mt-2">3 need attention</p>
              <CalendarDays className="h-8 w-8 text-green-500 opacity-20 absolute bottom-2 right-2" />
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Sales Chart */}
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Weekly Sales</CardTitle>
              <CardDescription>Sales volume for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd' }}
                  />
                  <Bar dataKey="sales" fill="#138808" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Nearby Consumers Map */}
          <LocationMap 
            title="Nearby Consumers" 
            description="Connect with consumers in your area"
            height="350px" 
          />

          {/* Recent Orders */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Monitor and manage your latest orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-4 pl-0">Order ID</th>
                      <th className="text-left font-medium p-4">Customer</th>
                      <th className="text-left font-medium p-4">Product</th>
                      <th className="text-left font-medium p-4">Quantity</th>
                      <th className="text-left font-medium p-4">Total</th>
                      <th className="text-left font-medium p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-4 pl-0">#{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">{order.product}</td>
                        <td className="p-4">{order.quantity} kg</td>
                        <td className="p-4">{order.total}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
