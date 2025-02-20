
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cropPrices } from "@/data/mockData";
import { BarChart, Users, TrendingUp } from "lucide-react";

const FarmerDashboard = () => {
  const [activeProducts] = useState([
    { name: "Rice", quantity: 500, price: 35 },
    { name: "Wheat", quantity: 300, price: 28 },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Farmer Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42,500</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Price/kg</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>₹{product.quantity * product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Price/kg</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cropPrices.map((crop) => (
                  <TableRow key={crop.id}>
                    <TableCell>{crop.name}</TableCell>
                    <TableCell>₹{crop.price}</TableCell>
                    <TableCell className={crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {crop.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
