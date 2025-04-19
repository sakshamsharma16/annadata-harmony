
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSelector from "../LanguageSelector";
import { 
  Menu, 
  Home, 
  Leaf, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Users, 
  MapPin,
  ChevronRight,
  BarChart3,
  LogOut,
  LineChart
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavbarMobileMenuProps {
  isAuthenticated: boolean;
  userRole: "farmer" | "vendor" | "consumer" | null;
  dashboardLink: string;
}

const NavbarMobileMenu = ({ isAuthenticated, userRole, dashboardLink }: NavbarMobileMenuProps) => {
  const [marketDataOpen, setMarketDataOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Annadata</SheetTitle>
            <SheetDescription>
              Your integrated agricultural marketplace
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="flex flex-col space-y-4">
              {/* Add LanguageSelector to mobile menu as well */}
              <div className="mb-2">
                <LanguageSelector />
              </div>
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground capitalize">{userRole || 'User'}</p>
                    </div>
                  </div>
                  
                  <Link to={dashboardLink} className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-[#138808]" />
                      <span>Dashboard</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <div className="space-y-2 mb-6">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-[#138808] hover:bg-[#138808]/90">Register</Button>
                  </Link>
                </div>
              )}
              
              <Link to="/" className="flex items-center rounded-md p-2 hover:bg-gray-100">
                <Home className="mr-2 h-5 w-5" />
                <span>Home</span>
              </Link>
              
              {/* Market Data Section - Collapsible */}
              <Collapsible 
                open={marketDataOpen}
                onOpenChange={setMarketDataOpen}
                className="border rounded-md"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100">
                  <div className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Market Data</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${marketDataOpen ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Link to="/market-prices" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-8">
                    <span>Current Prices</span>
                  </Link>
                  <Link to="/market-prices?tab=insights" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-8">
                    <span>Market Insights</span>
                  </Link>
                  <Link to="/market-prices?tab=mandi" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-8">
                    <span>Mandi Prices</span>
                  </Link>
                  <Link to="/market-analytics" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-8">
                    <span>Profit Analysis</span>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="pt-2 pb-1">
                <p className="text-sm font-medium text-muted-foreground px-2">For Farmers</p>
              </div>
              
              <Link to="/dashboard/farmer" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-4">
                <Leaf className="mr-2 h-5 w-5 text-[#138808]" />
                <span>Farmer Dashboard</span>
              </Link>
              
              <Link to="/farmer/products" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-4">
                <Package className="mr-2 h-5 w-5" />
                <span>Manage Products</span>
              </Link>
              
              <div className="pt-2 pb-1">
                <p className="text-sm font-medium text-muted-foreground px-2">For Vendors</p>
              </div>
              
              <Link to="/dashboard/vendor" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-4">
                <Warehouse className="mr-2 h-5 w-5 text-[#FF9933]" />
                <span>Vendor Dashboard</span>
              </Link>
              
              <div className="pt-2 pb-1">
                <p className="text-sm font-medium text-muted-foreground px-2">For Consumers</p>
              </div>
              
              <Link to="/dashboard/consumer" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-4">
                <Users className="mr-2 h-5 w-5 text-[#0000FF]" />
                <span>Consumer Dashboard</span>
              </Link>
              
              <Link to="/consumer/nearby-vendors" className="flex items-center rounded-md p-2 hover:bg-gray-100 pl-4">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Nearby Vendors</span>
              </Link>
              
              {isAuthenticated && (
                <button 
                  className="flex items-center rounded-md p-2 hover:bg-gray-100 text-red-600 mt-4"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Log out</span>
                </button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobileMenu;
