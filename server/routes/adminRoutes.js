import express from "express";
// import admin controller
import {
  adminLogin,
  approvedCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComment,
  getDashboard,
} from "../controllers/adminController.js";
import { auth } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// admin login route
adminRouter.post("/login", adminLogin);
// get all comments route
adminRouter.get("/comments", auth, getAllComment);
// get all blogs route
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
// delete comment route
adminRouter.post("/delete-comment", auth, deleteCommentById);
// approved comment route
adminRouter.post("/approve-comment", auth, approvedCommentById);
// get dashboard route
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
