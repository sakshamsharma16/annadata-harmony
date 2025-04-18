
import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  color: string;
}

const HowItWorksSection: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Farmers List Produce",
      description: "Farmers upload their produce details, set fair prices, and share real-time availability.",
      color: "bg-[#138808]"
    },
    {
      number: 2,
      title: "Vendors Connect",
      description: "Vendors purchase directly from farmers, eliminating middlemen and ensuring quality.",
      color: "bg-[#FF9933]"
    },
    {
      number: 3,
      title: "Consumers Buy Fresh",
      description: "Consumers purchase fresh produce from local vendors at competitive prices.",
      color: "bg-[#0000FF]"
    }
  ];

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-[#F2FCE2] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How ANNADATA Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform creates a seamless connection between farmers, vendors, and consumers
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line (visible on md screens and up) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#138808] via-[#FF9933] to-[#0000FF] transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative z-10">
              <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-bold mx-auto`}>
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
