import type { BannerResponse } from "./banner.type";
import type { ProductResponse } from "./product.type";

export interface HomeDataResponse {
  banners: {
    hero: BannerResponse[];
    promo: BannerResponse[];
  };
  categories: {
    id: string;
    name: string;
    icon: string | null;
  }[];
  flashSaleProducts: ProductResponse[];
  bestSellerProducts: ProductResponse[];
  featuredProducts: {
    large: ProductResponse | null;
    wide: ProductResponse | null;
    smallLeft: ProductResponse | null;
    smallRight: ProductResponse | null;
  };
}
