import { createContext, ReactNode, useReducer } from "react";
import { Product } from "./categories.context";
import { createAction } from "../utils/reducer/reducer.utils";

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: ICartItem[];
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
  deleteItemFromCart: (product: Product) => void;
  cartCount: number;
  cartTotal: number;
}

export interface ICartItem extends Product {
  quantity: number;
}
interface CartState {
  isCartOpen: boolean;
  cartItems: ICartItem[];
  cartCount: number;
  cartTotal: number;
}

type CartAction =
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

const addCartItem = (
  cartItems: ICartItem[],
  productToAdd: Product
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

const removeCartItem = (cartItems: ICartItem[], productToRemove: Product) => {
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

const deleteItem = (cartItems: ICartItem[], productToDelete: Product) =>
  cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state: any, action: { type: any; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: any[]) => {
    const newCartCount = newCartItems.reduce(
      (cartTotal, cartItem) => cartTotal + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (product: Product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (product: Product) => {
    const newCartItems = deleteItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isOpen: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
