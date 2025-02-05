import express from "express";
import {
  createOptions,
  createQuestion,
  editQuestion,
  getAllQuestion,
  getQuestionByID,
} from "../controllers/question.js";

const router = express.Router();

// QUESTION
router.get("/question", getAllQuestion);
router.get("/question/:question_id", getQuestionByID);
router.post("/question/create", createQuestion);
router.put("/question/edit", editQuestion);

//OPTION
router.post("/option/create", createOptions);

export default router;
