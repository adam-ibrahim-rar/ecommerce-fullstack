export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "BANK";

export interface OrderCustomer {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  itemsCount: number;
  createdAt: string;
  customer: OrderCustomer;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage?: string;
  quantity: number;
  price: number;
}

export interface OrderDetails extends Order {
  items: OrderItem[];
  updatedAt: string;
}

export interface OrderStats {
  total: number;
  revenue: number;
  byStatus: Record<OrderStatus, number>;
}

export interface OrderQuery {
  status?: OrderStatus;
  search?: string;
}