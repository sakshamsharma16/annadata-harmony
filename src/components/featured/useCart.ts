
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ProductType } from "./types";

export const useCart = (products: ProductType[]) => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    // Find the product
    const product = products.find(p => p.id === productId);
    
    toast({
      title: "Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return {
    cart,
    setCart,
    addToCart,
    getTotalItems,
  };
};
