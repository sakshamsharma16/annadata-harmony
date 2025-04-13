
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ScriptLoader from "@/components/ui/script-loader";

interface LocationMapProps {
  title?: string;
  description?: string;
  height?: string;
  showLegend?: boolean;
  className?: string;
}

// Type guard to check if google maps is loaded
const isGoogleMapsLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.google !== 'undefined' && 
         typeof window.google.maps !== 'undefined';
};

const LocationMap = ({ 
  title = "Location Map",
  description = "View your current location",
  height = "400px",
  showLegend = true,
  className = ""
}: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

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

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

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
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Showing default location instead.",
            variant: "destructive"
          });
        }
      );
    }
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
      </CardContent>
    </Card>
  );
};

export default LocationMap;
