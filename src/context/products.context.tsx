import { ReactNode, createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ProductContextType {
  products: Product[];
}

export const ProductsContext = createContext<ProductContextType>({
  products: [],
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
