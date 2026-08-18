import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error.util";

interface JwtPayload {
  userId: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
    };
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};