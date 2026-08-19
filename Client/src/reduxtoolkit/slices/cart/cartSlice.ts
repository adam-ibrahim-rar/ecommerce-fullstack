import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type {
  Cart,
  CartState,
} from "./CartTypes";

import api from "../../../lib/axios";

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// =========================
// GET CART
// =========================

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");

      return response.data as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get cart"
      );
    }
  }
);

// =========================
// ADD TO CART
// =========================

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    {
      productId,
      quantity = 1,
    }: {
      productId: string;
      quantity?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/cart/items",
        {
          productId,
          quantity,
        }
      );

      return response.data as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  }
);

// =========================
// UPDATE CART ITEM
// =========================

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/cart/items/${itemId}`,
        {
          quantity,
        }
      );

      return response.data as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update cart item"
      );
    }
  }
);

// =========================
// DELETE CART ITEM
// =========================

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    itemId: string,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(
        `/cart/items/${itemId}`
      );

      return response.data as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete cart item"
      );
    }
  }
);

// =========================
// CLEAR CART
// =========================

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart");

      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  }
);

// =========================
// SLICE
// =========================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // GET CART
    // =========================

    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =========================
    // ADD TO CART
    // =========================

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =========================
    // UPDATE
    // =========================

    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        updateCartItem.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )

      .addCase(
        updateCartItem.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );

    // =========================
    // DELETE ITEM
    // =========================

    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deleteCartItem.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )

      .addCase(
        deleteCartItem.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );

    // =========================
    // CLEAR CART
    // =========================

    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;

        if (state.cart) {
          state.cart.items = [];
        }
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCartState } =
  cartSlice.actions;

export default cartSlice.reducer;