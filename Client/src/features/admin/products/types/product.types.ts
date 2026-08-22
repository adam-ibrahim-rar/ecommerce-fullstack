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
}

export interface ProductParams {
  id: string;
}

export interface ProductQuery {
  title?: string;
  categoryId?: string;
}