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
import { roles } from "../utils/role.js";

const router = express.Router();

// USER MANAGEMENT API

router.get("/me", auth, fetchMe);
router.post("/create", auth, authorize(roles.ADMIN), createUser);
router.put("/:user_id/edit", auth, authorize(roles.ADMIN), editUser);
router.put("/:user_id/status", auth, authorize(roles.ADMIN), disableEnableUser);
router.get("", auth, authorize(roles.ADMIN), getAllUserPagination);
router.get("/:user_id", auth, authorize(roles.ADMIN), getUserDetail);
router.put("/verify", verifyEmail);
router.put("/password", setPassword);

export default router;
