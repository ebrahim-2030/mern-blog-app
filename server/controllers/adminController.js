import jwt from "jsonwebtoken";

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
    // send failure response, if admin credentials are invalid
    res.json({ success: false, message: err.message });
  }
};
