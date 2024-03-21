import { Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
require("dotenv").config();

import ErrorHandler from "../utils/errorHandler";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { redis } from "../utils/redis";
import { IGetUserAuthInfoRequest } from "../@types/custom";
import { IUser } from "../model/user.model";

// @desc    Authenticate User middleware
// @access  Private
export const isAuthenticated = asyncErrorHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(new ErrorHandler("Unauthorized user, Please login. ", 401));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid ", 401));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found ", 400));
    }

    req.user = JSON.parse(user);

    next();
  }
);

// @desc    Validate  User Role Middleware
// @access  Private
export const authorizeRoles = (...roles: string[]) => {
  return (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as IUser;

    if (!roles.includes(role)) {
      return next(
        new ErrorHandler(
          `Role: ${role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
