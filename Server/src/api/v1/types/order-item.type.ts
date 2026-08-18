export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}