import type { Request, Response } from "express";
import type {
  AddToWishlistInput,
  WishlistItemParams,
} from "../types/wishlist.type";

import {
  getWishlistService,
  addToWishlistService,
  deleteWishlistItemService,
  clearWishlistService,
} from "../services/wishlist.service";

export const getWishlist = async (req: Request, res: Response) => {
  const wishlist = await getWishlistService(req.user.id);

  return res.status(200).json({
    success: true,
    data: wishlist,
  });
};

export const addToWishlist = async (
  req: Request<{}, {}, AddToWishlistInput>,
  res: Response
) => {
  const wishlist = await addToWishlistService(req.user.id, req.body);

  return res.status(201).json({
    success: true,
    message: "Product added to wishlist",
    data: wishlist,
  });
};

export const deleteWishlistItem = async (
  req: Request<WishlistItemParams>,
  res: Response
) => {
  await deleteWishlistItemService(req.user.id, req.params.id);

  return res.status(204).send();
};

export const clearWishlist = async (req: Request, res: Response) => {
  await clearWishlistService(req.user.id);

  return res.status(204).send();
};
