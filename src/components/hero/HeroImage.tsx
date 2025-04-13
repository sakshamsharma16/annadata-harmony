
import { memo } from "react";

interface HeroImageProps {
  slide: {
    image: string;
    alt: string;
  };
  isActive: boolean;
}

// Optimized image component
const HeroImage = memo(({ slide, isActive }: HeroImageProps) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
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
    </div>
  );
});

HeroImage.displayName = "HeroImage";

export default HeroImage;
