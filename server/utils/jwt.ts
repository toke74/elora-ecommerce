import { Response } from "express";

import { IUser } from "../model/user.model";
import { redis } from "./redis";

require("dotenv").config();

interface ITokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

//parse environmental variables to integrates with fallback values
// const accessTokenExpire = parseInt(
//   process.env.ACCESS_TOKEN_EXPIRE || "300",
//   10
// );

// const refreshTokenExpire = parseInt(
//   process.env.REFRESH_TOKEN_EXPIRE || "1200",
//   10
// );

//Options for cookies for 5 Minutes
export const accessTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + 5 * 60 * 1000),
  maxAge: 5 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

//Options for cookies for 30 days
export const refreshTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //upload session to redis if user not exist
    if (!(await redis.get(user._id))) {
      await redis.set(user._id, JSON.stringify(user) as any);
    }

    //Only set secure to true in production for access token
    if (process.env.NODE_ENV === "production") {
      accessTokenOptions.secure = true;
    }

    //send cookie
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};
