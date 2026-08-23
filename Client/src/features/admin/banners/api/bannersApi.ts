import api from "@/lib/axios";
import type {
  Banner,
  BannerQuery,
  CreateBannerInput,
  UpdateBannerInput,
} from "../types/banner.types";

export const bannersApi = {
  getBanners: async (params?: BannerQuery): Promise<Banner[]> => {
    const { data } = await api.get<{ success: boolean; data: Banner[] }>(
      "/banners",
      { params },
    );
    return data.data;
  },

  getBanner: async (id: string): Promise<Banner> => {
    const { data } = await api.get<{ success: boolean; data: Banner }>(
      `/banners/${id}`,
    );
    return data.data;
  },

  createBanner: async (banner: CreateBannerInput): Promise<Banner> => {
    const { data } = await api.post<{ success: boolean; data: Banner }>(
      "/banners",
      banner,
    );
    return data.data;
  },

  updateBanner: async (
    id: string,
    banner: UpdateBannerInput,
  ): Promise<Banner> => {
    const { data } = await api.patch<{ success: boolean; data: Banner }>(
      `/banners/${id}`,
      banner,
    );
    return data.data;
  },

  deleteBanner: async (id: string): Promise<void> => {
    await api.delete(`/banners/${id}`);
  },
};