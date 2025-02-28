
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, ArrowRightCircle } from "lucide-react";

const heroSlides = [
  {
    title: "Empowering Farmers, Enriching Communities",
    description: "Connect directly with farmers, eliminate middlemen, and ensure fair pricing for all. Join the agricultural revolution today.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    alt: "Farmers in field"
  },
  {
    title: "Fresh Produce, Fair Prices",
    description: "Get access to farm-fresh produce at transparent prices while supporting local farmers and sustainable agriculture.",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8",
    alt: "Fresh produce at market"
  },
  {
    title: "Technology Meets Agriculture",
    description: "Our innovative platform uses technology to bridge the gap between farmers and consumers for a more sustainable food ecosystem.",
    image: "https://images.unsplash.com/photo-1601689640364-bc95642014b1",
    alt: "Technology in agriculture"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden gradient-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 z-10 relative">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none absolute top-0 left-0 right-0"
                }`}
                style={{ 
                  position: currentSlide === index ? 'relative' : 'absolute',
                  height: currentSlide === index ? 'auto' : '0'
                }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  <button className="btn-primary flex items-center justify-center gap-2">
                    Join as Farmer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-2">
                    Join as Consumer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-fade-up relative mt-8 lg:mt-0" style={{ animationDelay: "0.2s" }}>
            <div className="carousel-container relative">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933]/20 to-[#138808]/20 rounded-[2rem]"></div>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
                  />
                </div>
              ))}
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center mt-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#138808]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <a 
        href="#features" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-600 hover:text-[#138808] transition-colors animate-bounce"
      >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ArrowRightCircle className="w-5 h-5 transform rotate-90" />
      </a>
    </section>
  );
};

export default Hero;
