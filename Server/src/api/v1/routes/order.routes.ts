import { Router } from "express";

import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controller/order.controller";

import { asyncHandler } from "../utils/asyncHandler";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/*
 * User routes
 */

router.get(
  "/",
  authMiddleware,
  asyncHandler(getOrders),
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(getOrder),
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(createOrder),
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  asyncHandler(cancelOrder),
);

/*
 * Admin route
 *
 * هنا بعدين نحط adminMiddleware
 */

router.patch(
  "/:id/status",
  authMiddleware,
  asyncHandler(updateOrderStatus),
);

export default router;