import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../config/prisma"; // ✏️ عدّل المسار حسب مكان config/prisma عندك
import { AppError } from "../utils/app-error.util";

interface JwtPayload {
  userId: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      role: "admin" | "user";
    };
  }
}

export const authMiddleware = async (
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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Invalid token", 401);
  }
};