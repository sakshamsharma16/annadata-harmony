
import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ArrowDownRight, BarChart, Clock, RefreshCcw, Users, Store, ShoppingCart, Database, MessageSquare, Leaf, PieChart, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Sample data for admin dashboard
const farmers = [
  {
    name: "Rajesh Kumar",
    region: "Punjab",
    products: 12,
    revenue: "₹145,200",
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    name: "Anita Sharma",
    region: "Maharashtra",
    products: 8,
    revenue: "₹98,500",
    status: "active",
    lastActive: "1 hour ago"
  },
  {
    name: "Sunil Patel",
    region: "Gujarat",
    products: 15,
    revenue: "₹210,750",
    status: "active",
    lastActive: "30 minutes ago"
  },
  {
    name: "Meena Desai",
    region: "Karnataka",
    products: 6,
    revenue: "₹75,300",
    status: "inactive",
    lastActive: "3 days ago"
  },
  {
    name: "Vikram Singh",
    region: "Uttar Pradesh",
    products: 10,
    revenue: "₹120,400",
    status: "active",
    lastActive: "1 day ago"
  },
  {
    name: "Priya Reddy",
    region: "Telangana",
    products: 7,
    revenue: "₹85,600",
    status: "active",
    lastActive: "4 hours ago"
  }
];

const vendors = [
  {
    name: "City Fresh Market",
    location: "Delhi",
    orders: 45,
    revenue: "₹320,000",
    status: "active",
    lastOrder: "1 hour ago"
  },
  {
    name: "Green Grocers",
    location: "Mumbai",
    orders: 38,
    revenue: "₹285,400",
    status: "active",
    lastOrder: "2 hours ago"
  },
  {
    name: "Farm Direct",
    location: "Bangalore",
    orders: 27,
    revenue: "₹195,200",
    status: "active",
    lastOrder: "30 minutes ago"
  },
  {
    name: "Organic Bazaar",
    location: "Hyderabad",
    orders: 19,
    revenue: "₹145,800",
    status: "inactive",
    lastOrder: "2 days ago"
  },
  {
    name: "Nature's Bounty",
    location: "Chennai",
    orders: 31,
    revenue: "₹230,500",
    status: "active",
    lastOrder: "5 hours ago"
  },
  {
    name: "Village Harvest",
    location: "Kolkata",
    orders: 22,
    revenue: "₹175,600",
    status: "active",
    lastOrder: "1 day ago"
  }
];

const consumers = [
  {
    name: "Amit Verma",
    location: "Delhi",
    orders: 8,
    spending: "₹12,500",
    status: "active",
    lastOrder: "3 hours ago"
  },
  {
    name: "Priya Singh",
    location: "Mumbai",
    orders: 12,
    spending: "₹18,200",
    status: "active",
    lastOrder: "1 day ago"
  },
  {
    name: "Vikram Malhotra",
    location: "Bangalore",
    orders: 5,
    spending: "₹8,700",
    status: "inactive",
    lastOrder: "5 days ago"
  },
  {
    name: "Neha Gupta",
    location: "Chennai",
    orders: 9,
    spending: "₹14,300",
    status: "active",
    lastOrder: "2 hours ago"
  },
  {
    name: "Rahul Mehta",
    location: "Pune",
    orders: 7,
    spending: "₹11,200",
    status: "active",
    lastOrder: "1 day ago"
  },
  {
    name: "Kavita Joshi",
    location: "Hyderabad",
    orders: 10,
    spending: "₹15,800",
    status: "active",
    lastOrder: "4 hours ago"
  }
];

const products = [
  {
    name: "Wheat",
    price: "₹2,450",
    change: "+5.2%",
    trend: "up",
    volume: "12,450 tons",
    lastUpdated: "2 hours ago"
  },
  {
    name: "Rice",
    price: "₹3,200",
    change: "-2.1%",
    trend: "down",
    volume: "18,320 tons",
    lastUpdated: "1 hour ago"
  },
  {
    name: "Corn",
    price: "₹1,850",
    change: "+3.7%",
    trend: "up",
    volume: "8,750 tons",
    lastUpdated: "3 hours ago"
  },
  {
    name: "Soybeans",
    price: "₹4,100",
    change: "+1.5%",
    trend: "up",
    volume: "5,280 tons",
    lastUpdated: "30 minutes ago"
  },
  {
    name: "Potatoes",
    price: "₹1,200",
    change: "+2.8%",
    trend: "up",
    volume: "9,450 tons",
    lastUpdated: "1 hour ago"
  },
  {
    name: "Tomatoes",
    price: "₹2,800",
    change: "-1.5%",
    trend: "down",
    volume: "6,780 tons",
    lastUpdated: "2 hours ago"
  }
];

const recentActivities = [
  {
    type: "farmer",
    title: "New Farmer Registration",
    description: "Ramesh Yadav from Uttar Pradesh registered as a farmer",
    time: "10 minutes ago",
    icon: Leaf
  },
  {
    type: "vendor",
    title: "New Vendor Onboarded",
    description: "Metro Grocers from Chennai completed verification",
    time: "1 hour ago",
    icon: Store
  },
  {
    type: "consumer",
    title: "Large Order Placed",
    description: "Hotel Sunshine placed a bulk order worth ₹45,000",
    time: "2 hours ago",
    icon: ShoppingCart
  },
  {
    type: "system",
    title: "Support Ticket Resolved",
    description: "Payment issue for vendor ID #V2345 has been resolved",
    time: "3 hours ago",
    icon: MessageSquare
  },
  {
    type: "system",
    title: "System Update",
    description: "Platform successfully updated to version 2.3.1",
    time: "5 hours ago",
    icon: RefreshCcw
  },
  {
    type: "farmer",
    title: "New Product Added",
    description: "Farmer ID #F5678 added organic tomatoes to their inventory",
    time: "6 hours ago",
    icon: Leaf
  }
];

