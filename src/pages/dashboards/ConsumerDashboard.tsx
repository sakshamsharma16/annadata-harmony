
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cropPrices, vendors } from "@/data/mockData";
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Star, MapPin, Package, Heart, TrendingDown, ArrowDownRight, Plus, Minus, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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

const recentNudges = [
  { id: 1, vendorName: "Fresh Farms", product: "Organic Rice", price: 40, discount: "10% off" },
  { id: 2, vendorName: "Green Harvest", product: "Seasonal Vegetables Mix", price: 120, discount: "Buy 1 Get 1" },
];

const ConsumerDashboard = () => {
  const [orders] = useState([
    { id: 1, product: "Rice", quantity: 25, status: "Delivered", date: "2024-02-20" },
    { id: 2, product: "Wheat", quantity: 30, status: "In Transit", date: "2024-02-22" },
  ]);

  const [availableProducts, setAvailableProducts] = useState([
    { id: 1, name: "Rice", price: 35, quantity: 0, inCart: false },
    { id: 2, name: "Wheat", price: 30, quantity: 0, inCart: false },
    { id: 3, name: "Potatoes", price: 20, quantity: 0, inCart: false },
    { id: 4, name: "Tomatoes", price: 25, quantity: 0, inCart: false },
  ]);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setAvailableProducts(prev => prev.map(product => {
      if (product.id === id) {
        const newQuantity = increment 
          ? product.quantity + 1 
          : Math.max(0, product.quantity - 1);
        
        return { 
          ...product, 
          quantity: newQuantity,
          inCart: newQuantity > 0
        };
      }
      return product;
    }));
  };

  const handleAddToCart = (id: number) => {
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart.",
    });
    
    setAvailableProducts(prev => prev.map(product => {
      if (product.id === id) {
        return { ...product, inCart: true, quantity: Math.max(1, product.quantity) };
      }
      return product;
    }));
  };

  const getTotalCartItems = () => {
    return availableProducts.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalCartValue = () => {
    return availableProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          {getTotalCartItems() > 0 && (
            <Link to="/checkout">
              <Button className="bg-[#138808] hover:bg-[#138808]/90 flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({getTotalCartItems()}) · ₹{getTotalCartValue()}
              </Button>
            </Link>
          )}
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
            <CardTitle>Recent Nudges from Vendors</CardTitle>
            <CardDescription>Special offers from nearby vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNudges.map((nudge) => (
                <div key={nudge.id} className="p-4 rounded-lg border bg-gradient-to-r from-amber-50 to-amber-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{nudge.vendorName}</h4>
                    <span className="text-sm font-medium text-green-600">
                      {nudge.discount}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Product</p>
                      <p className="font-medium">{nudge.product}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">₹{nudge.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              <Link to="/consumer/nearby-vendors">
                <Button className="w-full" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Nearby Vendors
                </Button>
              </Link>
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
                <CardTitle>Shop Products</CardTitle>
                <CardDescription>Browse and order fresh products</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {availableProducts.map((product) => (
                <div key={product.id} className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <p className="text-[#FF9933] font-bold mb-3">₹{product.price}/kg</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 rounded-r-none"
                        onClick={() => handleQuantityChange(product.id, false)}
                        disabled={product.quantity === 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="px-3 py-1">{product.quantity}</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 rounded-l-none"
                        onClick={() => handleQuantityChange(product.id, true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#138808] hover:bg-[#138808]/90"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.inCart && product.quantity > 0}
                  >
                    {product.inCart ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
