import type { OrderStatus } from "../../../generated/prisma/client";

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}
export interface OrderParams {
  id: string;
}
