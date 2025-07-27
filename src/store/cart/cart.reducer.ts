import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  isCartOpen: boolean;
  cartItems: ICartItem[];
}

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

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen: (state: CartState, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    addItemToCart: (state: CartState, action: PayloadAction<ICartItem>) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (
      state: CartState,
      action: PayloadAction<ICartItem>
    ) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    deleteItemFromCart: (
      state: CartState,
      action: PayloadAction<ICartItem>
    ) => {
      state.cartItems = deleteItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
