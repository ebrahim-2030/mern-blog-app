import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

// test controller 
export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

// update user controller
export const updateUser = async (req, res, next) => {
  // check if the logged-in user is the owner of the account
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  // if password is being updated, validate and hash it
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 charecters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // if username is being updated, run multiple validations
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "username must be between 7 and 20 charecters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "username can't contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(400, "    username must in lowercase");
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username can only contains letters and numbers")
      );
    }
  }
  try {
    // update user with new data and return the updated document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    // remove password from the response
    const { password, ...rest } = updatedUser._doc;

    // send the updated user (without password) back to the client
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user controller
export const deleteUser = async (req, res, next) => {
  // check if the logged-in user is the owner of the account
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    // delete user from the database
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted successfully");
  } catch (err) {
    // handle and pass any errors to the error handler middleware
    next(err);
  }
};

// user signout controller
export const signout = (req, res, next) => {
  try {
     // clear the jwt cookie from the browser
    res.clearCookie("access_token").status(200).json("User has been signout");
  } catch (err) {
    // handle and pass any errors to the error handler middleware
    next(err);
  }
};
