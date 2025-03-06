import express from "express";
import {
  createUser,
  disableEnableUser,
  editUser,
  setPassword,
  verifyEmail,
} from "../controllers/user.js";

const router = express.Router();

// USER MANAGEMENT API
router.post("/create", createUser);
router.put("/:user_id/edit", editUser);
router.put("/:user_id/status", disableEnableUser);
router.put("/verify", verifyEmail);
router.put("/password", setPassword);

export default router;
