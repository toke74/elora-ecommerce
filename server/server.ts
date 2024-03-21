import { v2 as cloudinary } from "cloudinary";

import { app } from "./app";
import connectDB from "./utils/db";

require("dotenv").config();
const port = process.env.PORT || 8000;

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create server
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
  connectDB(); // DB connection
});
