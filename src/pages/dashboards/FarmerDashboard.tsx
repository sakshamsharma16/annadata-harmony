
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cropPrices } from "@/data/mockData";
import { BarChart as BarGraph, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { Leaf, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const salesData = [
  { month: "Jan", sales: 32500 },
  { month: "Feb", sales: 37800 },
  { month: "Mar", sales: 42500 },
  { month: "Apr", sales: 39200 },
  { month: "May", sales: 43800 },
  { month: "Jun", sales: 45500 },
];

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
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42,500</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} />
              +4 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
            <Leaf className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
            <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} />
              98% healthy crops
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Manage your products and inventory</CardDescription>
              </div>
              <div className="flex items-center gap-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
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
    </div>
  );
};

export default FarmerDashboard;
