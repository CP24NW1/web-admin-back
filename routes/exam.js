import express from "express";
import {
  createExam,
  deleteExam,
  editExam,
  getExamAll,
  getExamByTitle,
  getExamPagination,
  getExamPreview,
} from "../controllers/exam.js";

const router = express.Router();

// EXAM
router.get("/exams", getExamAll);
router.get("/exams/pagination", getExamPagination);
router.get("/exams/preview/:id", getExamPreview);
router.delete("/exams/:id", deleteExam);
router.post("/exams", createExam);
router.put("/exams", editExam);
router.post("/exams/title", getExamByTitle);

export default router;
