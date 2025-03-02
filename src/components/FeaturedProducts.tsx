
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight, Filter, Clock, Tag, ChevronDown, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Enhanced featured products data with more details
const featuredProducts = [
  {
    id: 1,
    name: "Premium Organic Rice",
    description: "Farm-fresh rice grown with organic practices",
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=800&auto=format&fit=crop",
    category: "grains",
    vendor: "Green Earth Farms",
    location: "Bhavnagar, Gujarat",
    stock: 250,
    isNew: false,
    isFeatured: true,
    discount: 25,
    tags: ["organic", "pesticide-free"]
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    description: "Juicy, locally grown vine-ripened tomatoes",
    price: 35,
    originalPrice: 42,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    category: "vegetables",
    vendor: "Valley Fresh Produce",
    location: "Nashik, Maharashtra",
    stock: 78,
    isNew: true,
    isFeatured: true,
    discount: 17,
    tags: ["fresh", "local"]
  },
  {
    id: 3,
    name: "Organic Spinach",
    description: "Nutrient-rich leafy greens from pesticide-free farms",
    price: 25,
    originalPrice: 30,
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop",
    category: "vegetables",
    vendor: "Health Greens Co-op",
    location: "Pune, Maharashtra",
    stock: 45,
    isNew: false,
    isFeatured: true,
    discount: 16,
    tags: ["organic", "chemical-free"]
  },
  {
    id: 4,
    name: "Fresh Mangoes",
    description: "Sweet and ripe mangoes from local orchards",
    price: 80,
    originalPrice: 100,
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop",
    category: "fruits",
    vendor: "Tropical Delights",
    location: "Ratnagiri, Maharashtra",
    stock: 120,
    isNew: false,
    isFeatured: true,
    discount: 20,
    tags: ["seasonal", "premium"]
  },
  {
    id: 5,
    name: "Ripe Bananas",
    description: "Farm-fresh ripe bananas, perfect for smoothies",
    price: 40,
    originalPrice: 45,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop",
    category: "fruits",
    vendor: "Orchard Fresh",
    location: "Wayanad, Kerala",
    stock: 95,
    isNew: false,
    isFeatured: false,
    discount: 11,
    tags: ["ready-to-eat", "nutritious"]
  },
  {
    id: 6,
    name: "Bell Peppers Mix",
    description: "Colorful mix of red, yellow and green bell peppers",
    price: 60,
    originalPrice: 75,
    rating: 4.7,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=800&auto=format&fit=crop",
    category: "vegetables",
    vendor: "Rainbow Farms",
    location: "Shimla, Himachal Pradesh",
    stock: 34,
    isNew: true,
    isFeatured: true,
    discount: 20,
    tags: ["colorful", "fresh"]
  },
  {
    id: 7,
    name: "Fresh Apples",
    description: "Crisp and juicy apples from mountain orchards",
    price: 50,
    originalPrice: 60,
    rating: 4.9,
    reviews: 135,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=800&auto=format&fit=crop",
    category: "fruits",
    vendor: "Hill Country Orchards",
    location: "Kinnaur, Himachal Pradesh",
    stock: 76,
    isNew: false,
    isFeatured: true,
    discount: 16,
    tags: ["vitamin-rich", "highland-grown"]
  },
  {
    id: 8,
    name: "Organic Potatoes",
    description: "Organically grown potatoes, perfect for cooking",
    price: 30,
    originalPrice: 36,
    rating: 4.5,
    reviews: 68,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    category: "vegetables",
    vendor: "Earth Harvest",
    location: "Deesa, Gujarat",
    stock: 200,
    isNew: false,
    isFeatured: false,
    discount: 16,
    tags: ["organic", "versatile"]
  }
];

const FeaturedProducts = () => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleProducts, setVisibleProducts] = useState(featuredProducts);
  const [displayCount, setDisplayCount] = useState(4); // Initially show 4 products
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  useEffect(() => {
    let filtered = featuredProducts;
    
    // Apply category filter
    if (filter) {
      filtered = filtered.filter(product => product.category === filter);
    }
    
    // Apply sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      filtered = [...filtered].sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    } else {
      // Default: featured
      filtered = [...filtered].sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setVisibleProducts(filtered);
  }, [filter, sortBy, priceRange]);

  const addToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    // Find the product
    const product = featuredProducts.find(p => p.id === productId);
    
    toast({
      title: "Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const loadMore = () => {
    setDisplayCount(prev => 
      prev + 4 > visibleProducts.length ? visibleProducts.length : prev + 4
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-lg text-gray-600">
                Explore our best-selling farm-fresh products
              </p>
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
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === null ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter(null)}
                className={filter === null ? "bg-[#138808]" : ""}
              >
                All
              </Button>
              <Button 
                variant={filter === "vegetables" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("vegetables")}
                className={filter === "vegetables" ? "bg-[#138808]" : ""}
              >
                Vegetables
              </Button>
              <Button 
                variant={filter === "fruits" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("fruits")}
                className={filter === "fruits" ? "bg-[#138808]" : ""}
              >
                Fruits
              </Button>
              <Button 
                variant={filter === "grains" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("grains")}
                className={filter === "grains" ? "bg-[#138808]" : ""}
              >
                Grains
              </Button>
            </div>
            
            <div className="flex gap-2 items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-1"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="relative">
                <select 
                  className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <span>₹{priceRange[0]}</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-grow"
                    />
                    <span>₹{priceRange[1]}</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-grow"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Product Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="cursor-pointer">organic</Badge>
                    <Badge variant="outline" className="cursor-pointer">fresh</Badge>
                    <Badge variant="outline" className="cursor-pointer">local</Badge>
                    <Badge variant="outline" className="cursor-pointer">seasonal</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Vendors</h3>
                  <div className="flex flex-col gap-1 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Green Earth Farms
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Valley Fresh Produce
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Health Greens Co-op
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button size="sm" variant="outline" className="mr-2">Reset</Button>
                <Button size="sm" className="bg-[#138808]">Apply Filters</Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.slice(0, displayCount).map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/80 hover:bg-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <span className="flex items-center text-yellow-500 font-medium text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {product.rating} <span className="text-gray-400 ml-1">({product.reviews})</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-[#FF9933] text-lg">₹{product.price}</p>
                    {product.originalPrice > product.price && (
                      <p className="text-gray-400 line-through text-sm">₹{product.originalPrice}</p>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.vendor} • {product.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {product.stock > 50 ? "In Stock" : product.stock > 10 ? "Limited Stock" : "Low Stock"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white flex-1"
                  onClick={() => addToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link to={`/products/${product.id}`} className="ml-2">
                  <Button variant="ghost">
                    Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {displayCount < visibleProducts.length && (
          <div className="mt-10 text-center">
            <Button 
              onClick={loadMore} 
              variant="outline"
              className="mx-auto"
            >
              Load More Products
            </Button>
          </div>
        )}

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
