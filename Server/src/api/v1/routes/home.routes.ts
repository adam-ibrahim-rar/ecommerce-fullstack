import { Router } from "express";

import { getHome } from "../controller/home.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getHome));

export default router;
