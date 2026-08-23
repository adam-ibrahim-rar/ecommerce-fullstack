import api from "@/lib/axios";
import type { Product, ProductSummary } from "../types/product.type";

export const productsApi = {
  getProduct: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  getAllProducts: async (categoryId?: string): Promise<ProductSummary[]> => {
    const { data } = await api.get(`/products`, {
      params: categoryId ? { categoryId } : undefined,
    });
    return data.data;
  },

  getRelatedProducts: async (categoryId: string, excludeId: string): Promise<ProductSummary[]> => {
    const { data } = await api.get(`/products`, {
      params: { categoryId, exclude: excludeId, limit: 4 },
    });
    return data.data;
  },
};