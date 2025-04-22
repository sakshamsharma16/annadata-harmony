
import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlideProps {
  slide: {
    title: string;
    description: string;
    image: string;
    alt: string;
  };
  isActive: boolean;
}

// Optimized slide component
const HeroSlide = memo(({ slide, isActive }: HeroSlideProps) => {
  if (!isActive) return null;
  
  return (
    <div className="transition-all duration-500 opacity-100 transform-none relative">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up font-display text-balance">
        {slide.title}
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 lg:max-w-xl mt-4 animate-fade-up text-balance" style={{ animationDelay: "0.2s" }}>
        {slide.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <Button variant="green" size="pill-lg" rounded="full" className="flex items-center justify-center gap-2 w-full sm:w-auto">
          Join as Farmer
          <ArrowRight className="w-5 h-5" />
        </Button>
        <Button variant="orange" size="pill-lg" rounded="full" className="flex items-center justify-center gap-2 w-full sm:w-auto">
          Join as Consumer
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
});

HeroSlide.displayName = "HeroSlide";

export default HeroSlide;
