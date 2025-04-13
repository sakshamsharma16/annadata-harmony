
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, Package, ShieldAlert, Settings, ActivitySquare, 
  PieChart, TrendingUp, Calendar, Bell, ServerCrash, Globe, Zap, 
  BookOpen, FileText, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { m } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

// Mock data for charts
const userActivityData = [
  { day: "Mon", activeUsers: 120 },
  { day: "Tue", activeUsers: 140 },
  { day: "Wed", activeUsers: 190 },
  { day: "Thu", activeUsers: 170 },
  { day: "Fri", activeUsers: 190 },
  { day: "Sat", activeUsers: 110 },
  { day: "Sun", activeUsers: 95 },
];

const productDistributionData = [
  { name: "Rice", value: 35 },
  { name: "Wheat", value: 25 },
  { name: "Vegetables", value: 20 },
  { name: "Fruits", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Recent notifications
const recentNotifications = [
  {
    id: 1,
    title: "System Update",
    message: "System successfully updated to v2.4.0",
    time: "10 minutes ago",
    icon: ServerCrash
  },
  {
    id: 2,
    title: "New Vendor Registration",
    message: "Green Harvest Farms has registered as a vendor",
    time: "45 minutes ago",
    icon: Users
  },
  {
    id: 3,
    title: "Error Alert",
    message: "Payment gateway timeout errors detected",
    time: "1 hour ago",
    icon: ShieldAlert
  }
];

// Active tasks
const activeTasks = [
  {
    id: 1,
    title: "Review vendor applications",
    priority: "High",
    dueDate: "Today",
    assignee: "Admin"
  },
  {
    id: 2,
    title: "Update product pricing rules",
    priority: "Medium",
    dueDate: "Tomorrow",
    assignee: "Admin"
  },
  {
    id: 3,
    title: "Investigate payment issues",
    priority: "High",
    dueDate: "Today",
    assignee: "Support"
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { 
      title: "Total Users", 
      value: "2,345", 
      change: "+12.5%", 
      icon: <Users className="h-5 w-5 text-blue-500" /> 
    },
    { 
      title: "Active Products", 
      value: "1,876", 
      change: "+5.2%", 
      icon: <Package className="h-5 w-5 text-green-500" /> 
    },
    { 
      title: "Admin Actions", 
      value: "156", 
      change: "+2.1%", 
      icon: <ShieldAlert className="h-5 w-5 text-purple-500" /> 
    },
    { 
      title: "System Health", 
      value: "98.7%", 
      change: "+0.3%", 
      icon: <ActivitySquare className="h-5 w-5 text-orange-500" /> 
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <m.div 
      className="container mx-auto px-4 py-8 max-w-7xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-8">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your application, users, and monitor system performance.
          </p>
        </m.div>

        <m.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, i) => (
            <m.div key={i} variants={itemVariants}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </m.div>

        <Tabs 
          defaultValue="overview" 
          className="space-y-4" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-muted/30 p-1">
            <TabsTrigger value="overview" className="transition-all">Overview</TabsTrigger>
            <TabsTrigger value="users" className="transition-all">User Management</TabsTrigger>
            <TabsTrigger value="products" className="transition-all">Product Management</TabsTrigger>
            <TabsTrigger value="settings" className="transition-all">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Overview Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card className="lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      User Activity
                    </CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <CardDescription>
                    Daily active users over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userActivityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="activeUsers" 
                          name="Active Users"
                          stroke="#8884d8" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-green-500" />
                      Product Distribution
                    </CardTitle>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                  <CardDescription>
                    Distribution of products by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={productDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {productDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-500" />
                    <CardTitle>Recent Notifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentNotifications.map(notification => (
                    <div key={notification.id} className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="rounded-full bg-background p-2">
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Notifications</Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <CardTitle>Active Tasks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeTasks.map(task => (
                    <div key={task.id} className="flex flex-col p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : task.priority === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Due: {task.dueDate}</span>
                        <span>Assignee: {task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Tasks</Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <CardTitle>Quick Actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 py-2">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-xs">Add User</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 py-2">
                    <Package className="h-5 w-5 mb-1" />
                    <span className="text-xs">Add Product</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 py-2">
                    <Globe className="h-5 w-5 mb-1" />
                    <span className="text-xs">Site Settings</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 py-2">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs">View Reports</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, permissions and roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-[300px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md flex items-center justify-center">
                  <Users className="h-16 w-16 text-muted-foreground/60" />
                  <span className="ml-2 text-lg text-muted-foreground">User Management Dashboard</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last updated: April 13, 2025 at 10:43 AM
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  Manage products, categories, and product approvals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-[300px] bg-gradient-to-r from-green-50 to-emerald-50 rounded-md flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/60" />
                  <span className="ml-2 text-lg text-muted-foreground">Product Management Dashboard</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last updated: April 13, 2025 at 10:43 AM
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system parameters and application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-[300px] bg-gradient-to-r from-gray-50 to-slate-50 rounded-md flex items-center justify-center">
                  <Settings className="h-16 w-16 text-muted-foreground/60" />
                  <span className="ml-2 text-lg text-muted-foreground">Settings Dashboard</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last updated: April 13, 2025 at 10:43 AM
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </m.div>
  );
};

export default AdminDashboard;
