import express from "express";
import { login, refreshAccessToken } from "../controllers/auth.js";

const router = express.Router();

// AUTHENTICATION
// web admin ไม่มี register => create user
// router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

export default router;
