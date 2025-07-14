import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

// signup route api
router.post("/signup", signup);
// siginin route api
router.post("/signin", signin);
// google route api
router.post("/google", google);

export default router;