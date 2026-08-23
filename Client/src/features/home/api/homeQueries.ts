import { useQuery } from "@tanstack/react-query";
import { homeApi } from "./homeApi";
import type { FeaturedSlot } from "../types/home";

export function useCategoriesQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["categories"],
    queryFn: homeApi.getCategories,
  });

  return { data: data ?? [], ...rest };
}

export function useHeroBannersQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["heroBanners"],
    queryFn: homeApi.getHeroBanners,
  });

  return { data: data ?? [], ...rest };
}

export function usePromoBannerQuery() {
  return useQuery({
    queryKey: ["promoBanner"],
    queryFn: homeApi.getPromoBanner,
  });
}

export function useFlashSaleProductsQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["flashSaleProducts"],
    queryFn: homeApi.getFlashSaleProducts,
  });

  return { data: data ?? [], ...rest };
}

export function useBestSellingProductsQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["bestSellingProducts"],
    queryFn: homeApi.getBestSellingProducts,
  });

  return { data: data ?? [], ...rest };
}

export function useAllProductsQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["allProducts"],
    queryFn: homeApi.getAllProducts,
  });

  return { data: data ?? [], ...rest };
}

export function useFeaturedProductQuery(slot: FeaturedSlot) {
  return useQuery({
    queryKey: ["featuredProduct", slot],
    queryFn: () => homeApi.getFeaturedProduct(slot),
  });
}