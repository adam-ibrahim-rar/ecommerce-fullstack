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
  colors?: {
    name?: string;
    value: string;
  }[];
  categoryId: string;
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
  colors?: {
    name?: string;
    value: string;
  }[];
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
  inStock: boolean;
  flashSaleEndsAt?: string;
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
  colors: {
    name?: string;
    value: string;
  }[];
  description?: string;
  inStock: boolean;
}

export interface ProductParams {
  id: string;
}