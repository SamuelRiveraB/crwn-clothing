import { ReactNode, useReducer } from "react";
import { User } from "firebase/auth";
import { createContext, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

interface UserState {
  currentUser: User | null;
}

interface SetCurrentUserAction {
  type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
  payload: User | null;
}

type UserAction = SetCurrentUserAction;

export const UserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state: UserState, action: UserAction) => {
  console.log("userReducer called with action:", action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user: User | null) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
