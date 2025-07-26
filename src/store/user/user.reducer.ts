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
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
