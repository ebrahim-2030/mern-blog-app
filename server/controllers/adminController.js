import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
  // get admin credentials from request body
  const { email, password } = req.body;

  try {
    // check admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // send success response, if admin credentials are valid
    res.json({ success: true, token });
  } catch (err) {
    // send failure response, if admin credentials are invalid/any error
    res.json({ success: false, message: err.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    // get all blogs from db
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    // send success response, if all blogs are found successfully
    res.json({ success: true, blogs });
  } catch (err) {
    // send failure response, if all blogs are not found/any error
    res.json({ success: false, message: err.message });
  }
};

export const getAllComment = async (req, res) => {
  try {
    // get all comments from db
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    // send success response, if all comments are found successfully
    res.json({ success: true, comments });
  } catch (err) {
    // send failure response, if all comments are not found/any error
    res.json({ success: false, message: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    // get all comments from db
    const recentBlogs = await Blog.find({}).sort({ createdAt: true }).limit(5);

    // get all blogs count
    const blogs = await Blog.countDocuments({});

    // get all comments count
    const comments = await Comment.countDocuments({});

    // get all drafts blogs count
    const drafts = await Blog.countDocuments({ isPublished: false });

    // pack dashboard data
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };

    // send success response with dashboard data
    res.json({ success: true, dashboardData });
  } catch (err) {
    // send failure response, if there is no data/any error
    res.json({ success: false, message: err.message });
  }
};

export const deleteCommentById = async (req, res) => {
  const { id } = req.body;

  try {
    // delete comment by id from db
    await Comment.findByIdAndDelete(id);

    // send success response, if comment deleted successfully
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    // send failure response, if comment not deleted/any error
    res.json({ success: false, message: err.message });
  }
};

  export const approvedCommentById = async (req, res) => {
    const { id } = req.body;

    try {
      // update comment by id in db
      await Comment.findByIdAndUpdate(id, { isApproved: true });

      // send success response, if comment approved successfully
      res.json({ success: true, message: "Comment approved successfully" });
    } catch (err) {
      // send failure response, if comment not approved/any error
      res.json({ success: false, message: err.message });
    }
  };
