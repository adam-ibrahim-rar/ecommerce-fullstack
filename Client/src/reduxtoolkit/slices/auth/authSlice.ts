import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  AuthState,
  User,
} from "./authTypes";

const savedAuth =
  localStorage.getItem("user");

const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
   setUser: (
  state,
  action: PayloadAction<User>
) => {
  state.user = action.payload;
  state.isAuthenticated = true;

  localStorage.setItem(
    "user",
    JSON.stringify({
      user: action.payload,
      isAuthenticated: true,
    })
  );
},

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
});

export const {
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;