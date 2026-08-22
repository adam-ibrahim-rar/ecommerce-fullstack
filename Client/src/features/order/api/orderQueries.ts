import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ordersApi,
  type CreateOrderInput,
} from "./ordersApi";

export const orderKeys = {
  all: ["orders"] as const,

  lists: () => [...orderKeys.all, "list"] as const,

  detail: (id: string) =>
    [...orderKeys.all, "detail", id] as const,
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: CreateOrderInput) =>
      ordersApi.createOrder(data),
  });
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => ordersApi.getOrders(),
  });
};

export const useOrderQuery = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getOrder(id),
    enabled: !!id,
  });
};

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationFn: (id: string) =>
      ordersApi.cancelOrder(id),
  });
};