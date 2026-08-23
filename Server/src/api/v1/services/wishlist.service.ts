import * as wishlistRepository from "../repositories/wishlist.repository";

import type {
  AddToWishlistInput,
  WishlistResponse,
} from "../types/wishlist.type";

import { AppError } from "../utils/app-error.util";

const formatWishlist = (wishlist: any): WishlistResponse => {
  return {
    id: wishlist.id,
    items: wishlist.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      image: item.product.images[0] ?? "",
      name: item.product.title,
      price: Number(item.product.price),

      ...(item.product.oldPrice !== null && {
        oldPrice: Number(item.product.oldPrice),
      }),

      ...(item.product.discount !== null && {
        discount: item.product.discount,
      }),

      rating: item.product.rating,
      reviews: item.product.reviews,
      inStock: item.product.inStock,
    })),
  };
};

export const getWishlistService = async (
  userId: string
): Promise<WishlistResponse> => {
  let wishlist = await wishlistRepository.findByUserId(userId);

  if (!wishlist) {
    wishlist = await wishlistRepository.create(userId);
  }

  return formatWishlist(wishlist);
};

export const addToWishlistService = async (
  userId: string,
  data: AddToWishlistInput
): Promise<WishlistResponse> => {
  let wishlist = await wishlistRepository.findByUserId(userId);

  if (!wishlist) {
    wishlist = await wishlistRepository.create(userId);
  }

  const existingItem = await wishlistRepository.findItemByProduct(
    userId,
    data.productId
  );

  if (!existingItem) {
    await wishlistRepository.addItem(wishlist.id, data.productId);
  }

  const updatedWishlist = await wishlistRepository.findByUserId(userId);

  return formatWishlist(updatedWishlist!);
};

export const deleteWishlistItemService = async (
  userId: string,
  itemId: string
) => {
  const item = await wishlistRepository.findItem(userId, itemId);

  if (!item) {
    throw new AppError("Wishlist item not found", 404);
  }

  await wishlistRepository.deleteItem(itemId);
};

export const clearWishlistService = async (userId: string) => {
  const wishlist = await wishlistRepository.findByUserId(userId);

  if (!wishlist) {
    return;
  }

  await wishlistRepository.clear(wishlist.id);
};
