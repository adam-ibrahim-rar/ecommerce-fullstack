export type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: color[];
  categoryId: string;
};

// الشكل اللي بيرجع في القوائم (list / related products)
export type ProductSummary = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  colors: color[];
};

type color = {
  name: string;
  value: string;
};