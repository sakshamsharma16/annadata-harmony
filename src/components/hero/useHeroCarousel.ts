
import { useState, useEffect, useRef } from "react";

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
    // Preload images with lower priority
    let loadedCount = 0;
    
    const preloadImages = (imageUrls: string[]) => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
      });
    };
    
    // Get image urls from heroSlides import
    import('./heroData').then(({ heroSlides }) => {
      const imageUrls = heroSlides.map(slide => slide.image);
      preloadImages(imageUrls);
    }).catch(err => {
      console.error("Failed to load hero slides:", err);
      setImagesLoaded(true); // Consider images loaded anyway to prevent blocking
    });
    
    // If images take too long, consider them loaded anyway
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
