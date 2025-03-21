import express from "express";
import { getAllRole, grantRoleToUser } from "../controllers/role.js";
import { auth, authorize } from "../middleware/auth.js";
import { roles } from "../utils/role.js";

const router = express.Router();

router.get("", auth, authorize(roles.ADMIN), getAllRole)
router.put("/grant", auth, authorize(roles.ADMIN), grantRoleToUser)

export default router;
