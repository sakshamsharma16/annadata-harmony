
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Dashboards from "@/components/Dashboards";
import MarketPrices from "@/components/MarketPrices";
import Reviews from "@/components/Reviews";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Dashboards />
      <MarketPrices />
      <Reviews />
    </main>
  );
};

export default Index;
