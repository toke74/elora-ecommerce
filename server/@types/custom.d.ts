import { Request } from "express";
import { IUser } from "../model/user.model";

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
