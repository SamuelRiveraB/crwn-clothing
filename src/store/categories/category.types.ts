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
  type: typeof CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS;
  payload: CategoriesMap;
}

export type CategoryAction = setCategoriesMapAction;

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const CATEGORIES_ACTION_TYPES = {
  FETCH_CATEGORIES_START: "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORIES_FAILED",
};
