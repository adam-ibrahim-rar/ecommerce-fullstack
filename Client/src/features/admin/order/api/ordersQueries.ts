import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "./orderApi";
import type { Order, OrderQuery, OrderStatus } from "../types/order.types";

export const ordersKeys = {
  all: ["admin-orders"] as const,
  stats: ["admin-orders-stats"] as const,
  details: (id: string) => ["admin-orders", id] as const,
};

export const useAdminOrdersQuery = (query?: OrderQuery) => {
  return useQuery({
    queryKey: [...ordersKeys.all, query],
    queryFn: () => ordersApi.getAdminOrders(query),
  });
};

export const useAdminOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ordersKeys.details(id),
    queryFn: () => ordersApi.getAdminOrder(id),
    enabled: !!id,
  });
};

export const useOrderStatsQuery = () => {
  return useQuery({
    queryKey: ordersKeys.stats,
    queryFn: () => ordersApi.getOrderStats(),
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ordersKeys.all });

      const previousOrders = queryClient.getQueriesData<Order[]>({
        queryKey: ordersKeys.all,
      });

      queryClient.setQueriesData<Order[]>(
        { queryKey: ordersKeys.all },
        (old) =>
          old?.map((order) =>
            order.id === id ? { ...order, status } : order
          )
      );

      return { previousOrders };
    },

    onError: (_err, _vars, context) => {
      context?.previousOrders?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ordersKeys.all });
      queryClient.invalidateQueries({ queryKey: ordersKeys.stats });
    },
  });
};