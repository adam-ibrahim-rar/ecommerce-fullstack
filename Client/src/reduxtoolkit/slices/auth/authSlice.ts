import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, User } from "./authTypes";
import api from "../../../lib/axios"; // ✏️ عدّل المسار حسب مكان الملف عندك لو مختلف

const savedAuth = localStorage.getItem("user");

const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      isAuthenticated: false,
    };

// =========================
// LOGOUT (thunk بيكلم الباك إند عشان يمسح الكوكي فعليًا)
// =========================

export const logoutThunk = createAsyncThunk(
  "auth/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/users/logout"); // ✏️ عدّل الـ path لو الـ prefix عندك مختلف
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload,
          isAuthenticated: true,
        }),
      );
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload,
        }),
      );
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    });

    // حتى لو الـ request فشل (نت مقطوع مثلاً)، تسجيل الخروج محليًا برضو أفضل من إنه يفضل شايف نفسه مسجل دخول
    builder.addCase(logoutThunk.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    });
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;