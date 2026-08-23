import { Router } from "express";

import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getAdminOrders,
  getAdminOrder,
  getOrderStats,
} from "../controller/order.controller";

import { asyncHandler } from "../utils/asyncHandler";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/Admin.middleware";

const router = Router();

/*
 * Admin routes
 * ⚠️ لازم تتحط قبل "/:id" عشان "/admin/stats" متتفسرش كـ order id
 */

router.get(
  "/admin/stats",
  authMiddleware,
  adminMiddleware,
  asyncHandler(getOrderStats),
);

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  asyncHandler(getAdminOrders),
);

router.get(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(getAdminOrder),
);

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  asyncHandler(updateOrderStatus),
);

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

export default router;