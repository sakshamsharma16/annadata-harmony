
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, PhoneCall, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface Nudge {
  id: number;
  vendorName: string;
  product: string;
  price: number;
  discount: string;
  distance?: string;
  location?: {
    lat: number;
    lng: number;
  };
  phone?: string;
}

interface VendorNudgesProps {
  nudges: Nudge[];
  onViewLocation?: (location: {lat: number; lng: number}) => void;
}

const EnhancedVendorNudges = ({ nudges, onViewLocation }: VendorNudgesProps) => {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-amber-500" />
          Recent Nudges from Vendors
        </CardTitle>
        <CardDescription>Special offers from nearby vendors</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {nudges.map((nudge) => (
            <div 
              key={nudge.id} 
              className="p-4 rounded-lg border bg-gradient-to-r from-amber-50 to-amber-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{nudge.vendorName}</h4>
                <span className="text-sm font-medium text-green-600 px-2 py-1 bg-green-50 rounded-full">
                  {nudge.discount}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Product</p>
                  <p className="font-medium">{nudge.product}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium">₹{nudge.price}</p>
                </div>
              </div>
              {nudge.distance && (
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <MapPin className="h-3 w-3 mr-1 text-amber-500" />
                  <span>{nudge.distance} away</span>
                </div>
              )}
              <div className="flex justify-between mt-2">
                {nudge.phone && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <PhoneCall className="w-3 h-3" />
                    Call
                  </Button>
                )}
                {nudge.location && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-1"
                    onClick={() => onViewLocation && onViewLocation(nudge.location!)}
                  >
                    <Navigation className="w-3 h-3 text-amber-500" />
                    Directions
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          <Link to="/consumer/nearby-vendors">
            <Button className="w-full" variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              View All Nearby Vendors
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedVendorNudges;
