
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter, ShoppingCart, MapPin, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const marketplaceProducts = [
  {
    id: "1",
    name: "Premium Organic Rice",
    description: "Sustainably grown by local farmers using traditional methods",
    price: 120,
    quantity: 1000,
    category: "grains",
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    farmer: {
      name: "Anand Patel",
      location: "Bhavnagar, Gujarat",
      distance: 5.2
    }
  },
  {
    id: "2",
    name: "Fresh Seasonal Vegetables",
    description: "Farm-to-table vegetables harvested daily",
    price: 80,
    quantity: 500,
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2069&auto=format&fit=crop",
    rating: 4.7,
    farmer: {
      name: "Lakshmi Reddy",
      location: "Vijayawada, Andhra Pradesh",
      distance: 8.7
    }
  },
  {
    id: "3",
    name: "Pure Honey",
    description: "Raw, unfiltered honey from forest beekeepers",
    price: 350,
    quantity: 200,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2080&auto=format&fit=crop",
    rating: 5.0,
    farmer: {
      name: "Ramesh Singh",
      location: "Uttarkashi, Uttarakhand",
      distance: 12.3
    }
  },
  {
    id: "4",
    name: "Organic Wheat Flour",
    description: "Stone-ground flour from heritage wheat varieties",
    price: 65,
    quantity: 800,
    category: "grains",
    image: "https://images.unsplash.com/photo-1568718247028-46f14cfb7533?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    farmer: {
      name: "Vishal Sharma",
      location: "Amritsar, Punjab",
      distance: 15.8
    }
  },
];

const categories = [
  { id: "all", label: "All Products" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains & Cereals" },
  { id: "dairy", label: "Dairy & Protein" },
];

const VendorMarketplace = () => {
  const [products, setProducts] = useState(marketplaceProducts);
  const [filteredProducts, setFilteredProducts] = useState(marketplaceProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user's location for nearby product recommendations
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  useEffect(() => {
    // Filter products based on category and search query
    let filtered = products;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.farmer.name.toLowerCase().includes(query) ||
        product.farmer.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, products]);

  const handleAddToCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: "The product has been added to your cart.",
    });
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Farmer Marketplace</h1>
        <p className="text-muted-foreground">
          Source quality products directly from local farmers
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products, farmers or locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
        <Button variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          Nearby Only
        </Button>
        <Button className="relative gap-2 bg-[#138808] hover:bg-[#138808]/90">
          <ShoppingCart className="h-4 w-4" />
          Cart
          {getTotalCartItems() > 0 && (
            <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9933] p-0">
              {getTotalCartItems()}
            </Badge>
          )}
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={activeCategory === category.id ? "bg-[#138808]" : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-700">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {product.rating}
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{product.farmer.name} • {product.farmer.distance} km away</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium text-[#FF9933]">₹{product.price}/kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="font-medium">{product.quantity} kg</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {}}
              >
                View Details
              </Button>
              <Button
                className="flex-1 bg-[#138808] hover:bg-[#138808]/90"
                onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorMarketplace;
