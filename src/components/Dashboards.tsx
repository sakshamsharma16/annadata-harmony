
import { ArrowRight, Users, Store, ShoppingCart, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

const dashboards = [
  {
    title: "Farmer Dashboard",
    description: "Manage your products, track sales, and connect with buyers directly.",
    icon: Users,
    color: "bg-green-500",
    link: "/dashboard/farmer",
  },
  {
    title: "Vendor Dashboard",
    description: "Access inventory management and order processing tools.",
    icon: Store,
    color: "bg-orange-500",
    link: "/dashboard/vendor",
  },
  {
    title: "Consumer Dashboard",
    description: "Browse products, track orders, and manage your preferences.",
    icon: ShoppingCart,
    color: "bg-blue-500",
    link: "/dashboard/consumer",
  },
  {
    title: "Market Analytics",
    description: "View market trends, price analytics, and demand forecasts.",
    icon: LineChart,
    color: "bg-purple-500",
    link: "/dashboard/analytics",
  },
];

const Dashboards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Individual Dashboards</h2>
          <p className="text-lg text-gray-600">
            Tailored interfaces for every stakeholder in the agricultural ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboards.map((dashboard, index) => (
            <Link
              to={dashboard.link}
              key={index}
              className="glass-card p-6 hover:shadow-xl transition-shadow animate-fade-up"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className={`${dashboard.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white`}>
                <dashboard.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{dashboard.title}</h3>
              <p className="text-gray-600 mb-4">{dashboard.description}</p>
              <div className="text-primary flex items-center justify-center gap-2 w-full hover:gap-3 transition-all">
                Enter Dashboard <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboards;
