import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// get route for testing the connection or controller logic
router.get("/test", test);
// put route to update a user — protected with token verification
router.put("/update/:userId", verifyToken, updateUser);
// delete route to remove a user — protected with token verification
router.delete("/delete/:userId", verifyToken, deleteUser);
// signout router to logout a user
router.post("/signout", signout);
export default router;
