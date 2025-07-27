import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.log("FAILED TO CONNECT TO DATABASE", err.message);
    // exit if DB connection fail
    process.exit(1);
  }
};

export default connectDB;