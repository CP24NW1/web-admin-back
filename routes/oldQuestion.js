import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllSkill,
  getQuestionById,
  getQuestionsByType,
  updateQuestion,
} from "../controllers/oldQuestions.js";

const router = express.Router();

// QUESTION
router.post("/questions", getQuestionsByType);
router.post("/questions/create", createQuestion);
router.put("/questions", updateQuestion);
router.delete("/questions/:id", deleteQuestion);
router.get("/skills", getAllSkill);
router.get("/questions/:id", getQuestionById);

export default router;
