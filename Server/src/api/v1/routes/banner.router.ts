import { Router } from "express";

import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controller/banner.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getBanners));
router.post("/", asyncHandler(createBanner));
router.patch("/:id", asyncHandler(updateBanner));
router.delete("/:id", asyncHandler(deleteBanner));

export default router;