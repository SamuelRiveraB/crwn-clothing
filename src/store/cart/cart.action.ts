import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartState, ICartItem } from "./cart.types";

const addCartItem = (
  cartItems: ICartItem[],
  productToAdd: ICartItem
): ICartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: ICartItem[], productToRemove: ICartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (!existingCartItem || existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteItem = (cartItems: ICartItem[], productToDelete: ICartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);

export const setIsCartOpen = (isCartOpen: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const setCart = (cart: CartState) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cart);

export const addItemToCart = (cartItems: ICartItem[], product: ICartItem) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (
  cartItems: ICartItem[],
  product: ICartItem
) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (
  cartItems: ICartItem[],
  product: ICartItem
) => {
  const newCartItems = deleteItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
