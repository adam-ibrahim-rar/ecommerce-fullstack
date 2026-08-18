export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartInput {
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
export interface CartItemParams {
  id: string;
}

export interface CartResponse {
  id: string;
  items: CartItemResponse[];
}