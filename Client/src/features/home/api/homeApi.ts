import api from "../../../lib/axios";
import type { Banner, Category, Product, FeaturedSlot, HomeData } from "../types/home";

export const homeApi = {
  // ريكوست واحد بيرجع كل داتا الهوم بيج مع بعض
  // (categories, banners, flash sale, best selling, all products, featured slots)
  // بدل 9-10 ريكوستات منفصلة. لازم الباك إند يعمل GET /home ويرجع الشكل ده:
  // { data: { categories, heroBanners, promoBanner, flashSaleProducts,
  //           bestSellingProducts, allProducts, featured: { large, wide, smallLeft, smallRight } } }
  async getHomeData(): Promise<HomeData> {
    const response = await api.get("/home");
    console.log(response.data.data);
    
    return response.data.data;
  },

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