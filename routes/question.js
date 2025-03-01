import express from "express";
import {
  createQuestion,
  editQuestion,
  enableDisableQuestion,
  getAllQuestion,
  getQuestionByID,
} from "../controllers/question.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// QUESTION
//แก้ METHOD GET
router.get("", auth, getAllQuestion);
router.get("/:question_id", auth, getQuestionByID);
router.post("/create", auth, createQuestion);
router.put("/edit", auth, editQuestion);
//แก้ req.params
router.put("/available/:question_id", auth, enableDisableQuestion);

export default router;
