
import React from 'react';
import { TrendingDown, MessageCircle, Map, ShieldCheck, BarChart, Radio, Cpu } from 'lucide-react';
import { m } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: <Radio className="h-6 w-6 text-[#138808]" />,
    title: "Krishi Mitra Device",
    description:
      "Handheld field device for farmers: real-time crop health, easy market listings, and instant weather/irrigation notifications. Integrates seamlessly with Annadata for direct order updates and sales history.",
    bgColor: "bg-[#138808]/10",
  },
  {
    icon: <TrendingDown className="h-6 w-6 text-[#138808]" />,
    title: "Live Market Prices",
    description: "Access real-time market prices and get competitive rates for all agricultural products.",
    bgColor: "bg-[#138808]/10"
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-[#FF9933]" />,
    title: "Krishi Mitra Chatbot",
    description: "Get expert agricultural advice and answers to farming questions through our AI-powered assistant.",
    bgColor: "bg-[#FF9933]/10"
  },
  {
    icon: <Map className="h-6 w-6 text-[#0000FF]" />,
    title: "Nudge Connection",
    description: "Get notified when you're near vendors with fresh produce that matches your preferences.",
    bgColor: "bg-[#0000FF]/10"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
    title: "Direct Fair Trade",
    description: "Eliminate middlemen in the supply chain to ensure fair prices for farmers and consumers.",
    bgColor: "bg-green-100"
  },
  {
    icon: <BarChart className="h-6 w-6 text-blue-600" />,
    title: "Crop Health Index",
    description: "Monitor real-time crop health metrics and get actionable recommendations to improve yield.",
    bgColor: "bg-blue-100"
  },
  {
    icon: <Cpu className="h-6 w-6 text-[#FF9933]" />,
    title: "Annadata Integration",
    description: "Seamless syncing: update produce listings and receive order notifications instantly on both device & Annadata app.",
    bgColor: "bg-[#FF9933]/10"
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.1, duration: 0.65, ease: "easeInOut" as const }
  }),
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Key Features & Innovations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the tools, hardware, and technologies that make ANNADATA powerful for rural and urban India
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <m.div
              key={index}
              className="border border-gray-100 p-6 rounded-xl hover:shadow-xl transition-all bg-white"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className={`${feature.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
