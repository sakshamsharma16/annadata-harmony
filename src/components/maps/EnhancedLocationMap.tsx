
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, MapPin, Navigation } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ScriptLoader from "@/components/ui/script-loader";

interface Marker {
  lat: number;
  lng: number;
  title: string;
  type: 'vendor' | 'consumer' | 'current';
}

interface EnhancedLocationMapProps {
  title?: string;
  description?: string;
  height?: string;
  showLegend?: boolean;
  className?: string;
  markers?: Marker[];
  useRealLocation?: boolean;
}

// Type guard to check if google maps is loaded
const isGoogleMapsLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.google !== 'undefined' && 
         typeof window.google.maps !== 'undefined';
};

const EnhancedLocationMap = ({ 
  title = "Location Map",
  description = "View your current location",
  height = "400px",
  showLegend = true,
  className = "",
  markers = [],
  useRealLocation = true
}: EnhancedLocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
    setIsLoading(false);
    initMap();
  };

  // Initialize the Google Map
  const initMap = () => {
    if (!mapRef.current || !isGoogleMapsLoaded()) return;

    // Default location (can be replaced with geolocation)
    const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Delhi

    // Options for the map
    const mapOptions = {
      center: defaultLocation,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9e9f6" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#d5eac9" }]
        }
      ]
    };

    // Create the map
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    setMapInstance(map);

    // Try to get user's current location if needed
    if (useRealLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          setCurrentLocation(userLocation);
          // Center the map on the user's location
          map.setCenter(userLocation);

          // Add a marker for the user's location
          if (isGoogleMapsLoaded()) {
            new window.google.maps.Marker({
              position: userLocation,
              map,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#138808",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2
              }
            });

            // Draw a circle to show search radius
            new window.google.maps.Circle({
              strokeColor: "rgba(19, 136, 8, 0.3)",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "rgba(19, 136, 8, 0.1)",
              fillOpacity: 0.35,
              map,
              center: userLocation,
              radius: 3000 // 3km radius
            });
          }
          
          // Add custom markers if provided
          addMarkersToMap(map, markers, userLocation);
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Showing default location instead.",
            variant: "destructive"
          });
          // Add markers using default location instead
          addMarkersToMap(map, markers, defaultLocation);
        }
      );
    } else {
      // Just add markers if user location isn't required
      addMarkersToMap(map, markers, defaultLocation);
    }
  };

  // Function to add markers to the map
  const addMarkersToMap = (map: google.maps.Map, markers: Marker[], currentLocation: {lat: number, lng: number}) => {
    if (!isGoogleMapsLoaded()) return;
    
    markers.forEach(marker => {
      const iconConfig = getMarkerIcon(marker.type);
      
      const mapMarker = new window.google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map,
        title: marker.title,
        animation: window.google.maps.Animation.DROP,
        icon: iconConfig
      });
      
      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-medium">${marker.title}</h3>
            <p class="text-sm text-gray-500">${marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}</p>
            ${currentLocation ? 
              `<p class="text-xs mt-1">Distance: ${calculateDistance(
                currentLocation.lat, 
                currentLocation.lng, 
                marker.lat, 
                marker.lng
              ).toFixed(1)} km</p>` : ''}
          </div>
        `
      });
      
      mapMarker.addListener("click", () => {
        infoWindow.open(map, mapMarker);
      });
    });
  };
  
  // Get marker icon based on type
  const getMarkerIcon = (type: 'vendor' | 'consumer' | 'current') => {
    if (!isGoogleMapsLoaded()) return null;
    
    switch (type) {
      case 'vendor':
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#FF9933",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        };
      case 'consumer':
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#0000FF",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        };
      case 'current':
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#138808",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        };
      default:
        return null;
    }
  };
  
  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  return (
    <Card className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Load Google Maps API script */}
      <ScriptLoader 
        src={`https://maps.googleapis.com/maps/api/js?key=&libraries=places`}
        onLoad={handleScriptLoad}
      />
      
      {(title || description) && (
        <CardHeader className="border-b bg-gray-50">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-[#138808]" />
          </div>
        )}
        
        <div 
          ref={mapRef} 
          style={{ height }} 
          className="w-full"
        />
        
        {/* Fallback for when Google Maps doesn't load */}
        {!isGoogleMapsLoaded() && !isLoading && (
          <Alert variant="destructive" className="m-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Could not load the map. Please check your internet connection and try again.
            </AlertDescription>
          </Alert>
        )}
        
        {showLegend && (
          <div className="absolute bottom-2 right-2 bg-white rounded-md shadow-md p-2 text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-[#138808] mr-2"></div>
              <span>You</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-[#FF9933] mr-2"></div>
              <span>Vendors</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#0000FF] mr-2"></div>
              <span>Consumers</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedLocationMap;
