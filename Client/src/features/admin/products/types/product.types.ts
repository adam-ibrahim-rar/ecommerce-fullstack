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

export interface ProductResponse {
  id: string;

  image: string;

  title: string;

  price: number;

  oldPrice?: number;

  discount?: number;

  rating: number;

  reviews: number;

  colors: string[];
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

export interface ProductQuery {
  title?: string;

  categoryId?: string;
}
