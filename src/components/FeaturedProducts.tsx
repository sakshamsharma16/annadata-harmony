
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Enhanced featured products data with more fruits and vegetables
const featuredProducts = [
  {
    id: 1,
    name: "Premium Organic Rice",
    description: "Farm-fresh rice grown with organic practices",
    price: 45,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=800&auto=format&fit=crop",
    category: "grains"
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    description: "Juicy, locally grown vine-ripened tomatoes",
    price: 35,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    category: "vegetables"
  },
  {
    id: 3,
    name: "Organic Spinach",
    description: "Nutrient-rich leafy greens from pesticide-free farms",
    price: 25,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop",
    category: "vegetables"
  },
  {
    id: 4,
    name: "Fresh Mangoes",
    description: "Sweet and ripe mangoes from local orchards",
    price: 80,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop",
    category: "fruits"
  },
  {
    id: 5,
    name: "Ripe Bananas",
    description: "Farm-fresh ripe bananas, perfect for smoothies",
    price: 40,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop",
    category: "fruits"
  },
  {
    id: 6,
    name: "Bell Peppers Mix",
    description: "Colorful mix of red, yellow and green bell peppers",
    price: 60,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=800&auto=format&fit=crop",
    category: "vegetables"
  },
  {
    id: 7,
    name: "Fresh Apples",
    description: "Crisp and juicy apples from mountain orchards",
    price: 50,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=800&auto=format&fit=crop",
    category: "fruits"
  },
  {
    id: 8,
    name: "Organic Potatoes",
    description: "Organically grown potatoes, perfect for cooking",
    price: 30,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    category: "vegetables"
  }
];

const FeaturedProducts = () => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<string | null>(null);

  const addToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart.",
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const filteredProducts = filter 
    ? featuredProducts.filter(product => product.category === filter)
    : featuredProducts;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-lg text-gray-600">
              Explore our best-selling farm-fresh products
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilter(null)}
                className={filter === null ? "bg-gray-100" : ""}
              >
                All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilter("vegetables")}
                className={filter === "vegetables" ? "bg-gray-100" : ""}
              >
                Vegetables
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilter("fruits")}
                className={filter === "fruits" ? "bg-gray-100" : ""}
              >
                Fruits
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilter("grains")}
                className={filter === "grains" ? "bg-gray-100" : ""}
              >
                Grains
              </Button>
            </div>
            {getTotalItems() > 0 && (
              <Link to="/checkout">
                <Button className="bg-[#138808] hover:bg-[#138808]/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <span className="flex items-center text-yellow-500 font-medium text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {product.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{product.description}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="font-bold text-[#FF9933] text-lg">₹{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white"
                  onClick={() => addToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link to="/consumer/nearby-vendors">
                  <Button variant="ghost">Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/consumer/dashboard">
            <Button className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white">
              Browse All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
