import { getBannersService } from "./banner.service";
import { getCategoriesService } from "./category.service";
import { getProductsService } from "./product.service";

import type { HomeDataResponse } from "../types/home.type";

export const getHomeDataService = async (): Promise<HomeDataResponse> => {
  const [
    banners,
    categories,
    flashSaleProducts,
    bestSellingProducts,
    allProducts,
    largeSlotProducts,
    wideSlotProducts,
    smallLeftSlotProducts,
    smallRightSlotProducts,
  ] = await Promise.all([
    getBannersService({}),
    getCategoriesService(),
    getProductsService({ isFlashSale: true }),
    getProductsService({ isBestSeller: true }),
    getProductsService({}),
    getProductsService({ featuredSlot: "large" }),
    getProductsService({ featuredSlot: "wide" }),
    getProductsService({ featuredSlot: "smallLeft" }),
    getProductsService({ featuredSlot: "smallRight" }),
  ]);

  const promoBanners = banners.filter((banner) => banner.type === "promo");

  return {
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
    })),
    heroBanners: banners.filter((banner) => banner.type === "hero"),
    promoBanner: promoBanners[0] ?? null,
    flashSaleProducts,
    bestSellingProducts,
    allProducts,
    featured: {
      large: largeSlotProducts[0] ?? null,
      wide: wideSlotProducts[0] ?? null,
      smallLeft: smallLeftSlotProducts[0] ?? null,
      smallRight: smallRightSlotProducts[0] ?? null,
    },
  };
};
