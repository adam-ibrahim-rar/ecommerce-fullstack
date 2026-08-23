import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ordersApi } from "./ordersApi";

type OrderQuery = Parameters<typeof ordersApi.getAdminOrders>[0];
type OrderStatus = Parameters<typeof ordersApi.updateOrderStatus>[1];
type Order = Awaited<ReturnType<typeof ordersApi.getAdminOrders>>[number];

export const orderKeys = {
  all: ["orders"] as const,

  lists: () => [...orderKeys.all, "list"] as const,

  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: Parameters<typeof ordersApi.createOrder>[0]) =>
      ordersApi.createOrder(data),
  });
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => ordersApi.getAdminOrders(),
  });
};

export const useOrderQuery = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getAdminOrder(id),
    enabled: !!id,
  });
};

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationFn: (id: string) => ordersApi.updateOrderStatus(id, "CANCELLED"),
  });
};

export const useAdminOrdersQuery = (query?: OrderQuery) => {
  return useQuery({
    queryKey: [...orderKeys.lists(), query],
    queryFn: () => ordersApi.getAdminOrders(query),
  });
};

export const useAdminOrderQuery = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getAdminOrder(id),
    enabled: !!id,
  });
};

export const useOrderStatsQuery = () => {
  return useQuery({
    queryKey: [...orderKeys.all, "stats"] as const,
    queryFn: () => ordersApi.getOrderStats(),
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: orderKeys.all });

      const previousOrders = queryClient.getQueriesData<Order[]>({
        queryKey: orderKeys.all,
      });

      queryClient.setQueriesData<Order[]>({ queryKey: orderKeys.all }, (old) =>
        old?.map((order) => (order.id === id ? { ...order, status } : order)),
      );

      return { previousOrders };
    },

    onError: (_err, _vars, context) => {
      context?.previousOrders?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: [...orderKeys.all, "stats"],
      });
    },
  });
};
