import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "./productsApi";

import type {
  CreateProductInput,
  ProductQuery,
  UpdateProductInput,
} from "../types/product.types";

// ----------------------------------------
// Query Keys
// ----------------------------------------

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (params?: ProductQuery) => [...productKeys.lists(), params] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (id: string) => [...productKeys.details(), id] as const,
};

// ----------------------------------------
// Get Products
// ----------------------------------------

export const useProductsQuery = (params?: ProductQuery) => {
  return useQuery({
    queryKey: productKeys.list(params),

    queryFn: () => productsApi.getProducts(params),
  });
};

// ----------------------------------------
// Get Product
// ----------------------------------------

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),

    queryFn: () => productsApi.getProduct(id),

    enabled: Boolean(id),
  });
};

// ----------------------------------------
// Create Product
// ----------------------------------------

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductInput) =>
      productsApi.createProduct(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};

// ----------------------------------------
// Update Product
// ----------------------------------------

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: UpdateProductInput;
    }) => productsApi.updateProduct(id, product),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      });
    },
  });
};

// ----------------------------------------
// Delete Product
// ----------------------------------------

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.details(),
      });
    },
  });
};
