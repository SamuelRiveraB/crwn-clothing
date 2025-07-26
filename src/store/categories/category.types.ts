import { DocumentData } from "firebase/firestore";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
}

export type CategoriesMap = {
  [category: string]: Product[];
};

export interface CategoryState {
  categories: DocumentData[];
}

interface setCategoriesMapAction {
  type: typeof CATEGORIES_ACTION_TYPES.SET_CATEGORIES;
  payload: CategoriesMap;
}

export type CategoryAction = setCategoriesMapAction;

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: "category/SET_CATEGORIES",
};
