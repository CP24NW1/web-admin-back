import express from "express";
import { createUser } from "../controllers/user.js";

const router = express.Router();

// USER MANAGEMENT API
router.post("/create", createUser);

export default router;
