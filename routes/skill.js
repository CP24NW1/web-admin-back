import express from "express";
import { getAllSkill } from "../controllers/skill.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// SKILL API
router.get("", auth, getAllSkill);

export default router;
