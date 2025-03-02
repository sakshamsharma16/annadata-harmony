
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { consumers } from "@/data/mockData";
import { Package, MapPin, Bell, TrendingUp, ShoppingBag, Users, ArrowUpRight, Plus, Edit, Trash2, Check, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { day: "Mon", sales: 2800 },
  { day: "Tue", sales: 3200 },
  { day: "Wed", sales: 3800 },
  { day: "Thu", sales: 3500 },
  { day: "Fri", sales: 4200 },
  { day: "Sat", sales: 4800 },
  { day: "Sun", sales: 4100 },
];

const productDistribution = [
  { name: "Rice", value: 35 },
  { name: "Wheat", value: 25 },
  { name: "Vegetables", value: 20 },
  { name: "Fruits", value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const VendorDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [inventory, setInventory] = useState([
    { id: 1, product: "Rice", quantity: 1000, price: 38, status: "In Stock", threshold: 200 },
    { id: 2, product: "Wheat", quantity: 180, price: 30, status: "Low Stock", threshold: 200 },
    { id: 3, product: "Potatoes", quantity: 500, price: 20, status: "In Stock", threshold: 100 },
    { id: 4, product: "Tomatoes", quantity: 80, price: 22, status: "Low Stock", threshold: 100 },
    { id: 5, product: "Onions", quantity: 450, price: 18, status: "In Stock", threshold: 100 },
  ]);

  const [viewMode, setViewMode] = useState("grid");
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        checkNearbyCustomers(newLocation);
      });
    }
  }, []);

  const checkNearbyCustomers = (location: { lat: number; lng: number }) => {
    const nearbyCustomers = consumers.filter((consumer) => {
      const distance = Math.sqrt(
        Math.pow(consumer.location.lat - location.lat, 2) +
        Math.pow(consumer.location.lng - location.lng, 2)
      );
      return distance < 0.01;
    });

    nearbyCustomers.forEach((customer) => {
      toast({
        title: "Customer Nearby!",
        description: `${customer.name} is in your area and might be interested in your products.`,
      });
    });
  };

  const handleRestockProduct = (id: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + 500;
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity < item.threshold ? "Low Stock" : "In Stock"
        };
      }
      return item;
    }));

    toast({
      title: "Product Restocked",
      description: "New inventory has been added to your stock.",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Product Removed",
      description: "The product has been removed from inventory.",
    });
  };

  const filteredInventory = showLowStock 
    ? inventory.filter(item => item.status === "Low Stock") 
    : inventory;

  const lowStockCount = inventory.filter(item => item.status === "Low Stock").length;

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹22,450</div>
            <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} />
              +8.2% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,300 kg</div>
            <p className="text-xs text-green-600">Across {inventory.length} products</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nearby Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-purple-600">Within 1km radius</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales Trend</CardTitle>
            <CardDescription>Daily revenue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
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
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>Inventory by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
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

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Current stock levels and pricing</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={lowStockCount > 0 ? "destructive" : "outline"} 
                  size="sm"
                  onClick={() => setShowLowStock(!showLowStock)}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {showLowStock ? "Show All" : `Low Stock (${lowStockCount})`}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                >
                  {viewMode === "grid" ? "Table View" : "Grid View"}
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInventory.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-lg border ${
                      item.status === "Low Stock" 
                        ? "bg-gradient-to-r from-red-50 to-red-100 border-red-200" 
                        : "bg-gradient-to-r from-white to-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.product}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{item.quantity} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Price/kg</p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {item.status === "Low Stock" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                          onClick={() => handleRestockProduct(item.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Restock
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {item.status === "Low Stock" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                              onClick={() => handleRestockProduct(item.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Restock
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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
      </div>
    </div>
  );
};

export default VendorDashboard;
