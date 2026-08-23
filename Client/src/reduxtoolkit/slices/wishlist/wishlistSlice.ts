import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Wishlist, WishlistState } from "./WishlistTypes";

import api from "../../../lib/axios";
import { logout } from "../auth/authSlice";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// =========================
// GET WISHLIST
// =========================

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist");

      return response.data.data as Wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get wishlist",
      );
    }
  },
);

// =========================
// ADD TO WISHLIST
// =========================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ productId }: { productId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/wishlist/items", { productId });

      return response.data.data as Wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist",
      );
    }
  },
);

// =========================
// DELETE WISHLIST ITEM
// =========================

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/wishlist/items/${itemId}`);

      return response.data.data as Wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove wishlist item",
      );
    }
  },
);

// =========================
// SLICE
// =========================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlistState: (state) => {
      state.wishlist = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // GET WISHLIST
    // =========================

    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =========================
    // ADD
    // =========================

    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =========================
    // DELETE ITEM
    // =========================

    builder
      .addCase(deleteWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(logout, (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
