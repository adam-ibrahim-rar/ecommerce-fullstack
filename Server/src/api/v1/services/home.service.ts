import { getBannersService } from "./banner.service";
import { getCategoriesService } from "./category.service";
import { getProductsService } from "./product.service";

import type { HomeDataResponse } from "../types/home.type";

export const getHomeDataService = async (): Promise<HomeDataResponse> => {
  const [
    banners,
    categories,
    flashSaleProducts,
    bestSellerProducts,
    largeSlotProducts,
    wideSlotProducts,
    smallLeftSlotProducts,
    smallRightSlotProducts,
  ] = await Promise.all([
    getBannersService({}),
    getCategoriesService(),
    getProductsService({ isFlashSale: true }),
    getProductsService({ isBestSeller: true }),
    getProductsService({ featuredSlot: "large" }),
    getProductsService({ featuredSlot: "wide" }),
    getProductsService({ featuredSlot: "smallLeft" }),
    getProductsService({ featuredSlot: "smallRight" }),
  ]);

  return {
    banners: {
      hero: banners.filter((banner) => banner.type === "hero"),
      promo: banners.filter((banner) => banner.type === "promo"),
    },
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
    })),
    flashSaleProducts,
    bestSellerProducts,
    featuredProducts: {
      large: largeSlotProducts[0] ?? null,
      wide: wideSlotProducts[0] ?? null,
      smallLeft: smallLeftSlotProducts[0] ?? null,
      smallRight: smallRightSlotProducts[0] ?? null,
    },
  };
};
