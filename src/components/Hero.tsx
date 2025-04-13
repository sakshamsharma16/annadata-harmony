
import { LazyMotion, domAnimation } from "framer-motion";
import { heroSlides } from "./hero/heroData";
import { useHeroCarousel } from "./hero/useHeroCarousel";
import HeroSlide from "./hero/HeroSlide";
import HeroImage from "./hero/HeroImage";
import HeroNavigationButtons from "./hero/HeroNavigationButtons";
import HeroSlideIndicators from "./hero/HeroSlideIndicators";
import HeroScrollIndicator from "./hero/HeroScrollIndicator";

const Hero = () => {
  const { currentSlide, nextSlide, prevSlide, goToSlide, carouselRef } = useHeroCarousel(heroSlides.length);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 z-10">
              {heroSlides.map((slide, index) => (
                <HeroSlide key={index} slide={slide} isActive={currentSlide === index} />
              ))}
            </div>

            {/* Right Image */}
            <div className="flex-1 animate-fade-up relative mt-8 lg:mt-0" style={{ animationDelay: "0.2s" }}>
              <div ref={carouselRef} className="carousel-container relative h-[400px] w-full">
                {heroSlides.map((slide, index) => (
                  <HeroImage key={index} slide={slide} isActive={currentSlide === index} />
                ))}
                
                {/* Navigation Buttons */}
                <HeroNavigationButtons onPrev={prevSlide} onNext={nextSlide} />
              </div>
            </div>
          </div>
          
          {/* Slide Indicators */}
          <HeroSlideIndicators 
            slidesCount={heroSlides.length}
            currentSlide={currentSlide}
            onChange={goToSlide}
          />
        </div>
        
        {/* Scroll Down Indicator */}
        <HeroScrollIndicator />
      </section>
    </LazyMotion>
  );
};

export default Hero;
