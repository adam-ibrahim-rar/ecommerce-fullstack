import { Router } from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";

import {
  getReviews,
  addReview,
} from "../controller/review.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createProductSchema,
  updateProductSchema,
  productParamsSchema,
} from "../../../schemas/product.schema";

import {
  createReviewSchema,
  reviewProductParamsSchema,
} from "../../../schemas/review.schema";

const router = Router();

router.get("/", asyncHandler(getProducts));

router.get<{ id: string }>(
  "/:id/reviews",
  validate(reviewProductParamsSchema, "params"),
  asyncHandler(getReviews),
);

router.post<{ id: string }>(
  "/:id/reviews",
  authMiddleware,
  validate(reviewProductParamsSchema, "params"),
  validate(createReviewSchema, "body"),
  asyncHandler(addReview),
);

router.get<{ id: string }>(
  "/:id",
  validate(productParamsSchema, "params"),
  asyncHandler(getProduct),
);

router.post(
  "/",
  validate(createProductSchema, "body"),
  asyncHandler(createProduct),
);

router.patch<{ id: string }>(
  "/:id",
  validate(productParamsSchema, "params"),
  validate(updateProductSchema, "body"),
  asyncHandler(updateProduct),
);

router.delete<{ id: string }>(
  "/:id",
  validate(productParamsSchema, "params"),
  asyncHandler(deleteProduct),
);

export default router;
