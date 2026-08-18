export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface OrderResponse {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItemResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}