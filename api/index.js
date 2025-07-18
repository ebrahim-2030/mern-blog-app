import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use(cookieParser())

app.listen(3000, () => {
  console.log(`Server is running on port 3000!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


// error handler middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
