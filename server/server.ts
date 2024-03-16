import { app } from "./app";
import connectDB from "./utils/db";

require("dotenv").config();
const port = process.env.PORT || 8000;

//create server
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
  connectDB(); // DB connection
});
