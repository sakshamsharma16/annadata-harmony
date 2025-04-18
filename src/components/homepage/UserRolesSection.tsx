
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingCart, Users } from "lucide-react";

interface UserRole {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
  iconColor: string;
  buttonColor: string;
}

const UserRolesSection: React.FC = () => {
  const roles: UserRole[] = [
    {
      title: "For Farmers",
      description: "Connect directly with vendors and consumers. Get fair prices for your produce and access to real-time crop health data.",
      icon: <Leaf className="h-8 w-8 text-[#138808]" />,
      buttonText: "Farmer Dashboard",
      buttonLink: "/dashboard/farmer",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100 border border-green-200",
      iconColor: "text-[#138808]",
      buttonColor: "bg-[#138808] hover:bg-[#138808]/90"
    },
    {
      title: "For Vendors",
      description: "Source high-quality produce directly from farmers. Manage inventory and connect with local consumers.",
      icon: <ShoppingCart className="h-8 w-8 text-[#FF9933]" />,
      buttonText: "Vendor Dashboard",
      buttonLink: "/dashboard/vendor",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200",
      iconColor: "text-[#FF9933]",
      buttonColor: "bg-[#FF9933] hover:bg-[#FF9933]/90"
    },
    {
      title: "For Consumers",
      description: "Buy fresh, affordable produce directly from local vendors. Enjoy competitive prices and quality assurance.",
      icon: <Users className="h-8 w-8 text-[#0000FF]" />,
      buttonText: "Consumer Dashboard",
      buttonLink: "/dashboard/consumer",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200",
      iconColor: "text-[#0000FF]",
      buttonColor: "bg-[#0000FF] hover:bg-[#0000FF]/90"
    }
  ];

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ANNADATA offers tailored experiences for each participant in the agricultural value chain
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div key={index} className={`${role.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all`}>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-4">
                {role.description}
              </p>
              <Link to={role.buttonLink}>
                <Button className={`w-full ${role.buttonColor}`}>
                  {role.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
