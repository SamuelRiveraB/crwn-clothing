import { User } from "firebase/auth";

export interface UserState {
  currentUser: User | null;
}

interface SetCurrentUserAction {
  type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
  payload: User | null;
}

export type UserAction = SetCurrentUserAction;

export const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "user/SET_CURRENT_USER",
};
