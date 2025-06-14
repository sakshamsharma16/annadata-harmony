
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Leaf, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserRoles = [
  {
    title: "Farmer",
    description: "Sell your produce directly to vendors and earn more",
    icon: <Leaf className="h-8 w-8 text-[#138808]" />,
    path: "/dashboard/farmer",
    features: [
      "Manage your product listings",
      "Track orders and payments",
      "Access market analytics",
      "Monitor crop health data"
    ],
    color: "bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200",
    buttonColor: "bg-[#138808] hover:bg-[#138808]/90"
  },
  {
    title: "Vendor",
    description: "Source quality produce directly from farmers",
    icon: <ShoppingCart className="h-8 w-8 text-[#FF9933]" />,
    path: "/dashboard/vendor",
    features: [
      "Discover fresh products",
      "Compare prices and quality",
      "Place bulk orders",
      "Manage your inventory"
    ],
    color: "bg-gradient-to-br from-orange-50 to-amber-100 border-amber-200",
    buttonColor: "bg-[#FF9933] hover:bg-[#FF9933]/90"
  },
  {
    title: "Consumer",
    description: "Buy fresh produce from local vendors near you",
    icon: <Users className="h-8 w-8 text-[#0000FF]" />,
    path: "/dashboard/consumer",
    features: [
      "Find nearby vendors",
      "Compare prices",
      "Track orders in real-time",
      "Save on frequently purchased items"
    ],
    color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    buttonColor: "bg-[#0000FF] hover:bg-[#0000FF]/90"
  }
];

const UserRoleCards = () => (
  <div className="grid md:grid-cols-3 gap-8">
    {UserRoles.map((role, index) => (
      <Card 
        key={index} 
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${role.color}`}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            {role.icon}
            <Badge variant="outline">{role.title}</Badge>
          </div>
          <CardTitle className="text-xl mt-2">{role.title} Portal</CardTitle>
          <CardDescription>{role.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <ul className="space-y-2 mb-6">
            {role.features.map((feature, fIndex) => (
              <li key={fIndex} className="flex items-start">
                <div className="mr-2 mt-1 bg-white rounded-full p-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Link to={role.path}>
            <Button className={`w-full ${role.buttonColor} transition-all duration-300`}>
              Enter {role.title} Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default UserRoleCards;
