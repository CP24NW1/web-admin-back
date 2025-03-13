import express from "express";
import { getAllSkill } from "../controllers/skill.js";
import { auth, authorize } from "../middleware/auth.js";
import { permissions } from "../utils/permission.js";

const router = express.Router();

// SKILL API
router.get("", auth, authorize(permissions.READ_SKILL), getAllSkill);

export default router;
