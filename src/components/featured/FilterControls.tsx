
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface FilterControlsProps {
  filter: string | null;
  setFilter: (filter: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  showFilters: boolean;
  setShowFilters: (showFilters: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (priceRange: [number, number]) => void;
  totalCartItems: number;
}

const FilterControls = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  totalCartItems
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-lg text-gray-600">
            Explore our best-selling farm-fresh products
          </p>
        </div>
        {totalCartItems > 0 && (
          <Link to="/checkout">
            <Button className="bg-[#138808] hover:bg-[#138808]/90">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({totalCartItems})
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
  );
};

export default FilterControls;
