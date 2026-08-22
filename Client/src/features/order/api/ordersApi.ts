import api from "../../../lib/axios";

export interface CreateOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  items: CreateOrderItem[];
  paymentMethod: "CASH_ON_DELIVERY" | "BANK";
  totalAmount: number;
}

export const ordersApi = {
  createOrder: async (data: CreateOrderInput) => {
    const { data: response } = await api.post("/orders", data);
    return response;
  },

  getOrders: async () => {
    const { data: response } = await api.get("/orders");
    return response;
  },

  getOrder: async (id: string) => {
    const { data: response } = await api.get(`/orders/${id}`);
    return response;
  },

  cancelOrder: async (id: string) => {
    const { data: response } = await api.patch(`/orders/${id}/cancel`, {});
    return response;
  },
};