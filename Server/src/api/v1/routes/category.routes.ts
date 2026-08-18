import { Router } from "express";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getCategories));
router.get("/:id", asyncHandler(getCategory));

router.post("/", asyncHandler(createCategory));

router.patch("/:id", asyncHandler(updateCategory));

router.delete("/:id", asyncHandler(deleteCategory));

export default router;