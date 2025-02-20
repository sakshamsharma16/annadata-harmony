
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { consumers } from "@/data/mockData";
import { Package, MapPin, Bell } from "lucide-react";

const VendorDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Simulate getting vendor's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        checkNearbyCustomers(newLocation);
      });
    }
  }, []);

  const checkNearbyCustomers = (location: { lat: number; lng: number }) => {
    const nearbyCustomers = consumers.filter((consumer) => {
      // Calculate distance (simplified for demo)
      const distance = Math.sqrt(
        Math.pow(consumer.location.lat - location.lat, 2) +
        Math.pow(consumer.location.lng - location.lng, 2)
      );
      return distance < 0.01; // Approximately 1km
    });

    nearbyCustomers.forEach((customer) => {
      toast({
        title: "Customer Nearby!",
        description: `${customer.name} is in your area and might be interested in your products.`,
      });
    });
  };

  const [inventory] = useState([
    { id: 1, product: "Rice", quantity: 1000, price: 38 },
    { id: 2, product: "Wheat", quantity: 800, price: 30 },
    { id: 3, product: "Potatoes", quantity: 500, price: 20 },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,300 kg</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {currentLocation ? (
                `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
              ) : (
                "Updating..."
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nearby Customers</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Price/kg</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
