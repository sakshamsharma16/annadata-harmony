
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, LineChart, Truck, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const PlatformFeatures = [
  {
    title: "Secure Transactions",
    description: "End-to-end encrypted payment processing with multiple options",
    icon: <Shield className="h-6 w-6 text-purple-600" />
  },
  {
    title: "Real-time Analytics",
    description: "Data-driven insights for farmers and vendors to optimize their business",
    icon: <LineChart className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Efficient Logistics",
    description: "Integrated delivery tracking and management system",
    icon: <Truck className="h-6 w-6 text-orange-600" />
  },
  {
    title: "Community Forums",
    description: "Connect with other users to share knowledge and best practices",
    icon: <MessageCircle className="h-6 w-6 text-pink-600" />
  },
  {
    title: "Educational Resources",
    description: "Access to latest farming techniques and market trends",
    icon: <BookOpen className="h-6 w-6 text-indigo-600" />
  }
];

const PlatformFeaturesSection = () => (
  <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <Badge className="mb-2" variant="outline">Platform Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the Agricultural Ecosystem</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our platform provides a comprehensive set of tools and features designed to connect and empower all participants in the agricultural value chain.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PlatformFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="rounded-full bg-gray-50 p-3 inline-block mb-4 shadow-sm">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/how-it-works">
          <Button variant="outline" size="lg" className="transition-transform duration-300 hover:scale-105">
            Learn How It Works
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default PlatformFeaturesSection;
