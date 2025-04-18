
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Leaf, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import StatusCard from "@/components/consumer/StatusCard";
import CropHealthCard from "@/components/farmer/CropHealthCard";
import SalesChart from "@/components/farmer/SalesChart";
import MarketPriceChart from "@/components/farmer/MarketPriceChart";
import InventoryManagement from "@/components/farmer/InventoryManagement";
import { cropPrices } from "@/data/mockData";

// Mock sales data
const salesData = [
  { month: "Jan", sales: 32500 },
  { month: "Feb", sales: 37800 },
  { month: "Mar", sales: 42500 },
  { month: "Apr", sales: 39200 },
  { month: "May", sales: 43800 },
  { month: "Jun", sales: 45500 },
];

// Mock crop health data
const cropHealthData = {
  overallScore: 86,
  soilHealth: 78,
  waterEfficiency: 92,
  pestRisk: 12,
};

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [activeProducts, setActiveProducts] = useState([
    { id: 1, name: "Rice", quantity: 500, price: 35, trend: "up", change: "+2.5%" },
    { id: 2, name: "Wheat", quantity: 300, price: 28, trend: "down", change: "-1.2%" },
    { id: 3, name: "Potatoes", quantity: 750, price: 15, trend: "up", change: "+1.8%" },
    { id: 4, name: "Tomatoes", quantity: 450, price: 22, trend: "up", change: "+3.2%" },
  ]);

  const handleDeleteProduct = (id: number) => {
    setActiveProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Product Removed",
      description: "The product has been removed from your inventory.",
    });
  };

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-[#F8FFF2] via-[#F2FCE2] to-[#EDFAD7]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
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
          linkTo="/crop-health"
        />

        <StatusCard 
          title="Manage Crop Health"
          value="View Details"
          description="Monitor soil, water & pests"
          icon={Sprout}
          iconColor="text-emerald-600"
          bgGradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
          linkTo="/crop-health"
        />
      </div>

      {/* Crop Health Index Card */}
      <div className="mb-6">
        <CropHealthCard cropHealthData={cropHealthData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <SalesChart salesData={salesData} />
        <MarketPriceChart cropPrices={cropPrices} />
      </div>

      <InventoryManagement 
        products={activeProducts} 
        onDeleteProduct={handleDeleteProduct} 
      />
    </div>
  );
};

export default FarmerDashboard;
