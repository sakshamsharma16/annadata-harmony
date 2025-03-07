
import { useEffect } from 'react';

interface ScriptLoaderProps {
  src: string;
  attributes?: Record<string, string>;
  onLoad?: () => void;
}

export const ScriptLoader = ({ src, attributes = {}, onLoad }: ScriptLoaderProps) => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    
    if (existingScript) {
      if (onLoad) onLoad();
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    // Add all custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
    
    // Add event listeners
    if (onLoad) {
      script.addEventListener('load', onLoad);
    }
    
    // Append to document
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      if (onLoad) {
        script.removeEventListener('load', onLoad);
      }
      // Optional: Remove script on unmount
      // document.body.removeChild(script);
    };
  }, [src, onLoad]);
  
  return null;
};

export default ScriptLoader;
