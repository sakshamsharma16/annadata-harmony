
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 gradient-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Farmers, <br />
              Enriching Communities
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
              Connect directly with farmers, eliminate middlemen, and ensure fair pricing for all. Join the agricultural revolution today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

          {/* Right Image */}
          <div className="flex-1 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933]/20 to-[#138808]/20 rounded-[2rem]"></div>
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23"
                alt="Farmers in field"
                className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
