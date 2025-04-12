
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Award, Shield, Book } from "lucide-react";
import { m } from "framer-motion";
import ServiceCard from './ServiceCard';
import { ServicesDataType } from './types';

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

interface ServicesOverviewProps {
  servicesData: ServicesDataType;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ servicesData }) => {
  return (
    <>
      <m.div 
        className="max-w-4xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Our Services</h1>
        <p className="text-lg text-gray-600">
          Comprehensive solutions to support every aspect of your agricultural business, from farm to market.
        </p>
      </m.div>
      
      <Tabs defaultValue="all" className="max-w-6xl mx-auto mb-16">
        <TabsList className="w-full justify-start overflow-auto pb-2">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="farmers">For Farmers</TabsTrigger>
          <TabsTrigger value="vendors">For Vendors</TabsTrigger>
          <TabsTrigger value="consumers">For Consumers</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(servicesData).map(([key, service], index) => (
              <ServiceCard key={index} service={service} slug={key} />
            ))}
          </m.div>
        </TabsContent>
        <TabsContent value="farmers">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(servicesData)
              .filter(([key]) => ['farm-consulting', 'certifications', 'financial'].includes(key))
              .map(([key, service], index) => (
                <ServiceCard key={index} service={service} slug={key} />
              ))}
          </m.div>
        </TabsContent>
        <TabsContent value="vendors">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(servicesData)
              .filter(([key]) => ['logistics', 'financial'].includes(key))
              .map(([key, service], index) => (
                <ServiceCard key={index} service={service} slug={key} />
              ))}
          </m.div>
        </TabsContent>
        <TabsContent value="consumers">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(servicesData)
              .filter(([key]) => ['logistics'].includes(key))
              .map(([key, service], index) => (
                <ServiceCard key={index} service={service} slug={key} />
              ))}
          </m.div>
        </TabsContent>
      </Tabs>
      
      <m.div 
        className="bg-[#138808]/5 py-16 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Tailored Solutions for Your Agricultural Business</h2>
              <p className="text-gray-600 mb-6">
                We understand that every farm and agricultural business is unique. That's why we offer customizable service packages 
                that can be tailored to your specific needs, scale of operation, and budget.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-[#138808]/10 rounded-full p-1">
                    <svg className="h-4 w-4 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized consultations to understand your needs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-[#138808]/10 rounded-full p-1">
                    <svg className="h-4 w-4 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Flexible service packages that grow with your business</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-[#138808]/10 rounded-full p-1">
                    <svg className="h-4 w-4 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Integrated solutions that work together seamlessly</span>
                </li>
              </ul>
              <Button className="bg-[#138808] hover:bg-[#0d6b06]">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1602765413310-fb1db42f6608?q=80&w=1469&auto=format&fit=crop" 
                alt="Agricultural consultation" 
                className="w-full h-auto aspect-video object-cover"
                loading="lazy"
              />
            </div>
          </m.div>
        </div>
      </m.div>
      
      <m.div 
        className="max-w-6xl mx-auto px-4 mb-16"
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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our expertise and commitment to the agricultural sector set us apart.
          </p>
        </m.div>
        
        <m.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expertise</h3>
            <p className="text-gray-600">
              Our team consists of agricultural experts with decades of combined experience in various aspects of farming and agribusiness.
            </p>
          </m.div>
          
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reliability</h3>
            <p className="text-gray-600">
              We deliver on our promises, ensuring that our services meet the highest standards of quality and effectiveness.
            </p>
          </m.div>
          
          <m.div variants={itemVariants} className="text-center">
            <div className="bg-[#138808]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="h-8 w-8 text-[#138808]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We stay at the forefront of agricultural technology and practices, bringing innovative solutions to age-old challenges.
            </p>
          </m.div>
        </m.div>
      </m.div>
      
      <m.div 
        className="bg-[#138808] text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Agricultural Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied farmers and agribusinesses who have elevated their operations with our services.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-[#138808] hover:bg-gray-100">
            Get Started Today
          </Button>
        </div>
      </m.div>
    </>
  );
};

export default ServicesOverview;
