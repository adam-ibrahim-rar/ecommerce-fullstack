export type FeaturedSlot = "large" | "wide" | "smallLeft" | "smallRight";

export interface ProductColor {
  name?: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: ProductColor[];
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  // ✅ الحقول الجديدة
  isFlashSale: boolean;
  flashSaleEndsAt?: string;
  isBestSeller: boolean;
  featuredSlot?: FeaturedSlot | null;
}

export interface CreateProductInput {
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  inStock?: boolean;
  colors?: ProductColor[];
  categoryId: string;
  // ✅ الحقول الجديدة
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isBestSeller?: boolean;
  featuredSlot?: FeaturedSlot | null;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  images?: string[];
  inStock?: boolean;
  categoryId?: string;
  colors?: ProductColor[];
  // ✅ الحقول الجديدة
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isBestSeller?: boolean;
  featuredSlot?: FeaturedSlot | null;
}

export interface ProductParams {
  id: string;
}

export interface ProductQuery {
  title?: string;
  categoryId?: string;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  featuredSlot?: FeaturedSlot;
}