// ✏️ عدّل المسار ده حسب مكان axios instance عندك (زي اللي مستخدمينه في cartApi.ts / productsApi.ts)
import  api  from "../../..//../lib/axios";

import type {
  Order,
  OrderDetails,
  OrderQuery,
  OrderStats,
  OrderStatus,
} from "../types/order.types";

export const ordersApi = {
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
    status: OrderStatus
  ): Promise<Order> => {
    const { data } = await api.patch(`/orders/${id}/status`, {
      status,
    });
    return data.data;
  },
};