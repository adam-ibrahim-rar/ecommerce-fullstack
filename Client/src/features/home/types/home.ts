export type Category = {
  id: string;
  name: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Banner = {
  id: string;
  type: "hero" | "promo";
  title: string;
  heading?: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
  endsAt?: string;
  order: number;
};

export type ProductColor = string;

export type Product = {
  id: string;
  image: string;
  images: string[];
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  colors: ProductColor[];
  inStock: boolean;
  flashSaleEndsAt?: string;
  category: {
    id: string;
    name: string;
  };
};

export type FeaturedSlot = "large" | "wide" | "smallLeft" | "smallRight";