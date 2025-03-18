
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart, Clock, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

const MarketPrices = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Market Prices Dashboard</h1>
          <p className="text-muted-foreground">Monitor and analyze current agricultural commodity prices</p>
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
            <CardTitle className="text-sm font-medium">Total Trading Volume</CardTitle>
            <CardDescription>All commodities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44,800 tons</div>
            <div className="text-xs text-muted-foreground">+12% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Price Change</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+2.1%</div>
            <div className="text-xs text-muted-foreground">Bullish trend</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Traders</CardTitle>
            <CardDescription>Currently online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <div className="text-xs text-muted-foreground">32 new today</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Volatility</CardTitle>
            <CardDescription>Price fluctuation index</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Medium</div>
            <div className="text-xs text-muted-foreground">Decreased by 5%</div>
          </CardContent>
        </Card>
      </div>

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
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" className="ml-auto gap-1">
            <TrendingUp className="h-4 w-4" />
            Export Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarketPrices;
