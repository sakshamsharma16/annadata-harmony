
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Dashboards from "@/components/Dashboards";
import MarketPrices from "@/components/MarketPrices";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Handle scroll to reveal animations
  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position for back to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Reveal animations for elements with .reveal class
      const reveals = document.querySelectorAll(".reveal");
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <Features />
      <HowItWorks />
      <div id="services" className="reveal reveal-up">
        <Dashboards />
      </div>
      <div id="market" className="reveal reveal-up">
        <MarketPrices />
      </div>
      <div id="testimonials" className="reveal reveal-up">
        <Reviews />
      </div>
      <div id="contact" className="reveal reveal-up">
        <Contact />
      </div>
      <Footer />
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-[#138808] text-white rounded-full shadow-lg transition-all duration-300 z-50 hover:bg-[#138808]/90 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  );
};

export default Index;
