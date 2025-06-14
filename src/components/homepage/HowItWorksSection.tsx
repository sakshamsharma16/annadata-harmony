
import React from 'react';
import { m } from "framer-motion";
import { Truck, ShoppingCart, Leaf } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: <Leaf className="h-7 w-7 text-[#138808]" />,
    title: "Farmers List Fresh Produce",
    description: "Farmers update produce, set transparent prices, and share real-time availability using Annadata or Krishi Mitra device."
  },
  {
    number: 2,
    icon: <ShoppingCart className="h-7 w-7 text-[#FF9933]" />,
    title: "Vendors Buy Direct",
    description: "Cart vendors source from local farmers, avoiding middlemen, and receive live inventory/pricing updates."
  },
  {
    number: 3,
    icon: <Truck className="h-7 w-7 text-[#0000FF]" />,
    title: "Consumers Shop At Doorstep",
    description: "Neighborhood buyers place orders on Annadata and receive ultra-fresh, fairly-priced produce, delivered by vendors."
  }
];

const fadeGrow = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12 + 0.13, duration: 0.67, ease: "easeOut" as const }
  }),
};

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-[#F2FCE2] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Doorstep Shopping Model: How Annadata Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamlessly connecting farmers, local vendors, and your neighborhood for fresher, fairer shopping
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:space-x-0 md:space-y-0 md:divide-x md:divide-[#9cc6a1]/20 relative">
          {steps.map((step, idx) => (
            <m.div
              key={idx}
              className="flex-1 md:max-w-xs mx-auto relative bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all flex flex-col items-center z-10"
              variants={fadeGrow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
            >
              <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-full shadow ring-2 ring-[#8cdf90]/20 bg-gradient-to-br from-white to-[#ecffeb]/80 animate-fade-in">
                {step.icon}
              </div>
              <div className="text-lg font-bold text-[#138808] mb-1">Step {step.number}</div>
              <h3 className="text-center text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
        {/* Infographic arrows - animated */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-[80%] h-3 z-0 mt-[-70px]">
          <div className="w-1/3 flex items-center justify-center">
            <m.div
              className="h-1 w-full bg-gradient-to-r from-[#138808] to-[#FF9933] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <m.div
              className="h-1 w-full bg-gradient-to-r from-[#FF9933] to-[#0000FF] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold shadow">
            <strong>No Middlemen.</strong> Just honest harvests, local jobs, and doorstep convenience.
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
