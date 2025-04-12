
import React from "react";
import { Truck, FileSpreadsheet, Award, BadgeDollarSign } from "lucide-react";
import { ServicesDataType } from "./types";

// Services data
const servicesData: ServicesDataType = {
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
    icon: React.createElement(Truck, { className: "h-8 w-8 text-[#138808]" }),
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
    icon: React.createElement(FileSpreadsheet, { className: "h-8 w-8 text-[#138808]" }),
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
    icon: React.createElement(Award, { className: "h-8 w-8 text-[#138808]" }),
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
    icon: React.createElement(BadgeDollarSign, { className: "h-8 w-8 text-[#138808]" }),
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

export default servicesData;
