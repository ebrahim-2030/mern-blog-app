import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// middlewares
app.use(cors());
// midd for parsing json
app.use(express.json());

// test route
app.get("/", (req, res) => res.send("Api is working!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
