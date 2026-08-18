import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error.util";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof AppError) {// معمول من الكلاس بتاعنا
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
// مش معمول من الكلاس بتاعنا ف اطبعه وقول انه من السيرفر حاجه منعرفهاش
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};