import express from "express";
import {
  createQuestion,
  editQuestion,
  enableDisableQuestion,
  getAllQuestion,
  getQuestionByID,
} from "../controllers/question.js";

const router = express.Router();

// QUESTION
router.post("", getAllQuestion);
router.get("/:question_id", getQuestionByID);
router.post("/create", createQuestion);
router.put("/edit", editQuestion);
router.put("/available", enableDisableQuestion);

export default router;
