export interface CreateProductInput {
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
  categoryId: string;

  isFlashSale?: boolean;
  flashSaleEndsAt?: Date;
  isBestSeller?: boolean;
  featuredSlot?: "large" | "wide" | "smallLeft" | "smallRight" | null;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  images?: string[];
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  categoryId?: string;
  colors?: string[];
  sizes?: string[];

  isFlashSale?: boolean;
  flashSaleEndsAt?: Date;
  isBestSeller?: boolean;
  featuredSlot?: "large" | "wide" | "smallLeft" | "smallRight" | null;
}

export interface ProductQuery {
  title?: string;
  categoryId?: string;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  featuredSlot?: "large" | "wide" | "smallLeft" | "smallRight";
}

export interface ProductResponse {
  id: string;
  image: string;
  images: string[];
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  flashSaleEndsAt?: string;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  featuredSlot?: "large" | "wide" | "smallLeft" | "smallRight";
  category: {
    id: string;
    name: string;
  };
}

export interface ProductDetailsResponse {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  colors: string[];
  sizes: string[];
  description?: string;
  inStock: boolean;
}

export interface ProductParams {
  id: string;
}