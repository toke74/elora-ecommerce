import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

require("dotenv").config();
const { ORIGIN } = process.env;
export const app = express();

//passing bodyParser middleware
app.use(express.json({ limit: "50mb" }));

//cookie parser middleware
app.use(cookieParser());

//cors middleware
app.use(
  cors({
    origin: ORIGIN,
  })
);

//testing route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    success: true,
    message: "Test API is Working",
  });
});

//all Unknown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
