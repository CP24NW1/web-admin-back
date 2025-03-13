import express from "express";
import {
  getAllPermission,
  grantPermissionToUser,
} from "../controllers/permission.js";

import { auth, authorize } from "../middleware/auth.js";
import { permissions } from "../utils/permission.js";

const router = express.Router();

// PERMISSIONAPI
router.get("", auth, authorize(permissions.READ_PERMISSION), getAllPermission);
router.post("/grant", auth, authorize(permissions.GRANT_PERMISSION), grantPermissionToUser);

export default router;
