
import { ArrowRight, ArrowLeft } from "lucide-react";
import { memo } from "react";

interface HeroNavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

const HeroNavigationButtons = memo(({ onPrev, onNext }: HeroNavigationButtonsProps) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-lg hover:bg-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5 text-gray-800" />
      </button>
    </>
  );
});

HeroNavigationButtons.displayName = "HeroNavigationButtons";

export default HeroNavigationButtons;
