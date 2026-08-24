import type { BannerResponse } from "./banner.type";
import type { ProductResponse } from "./product.type";

export interface HomeDataResponse {
  categories: {
    id: string;
    name: string;
    icon: string | null;
  }[];
  heroBanners: BannerResponse[];
  promoBanner: BannerResponse | null;
  flashSaleProducts: ProductResponse[];
  bestSellingProducts: ProductResponse[];
  allProducts: ProductResponse[];
  featured: {
    large: ProductResponse | null;
    wide: ProductResponse | null;
    smallLeft: ProductResponse | null;
    smallRight: ProductResponse | null;
  };
}
