export interface AddToWishlistInput {
  productId: string;
}

export interface WishlistItemParams {
  id: string;
}

export interface WishlistItemResponse {
  id: string;
  productId: string;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface WishlistResponse {
  id: string;
  items: WishlistItemResponse[];
}
