import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import fs from "fs";
import Comment from "../models/Comment.js";
import main from "../configs/gemeni.js";

// controller for adding blog
export const addBlog = async (req, res) => {
  // destructuring blog data
  const { title, subTitle, description, category, isPublished } = JSON.parse(
    req.body.blog
  );
  const imageFile = req.file;
  try {
    // check if all required fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // read image file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimize image through imagekit url transformation
    const optimizeImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to webp format
        { width: "1280" }, // with resizing
      ],
    });

    // store image url
    const image = optimizeImageUrl;

    // create blog
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    // send success response, if blog is created successfully
    res.json({ success: true, message: "Blog added successfully" });
  } catch (err) {
    // send failure response, if blog creation fails
    res.json({ success: false, message: err.message });
  }
};

// controller for fetching blogs
export const getAllBlogs = async (req, res) => {
  try {
    // find all published blogs
    const blogs = await Blog.find({ isPublished: true });

    // send success response, if blogs are found
    res.json({ success: true, blogs });
  } catch (err) {
    // send failure response, if blog is not found / any error

    res.json({ success: false, message: err.message });
  }
};

// controller for fetching blog by id
export const getBlogById = async (req, res) => {
  // destructuring blog id
  const { blogId } = req.params;

  try {
    // find the blog by id
    const blog = await Blog.findById(blogId);

    // send failure response, if blog not found
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    // send success response, if blog is found
    res.json({ success: true, blog });
  } catch (err) {
    // send failure response, if blog is not found / any error
    res.json({ success: false, message: err.message });
  }
};

// controller for deleting a blog
export const deleteBlogById = async (req, res) => {
  const { blogId } = req.body;

  try {
    // delete blog by id from database
    await Blog.findByIdAndDelete(blogId);

    // delete all commnets associated with the blog
    await Comment.deleteMany({ blog: blogId });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    // send failure response if blog is not found/any error
    res.json({ sucess: false, message: err.message });
  }
};
export const togglePublished = async (req, res) => {
  const { blogId } = req.body;
  try {
    // find the blog in database by id
    const blog = await Blog.findById(blogId);

    // toggle blog status
    blog.isPublished = !blog.isPublished;

    // save the blog
    await blog.save();

    // send success response if, blog updated successfully
    res.json({ success: true, message: "Blog status updated successfully" });
  } catch (err) {
    // send failure response if blog is not updated / any error
    res.json({ sucess: false, message: err.message });
  }
};

export const addComment = async (req, res) => {
  // destructuring comment data
  const { blog, name, content } = req.body;
  try {
    // create & store a comment
    await Comment.create({ blog, name, content });

    // send success response if comment added successfully
    res.json({ success: true, message: "Comment added for review" });
  } catch (err) {
    // send failure response if comment is not added / any error
    res.json({ sucess: false, message: err.message });
  }
};

export const getBlogComment = async (req, res) => {
  // destructuring blog id
  const { blogId } = req.body;

  try {
    // fetch comments
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 }); // sort comments by createdAt in descending order

    // send success response if comments are found successfully
    res.json({ success: true, comments });
  } catch (err) {
    // send failure response if comments are not found / any error
    res.json({ success: false, message: err.message });
  }
};

export const generateContent = async (req, res) => {
  const { prompt } = req.body;

  try {
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );

    res.json({ success: true, content });
  } catch (err) {
    // send failure response if content is not generated / any error
    res.json({ success: false, message: err.message });
  }
};
