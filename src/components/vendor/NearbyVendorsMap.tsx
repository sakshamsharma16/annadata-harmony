
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Temporary token for development - in production, this should be handled securely
// Users will be prompted to enter their own token
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZS11c2VyIiwiYSI6ImNrM25neXpxZjE0Z2szY3F0Z2E5bGw0ZnMifQ.7EYOEHVCnQYS0F0-bM2mZQ";

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
  const { t, language } = useLanguage();

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
          
          // Update vendors distances based on new location
          const updatedVendors = vendors.map(vendor => {
            const distance = calculateDistance(
              newLocation.lat, 
              newLocation.lng,
              vendor.location.lat,
              vendor.location.lng
            );
            return { ...vendor, distance: parseFloat(distance.toFixed(1)) };
          });
          
          setVendors(updatedVendors);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: t("location.access.denied"),
            description: t("using.default.location"),
            variant: "destructive",
          });
        }
      );
    }
  }, [t]);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

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
        title: t("map.error"),
        description: t("map.init.fail"),
        variant: "destructive",
      });
    }
  }, [mapToken, currentLocation, language, t]);

  // Add markers for current location and vendors
  const addMarkers = () => {
    if (!map.current) return;

    // Add current location marker
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="text-align: center; padding: 5px;">
        <h3 style="font-weight: bold; margin-bottom: 5px;">${t("your.location")}</h3>
      </div>`
    );

    // Custom element for the current location marker
    const el = document.createElement("div");
    el.className = "current-location-marker";
    el.style.width = "22px";
    el.style.height = "22px";
    el.style.borderRadius = "50%";
    el.style.background = "#138808";
    el.style.border = "3px solid white";
    el.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

    new mapboxgl.Marker(el)
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .setPopup(popup)
      .addTo(map.current);

    // Add vendor markers with custom elements
    vendors.forEach((vendor) => {
      // Create custom element for the vendor marker
      const vendorEl = document.createElement("div");
      vendorEl.className = "vendor-marker";
      vendorEl.style.width = "30px";
      vendorEl.style.height = "30px";
      vendorEl.style.backgroundImage = "url('https://img.icons8.com/fluency/48/shop.png')";
      vendorEl.style.backgroundSize = "cover";
      vendorEl.style.cursor = "pointer";
      vendorEl.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
      vendorEl.style.borderRadius = "50%";
      vendorEl.style.border = "2px solid white";
      vendorEl.style.transition = "transform 0.2s";

      // Add hover effect
      vendorEl.onmouseover = () => {
        vendorEl.style.transform = "scale(1.2)";
      };
      vendorEl.onmouseout = () => {
        vendorEl.style.transform = "scale(1)";
      };

      // Generate rating stars
      const generateStars = (rating?: number) => {
        if (!rating) return '';
        
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return `
          <div style="display: flex; align-items: center; margin-top: 5px;">
            ${Array(fullStars).fill('★').join('')}
            ${hasHalfStar ? '½' : ''}
            ${Array(emptyStars).fill('☆').join('')}
            <span style="margin-left: 5px;">(${rating})</span>
          </div>
        `;
      };

      // Add vendor marker with enhanced popup
      new mapboxgl.Marker(vendorEl)
        .setLngLat([vendor.location.lng, vendor.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
            `<div style="padding: 10px; max-width: 200px;">
              <h3 style="font-weight: bold; color: #138808; margin-bottom: 5px; font-size: 16px;">${vendor.name}</h3>
              <p style="margin: 5px 0; color: #666; font-size: 13px;">${vendor.type} ${t("vendor")}</p>
              <p style="margin: 5px 0; display: flex; align-items: center; font-size: 13px;">
                <span style="margin-right: 5px; color: #FF9933; font-weight: bold;">${vendor.distance} km</span> 
                ${t("away")}
              </p>
              <div style="color: #f8c72c; font-size: 14px;">
                ${generateStars(vendor.rating)}
              </div>
              <button 
                style="background: #138808; color: white; border: none; padding: 5px 10px; 
                       border-radius: 4px; margin-top: 8px; width: 100%; cursor: pointer; 
                       display: flex; align-items: center; justify-content: center; font-size: 13px;"
                onclick="alert('${t("connecting.with")} ${vendor.name}...')"
              >
                <span style="margin-right: 5px;">📱</span> ${t("contact")}
              </button>
            </div>`
          )
        )
        .addTo(map.current);
    });

    // Add pulsing effect to show search radius
    if (map.current.getLayer('radius-circle')) {
      map.current.removeLayer('radius-circle');
    }
    if (map.current.getSource('radius-source')) {
      map.current.removeSource('radius-source');
    }

    if (map.current.loaded()) {
      addRadiusCircle();
    } else {
      map.current.on('load', addRadiusCircle);
    }
  };

  const addRadiusCircle = () => {
    if (!map.current) return;

    // Add a source for the radius circle
    map.current.addSource('radius-source', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [currentLocation.lng, currentLocation.lat]
        },
        properties: {}
      }
    });

    // Add a layer for the radius circle
    map.current.addLayer({
      id: 'radius-circle',
      type: 'circle',
      source: 'radius-source',
      paint: {
        'circle-radius': {
          stops: [
            [0, 0],
            [20, 5000] // Approximate radius in meters at zoom level 10
          ],
          base: 2
        },
        'circle-color': 'rgba(19, 136, 8, 0.1)',
        'circle-stroke-width': 2,
        'circle-stroke-color': 'rgba(19, 136, 8, 0.3)'
      }
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

  // Get translations for UI elements
  const getVendorLabel = () => {
    return t("vendor");
  };

  const getYourLocationLabel = () => {
    return t("your.location");
  };

  const getNearbyVendorsTitle = () => {
    return t("nearby.vendors");
  };

  const getViewAllLabel = (count: number) => {
    return `${t("view.all")} ${count} ${t("vendors")}`;
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>{getNearbyVendorsTitle()}</CardTitle>
        <CardDescription>{t("discover.vendors")}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {showTokenInput ? (
          <div className="p-6 flex flex-col items-center">
            <p className="mb-4 text-center">
              {t("mapbox.token.request")}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                mapbox.com
              </a>
            </p>
            <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="mapbox-token"
                  placeholder={t("enter.mapbox.token")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit">{t("submit")}</Button>
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
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md text-xs">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full bg-[#138808] border-2 border-white mr-2"></div>
                <span>{getYourLocationLabel()}</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-no-repeat bg-contain mr-2" style={{ backgroundImage: "url('https://img.icons8.com/fluency/48/shop.png')" }}></div>
                <span>{getVendorLabel()}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Vendors list preview */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium mb-2">{getNearbyVendorsTitle()} ({vendors.length})</h3>
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
                {getViewAllLabel(vendors.length)}
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyVendorsMap;
