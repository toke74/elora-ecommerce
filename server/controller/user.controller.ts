import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import User, { IUser } from "../model/user.model";
import ErrorHandler from "../utils/errorHandler";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { createActivationToken } from "../utils/generateTokens";
import sendEmail from "../utils/sendEmail";
import { sendToken } from "../utils/jwt";
import { IGetUserAuthInfoRequest } from "../@types/custom";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";

require("dotenv").config();

//register user Interface
interface IRegister {
  name: string;
  email: string;
  password: string;
  //   avatar?: string;
}
//Activate user interface
interface IActivateUser {
  activation_token: string;
  activation_code: string;
}

//Login user interface
interface ILoginUser {
  email: string;
  password: string;
}

//Social auth interface
interface ISocialAuth {
  email: string;
  name: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

// @desc    Register user
// @route   POST /api/v1/user/register
// @access  Public
export const registerUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //get user email, password and name for req.body
    const { name, email, password } = req.body as IRegister;

    //check if the use exist in database
    const isUserExist = await User.findOne({ email });

    //if it exist throw error back to user
    if (isUserExist) {
      return next(new ErrorHandler(`User already exists`, 400));
    }

    //if not exist save the user to database and send activation code to email
    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    //After user created  in DB,  send activation link to user email
    const activationToken = createActivationToken(user._id);
    const activationCode = activationToken.ActivationCode;
    const message = activationCode;
    const ejsUrl = `welcome.ejs`;

    try {
      //send activation code to user email
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message,
        name,
        ejsUrl,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account!`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// @desc    Activate user
// @route   POST /api/v1/user/activate-user
// @access  Public
export const activateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } = req.body as IActivateUser;

    //verify toke
    const decoded: any = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    );

    if (activation_code !== decoded.ActivationCode) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const isUserExist = await User.findOne({ _id: decoded.id });

    if (!isUserExist) {
      return next(new ErrorHandler("User not exist ", 400));
    }

    if (isUserExist.isVerified) {
      return next(
        new ErrorHandler("Your email is verified, Please login ", 400)
      );
    }

    const user = await User.findOneAndUpdate(
      { _id: decoded.id },
      { isVerified: true }
    );

    res.status(201).json({
      success: true,
    });
  }
);

// @desc    Login user
// @route   POST /api/v1/user/login
// @access  Public
export const loginUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILoginUser;

    //Validate email and password
    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide an email and password", 400)
      );
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }

    //Check if the user is verify their email
    if (!user.isVerified) {
      //If user not verified their email address,  Send activation link to the user
      const activationToken = createActivationToken(user._id);

      const activationCode = activationToken.ActivationCode;

      const name = user.name;

      const message = activationCode;
      const ejsUrl = `welcome.ejs`;

      try {
        //send activation code to user email
        await sendEmail({
          email: user.email,
          subject: "Activate your account",
          message,
          name,
          ejsUrl,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }

    //Check user password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }

    //import methods to generate access Token and refresh token
    sendToken(user, 200, res);
  }
);

// @desc    Logout user
// @route   GET /api/v1/user/logout
// @access  Public
export const logoutUser = asyncErrorHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    res.cookie("access_token", " ", { maxAge: 1 });
    res.cookie("refresh_token", " ", { maxAge: 1 });

    //delete user from redis
    const userId = req.user._id;
    redis.del(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
);

// @desc    Update Access Token
// @route   GET /api/v1/user/refreshToken
// @access  Public
export const updateAccessToken = asyncErrorHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token as string;

    const message = "Could not refresh token";

    if (!refresh_token) {
      return next(new ErrorHandler(message, 400));
    }

    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    req.user = user;

    //import methods to generate access Token and refresh token
    sendToken(user, 200, res);
  }
);

// @desc    Get User Info
// @route   GET /api/v1/user/user-info
// @access  Private
export const getUserInfo = asyncErrorHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    console.log(userId);
    getUserById(userId, res);
  }
);

// @desc    Social Auth
// @route   POST /api/v1/user/social-auth
// @access  Public
export const socialAuth = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar } = req.body as ISocialAuth;

    const user = await User.findOne({ email });

    if (!user) {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = await User.create({
        email,
        name,
        password: generatePassword,
        avatar,
        isVerified: true,
      });

      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  }
);
