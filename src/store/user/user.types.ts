import { User } from "firebase/auth";

export interface IUser {
  id: string;
}
export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: Error | null;
}

interface SetCurrentUserAction {
  type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
  payload: User | null;
}

export type UserAction = SetCurrentUserAction;

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "user/SET_CURRENT_USER",
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "user/SIGN_IN_FAILED",
  SIGN_UP_START: "user/SIGN_UP_START",
  SIGN_UP_SUCCESS: "user/SIGN_UP_SUCCESS",
  SIGN_UP_FAILED: "user/SIGN_UP_FAILED",
  SIGN_OUT_START: "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED: "user/SIGN_OUT_FAILED",
};
