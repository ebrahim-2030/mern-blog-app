import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// middleware to verify jwt token from cookies
export const verifyToken = (req, res, next) => {
  // get token from cookies
  const token = req.cookies.access_token;

  // if no token, respond with unauthorized error
  if (!token) {
    return next(errorHandler(401, "unauthorized"));
  }

  // verify token using jwt and secret
  jwt.verify(token, process.env.JWT_SECERET, (err, user) => {
    // if token invalid or expired, respond unauthorized
    if (err) {
      return next(errorHandler(401, "unauthorized"));
    }
    // attach user info to request object
    req.user = user;
    // proceed to next middleware or route handler
    next();
  });
};
