import express from "express";
import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublished,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/authMiddleware.js";

const blogRouter = express.Router();

// add blog route
blogRouter.post("/add", upload.single("image"), auth, addBlog);
// fetch all blog route
blogRouter.get("/all", getAllBlogs);
// fetch blog by id route
blogRouter.get("/:blogId", getBlogById);
// delete blog route
blogRouter.post("/delete", auth, deleteBlogById);
// toggle blog publish
blogRouter.post("/toggle-publish", auth, togglePublished);

export default blogRouter;
