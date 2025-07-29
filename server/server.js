import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://mern-blog-app-git-main-ebrahims-projects-5ed3382f.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

await connectDB();

// middlewares
app.use(cors());
// midd for parsing json
app.use(express.json());

// test route
app.get("/", (req, res) => res.send("Api is working!"));
// admin route midd
app.use("/api/admin", adminRouter);

// blog routes midd
app.use("/api/blog", blogRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
