import express from "express";
import {
  createUser,
  disableEnableUser,
  editUser,
  fetchMe,
  getAllUserPagination,
  getUserDetail,
  setPassword,
  verifyEmail,
} from "../controllers/user.js";
import { auth, authorize } from "../middleware/auth.js";
import { permissions } from "../utils/permission.js";

const router = express.Router();

// USER MANAGEMENT API
router.get("/me", auth, authorize(permissions.READ_PROFILE_WEB_ADMIN), fetchMe);
router.post("/create", auth, authorize(permissions.CREATE_USER), createUser);
router.put("/:user_id/edit", auth, authorize(permissions.UPDATE_USER), editUser);
router.put("/:user_id/status", auth, authorize(permissions.UPDATE_USER), disableEnableUser);
router.get("", auth, authorize(permissions.READ_USER), getAllUserPagination);
router.get("/:user_id", auth, authorize(permissions.READ_USER), getUserDetail);
router.put("/verify", verifyEmail);
router.put("/password", setPassword);

export default router;
