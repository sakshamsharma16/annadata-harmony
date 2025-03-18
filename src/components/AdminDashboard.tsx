import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, BarChart, Clock, RefreshCcw, Users, Store, ShoppingCart, Database, MessageSquare, Leaf, PieChart, User, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCacheItem, setCacheItem } from "@/utils/cacheUtils";

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
];

// Get chat history from localStorage for the chat tab
const getChatHistory = () => {
  const krishiMitraHistory = getCacheItem("krishiMitra-history") || [];
  const fastbotsHistory = JSON.parse(localStorage.getItem('fastbots_history') || '{"all":[],"farmers":[],"vendors":[],"consumers":[]}');
  
  return {
    krishiMitra: krishiMitraHistory,
    fastbots: fastbotsHistory
  };
};

const AdminDashboard = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [chatSource, setChatSource] = useState("krishiMitra");
  const [chatHistory, setChatHistory] = useState(getChatHistory());
  
  useEffect(() => {
    // Cache dashboard data for better performance
    const cachedData = getCacheItem("admin-dashboard-data");
    if (!cachedData) {
      // In a real app, you would fetch this data from an API
      setCacheItem("admin-dashboard-data", { 
        lastRefreshed, 
        farmers, 
        vendors, 
        consumers, 
        products 
      }, 15); // Cache for 15 minutes
    }
  }, [lastRefreshed]);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setLastRefreshed(new Date());
      setChatHistory(getChatHistory());
      setIsRefreshing(false);
      
      // Update cache
      setCacheItem("admin-dashboard-data", { 
        lastRefreshed: new Date(), 
        farmers, 
        vendors, 
        consumers, 
        products 
      }, 15);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive view of all platform stakeholders and market data</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
          <Button 
            size="sm" 
            variant="outline"
            className="ml-2"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
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
        
        <Card>
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
        
        <Card>
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
        
        <Card>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 md:w-auto w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="consumers">Consumers</TabsTrigger>
          <TabsTrigger value="market">Market Prices</TabsTrigger>
          <TabsTrigger value="chats">Chatbot Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
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
            
            <Card>
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
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest platform updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">New Farmer Registration</p>
                    <p className="text-sm text-muted-foreground">Ramesh Yadav from Uttar Pradesh registered as a farmer</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Store className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New Vendor Onboarded</p>
                    <p className="text-sm text-muted-foreground">Metro Grocers from Chennai completed verification</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Large Order Placed</p>
                    <p className="text-sm text-muted-foreground">Hotel Sunshine placed a bulk order worth ₹45,000</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Support Ticket Resolved</p>
                    <p className="text-sm text-muted-foreground">Payment issue for vendor ID #V2345 has been resolved</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Farmers</CardTitle>
                  <CardDescription>Complete list of farmers on the platform</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <BarChart className="h-4 w-4" />
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
                  {farmers.map((farmer, index) => (
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
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Vendors</CardTitle>
                  <CardDescription>Complete list of vendors on the platform</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <BarChart className="h-4 w-4" />
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
                  {vendors.map((vendor, index) => (
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
          </Card>
        </TabsContent>
        
        <TabsContent value="consumers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Consumers</CardTitle>
                  <CardDescription>Complete list of consumers on the platform</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <BarChart className="h-4 w-4" />
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
                  {consumers.map((consumer, index) => (
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
          </Card>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Commodity Prices</CardTitle>
                  <CardDescription>Current market rates of major agricultural products</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
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
                  {products.map((product, index) => (
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
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chatbot Conversations</CardTitle>
                  <CardDescription>View user interactions with our AI assistants</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Tabs value={chatSource} onValueChange={setChatSource} className="w-full">
                    <TabsList>
                      <TabsTrigger value="krishiMitra">KrishiMitra</TabsTrigger>
                      <TabsTrigger value="fastbots">FastBots</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {chatSource === "krishiMitra" ? (
                <>
                  <Tabs defaultValue="all">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="farmers">Farmers</TabsTrigger>
                      <TabsTrigger value="vendors">Vendors</TabsTrigger>
                      <TabsTrigger value="consumers">Consumers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.krishiMitra && chatHistory.krishiMitra.length > 0 ? (
                          chatHistory.krishiMitra.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.role === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1 flex gap-2">
                                {msg.role === 'assistant' ? <Bot className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                                <span>{msg.content}</span>
                                {msg.role === 'user' ? <User className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No KrishiMitra conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="farmers">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.krishiMitra && chatHistory.krishiMitra.filter(m => m.category === 'farmers').length > 0 ? (
                          chatHistory.krishiMitra.filter(m => m.category === 'farmers').map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.role === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1 flex gap-2">
                                {msg.role === 'assistant' ? <Bot className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                                <span>{msg.content}</span>
                                {msg.role === 'user' ? <User className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No farmer-related KrishiMitra conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="vendors">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.krishiMitra && chatHistory.krishiMitra.filter(m => m.category === 'vendors').length > 0 ? (
                          chatHistory.krishiMitra.filter(m => m.category === 'vendors').map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.role === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1 flex gap-2">
                                {msg.role === 'assistant' ? <Bot className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                                <span>{msg.content}</span>
                                {msg.role === 'user' ? <User className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No vendor-related KrishiMitra conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="consumers">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.krishiMitra && chatHistory.krishiMitra.filter(m => m.category === 'consumers').length > 0 ? (
                          chatHistory.krishiMitra.filter(m => m.category === 'consumers').map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.role === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1 flex gap-2">
                                {msg.role === 'assistant' ? <Bot className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                                <span>{msg.content}</span>
                                {msg.role === 'user' ? <User className="h-4 w-4 mt-1 flex-shrink-0" /> : null}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No consumer-related KrishiMitra conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <>
                  <Tabs defaultValue="all">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="farmers">Farmers</TabsTrigger>
                      <TabsTrigger value="vendors">Vendors</TabsTrigger>
                      <TabsTrigger value="consumers">Consumers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.fastbots && chatHistory.fastbots.all.length > 0 ? (
                          chatHistory.fastbots.all.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1">
                                {msg.text}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No FastBots conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="farmers">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.fastbots && chatHistory.fastbots.farmers.length > 0 ? (
                          chatHistory.fastbots.farmers.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1">
                                {msg.text}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No farmer-related FastBots conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="vendors">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.fastbots && chatHistory.fastbots.vendors.length > 0 ? (
                          chatHistory.fastbots.vendors.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1">
                                {msg.text}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No vendor-related FastBots conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="consumers">
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {chatHistory.fastbots && chatHistory.fastbots.consumers.length > 0 ? (
                          chatHistory.fastbots.consumers.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-gray-100' 
                                  : 'bg-[#E9F7E2]'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Unknown time'}
                              </div>
                              <div className="mt-1">
                                {msg.text}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No consumer-related FastBots conversations found
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

