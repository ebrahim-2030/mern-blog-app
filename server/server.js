import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

await connectDB();

// middlewares
app.use(cors());
// midd for parsing json
app.use(express.json());

// test route
app.get("/", (req, res) => res.send("Api is working!"));
// admin route midd
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
