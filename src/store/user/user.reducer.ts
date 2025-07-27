import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
