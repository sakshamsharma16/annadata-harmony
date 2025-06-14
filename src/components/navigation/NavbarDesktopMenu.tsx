import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Leaf, Warehouse, Users, BarChart3, LineChart } from "lucide-react";
const NavbarDesktopMenu = () => {
  const location = useLocation();
  return <div className="hidden md:flex ml-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>For Farmers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                <li className="row-span-3">
                  <Link to="/dashboard/farmer" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md">
                    <Leaf className="h-6 w-6 text-[#138808]" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Farmer Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Manage your products, track orders, and monitor crop health
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/farmer/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Manage Products</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Add, edit and manage your product listings
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>For Vendors</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-transparent">
                <li className="row-span-3">
                  <Link to="/dashboard/vendor" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-amber-50 to-amber-100 p-6 no-underline outline-none focus:shadow-md">
                    <Warehouse className="h-6 w-6 text-[#FF9933]" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Vendor Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Source products, manage inventory, and grow your business
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>For Consumers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                <li className="row-span-3">
                  <Link to="/dashboard/consumer" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md">
                    <Users className="h-6 w-6 text-[#0000FF]" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Consumer Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Find nearby vendors, shop for fresh produce, and track orders
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/consumer/nearby-vendors" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Nearby Vendors</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Discover vendors in your locality
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Market Data</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li>
                  <Link to="/market-prices" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Current Market Prices</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest prices of agricultural commodities
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/market-prices?tab=insights" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Market Insights</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Detailed analysis and trends for agricultural commodities
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/market-prices?tab=mandi" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Mandi Prices</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Price information from mandis across India
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>;
};
export default NavbarDesktopMenu;