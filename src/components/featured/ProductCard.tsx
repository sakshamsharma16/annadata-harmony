
import { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Eye, Tag, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductType } from "./types";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: ProductType;
  addToCart: (productId: number) => void;
}

// Use memo to prevent unnecessary re-renders
const ProductCard = memo(({ product, addToCart }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card key={product.id} className="overflow-hidden transition-all group hover:shadow-xl border border-gray-100">
        <div className="relative h-52 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-end gap-2">
              <motion.button 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <Heart className="h-4 w-4 text-rose-500" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
            <span className="flex items-center text-yellow-500 font-medium text-sm bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-current mr-1" />
              {product.rating}
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col space-y-2">
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-[#138808] text-lg">₹{product.price}</p>
              {product.originalPrice > product.price && (
                <p className="text-gray-400 line-through text-sm">₹{product.originalPrice}</p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs text-gray-500">
                <Tag className="w-3 h-3 mr-1" />
                <span className="truncate max-w-[100px]">{product.vendor}</span>
              </div>
              <div className="flex items-center text-xs">
                <Clock className="w-3 h-3 mr-1" />
                <span className={`${
                  product.stock > 50 
                    ? "text-green-500" 
                    : product.stock > 10 
                    ? "text-amber-500" 
                    : "text-red-500"
                }`}>
                  {product.stock > 50 
                    ? "In Stock" 
                    : product.stock > 10 
                    ? "Limited" 
                    : "Low Stock"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2 flex gap-2">
          <Button
            variant="outline"
            className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white flex-1 flex items-center justify-center"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="secondary" className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
