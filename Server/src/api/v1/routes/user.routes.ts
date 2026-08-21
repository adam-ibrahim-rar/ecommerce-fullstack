import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,

} from "../controller/user.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";

import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  userParamsSchema,
  type UserParams,
} from "../../../schemas/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.get("/me", authMiddleware,asyncHandler(getMe));

router.post(
  "/",
  validate(createUserSchema, "body"),
  asyncHandler(createUser),
);

router.post(
  "/login",
  validate(loginUserSchema, "body"),
  asyncHandler(loginUser),
);

router.get<UserParams>(
  "/:id",
  validate(userParamsSchema, "params"),
  asyncHandler(getUser),
);

router.patch(
  "/me",
  authMiddleware,
  validate(updateUserSchema, "body"),
  asyncHandler(updateUser),
);

router.delete<UserParams>(
  "/me",
  authMiddleware,
  asyncHandler(deleteUser),
);

export default router;