import api from "../../../lib/axios";
import type { CartResponse } from "../types/cart.type";

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartInput {
  quantity: number;
}

export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    const { data } = await api.get("/cart");
    return data;
  },

  addToCart: async (input: AddToCartInput): Promise<CartResponse> => {
    const { data } = await api.post("/cart/items", input);
    return data;
  },

  updateCartItem: async (
    itemId: string,
    input: UpdateCartInput,
  ): Promise<CartResponse> => {
    const { data } = await api.patch(`/cart/items/${itemId}`, input);
    return data;
  },

  deleteCartItem: async (itemId: string): Promise<void> => {
    await api.delete(`/cart/items/${itemId}`);
  },

  clearCart: async (): Promise<void> => {
    await api.delete("/cart");
  },
};