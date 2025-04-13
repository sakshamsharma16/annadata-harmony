
import { ArrowRightCircle } from "lucide-react";
import { memo } from "react";

const HeroScrollIndicator = memo(() => {
  return (
    <a 
      href="#features" 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-600 hover:text-[#138808] transition-colors animate-bounce"
    >
      <span className="text-sm font-medium mb-2">Scroll Down</span>
      <ArrowRightCircle className="w-5 h-5 transform rotate-90" />
    </a>
  );
});

HeroScrollIndicator.displayName = "HeroScrollIndicator";

export default HeroScrollIndicator;
