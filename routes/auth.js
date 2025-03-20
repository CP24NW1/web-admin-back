import express from "express";
import { checkAccessToken, login, refreshAccessToken } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// AUTHENTICATION
// web admin ไม่มี register => create user
// router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.get("/protected-route", auth, checkAccessToken)

export default router;
