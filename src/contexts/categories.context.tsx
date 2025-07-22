import { ReactNode, createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
}

export type CategoriesMap = {
  [category: string]: Product[];
};

interface CategoryContextType {
  categoriesMap: CategoriesMap;
}

export const CategoriesContext = createContext<CategoryContextType>({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    })();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
