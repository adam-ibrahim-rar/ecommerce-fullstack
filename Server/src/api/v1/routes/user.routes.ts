import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller";

import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";

import {
  createUserSchema,
  updateUserSchema,
  userParamsSchema,
  type UserParams,
} from "../../../../schemas/user.schema";

const router = Router();

router.get(
  "/",
  asyncHandler(getUsers)
);

router.get<UserParams>(
  "/:id",
  validate(userParamsSchema, "params"),
  asyncHandler(getUser)
);

router.post(
  "/",
  validate(createUserSchema, "body"),
  asyncHandler(createUser)
);

router.patch<UserParams>(
  "/:id",
  validate(userParamsSchema, "params"),
  validate(updateUserSchema, "body"),
  asyncHandler(updateUser)
);

router.delete<UserParams>(
  "/:id",
  validate(userParamsSchema, "params"),
  asyncHandler(deleteUser)
);

export default router;