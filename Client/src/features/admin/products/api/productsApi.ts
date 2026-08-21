import axios from "axios";

import type {
  CreateProductInput,
  ProductDetailsResponse,
  ProductQuery,
  ProductResponse,
  UpdateProductInput,
} from "../types/product.types";
import api from "../../../../lib/axios";

export const productsApi = {
  getProducts: async (params?: ProductQuery): Promise<ProductResponse[]> => {
    const { data } = await api.get<ProductResponse[]>("products", {
      params,
    });

    return data;
  },

  getProduct: async (id: string): Promise<ProductDetailsResponse> => {
    const { data } = await api.get<ProductDetailsResponse>(`products/${id}`);

    return data;
  },

  createProduct: async (
    product: CreateProductInput,
  ): Promise<ProductDetailsResponse> => {
    const { data } = await api.post<ProductDetailsResponse>(
      "/products",
      product,
    );

    return data;
  },

  updateProduct: async (
    id: string,
    product: UpdateProductInput,
  ): Promise<ProductDetailsResponse> => {
    const { data } = await api.patch<ProductDetailsResponse>(
      `products/${id}`,
      product,
    );

    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`products/${id}`);
  },
};
