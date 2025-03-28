import express from "express";
import {
  createQuestion,
  editQuestion,
  enableDisableQuestion,
  getAllQuestion,
  getQuestionByID,
} from "../controllers/question.js";
import { auth, authorize } from "../middleware/auth.js";
import { roles } from "../utils/role.js";

const router = express.Router();

// QUESTION MANAGEMENT API

router.get("", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]), getAllQuestion);
router.get("/:question_id", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]),  getQuestionByID);
router.post("/create", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]), createQuestion);
router.put("/edit", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]), editQuestion);
router.put("/available/:question_id", auth, authorize([roles.ADMIN, roles.QUESTION_CREATOR]), enableDisableQuestion);

export default router;
