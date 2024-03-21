import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

// Create user route
userRouter.post("/register", registerUser);
//Activate user route
userRouter.post("/activate-user", activateUser);

//Login user route
userRouter.post("/login", loginUser);
export default userRouter;

//Logout user route
userRouter.get("/logout", isAuthenticated, logoutUser);
