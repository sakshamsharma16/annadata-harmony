
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// To avoid TypeScript errors without google maps types
interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeControl: boolean;
}

interface MarkerProps {
  position: { lat: number; lng: number };
  title?: string;
  icon?: string;
  animation?: number;
}

interface CircleProps {
  center: { lat: number; lng: number };
  radius: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
  fillColor: string;
  fillOpacity: number;
}

interface InfoWindowProps {
  content: string;
  position?: { lat: number; lng: number };
}

export interface Location {
  lat: number;
  lng: number;
}

export interface MarkerData {
  position: Location;
  title?: string;
  icon?: string;
}

interface EnhancedLocationMapProps {
  initialLocation?: Location;
  markers?: Array<MarkerData>;
  showSearchBar?: boolean;
  onLocationChange?: (location: Location) => void;
  height?: string;
  title?: string;
  description?: string;
  showLegend?: boolean;
}

const EnhancedLocationMap = ({
  initialLocation = { lat: 28.6139, lng: 77.2090 }, // Default to Delhi
  markers = [],
  showSearchBar = true,
  onLocationChange,
  height = "400px",
  title,
  description,
  showLegend = false
}: EnhancedLocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Maps API script
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setLoadError('Failed to load Google Maps API. Check your API key and internet connection.');
        setLoading(false);
      };
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      initializeMap();
    }

    return () => {
      // Clean up markers
      mapMarkers.forEach(marker => {
        if (marker) marker.setMap(null);
      });
    };
  }, []);

  useEffect(() => {
    // Update markers when props change
    if (map) {
      updateMarkers();
    }
  }, [markers, map]);

  const initializeMap = () => {
    try {
      if (!mapRef.current || !window.google || !window.google.maps) return;

      const mapOptions = {
        center: initialLocation,
        zoom: 14,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true,
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Add markers
      updateMarkers(newMap);

      // Add geolocation button and functionality
      addGeolocationControl(newMap);

      // Add search functionality
      if (showSearchBar && window.google.maps.places) {
        setupSearchBox(newMap);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoadError('Failed to initialize map. Please try again later.');
      setLoading(false);
    }
  };

  const updateMarkers = (targetMap = map) => {
    if (!targetMap || !window.google || !window.google.maps) return;

    // Clear existing markers
    mapMarkers.forEach(marker => {
      if (marker) marker.setMap(null);
    });

    // Add new markers
    const newMarkers = markers.map(marker => {
      const mapMarker = new window.google.maps.Marker({
        position: marker.position,
        map: targetMap,
        title: marker.title || '',
        icon: marker.icon,
        animation: window.google.maps.Animation.DROP
      });

      // Add info window if title is provided
      if (marker.title) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding:10px;max-width:200px;">
              <h3 style="margin-top:0;margin-bottom:5px;font-size:16px;color:#333;">${marker.title}</h3>
            </div>
          `
        });

        mapMarker.addListener('click', () => {
          infoWindow.open(targetMap, mapMarker);
        });
      }

      return mapMarker;
    });

    setMapMarkers(newMarkers);
  };

  const addGeolocationControl = (targetMap: any) => {
    if (!targetMap || !window.google || !window.google.maps) return;

    // Create custom control
    const locationButton = document.createElement("button");
    locationButton.textContent = "📍";
    locationButton.title = "Get Current Location";
    locationButton.className = "custom-map-control-button";
    locationButton.style.backgroundColor = "white";
    locationButton.style.border = "none";
    locationButton.style.borderRadius = "2px";
    locationButton.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
    locationButton.style.cursor = "pointer";
    locationButton.style.margin = "10px";
    locationButton.style.padding = "0 5px";
    locationButton.style.height = "40px";
    locationButton.style.width = "40px";
    locationButton.style.textAlign = "center";
    locationButton.style.fontSize = "21px";

    locationButton.addEventListener("click", () => {
      // Get user's location
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            // Center map on user's location
            targetMap.setCenter(userLocation);
            
            // Add a marker at user's location
            new window.google.maps.Marker({
              position: userLocation,
              map: targetMap,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });
            
            // Notify parent component about location change
            if (onLocationChange) {
              onLocationChange(userLocation);
            }
            
            setLoading(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            toast({
              title: "Location error",
              description: "Unable to retrieve your location. Please check your permissions.",
              variant: "destructive",
            });
            setLoading(false);
          },
          { enableHighAccuracy: true }
        );
      } else {
        toast({
          title: "Geolocation not supported",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive",
        });
      }
    });

    // Add the control to the map
    targetMap.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
      locationButton
    );
  };

  const setupSearchBox = (targetMap: any) => {
    if (!targetMap || !window.google || !window.google.maps || !window.google.maps.places) return;

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Search locations";
    searchInput.className = "map-search-box";
    searchInput.style.width = "250px";
    searchInput.style.height = "40px";
    searchInput.style.margin = "10px";
    searchInput.style.padding = "0 12px";
    searchInput.style.borderRadius = "3px";
    searchInput.style.border = "1px solid #ccc";
    searchInput.style.fontSize = "14px";
    searchInput.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

    targetMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    // Create the search box and link it to the UI element
    const searchBox = new window.google.maps.places.SearchBox(searchInput);

    // Bias the SearchBox results towards current map's viewport
    targetMap.addListener("bounds_changed", () => {
      searchBox.setBounds(targetMap.getBounds() as any);
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places && places.length === 0) {
        return;
      }

      if (!places) return;

      // For each place, get the icon, name and location
      const bounds = new window.google.maps.LatLngBounds();
      
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        // Add marker for the selected place
        const marker = new window.google.maps.Marker({
          map: targetMap,
          title: place.name,
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
        });

        setMapMarkers(prev => [...prev, marker]);

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding:10px;max-width:200px;">
              <h3 style="margin-top:0;margin-bottom:5px;font-size:16px;">${place.name}</h3>
              <p style="margin:0;font-size:13px;color:#666;">${place.formatted_address}</p>
            </div>
          `
        });

        // Open info window when marker is clicked
        marker.addListener('click', () => {
          infoWindow.open(targetMap, marker);
        });

        // Notify parent component about location change
        if (onLocationChange) {
          onLocationChange({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      
      targetMap.fitBounds(bounds);
    });
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {title && (
        <div className="p-4 bg-gray-100 border-b">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      
      {loading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {loadError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-red-500 mb-2">{loadError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            size="sm"
          >
            Retry
          </Button>
        </div>
      )}

      <div 
        ref={mapRef} 
        style={{ 
          height, 
          width: "100%", 
          borderRadius: "0.5rem" 
        }}
        className="bg-gray-100"
      />
      
      {showSearchBar && (
        <div className="hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location"
            className="map-search-input"
          />
        </div>
      )}
      
      {showLegend && (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Point of Interest</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedLocationMap;
