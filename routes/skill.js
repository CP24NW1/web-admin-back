import express from "express";
import { getAllSkill } from "../controllers/skill.js";
import {auth, authorize } from "../middleware/auth.js";
import { roles } from "../utils/role.js";

const router = express.Router();

// SKILL API
router.get("", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]), getAllSkill);

export default router;
