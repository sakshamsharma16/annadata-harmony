
import { useState } from "react";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inCart: boolean;
}

export const useConsumerCart = (initialProducts: CartProduct[]) => {
  const [products, setProducts] = useState<CartProduct[]>(initialProducts);

  const getTotalCartItems = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalCartValue = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return {
    products,
    setProducts,
    getTotalCartItems,
    getTotalCartValue
  };
};
