
import { useState, useEffect, useRef } from "react";
import { heroSlides } from "./heroData";

export const useHeroCarousel = (slidesLength: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === slidesLength - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? slidesLength - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-rotation effect
  useEffect(() => {
    // Only start auto-rotation after images are loaded
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded, slidesLength]);

  // Image preloading effect
  useEffect(() => {
    // Preload images immediately to prevent issues
    const imageUrls = heroSlides.map(slide => slide.image);
    let loadedCount = 0;
    
    const preloadImages = (urls: string[]) => {
      urls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === urls.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === urls.length) {
            setImagesLoaded(true);
          }
        };
      });
    };
    
    preloadImages(imageUrls);
    
    // Fallback timeout to ensure we don't get stuck
    const timeout = setTimeout(() => setImagesLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    carouselRef,
    imagesLoaded
  };
};
