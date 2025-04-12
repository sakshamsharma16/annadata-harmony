
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Package, ShieldAlert, Settings, ActivitySquare } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your application, users, and monitor system performance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
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
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Overview</CardTitle>
                <CardDescription>
                  A high-level overview of the system status and key metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-[300px] bg-gradient-to-r from-green-50 to-blue-50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                  <span className="ml-2 text-lg text-muted-foreground">Analytics Dashboard</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last updated: April 12, 2025 at 10:43 AM
                </p>
              </CardFooter>
            </Card>
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
                  Last updated: April 12, 2025 at 10:43 AM
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
                  Last updated: April 12, 2025 at 10:43 AM
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
                  Last updated: April 12, 2025 at 10:43 AM
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
