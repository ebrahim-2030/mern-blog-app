import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    // extract data from request body
    const { username, email, password } = req.body;

    // validate email formate using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check if the username is already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username is already taken" });
    }

    // check if the email is already exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already exist" });
    }

    // validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6 charecters long" });
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
    res.status(201).json({success: true, message: "User Signed up successfully"});
  } catch (err) {
    console.log("Error in signum controller", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
