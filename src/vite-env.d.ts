
/// <reference types="vite/client" />

// Add FastBots global type definition
interface Window {
  FastBots?: {
    open: () => void;
    close: () => void;
    init: (config: {
      rasaProLicenseToken?: string;
      multilingual?: boolean;
      voiceEnabled?: boolean;
      [key: string]: any;
    }) => void;
  };
  
  // Add Google Maps API type definition with all required properties
  google?: {
    maps: {
      Map: any;
      Marker: any;
      Circle: any;
      SymbolPath: any;
      MapTypeControl: boolean;
      LatLng: any;
      LatLngBounds: any;
      places: any;
      Geocoder: any;
      GeocoderStatus: any;
      NavigationControl: any;
      Animation: {
        DROP: number;
        BOUNCE: number;
      };
      InfoWindow: any;
      ControlPosition: {
        TOP_LEFT: number;
        TOP_RIGHT: number;
        BOTTOM_RIGHT: number;
        RIGHT_BOTTOM: number;
      };
    }
  };
}
