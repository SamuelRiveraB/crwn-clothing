import {
  CART_ACTION_TYPES,
  CartAction,
  INITIAL_STATE,
} from "../cart/cart.types";

export const cartReducer = (state = INITIAL_STATE, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};
