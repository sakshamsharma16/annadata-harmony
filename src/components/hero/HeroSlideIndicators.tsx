
import { memo } from "react";

interface HeroSlideIndicatorsProps {
  slidesCount: number;
  currentSlide: number;
  onChange: (index: number) => void;
}

const HeroSlideIndicators = memo(({ slidesCount, currentSlide, onChange }: HeroSlideIndicatorsProps) => {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: slidesCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 mx-1 rounded-full transition-colors ${
            currentSlide === index ? "bg-[#138808]" : "bg-gray-300"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
});

HeroSlideIndicators.displayName = "HeroSlideIndicators";

export default HeroSlideIndicators;
