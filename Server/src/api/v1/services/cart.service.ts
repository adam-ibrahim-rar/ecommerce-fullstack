import * as cartRepository from "../repositories/cart.repository";

import type {
  AddToCartInput,
  UpdateCartInput,
  CartResponse,
} from "../types/cart.type";

import { AppError } from "../utils/app-error.util";

const formatCart = (cart: any): CartResponse => {
  return {
    id: cart.id,
    items: cart.items.map((item: any) => ({
      id: item.id,
      image: item.product.images[0],
      name: item.product.title,
      price: Number(item.product.price),
      quantity: item.quantity,
    })),
  };
};

export const getCartService = async (
  userId: string
): Promise<CartResponse> => {
  let cart = await cartRepository.findByUserId(userId);

  if (!cart) {
    cart = await cartRepository.create(userId);
  }

  return formatCart(cart);
};

export const addToCartService = async (
  userId: string,
  data: AddToCartInput
): Promise<CartResponse> => {
  let cart = await cartRepository.findByUserId(userId);

  if (!cart) {
    cart = await cartRepository.create(userId);
  }

  const existingItem =
    await cartRepository.findItemByProduct(
      userId,
      data.productId
    );

  if (existingItem) {
    await cartRepository.updateItem(
      existingItem.id,
      existingItem.quantity + data.quantity
    );
  } else {
    await cartRepository.addItem(
      cart.id,
      data.productId,
      data.quantity
    );
  }

  const updatedCart =
    await cartRepository.findByUserId(userId);

  return formatCart(updatedCart!);
};

export const updateCartItemService = async (
  userId: string,
  itemId: string,
  data: UpdateCartInput
): Promise<CartResponse> => {
  const item = await cartRepository.findItem(
    userId,
    itemId
  );

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  await cartRepository.updateItem(
    itemId,
    data.quantity
  );

  const cart =
    await cartRepository.findByUserId(userId);

  return formatCart(cart!);
};

export const deleteCartItemService = async (
  userId: string,
  itemId: string
) => {
  const item = await cartRepository.findItem(
    userId,
    itemId
  );

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  await cartRepository.deleteItem(itemId);
};

export const clearCartService = async (
  userId: string
) => {
  const cart =
    await cartRepository.findByUserId(userId);

  if (!cart) {
    return;
  }

  await cartRepository.clear(cart.id);
};