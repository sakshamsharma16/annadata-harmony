
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Temporary token for development - in production, this should be handled securely
// Users will be prompted to enter their own token
const MAPBOX_TOKEN = "";

interface Vendor {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  distance?: number; // km
  type: string;
  rating?: number;
}

const mockVendors: Vendor[] = [
  {
    id: 1,
    name: "Fresh Farms Supply",
    location: { lat: 28.6139, lng: 77.2090 }, // Delhi
    distance: 1.2,
    type: "Wholesale",
    rating: 4.8
  },
  {
    id: 2,
    name: "Green Valley Produce",
    location: { lat: 28.6259, lng: 77.2100 }, // Nearby
    distance: 2.5,
    type: "Retail",
    rating: 4.5
  },
  {
    id: 3,
    name: "Organic Goods Market",
    location: { lat: 28.6170, lng: 77.2180 }, // Nearby
    distance: 3.0,
    type: "Organic",
    rating: 4.9
  },
  {
    id: 4,
    name: "Village Harvest Outlet",
    location: { lat: 28.6080, lng: 77.2010 }, // Nearby
    distance: 1.8,
    type: "Direct",
    rating: 4.2
  }
];

const NearbyVendorsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({ 
    lat: 28.6139, lng: 77.2090  // Default to Delhi if geolocation not available
  });
  const [mapToken, setMapToken] = useState(MAPBOX_TOKEN);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [showTokenInput, setShowTokenInput] = useState(!MAPBOX_TOKEN);

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location access denied",
            description: "Using default location. Please enable location services for better results.",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  // Initialize map when token and location are available
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;
    
    try {
      mapboxgl.accessToken = mapToken;

      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add event listeners
      map.current.on("load", () => {
        setLoading(false);
        addMarkers();
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
      setShowTokenInput(true);
      toast({
        title: "Map error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive",
      });
    }
  }, [mapToken, currentLocation]);

  // Add markers for current location and vendors
  const addMarkers = () => {
    if (!map.current) return;

    // Add current location marker
    new mapboxgl.Marker({ color: "#138808" })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
      .addTo(map.current);

    // Add vendor markers
    vendors.forEach((vendor) => {
      // Create custom element for the marker
      const el = document.createElement("div");
      el.className = "vendor-marker";
      el.style.width = "25px";
      el.style.height = "25px";
      el.style.backgroundImage = "url('https://img.icons8.com/fluency/48/shop.png')";
      el.style.backgroundSize = "cover";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      // Add vendor marker
      new mapboxgl.Marker(el)
        .setLngLat([vendor.location.lng, vendor.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div>
              <h3 style="font-weight: bold;">${vendor.name}</h3>
              <p>${vendor.type} vendor</p>
              <p>${vendor.distance} km away</p>
              ${vendor.rating ? `<p>Rating: ${vendor.rating}/5</p>` : ""}
            </div>`
          )
        )
        .addTo(map.current);
    });
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get("mapbox-token") as string;
    
    if (token) {
      setMapToken(token);
      setShowTokenInput(false);
      // Reinitialize map
      map.current?.remove();
      map.current = null;
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Nearby Vendors</CardTitle>
        <CardDescription>Discover vendors in your area</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {showTokenInput ? (
          <div className="p-6 flex flex-col items-center">
            <p className="mb-4 text-center">
              To display the map, please enter your Mapbox public token.
              You can get one for free at{" "}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="mapbox-token"
                  placeholder="Enter your Mapbox public token"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-[#138808]" />
              </div>
            )}
            <div ref={mapContainer} className="h-[400px] w-full" />
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#138808] mr-2"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-no-repeat bg-contain mr-2" style={{ backgroundImage: "url('https://img.icons8.com/fluency/48/shop.png')" }}></div>
                <span>Vendor</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Vendors list preview */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium mb-2">Nearby Vendors ({vendors.length})</h3>
          <ul className="space-y-2">
            {vendors.slice(0, 3).map((vendor) => (
              <li key={vendor.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-[#FF9933] mr-2" />
                  <span>{vendor.name}</span>
                </div>
                <span className="text-xs text-gray-600">{vendor.distance} km</span>
              </li>
            ))}
            {vendors.length > 3 && (
              <li className="text-xs text-blue-600 cursor-pointer hover:underline">
                View all {vendors.length} vendors
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyVendorsMap;
