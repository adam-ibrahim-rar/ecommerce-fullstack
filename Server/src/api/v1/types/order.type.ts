import type { OrderStatus, PaymentMethod } from "../../../generated/prisma/client";

// ملاحظة: CreateOrderInput و UpdateOrderStatusInput بييجوا من
// "../../../schemas/order.schema" (zod) مش من هنا — متضافهمش تاني هنا.

// ---------------------------------------------
// Query types
// ---------------------------------------------

export interface OrderQuery {
  status?: OrderStatus;
  search?: string; // بحث باسم/إيميل العميل أو رقم الأوردر
  userId?: string;
}

// ---------------------------------------------
// Response types
// ---------------------------------------------

export interface OrderItemResponse {
  id: string;
  productId: string;
  productTitle: string;
  productImage?: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  itemsCount: number;
  createdAt: Date;

  customer: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface OrderDetailsResponse extends OrderResponse {
  items: OrderItemResponse[];
  updatedAt: Date;
}