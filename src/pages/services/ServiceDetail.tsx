
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Handshake, Shield, PiggyBank } from "lucide-react";
import { m } from "framer-motion";
import PricingPlan from './PricingPlan';
import { ServiceData, ServicesDataType } from './types';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

interface ServiceDetailProps {
  service: ServiceData;
  servicesData: ServicesDataType;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, servicesData }) => {
  return (
    <>
      <m.div 
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          {service.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">{service.title}</h1>
        <p className="text-lg text-gray-600">
          {service.subtitle}
        </p>
      </m.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Overview</h2>
          <p className="text-gray-600 mb-6">
            {service.description}
          </p>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
          <ul className="space-y-3 mb-6">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 bg-[#138808]/10 rounded-full p-1">
                  <svg className="h-4 w-4 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="bg-[#138808] hover:bg-[#0d6b06]">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </m.div>
        
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-auto aspect-video object-cover"
            loading="lazy"
          />
        </m.div>
      </div>
      
      <m.div 
        className="mb-16 bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <m.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the option that best meets your needs. All plans can be customized to fit your specific requirements.
            </p>
          </m.div>
          
          <m.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {service.plans.map((plan, index) => (
              <m.div key={index} variants={itemVariants}>
                <PricingPlan plan={plan} />
              </m.div>
            ))}
          </m.div>
        </div>
      </m.div>
      
      <m.div 
        className="max-w-6xl mx-auto px-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple process ensures you get the services you need with minimal hassle.
          </p>
        </div>
        
        <m.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Consultation</h3>
            <p className="text-gray-600">
              Meet with our experts to discuss your specific needs and challenges. We'll assess your situation and recommend the best approach.
            </p>
          </m.div>
          
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Customization</h3>
            <p className="text-gray-600">
              We tailor our services to match your specific requirements, ensuring you get exactly what you need without paying for extras.
            </p>
          </m.div>
          
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Implementation</h3>
            <p className="text-gray-600">
              Our team delivers the service with professionalism and attention to detail, keeping you informed every step of the way.
            </p>
          </m.div>
        </m.div>
      </m.div>
      
      <m.div 
        className="bg-[#138808]/5 py-16 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of satisfied farmers who have transformed their operations with our services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-[#138808] hover:bg-[#0d6b06]">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </m.div>
        </div>
      </m.div>
      
      <m.div 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <m.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Explore Other Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of services designed to support every aspect of your agricultural business.
          </p>
        </m.div>
        
        <m.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(servicesData)
            .filter(([key]) => key !== Object.keys(servicesData).find(k => servicesData[k] === service))
            .slice(0, 3)
            .map(([key, otherService], index) => (
              <m.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={otherService.image} 
                      alt={otherService.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-1">
                      {otherService.icon}
                    </div>
                    <CardTitle className="text-lg">{otherService.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-2">{otherService.subtitle}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/services/${key}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Service
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </m.div>
            ))}
        </m.div>
      </m.div>
    </>
  );
};

export default ServiceDetail;
