import { Router } from "express";

import {
  getOrders,
  getOrder,
  createOrder,
  // updateOrder,
  // deleteOrder,
} from "../controller/order.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getOrders));
router.get("/:id", asyncHandler(getOrder));

router.post("/", asyncHandler(createOrder));

// router.patch("/:id", asyncHandler(updateOrder));

// router.delete("/:id", asyncHandler(deleteOrder));

export default router;