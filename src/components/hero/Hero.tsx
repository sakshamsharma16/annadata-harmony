
import React from "react";
import { heroSlides } from "./heroData";
import { useHeroCarousel } from "./useHeroCarousel";
import HeroSlide from "./HeroSlide";
import HeroImage from "./HeroImage";
import HeroNavigationButtons from "./HeroNavigationButtons";
import HeroSlideIndicators from "./HeroSlideIndicators";
import HeroScrollIndicator from "./HeroScrollIndicator";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const { currentSlide, nextSlide, prevSlide, goToSlide, carouselRef } = useHeroCarousel(heroSlides.length);

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-[#F8FFF5] via-[#F2FCE2] to-[#F5F9E6]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-primary/5 animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-secondary/5 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-[30%] left-[20%] w-[20rem] h-[20rem] rounded-full bg-accent/5 animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 z-10">
            {heroSlides.map((slide, index) => (
              <HeroSlide key={`slide-${index}`} slide={slide} isActive={currentSlide === index} />
            ))}
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-fade-up relative mt-8 lg:mt-0" style={{ animationDelay: "0.2s" }}>
            <div className="brand-accent-strip absolute top-0 left-0 w-full rounded-t-xl z-20"></div>
            <div ref={carouselRef} className="carousel-container relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/30">
              {heroSlides.map((slide, index) => (
                <HeroImage key={`image-${index}`} slide={slide} isActive={currentSlide === index} />
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

      {/* Enhanced CTA Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <Button variant="glass" size="lg" rounded="full" animation="float" className="shadow-lg">
          Explore Annadata
        </Button>
      </div>
    </section>
  );
};

export default Hero;
