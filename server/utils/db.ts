import mongoose from "mongoose";
require("dotenv").config();

const { MONGODB_URI } = process.env;

const dbUrl: string = MONGODB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`MongoDB Database Connected with ${data.connection.host}
      `);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
