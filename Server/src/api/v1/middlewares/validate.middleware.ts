import type {
  Request,
  Response,
  NextFunction,
} from "express";
import { ZodError, type ZodType } from "zod";
import { AppError } from "../utils/app-error.util";

export const validate = <
  P = Record<string, string>,
  ReqBody = any,
  ReqQuery = any
>(
  schema: ZodType,
  target: "body" | "params" | "query"
) => {
  return (
    req: Request<P, any, ReqBody, ReqQuery>,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError(
          error.issues
            .map((issue) => issue.message)
            .join(", "),
          400
        );
      }
      next(error);
    }
  };
};