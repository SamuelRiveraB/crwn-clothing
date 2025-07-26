import { Product } from "../categories/category.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export interface ICartItem extends Product {
  quantity: number;
}

export interface CartState {
  isCartOpen: boolean;
  cartItems: ICartItem[];
}

export type CartAction =
  | ReturnType<typeof setCartItems>
  | ReturnType<typeof setIsCartOpen>;

export const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "cart/SET_IS_CART_OPEN",
  SET_CART_ITEMS: "cart/SET_CART_ITEMS",
};
