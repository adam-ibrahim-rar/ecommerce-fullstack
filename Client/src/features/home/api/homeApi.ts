import api from "../../../lib/axios";
import type { Banner, Category, Product, FeaturedSlot } from "../types/home";

export const homeApi = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");
    return response.data.data;
  },

  async getHeroBanners(): Promise<Banner[]> {
    const response = await api.get("/banners", {
      params: { type: "hero" },
    });
    return response.data.data;
  },

  async getPromoBanner(): Promise<Banner | undefined> {
    const response = await api.get("/banners", {
      params: { type: "promo" },
    });
    return response.data.data[0] ?? null;
  },

  async getFlashSaleProducts(): Promise<Product[]> {
    const response = await api.get("/products", {
      params: { isFlashSale: true },
    });
    return response.data.data;
  },

  async getBestSellingProducts(): Promise<Product[]> {
    const response = await api.get("/products", {
      params: { isBestSeller: true },
    });
    return response.data.data;
  },

  async getAllProducts(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data.data;
  },

  async getFeaturedProduct(slot: FeaturedSlot): Promise<Product | undefined> {
    const response = await api.get("/products", {
      params: { featuredSlot: slot },
    });
    return response.data.data[0] ?? null;
  },
};