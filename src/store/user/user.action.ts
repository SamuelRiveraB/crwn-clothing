import { User } from "firebase/auth";
import { IUser, USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user: User | null) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION, null);
};

export const googleSignInStart = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, null);
};

export const emailSignInStart = (email: string, password: string) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
  });
};

export const signInSuccess = (user: IUser) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
};

export const signInFailed = (error: Error) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
};

export const signUpStart = (
  email: string,
  password: string,
  displayName: string
) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });
};

export const signUpSuccess = (user: User, additionalDetails: object) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails,
  });
};

export const signUpFailed = (error: Error) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
};

export const signOutStart = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START, null);
};

export const signOutSuccess = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, null);
};

export const signOutFailed = (error: Error) => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
};
