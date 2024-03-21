import { NextFunction, Request, Response } from "express";

export const asyncErrorHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
//   Promise.resolve(theFunc(req, res, next)).catch(next);
// };
