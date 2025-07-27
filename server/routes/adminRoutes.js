import express from "express";
// import admin controller
import { adminLogin } from "../controllers/adminController.js";

const adminRouter = express.Router();

// admin login route
adminRouter.post("/login", adminLogin);

export default adminRouter;