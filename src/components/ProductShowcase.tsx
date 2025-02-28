
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowRight, Star } from "lucide-react";

// Product data
const products = [
  {
    id: 1,
    name: "Premium Organic Rice",
    description: "Sustainably grown by local farmers using traditional methods",
    price: "₹120/kg",
    rating: 4.8,
    category: "grains",
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Fresh Seasonal Vegetables",
    description: "Farm-to-table vegetables harvested daily",
    price: "₹80/kg",
    rating: 4.7,
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Pure Honey",
    description: "Raw, unfiltered honey from forest beekeepers",
    price: "₹350/500g",
    rating: 5.0,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Artisanal Cheese",
    description: "Handcrafted cheese from grass-fed cows",
    price: "₹280/250g",
    rating: 4.6,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Organic Wheat Flour",
    description: "Stone-ground flour from heritage wheat varieties",
    price: "₹65/kg",
    rating: 4.5,
    category: "grains",
    image: "https://images.unsplash.com/photo-1568718247028-46f14cfb7533?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Fresh Fruit Basket",
    description: "Seasonal mixed fruits from local orchards",
    price: "₹250/basket",
    rating: 4.9,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Organic Pulses Mix",
    description: "Protein-rich mix of locally grown pulses",
    price: "₹180/kg",
    rating: 4.7,
    category: "grains",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe93e1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Farm-Fresh Eggs",
    description: "Free-range eggs from pasture-raised hens",
    price: "₹120/dozen",
    rating: 4.8,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1598965402089-897e8f3b4133?q=80&w=2069&auto=format&fit=crop",
  },
];

// Available categories for filtering
const categories = [
  { id: "all", label: "All Products" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains & Cereals" },
  { id: "dairy", label: "Dairy & Protein" },
];

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const productsRef = useRef<HTMLDivElement>(null);

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === activeCategory);
      setFilteredProducts(filtered);
    }

    // Add reveal animation to products after filtering
    const timer = setTimeout(() => {
      const productElements = productsRef.current?.querySelectorAll(".product-card");
      productElements?.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("active");
        }, index * 100);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal reveal-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600">
            Discover premium quality farm-fresh products directly from our network of farmers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-[#138808] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.id === "all" ? (
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  {category.label}
                </span>
              ) : (
                category.label
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="product-card opacity-0 transform translate-y-4 transition-all duration-500 overflow-hidden hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <span className="flex items-center text-yellow-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {product.rating}
                  </span>
                </div>
                <CardDescription className="text-sm">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-4">
                <p className="font-semibold text-[#FF9933]">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white group"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="mt-12 text-center">
          <Button className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
