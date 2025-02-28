
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
import ProductShowcase from "@/components/ProductShowcase";
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
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Section wrapper with full width and consistent spacing */}
      <div className="flex flex-col w-full">
        <section id="home" className="w-full">
          <Hero />
        </section>
        
        <section id="features" className="w-full">
          <Features />
        </section>
        
        <section id="products" className="w-full reveal">
          <ProductShowcase />
        </section>
        
        <section id="how-it-works" className="w-full">
          <HowItWorks />
        </section>
        
        <section id="services" className="w-full reveal">
          <Dashboards />
        </section>
        
        <section id="market" className="w-full reveal">
          <MarketPrices />
        </section>
        
        <section id="testimonials" className="w-full reveal">
          <Reviews />
        </section>
        
        <section id="contact" className="w-full reveal">
          <Contact />
        </section>
        
        <Footer />
      </div>
      
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
