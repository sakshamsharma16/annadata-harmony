
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductType } from "./types";

interface ProductGridProps {
  visibleProducts: ProductType[];
  displayCount: number;
  addToCart: (productId: number) => void;
  loadMore: () => void;
}

const ProductGrid = ({ 
  visibleProducts, 
  displayCount, 
  addToCart, 
  loadMore 
}: ProductGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.slice(0, displayCount).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
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
    </>
  );
};

export default ProductGrid;
