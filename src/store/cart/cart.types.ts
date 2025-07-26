import { Product } from "../categories/category.types";

export interface ICartItem extends Product {
  quantity: number;
}

export interface CartState {
  isCartOpen: boolean;
  cartItems: ICartItem[];
}

export type CartAction =
  | {
      type: typeof CART_ACTION_TYPES.SET_CART_ITEMS;
      payload: {
        cartItems: ICartItem[];
        cartCount: number;
        cartTotal: number;
      };
    }
  | {
      type: typeof CART_ACTION_TYPES.SET_IS_CART_OPEN;
      payload: boolean;
    };

export const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "cart/SET_IS_CART_OPEN",
  SET_CART_ITEMS: "cart/SET_CART_ITEMS",
  SET_CART_COUNT: "cart/SET_CART_COUNT",
  SET_CART_TOTAL: "cart/SET_CART_TOTAL",
};
