import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.util";

export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("USER FROM TOKEN:", req.user); // ⬅️ ضيف السطر ده مؤقتًا

  if (req.user?.role !== "admin") {
    throw new AppError("You are not authorized to perform this action", 403);
  }

  next();
};