// Function to get icon color based on activity type
const getActivityIconColor = (type: string) => {
  switch (type) {
    case "farmer": return "bg-green-100 text-green-600";
    case "vendor": return "bg-blue-100 text-blue-600";
    case "consumer": return "bg-purple-100 text-purple-600";
    case "system": return "bg-amber-100 text-amber-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const AdminDashboard = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Add a function to apply search filtering
  const filterData = useCallback((data, query) => {
    if (!query) return data;
    const lowercaseQuery = query.toLowerCase();
    return data.filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(lowercaseQuery)
      )
    );
  }, []);

  // Filtered data based on search query
  const filteredFarmers = filterData(farmers, searchQuery);
  const filteredVendors = filterData(vendors, searchQuery);
  const filteredConsumers = filterData(consumers, searchQuery);
  const filteredProducts = filterData(products, searchQuery);
  
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated with the latest information.",
        duration: 3000
      });
    }, 800);
  };
  
  // Export data function
  const exportData = (dataType: string) => {
    toast({
      title: "Export Initiated",
      description: `${dataType} data is being prepared for download.`,
      duration: 3000
    });
    
    // In a real application, you would generate a CSV or Excel file here
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${dataType} data has been exported successfully.`,
        duration: 3000
      });
    }, 1500);
  };

  // Use memory cache for recent activities
  useEffect(() => {
    // Cache data in memory
    const cacheKey = `admin-dashboard-data-${new Date().toDateString()}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (!cachedData) {
      // In a real app, you would fetch data here
      // For demo, just cache the current data
      const dataToCache = {
        timestamp: new Date().toISOString(),
        activities: recentActivities
      };
      sessionStorage.setItem(cacheKey, JSON.stringify(dataToCache));
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive view of all platform stakeholders and market data</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="ml-0 sm:ml-2"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <CardDescription>Registered on platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-2xl font-bold">1,245</div>
            </div>
            <div className="text-xs text-muted-foreground">+24 new this week</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <CardDescription>Active businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Store className="h-5 w-5 text-blue-600 mr-2" />
              <div className="text-2xl font-bold">387</div>
            </div>
            <div className="text-xs text-muted-foreground">+12 new this week</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Consumers</CardTitle>
            <CardDescription>Registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-purple-600 mr-2" />
              <div className="text-2xl font-bold">5,978</div>
            </div>
            <div className="text-xs text-muted-foreground">+143 new this week</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CardDescription>Platform-wide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Database className="h-5 w-5 text-amber-600 mr-2" />
              <div className="text-2xl font-bold">32,450</div>
            </div>
            <div className="text-xs text-muted-foreground">₹4.32 Cr value</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="consumers">Consumers</TabsTrigger>
            <TabsTrigger value="market">Market Prices</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="w-full md:w-auto flex gap-2">
          <Input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <TabsContent value="overview" className="space-y-4 mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Last 30 days user activity</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <PieChart className="h-20 w-20 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Interactive chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Daily transaction trend</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart className="h-20 w-20 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Interactive chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest platform updates</CardDescription>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  Live Updates
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.slice(0, 6).map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${getActivityIconColor(activity.type)}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 rounded-b-lg">
              <Button variant="ghost" size="sm" className="ml-auto">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4 mt-0">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Farmers</CardTitle>
                  <CardDescription>Complete list of farmers on the platform</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => exportData('Farmers')}
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFarmers.map((farmer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>{farmer.region}</TableCell>
                      <TableCell>{farmer.products}</TableCell>
                      <TableCell>{farmer.revenue}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          farmer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {farmer.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{farmer.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Showing {filteredFarmers.length} of {farmers.length} farmers</p>
                <Button variant="ghost" size="sm">Load More</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4 mt-0">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Vendors</CardTitle>
                  <CardDescription>Complete list of vendors on the platform</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => exportData('Vendors')}
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.location}</TableCell>
                      <TableCell>{vendor.orders}</TableCell>
                      <TableCell>{vendor.revenue}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {vendor.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{vendor.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Showing {filteredVendors.length} of {vendors.length} vendors</p>
                <Button variant="ghost" size="sm">Load More</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="consumers" className="space-y-4 mt-0">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Consumers</CardTitle>
                  <CardDescription>Complete list of consumers on the platform</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => exportData('Consumers')}
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Spending</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsumers.map((consumer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{consumer.name}</TableCell>
                      <TableCell>{consumer.location}</TableCell>
                      <TableCell>{consumer.orders}</TableCell>
                      <TableCell>{consumer.spending}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          consumer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {consumer.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{consumer.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Showing {filteredConsumers.length} of {consumers.length} consumers</p>
                <Button variant="ghost" size="sm">Load More</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-4 mt-0">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Commodity Prices</CardTitle>
                  <CardDescription>Current market rates of major agricultural products</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={() => exportData('Market Prices')}
                >
                  <BarChart className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead className="hidden md:table-cell">Volume</TableHead>
                    <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <span className={`flex items-center ${
                          product.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {product.trend === 'up' ? (
                            <ArrowUpRight size={16} className="mr-1" />
                          ) : (
                            <ArrowDownRight size={16} className="mr-1" />
                          )}
                          {product.change}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{product.volume}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} of {products.length} products</p>
                <Button variant="ghost" size="sm">Load More</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default AdminDashboard;
