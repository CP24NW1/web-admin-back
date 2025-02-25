import express from "express";
import { getAllSkill } from "../controllers/skill.js";

//middleware
import { auth } from "../middleware/auth.js";

const router = express.Router();

// SKILL
router.get("", auth, getAllSkill);

export default router;
