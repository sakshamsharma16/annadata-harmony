
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { m } from "framer-motion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// Pricing plan component for individual service pages
interface PlanProps {
  name: string;
  description: string;
  price: string;
  perWhat: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingPlanProps {
  plan: PlanProps;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ plan }) => {
  return (
    <m.div variants={itemVariants}>
      <Card className={`h-full ${plan.highlighted ? "border-[#138808] shadow-lg relative" : "border-gray-200"}`}>
        {plan.highlighted && (
          <div className="absolute top-0 right-0 bg-[#138808] text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
            Popular
          </div>
        )}
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
          <div className="mt-4">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-gray-500 ml-1 text-sm">{plan.perWhat}</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-1 bg-[#138808]/10 rounded-full p-1">
                  <svg className="h-3 w-3 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className={`w-full ${plan.highlighted ? "bg-[#138808] hover:bg-[#0d6b06]" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            Select Plan
          </Button>
        </CardFooter>
      </Card>
    </m.div>
  );
};

export default PricingPlan;
