import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { cartApi, type AddToCartInput, type UpdateCartInput } from "./cartApi";

export const cartKeys = {
  all: ["cart"] as const,
};

export const useCartQuery = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => cartApi.getCart(),
  });
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddToCartInput) => cartApi.addToCart(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: string;
      data: UpdateCartInput;
    }) => cartApi.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartApi.deleteCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};