import { Router } from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProduct));

router.post("/", asyncHandler(createProduct));

router.patch("/:id", asyncHandler(updateProduct));

router.delete("/:id", asyncHandler(deleteProduct));

export default router;