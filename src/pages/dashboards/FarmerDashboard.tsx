
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cropPrices } from "@/data/mockData";
import { BarChart as BarGraph, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { Leaf, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Plus, Edit, Trash2, Activity, HeartPulse, Thermometer, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import StatusCard from "@/components/consumer/StatusCard";

const salesData = [
  { month: "Jan", sales: 32500 },
  { month: "Feb", sales: 37800 },
  { month: "Mar", sales: 42500 },
  { month: "Apr", sales: 39200 },
  { month: "May", sales: 43800 },
  { month: "Jun", sales: 45500 },
];

// Mock crop health data (in a real app, this would come from an API)
const cropHealthData = {
  overallScore: 86,
  soilHealth: 78,
  waterEfficiency: 92,
  pestRisk: 12,
};

const FarmerDashboard = () => {
  const [activeProducts, setActiveProducts] = useState([
    { id: 1, name: "Rice", quantity: 500, price: 35, trend: "up", change: "+2.5%" },
    { id: 2, name: "Wheat", quantity: 300, price: 28, trend: "down", change: "-1.2%" },
    { id: 3, name: "Potatoes", quantity: 750, price: 15, trend: "up", change: "+1.8%" },
    { id: 4, name: "Tomatoes", quantity: 450, price: 22, trend: "up", change: "+3.2%" },
  ]);

  const [inventoryView, setInventoryView] = useState("grid");

  const handleDeleteProduct = (id: number) => {
    setActiveProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Product Removed",
      description: "The product has been removed from your inventory.",
    });
  };

  return (
    <div className="p-6 lg:p-8 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Status Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatusCard 
          title="Total Sales"
          value="₹42,500"
          description="+12.5% from last month"
          icon={TrendingUp}
          iconColor="text-green-600"
          bgGradient="bg-gradient-to-br from-green-50 to-green-100"
        />
        
        <StatusCard 
          title="Active Buyers"
          value="24"
          description="+4 new this week"
          icon={Users}
          iconColor="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        
        <StatusCard 
          title="Crop Health"
          value="Excellent"
          description="98% healthy crops"
          icon={Leaf}
          iconColor="text-purple-600"
          bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
        />

        <Link to="/agriculture/crop-health" className="block">
          <StatusCard 
            title="Manage Crop Health"
            value="View Details"
            description="Monitor soil, water & pests"
            icon={Sprout}
            iconColor="text-emerald-600"
            bgGradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
          />
        </Link>
      </div>

      {/* Crop Health Index Card */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-green-600" /> 
              Crop Health Index
            </CardTitle>
            <CardDescription>
              Real-time monitoring of your crop's overall health and vitality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="relative h-32 w-32 flex items-center justify-center mb-3">
                  <div className="absolute inset-0 rounded-full border-8 border-green-200"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-green-500" 
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                      clip: `rect(0px, ${32 * 2}px, ${32 * 2}px, 0px)`
                    }}
                  ></div>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-green-700">{cropHealthData.overallScore}</span>
                    <span className="block text-xs text-green-600">out of 100</span>
                  </div>
                </div>
                <span className="font-semibold text-green-700">Overall Health</span>
                <span className="text-xs text-green-600">
                  {cropHealthData.overallScore >= 80 ? 'Excellent' : 
                   cropHealthData.overallScore >= 60 ? 'Good' : 
                   cropHealthData.overallScore >= 40 ? 'Average' : 'Needs Attention'}
                </span>
              </div>
              
              <div className="flex flex-col p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-700">Soil Health</span>
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold mb-1">{cropHealthData.soilHealth}</div>
                <div className="w-full bg-blue-200 rounded-full h-2.5 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.soilHealth}%` }}></div>
                </div>
                <p className="text-xs text-blue-600">NPK levels and pH balance</p>
              </div>
              
              <div className="flex flex-col p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-cyan-700">Water Efficiency</span>
                  <Thermometer className="h-4 w-4 text-cyan-600" />
                </div>
                <div className="text-2xl font-bold mb-1">{cropHealthData.waterEfficiency}</div>
                <div className="w-full bg-cyan-200 rounded-full h-2.5 mb-2">
                  <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.waterEfficiency}%` }}></div>
                </div>
                <p className="text-xs text-cyan-600">Irrigation and moisture levels</p>
              </div>
              
              <div className="flex flex-col p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-700">Pest Risk</span>
                  <HeartPulse className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold mb-1">{cropHealthData.pestRisk}%</div>
                <div className="w-full bg-amber-200 rounded-full h-2.5 mb-2">
                  <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.pestRisk}%` }}></div>
                </div>
                <p className="text-xs text-amber-600">Current pest and disease risk</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link to="/agriculture/crop-health">
                <Button className="bg-[#138808] hover:bg-[#138808]/90">
                  View Detailed Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly revenue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
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

        <Card>
          <CardHeader>
            <CardTitle>Market Prices</CardTitle>
            <CardDescription>Current market rates for various crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarGraph data={cropPrices}>
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
                </BarGraph>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Manage your products and inventory</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setInventoryView("grid")}>
                Grid
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInventoryView("table")}>
                Table
              </Button>
              <Link to="/farmer/products">
                <Button className="bg-[#138808] hover:bg-[#138808]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {inventoryView === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeProducts.map((product) => (
                <div key={product.id} className="p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{product.name}</h4>
                    <span className={`flex items-center ${
                      product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.trend === 'up' ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {product.change}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{product.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price/kg</p>
                      <p className="font-medium">₹{product.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Price (₹/kg)</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <span className={`flex items-center ${
                          product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.trend === 'up' ? (
                            <ArrowUpRight size={16} className="mr-1" />
                          ) : (
                            <ArrowDownRight size={16} className="mr-1" />
                          )}
                          {product.change}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
