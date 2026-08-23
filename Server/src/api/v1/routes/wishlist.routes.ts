import { Router } from "express";

import {
  getWishlist,
  addToWishlist,
  deleteWishlistItem,
  clearWishlist,
} from "../controller/wishlist.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
  addToWishlistSchema,
  wishlistItemParamsSchema,
} from "../../../schemas/wishlist.schema";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(getWishlist));

router.post(
  "/items",
  validate(addToWishlistSchema, "body"),
  asyncHandler(addToWishlist)
);

router.delete<{ id: string }>(
  "/items/:id",
  validate(wishlistItemParamsSchema, "params"),
  asyncHandler(deleteWishlistItem)
);

router.delete("/", asyncHandler(clearWishlist));

export default router;
