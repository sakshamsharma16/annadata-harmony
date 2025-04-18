
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroBannerProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  imageSrc?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc = "/logo-placeholder.svg"
}) => {
  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-[#F2FCE2] to-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight" 
              dangerouslySetInnerHTML={{ __html: title }}>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            {description}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link to={primaryButtonLink}>
              <Button size="lg" className="bg-[#138808] hover:bg-[#138808]/90">
                {primaryButtonText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to={secondaryButtonLink}>
              <Button size="lg" variant="outline" className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white">
                {secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#138808]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
            <img
              src={imageSrc}
              alt="Annadata Platform"
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
