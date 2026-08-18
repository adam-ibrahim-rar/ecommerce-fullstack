import type { Request, Response } from "express";
import type {
  AddToCartInput,
  UpdateCartInput,
  CartItemParams,
} from "../types/cart.type";

import {
  getCartService,
  addToCartService,
  updateCartItemService,
  deleteCartItemService,
  clearCartService,
} from "../services/cart.service";

export const getCart = async (
  req: Request,
  res: Response
) => {
  const cart = await getCartService(req.user.id);

  return res.status(200).json({
    success: true,
    data: cart,
  });
};

export const addToCart = async (
  req: Request<{}, {}, AddToCartInput>,
  res: Response
) => {
  const cart = await addToCartService(
    req.user.id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Product added to cart",
    data: cart,
  });
};

export const updateCartItem = async (
  req: Request<CartItemParams, {}, UpdateCartInput>,
  res: Response
) => {
  const cart = await updateCartItemService(
    req.user.id,
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    data: cart,
  });
};

export const deleteCartItem = async (
  req: Request<CartItemParams>,
  res: Response
) => {
  await deleteCartItemService(
    req.user.id,
    req.params.id
  );

  return res.status(204).send();
};

export const clearCart = async (
  req: Request,
  res: Response
) => {
  await clearCartService(req.user.id);

  return res.status(204).send();
};