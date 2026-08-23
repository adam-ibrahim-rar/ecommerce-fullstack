import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteUserById,
  loginUser,
  getMe,
  logoutUser,
  googleAuth,
} from "../controller/user.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";

import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  userParamsSchema,
  googleAuthSchema,
  type UserParams,
} from "../../../schemas/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/Admin.middleware";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.get("/me", authMiddleware, asyncHandler(getMe));

router.post("/", validate(createUserSchema, "body"), asyncHandler(createUser));

router.post(
  "/login",
  validate(loginUserSchema, "body"),
  asyncHandler(loginUser),
);

router.post(
  "/google",
  validate(googleAuthSchema, "body"),
  asyncHandler(googleAuth),
);

router.post("/logout", authMiddleware, asyncHandler(logoutUser));
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

router.delete<UserParams>("/me", authMiddleware, asyncHandler(deleteUser));
router.delete<UserParams>(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(userParamsSchema, "params"),
  asyncHandler(deleteUserById),
);

export default router;
