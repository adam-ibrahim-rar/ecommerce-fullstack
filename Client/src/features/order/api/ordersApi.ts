import api from "@/lib/axios";

import type {
  CreateOrderInput,
  Order,
  OrderDetails,
  OrderQuery,
  OrderStats,
  OrderStatus,
} from "../types/order.types";

export const ordersApi = {
  createOrder: async (data: CreateOrderInput): Promise<Order> => {
    const { data: response } = await api.post("/orders", data);
    return response.data;
  },

  // ---------------------------------------------
  // User: أوردرز اليوزر الحالي (My Orders)
  // ---------------------------------------------
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await api.get("/orders");
    return data.data;
  },

  getMyOrder: async (id: string): Promise<OrderDetails> => {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },

  cancelMyOrder: async (id: string): Promise<Order> => {
    const { data } = await api.patch(`/orders/${id}/cancel`);
    return data.data;
  },

  // ---------------------------------------------
  // Admin
  // ---------------------------------------------
  getAdminOrders: async (query?: OrderQuery): Promise<Order[]> => {
    const { data } = await api.get("/orders/admin", {
      params: query,
    });
    return data.data;
  },

  getAdminOrder: async (id: string): Promise<OrderDetails> => {
    const { data } = await api.get(`/orders/admin/${id}`);
    return data.data;
  },

  getOrderStats: async (): Promise<OrderStats> => {
    const { data } = await api.get("/orders/admin/stats");
    return data.data;
  },

  updateOrderStatus: async (
    id: string,
    status: OrderStatus,
  ): Promise<Order> => {
    const { data } = await api.patch(`/orders/${id}/status`, {
      status,
    });
    return data.data;
  },
};
