
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { ServiceData } from './types';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

interface ServiceCardProps {
  service: ServiceData;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, slug }) => {
  return (
    <m.div variants={itemVariants}>
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <div className="flex items-center mb-2">
            {service.icon}
          </div>
          <CardTitle>{service.title}</CardTitle>
          <CardDescription>{service.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-2 mb-4">{service.description}</p>
          <ul className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-1 bg-[#138808]/10 rounded-full p-1">
                  <svg className="h-3 w-3 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-sm text-gray-500">+ {service.features.length - 3} more features</li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Link to={`/services/${slug}`} className="w-full">
            <Button className="w-full bg-[#138808] hover:bg-[#0d6b06]">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </m.div>
  );
};

export default ServiceCard;
