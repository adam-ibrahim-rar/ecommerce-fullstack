// import type { RequestHandler } from "express";

// export const asyncHandler = (handler: RequestHandler): RequestHandler => {
//   return (req, res, next) => {
//     Promise.resolve(handler(req, res, next)).catch(next);
//   };
// };
// ثبل استخدام الكويري

// import type { RequestHandler } from "express";

// export const asyncHandler = <
//   P = {},
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = any
// >(
//   handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>
// ): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
//   return (req, res, next) => {
//     Promise.resolve(handler(req, res, next)).catch(next);
//   };
// };

import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

export const asyncHandler = <
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
>(
  handler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<any>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(
      handler(req, res, next)
    ).catch(next);
  };
};