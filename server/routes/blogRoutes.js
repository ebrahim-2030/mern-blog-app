import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComment,
  togglePublished,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/authMiddleware.js";

const blogRouter = express.Router();

// add blog route
blogRouter.post("/add", upload.single("image"), auth, addBlog);
// get all blog route
blogRouter.get("/all", getAllBlogs);
// get blog by id route
blogRouter.get("/:blogId", getBlogById);
// delete blog route
blogRouter.post("/delete", auth, deleteBlogById);
// toggle blog publish route
blogRouter.post("/toggle-publish", auth, togglePublished);

// add comment
blogRouter.post("/add-comment", addComment);
// get all comments route
blogRouter.post("/comments", getBlogComment);

export default blogRouter;
