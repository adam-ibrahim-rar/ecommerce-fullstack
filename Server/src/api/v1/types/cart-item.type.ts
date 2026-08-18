export interface CreateCartItemInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  productId: string;
  quantity: number;
}