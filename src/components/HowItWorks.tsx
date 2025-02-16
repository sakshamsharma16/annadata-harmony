
import { Check } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Farmers List Produce",
      description: "Farmers list their fresh produce directly at special prices",
      icon: "🌾"
    },
    {
      title: "Vendors Purchase",
      description: "Vendors buy fresh stock directly with no middlemen",
      icon: "🛒"
    },
    {
      title: "Consumers Benefit",
      description: "Consumers get fresh, affordable produce from local vendors",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Ecosystem Grows",
      description: "More sales lead to increased income for all stakeholders",
      icon: "📈"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Annadata Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple yet powerful system that benefits everyone in the chain
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">Key Benefits</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              "Fair Pricing for Farmers",
              "Increased Vendor Profits",
              "Affordable Fresh Produce"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-green-50 p-4 rounded-lg">
                <Check className="text-secondary flex-shrink-0" />
                <span className="text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
