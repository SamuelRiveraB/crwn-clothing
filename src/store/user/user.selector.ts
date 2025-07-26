import { UserState } from "./user.types";

export const selectCurrentUser = (state: { user: UserState }) =>
  state.user.currentUser;
