
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
    <section className="hero-section bg-gradient-to-br from-[#F8FFF5] via-[#F2FCE2] to-[#F5F9E6] min-h-[600px] flex items-center">
      {/* Decorative blob shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-primary/5 animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-secondary/5 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-[30%] left-[20%] w-[20rem] h-[20rem] rounded-full bg-accent/5 animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 animate-fade-up">
            <h1 className="hero-headline text-balance" 
                dangerouslySetInnerHTML={{ __html: title }}>
            </h1>
            <p className="hero-subtext text-balance">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to={primaryButtonLink}>
                <Button size="pill-lg" variant="green" rounded="full" animation="float" className="text-base">
                  {primaryButtonText}
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to={secondaryButtonLink}>
                <Button size="pill-lg" variant="glass" rounded="full" className="text-base border border-primary/20">
                  {secondaryButtonText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-full blur-3xl"></div>
              <img
                src={imageSrc}
                alt="Annadata Platform"
                className="w-full h-auto relative z-10 rounded-2xl shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
