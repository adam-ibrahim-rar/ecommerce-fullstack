export type CartItem = {
  id: string;
  productId: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

export type CartState = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
};