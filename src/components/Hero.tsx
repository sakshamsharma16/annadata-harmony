
import { useState, useEffect, useRef, memo } from "react";
import { ArrowRight, ArrowLeft, ArrowRightCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  {
    title: "Empowering Farmers, Enriching Communities",
    description: "Connect directly with farmers, eliminate middlemen, and ensure fair pricing for all. Join the agricultural revolution today.",
    image: "/image1.jpg",
    alt: "Farmers in field"
  },
  {
    title: "Fresh Produce, Fair Prices",
    description: "Get access to farm-fresh produce at transparent prices while supporting local farmers and sustainable agriculture.",
    image: "/image2.jpg",
    alt: "Fresh produce at market"
  },
  {
    title: "Technology Meets Agriculture",
    description: "Our innovative platform uses technology to bridge the gap between farmers and consumers for a more sustainable food ecosystem.",
    image: "/image3.jpg",
    alt: "Technology in agriculture"
  },
  {
    title: "Building Sustainable Agricultural Ecosystems",
    description: "Join us in creating a sustainable future where farmers thrive and consumers get access to healthy, locally sourced food.",
    image: "/image4.jpg",
    alt: "Sustainable agriculture"
  }
];

// Memoize slide content for better performance
const HeroSlide = memo(({ slide, isActive }: { slide: typeof heroSlides[0], isActive: boolean }) => {
  if (!isActive) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#138808] to-[#FF9933]">
        {slide.title}
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 lg:max-w-xl mt-4">
        {slide.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Join as Farmer
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Join as Consumer
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
});

HeroSlide.displayName = "HeroSlide";

// Optimize image loading
const HeroImage = memo(({ slide, isActive }: { slide: typeof heroSlides[0], isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933]/20 to-[#138808]/20 rounded-[2rem]"></div>
      <img
        src={slide.image}
        alt={slide.alt}
        className="w-full h-full object-cover rounded-[2rem] shadow-xl"
        loading={isActive ? "eager" : "lazy"}
        width="700"
        height="400"
      />
    </motion.div>
  );
});

HeroImage.displayName = "HeroImage";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && currentSlide !== index) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    // Only start auto-rotation after images are loaded and if autoplay is enabled
    if (!imagesLoaded || !autoplayEnabled) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded, currentSlide, isAnimating, autoplayEnabled]);

  useEffect(() => {
    // Preload images with lower priority
    let loadedCount = 0;
    
    heroSlides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === heroSlides.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === heroSlides.length) {
          setImagesLoaded(true);
        }
      };
    });
    
    // If images take too long, consider them loaded anyway
    const timeout = setTimeout(() => setImagesLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[650px] flex items-center bg-gradient-to-b from-white via-[#F2FCE2]/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 z-10">
            <AnimatePresence mode="wait">
              {heroSlides.map((slide, index) => (
                currentSlide === index && (
                  <HeroSlide key={index} slide={slide} isActive={currentSlide === index} />
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Right Image */}
          <div className="flex-1 mt-8 lg:mt-0">
            <div ref={carouselRef} className="carousel-container relative h-[400px] md:h-[450px] w-full">
              {heroSlides.map((slide, index) => (
                <HeroImage key={index} slide={slide} isActive={currentSlide === index} />
              ))}
              
              {/* Navigation Buttons */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5 text-gray-800" />
              </motion.button>

              {/* Autoplay Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setAutoplayEnabled(!autoplayEnabled)}
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10 ${
                  autoplayEnabled ? "bg-[#138808] text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {autoplayEnabled ? "Autoplay On" : "Autoplay Off"}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators - Enhanced */}
        <div className="flex justify-center mt-8 gap-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-gradient-to-r from-[#138808] to-[#FF9933] w-6" 
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll Down Indicator - Enhanced */}
      <motion.a 
        href="#features" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-600 hover:text-[#138808] transition-colors"
        initial={{ y: -10, opacity: 0.6 }}
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
};

export default memo(Hero);
