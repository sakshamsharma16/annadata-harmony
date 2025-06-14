
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleUserRound, Leaf } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import HeroBanner from './homepage/HeroBanner';
import UserRolesSection from './homepage/UserRolesSection';
import HowItWorksSection from './homepage/HowItWorksSection';
import FeaturesSection from './homepage/FeaturesSection';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF2] to-white flex flex-col">
      {/* Navigation / Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#138808] rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#138808]">ANNADATA</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button 
            variant="outline" 
            className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white"
            onClick={() => window.location.href = "/login"}
          >
            Login
          </Button>
          <Button 
            className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
            onClick={() => window.location.href = "/register"}
          >
            Register
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <HeroBanner />

      {/* User Roles Section */}
      <UserRolesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Features Highlight */}
      <FeaturesSection />
      
      {/* Need Help Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-[#138808] text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg hover:bg-[#138808]/90 transition-colors">
          <CircleUserRound className="w-5 h-5" />
          NEED HELP?
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
