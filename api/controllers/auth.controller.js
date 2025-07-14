import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// error handler function
import { errorHandler } from "../utils/error.js";

// singup controller
export const signup = async (req, res, next) => {
  try {
    // extract data from request body
    const { username, email, password } = req.body;

    // check for empty fields
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "Plseas fill all fields"));
    }

    // validate email formate using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    // check if the username is already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(errorHandler(400, "username is aleardy taken"));
    }

    // check if the email is already exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(errorHandler(400, "Email is already exist"));
    }

    // validate password length
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be 6 charecters long"));
    }

    // generet salt and hash password securely
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user in database
    await newUser.save();

    // success respond
    res
      .status(201)
      .json({ success: true, message: "User Signed up successfully" });
  } catch (err) {
    // log the original error message for debugging
    console.log("Error in signup controller", err.message);

    // replace error message with a generic one for the client
    err.message = "Internal Server Error";

    // pass error to the next middleware
    next(err);
  }
};

// signin controller
export const signin = async (req, res, next) => {
  try {
    // extract data from request body
    const { email, password } = req.body;

    // check for empty fields
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fileds are required"));
    }

    // validate email formate using regex using
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    // validate user
    const valideUser = await User.findOne({ email });
    if (!valideUser) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    // validate user password
    const validePassword = bcryptjs.compareSync(password, valideUser.password);
    if (!validePassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // destructure password from user document and keep the rest of the fields
    const { password: pass, ...rest } = valideUser._doc;

    // create jwt token using user id and seceret key
    const token = jwt.sign({ id: valideUser._id }, process.env.JWT_SECERET);

    // success respond, send token as httponly and return user data
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    // log original error message for debuggin
    console.log("Error in singin controller", err.message);

    // replace error message with a generic one for the client
    err.message = "Internal Server Error";

    // pass error to the next middleware
    next(err);
  }
};

// google oauth controller for login or signup
export const google = async (req, res, next) => {
  try {
    // extract data from request body
    const { email, name, googlePhotoUrl } = req.body;

    // extract user data from request body
    const user = await User.findOne({ email });

    if (user) {
      // user exists: generate jwt token and send response
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECERET);
      const { password: pass, ...rest } = user._doc;

      // send user data without password
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest );
    } else {
      // generate random password for new user
      const generetedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // hash password with salt
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(generetedPassword, salt);

      // create user
      const newUser = new User({
        username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      
      // save user to database
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECERET);
      const { password: pass, ...rest } = newUser._doc;

      // send newUser data
      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    // log original error message for debuggin
    console.log("Error in google controller", err.message);

    // replace error message with a generic one for the client
    err.message = "Internal Server Error";

    // pass error to the next middleware
    next(err);
  }
};
