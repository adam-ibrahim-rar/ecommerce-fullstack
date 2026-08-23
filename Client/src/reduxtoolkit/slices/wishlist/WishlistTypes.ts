export type WishlistItem = {
  id: string;
  productId: string;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  inStock: boolean;
};

export type Wishlist = {
  id: string;
  items: WishlistItem[];
};

export type WishlistState = {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
};
