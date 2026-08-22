import api from "@/lib/axios";
import type {
  CreateProductInput,
  Product,
  ProductQuery,
  UpdateProductInput,
} from "../types/product.types";

export const productsApi = {
  getProducts: async (params?: ProductQuery): Promise<Product[]> => {
    const { data } = await api.get<{ success: boolean; data: Product[] }>(
      "/products",
      { params },
    );
    return data.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const { data } = await api.get<{ success: boolean; data: Product }>(
      `/products/${id}`,
    );
    return data.data;
  },

  createProduct: async (product: CreateProductInput): Promise<Product> => {
    const { data } = await api.post<{ success: boolean; data: Product }>(
      "/products",
      product,
    );
    return data.data;
  },

  updateProduct: async (
    id: string,
    product: UpdateProductInput,
  ): Promise<Product> => {
    const { data } = await api.patch<{ success: boolean; data: Product }>(
      `/products/${id}`,
      product,
    );
    return data.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};