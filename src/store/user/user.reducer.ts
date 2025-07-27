import {
  INITIAL_STATE,
  USER_ACTION_TYPES,
  UserAction,
  UserState,
} from "./user.types";

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserAction
) => {
  console.log("userReducer called with action:", action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
      };

    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
