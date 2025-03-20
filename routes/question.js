import express from "express";
import {
  createQuestion,
  editQuestion,
  enableDisableQuestion,
  getAllQuestion,
  getQuestionByID,
} from "../controllers/question.js";
import { auth, authorize } from "../middleware/auth.js";
import { permissions } from "../utils/permission.js";

const router = express.Router();

// QUESTION MANAGEMENT API
router.get("", auth, authorize(permissions.READ_QUESTION), getAllQuestion);
router.get("/:question_id", auth, authorize(permissions.READ_QUESTION),  getQuestionByID);
router.post("/create", auth, authorize(permissions.CREATE_QUESTION ), createQuestion);
router.put("/edit", auth, authorize(permissions.UPDATE_QUESTION), editQuestion);
router.put("/available/:question_id", auth, authorize(permissions.UPDATE_QUESTION), enableDisableQuestion);


// router.get("",  getAllQuestion);
// router.get("/:question_id",  getQuestionByID);
// router.post("/create",  createQuestion);
// router.put("/edit", editQuestion);
// router.put("/available/:question_id", enableDisableQuestion);
export default router;
