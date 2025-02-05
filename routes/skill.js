import express from "express";
import { getAllSkill } from "../controllers/skill.js";

const router = express.Router();

// SKILL
router.get("", getAllSkill);

export default router;
