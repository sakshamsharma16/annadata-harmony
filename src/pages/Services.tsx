import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Truck, FileSpreadsheet, Award, BadgeDollarSign, PiggyBank, Shield, Book, Handshake } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// Services data
const servicesData = {
  logistics: {
    title: "Logistics & Delivery",
    subtitle: "Fast and reliable transportation for your produce",
    description: "Our end-to-end logistics services ensure that your agricultural produce reaches its destination quickly, safely, and in optimal condition. From temperature-controlled vehicles to real-time tracking, we handle every aspect of transportation.",
    features: [
      "Temperature-controlled vehicles for sensitive produce",
      "Real-time tracking and delivery updates",
      "Flexible delivery schedules to meet your needs",
      "Careful handling and packaging to prevent damage",
      "Insurance coverage for goods in transit"
    ],
    icon: <Truck className="h-8 w-8 text-[#138808]" />,
    image: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?q=80&w=1516&auto=format&fit=crop",
    plans: [
      {
        name: "Basic",
        description: "For small farmers with occasional delivery needs",
        price: "₹500",
        perWhat: "per shipment",
        features: [
          "Up to 100kg per shipment",
          "Standard delivery (1-3 days)",
          "Basic tracking"
        ]
      },
      {
        name: "Standard",
        description: "For regular shipments with moderate volume",
        price: "₹1,200",
        perWhat: "per shipment",
        features: [
          "Up to 500kg per shipment",
          "Express delivery (24-48 hours)",
          "Advanced tracking and notifications",
          "Priority loading"
        ],
        highlighted: true
      },
      {
        name: "Premium",
        description: "For large-scale commercial operations",
        price: "₹2,500",
        perWhat: "per shipment",
        features: [
          "Up to 2000kg per shipment",
          "Same-day/Next-day delivery",
          "Temperature-controlled vehicles",
          "Insurance included",
          "Dedicated logistics coordinator"
        ]
      }
    ]
  },
  "farm-consulting": {
    title: "Farm Consulting",
    subtitle: "Expert advice to improve your agricultural practices",
    description: "Our team of agricultural experts provides personalized consultation to help you optimize your farming practices, increase yields, and adopt sustainable methods that benefit both your business and the environment.",
    features: [
      "Soil health assessment and recommendations",
      "Crop selection guidance based on soil and climate",
      "Pest management strategies with minimal chemical use",
      "Irrigation optimization to conserve water",
      "Sustainable farming practices implementation"
    ],
    icon: <FileSpreadsheet className="h-8 w-8 text-[#138808]" />,
    image: "https://images.unsplash.com/photo-1581112293288-8070df524f40?q=80&w=1374&auto=format&fit=crop",
    plans: [
      {
        name: "Basic",
        description: "For small farmers seeking essential guidance",
        price: "₹1,500",
        perWhat: "per month",
        features: [
          "Monthly consultation (2 hours)",
          "Basic soil testing",
          "Seasonal crop planning",
          "Email support"
        ]
      },
      {
        name: "Professional",
        description: "Comprehensive support for serious farmers",
        price: "₹3,500",
        perWhat: "per month",
        features: [
          "Bi-weekly consultations",
          "Advanced soil and water testing",
          "Customized crop planning",
          "Pest management strategies",
          "Priority phone support"
        ],
        highlighted: true
      },
      {
        name: "Enterprise",
        description: "Full-scale support for commercial farms",
        price: "₹8,000",
        perWhat: "per month",
        features: [
          "Weekly on-site visits",
          "Comprehensive testing suite",
          "Technology integration support",
          "Staff training sessions",
          "24/7 expert access",
          "Quarterly performance review"
        ]
      }
    ]
  },
  certifications: {
    title: "Certifications",
    subtitle: "Get organic and quality certifications for your produce",
    description: "Navigate the complex certification landscape with our expert guidance. We help farmers obtain recognized certifications that validate the quality and growing practices of their produce, opening doors to premium markets and higher prices.",
    features: [
      "Guidance through the entire certification process",
      "Documentation assistance and preparation",
      "Pre-audit assessments to ensure compliance",
      "Representation during audits",
      "Renewal and maintenance support"
    ],
    icon: <Award className="h-8 w-8 text-[#138808]" />,
    image: "https://images.unsplash.com/photo-1594980596870-8aa52063865a?q=80&w=1470&auto=format&fit=crop",
    plans: [
      {
        name: "Standard",
        description: "For farmers seeking basic certifications",
        price: "₹15,000",
        perWhat: "one-time fee",
        features: [
          "Single certification processing",
          "Basic documentation assistance",
          "Standard processing time",
          "Email support"
        ]
      },
      {
        name: "Professional",
        description: "Comprehensive certification package",
        price: "₹28,000",
        perWhat: "one-time fee",
        features: [
          "Multiple certification processing",
          "Complete documentation assistance",
          "Expedited processing",
          "Pre-audit inspection",
          "Phone and email support"
        ],
        highlighted: true
      },
      {
        name: "Premium",
        description: "Full-service certification management",
        price: "₹45,000",
        perWhat: "one-time fee",
        features: [
          "All available certifications",
          "End-to-end documentation handling",
          "Priority processing",
          "Multiple pre-audit inspections",
          "Audit representation",
          "Dedicated certification manager"
        ]
      }
    ]
  },
  financial: {
    title: "Financial Services",
    subtitle: "Loans, insurance, and other financial tools for farmers",
    description: "Access tailored financial solutions designed specifically for agricultural needs. From crop insurance to equipment loans and seasonal funding, our financial services help farmers manage risks and invest in growth opportunities.",
    features: [
      "Competitive loan options with farmer-friendly terms",
      "Comprehensive crop and equipment insurance",
      "Financial planning and budgeting assistance",
      "Risk management strategies",
      "Access to government subsidies and schemes"
    ],
    icon: <BadgeDollarSign className="h-8 w-8 text-[#138808]" />,
    image: "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1470&auto=format&fit=crop",
    plans: [
      {
        name: "Micro Loan",
        description: "For small operational expenses",
        price: "8%",
        perWhat: "interest rate",
        features: [
          "Loans up to ₹50,000",
          "Quick 3-day approval",
          "6-month repayment term",
          "No collateral required",
          "Basic crop insurance"
        ]
      },
      {
        name: "Growth Loan",
        description: "For equipment and expansion",
        price: "10.5%",
        perWhat: "interest rate",
        features: [
          "Loans up to ₹5,00,000",
          "7-day approval process",
          "12-36 month repayment terms",
          "Flexible collateral options",
          "Comprehensive insurance package"
        ],
        highlighted: true
      },
      {
        name: "Enterprise Financing",
        description: "For large agricultural businesses",
        price: "12%",
        perWhat: "interest rate",
        features: [
          "Loans above ₹10,00,000",
          "Customized loan structure",
          "Extended repayment terms",
          "Business financial consulting",
          "Complete risk management suite",
          "Seasonal payment adjustments"
        ]
      }
    ]
  }
};

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

// Service card component for the main services page
const ServiceCard = ({ service, slug }) => {
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

// Pricing plan component for individual service pages
const PricingPlan = ({ plan }) => {
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

// Service page content when a specific service is selected
const ServiceDetail = ({ service }) => {
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

// Main services page content (when no specific service is selected)
const ServicesOverview = () => {
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

const Services = () => {
  const { service } = useParams();
  
  const selectedService = service && servicesData[service] ? servicesData[service] : null;

  return (
    <div className="min-h-screen">
      <LazyMotion features={domAnimation}>
        {selectedService ? (
          <ServiceDetail service={selectedService} />
        ) : (
          <ServicesOverview />
        )}
      </LazyMotion>
    </div>
  );
};

export default Services;
