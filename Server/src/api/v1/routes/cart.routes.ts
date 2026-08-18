import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controller/cart.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(getCart));

router.post("/items", asyncHandler(addToCart));

router.patch("/items/:id", asyncHandler(updateCartItem));

router.delete("/items/:id", asyncHandler(deleteCartItem));

router.delete("/", asyncHandler(clearCart));

export default router;