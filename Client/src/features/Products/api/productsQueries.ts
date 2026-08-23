import { useQuery } from "@tanstack/react-query";
import { productsApi } from "./productsApi";
import type { Product, ProductSummary } from "../types/product.type";

// تفاصيل منتج واحد
export const useProductQuery = (id: string) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  });
};

// كل المنتجات (لما مفيش id) - ممكن تتفلتر بالكاتيجوري لو موجودة
export const useAllProductsQuery = (categoryId?: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: ["products", "all", categoryId ?? null],
    queryFn: () => productsApi.getAllProducts(categoryId),
  });
};

// منتجات مرتبطة
export const useRelatedProductsQuery = (categoryId?: string, excludeId?: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: ["products", "related", categoryId, excludeId],
    queryFn: () => productsApi.getRelatedProducts(categoryId!, excludeId!),
    enabled: !!categoryId && !!excludeId,
  });
};