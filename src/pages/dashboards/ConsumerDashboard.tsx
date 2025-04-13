
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, Package, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import StatusCard from "@/components/consumer/StatusCard";
import VendorNudges from "@/components/consumer/VendorNudges";
import OrderHistory from "@/components/consumer/OrderHistory";
import ProductShop from "@/components/consumer/ProductShop";
import { useConsumerCart } from "@/hooks/use-consumer-cart";
import LocationMap from "@/components/maps/LocationMap";

const orderHistory = [
  { date: "2024-02-20", product: "Rice", quantity: 25, amount: 875 },
  { date: "2024-02-22", product: "Wheat", quantity: 30, amount: 840 },
  { date: "2024-02-25", product: "Vegetables", quantity: 10, amount: 450 },
];

const recentNudges = [
  { id: 1, vendorName: "Fresh Farms", product: "Organic Rice", price: 40, discount: "10% off" },
  { id: 2, vendorName: "Green Harvest", product: "Seasonal Vegetables Mix", price: 120, discount: "Buy 1 Get 1" },
];

const initialProducts = [
  { id: 1, name: "Rice", price: 35, quantity: 0, inCart: false },
  { id: 2, name: "Wheat", price: 30, quantity: 0, inCart: false },
  { id: 3, name: "Potatoes", price: 20, quantity: 0, inCart: false },
  { id: 4, name: "Tomatoes", price: 25, quantity: 0, inCart: false },
];

const ConsumerDashboard = () => {
  const [orders] = useState([
    { id: 1, product: "Rice", quantity: 25, status: "Delivered", date: "2024-02-20" },
    { id: 2, product: "Wheat", quantity: 30, status: "In Transit", date: "2024-02-22" },
  ]);
  
  const { products, setProducts, getTotalCartItems, getTotalCartValue } = useConsumerCart(initialProducts);

  return (
    <div className="p-8 bg-gradient-to-br from-[#F8FFF2] via-[#F2FCE2] to-[#EDFAD7]">
      <div className="max-w-7xl mx-auto">
        {/* Background decorative elements */}
        <div className="fixed -top-16 right-0 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="fixed top-1/4 -left-20 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Consumer Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            {getTotalCartItems() > 0 && (
              <Link to="/checkout">
                <Button className="bg-[#138808] hover:bg-[#138808]/90 flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart ({getTotalCartItems()})
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Status Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatusCard 
            title="Active Orders"
            value="2"
            description="Expected delivery within 2 days"
            icon={Package}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
          />
          
          <StatusCard 
            title="Nearby Vendors"
            value="2"
            description="Within 5km radius"
            icon={MapPin}
            iconColor="text-blue-600"
            bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
          />
          
          <StatusCard 
            title="Total Savings"
            value="₹2,450"
            description="saved vs. market price"
            icon={TrendingDown}
            iconColor="text-green-600"
            bgGradient="bg-gradient-to-br from-green-50 to-green-100"
          />
        </div>

        {/* Map and Nudges Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <LocationMap 
            title="Nearby Vendors Map" 
            description="Find vendors in your area for quick purchases" 
            height="350px"
          />
          <VendorNudges nudges={recentNudges} />
        </div>
        
        {/* Orders and Products Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <OrderHistory orders={orderHistory} />
          <ProductShop products={products} onProductsChange={setProducts} />
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
