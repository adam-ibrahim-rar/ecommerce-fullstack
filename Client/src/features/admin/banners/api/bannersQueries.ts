import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bannersApi } from "./bannersApi";
import type {
  BannerQuery,
  CreateBannerInput,
  UpdateBannerInput,
} from "../types/banner.types";

export const bannerKeys = {
  all: ["banners"] as const,
  lists: () => [...bannerKeys.all, "list"] as const,
  list: (params?: BannerQuery) => [...bannerKeys.lists(), params] as const,
  details: () => [...bannerKeys.all, "detail"] as const,
  detail: (id: string) => [...bannerKeys.details(), id] as const,
};

export const useBannersQuery = (params?: BannerQuery) => {
  return useQuery({
    queryKey: bannerKeys.list(params),
    queryFn: () => bannersApi.getBanners(params),
  });
};

export const useBannerQuery = (id: string) => {
  return useQuery({
    queryKey: bannerKeys.detail(id),
    queryFn: () => bannersApi.getBanner(id),
    enabled: Boolean(id),
  });
};

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (banner: CreateBannerInput) => bannersApi.createBanner(banner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
    },
  });
};

export const useUpdateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, banner }: { id: string; banner: UpdateBannerInput }) =>
      bannersApi.updateBanner(id, banner),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bannerKeys.detail(variables.id) });
    },
  });
};

export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bannersApi.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
    },
  });
};