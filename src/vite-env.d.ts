
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
}
