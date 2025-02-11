//-------------------
// CREATE OPTION
//-------------------

import Joi from "joi";
import { pool } from "../db.js";
import { getQuestionsByIDsQuery } from "../queries/questionQueries.js";
import {
  createMultipleOptionsQuery,
  deleteOptionsByQuestionIDQuery,
  getOptionsByQuestionIDQuery,
} from "../queries/optionQueries.js";

export const createOptions = async (req, res) => {
  const schema = Joi.array().items(
    Joi.object({
      question_id: Joi.number().integer().positive().required(),
      is_correct: Joi.boolean().required(),
      option_text: Joi.string().min(1).max(300).required(),
    })
  );

  // Validate ข้อมูลทั้งหมด
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  try {
    const questionIds = [...new Set(value.map((opt) => opt.question_id))];
    const [existQuestions] = await pool.query(getQuestionsByIDsQuery, [
      questionIds,
    ]);

    const existingQuestionIds = new Set(
      existQuestions.map((q) => q.question_id)
    );

    const invalidQuestions = questionIds.filter(
      (qId) => !existingQuestionIds.has(qId)
    );

    if (invalidQuestions.length > 0) {
      return res.status(404).json({
        success: false,
        error: "Invalid question_id(s): Not found in database",
        details: invalidQuestions,
      });
    }

    const insertData = value.map(({ question_id, is_correct, option_text }) => [
      question_id,
      is_correct,
      option_text,
    ]);

    await pool.query(createMultipleOptionsQuery, [insertData]);
  } catch (error) {
    console.log(error);
  }
};

export const editOptions = async (req, res) => {
  const { question_id, options } = req.body;

  try {
    // ดึงข้อมูล options ที่มีอยู่ในฐานข้อมูล
    const [existingOptions] = await pool.query(getOptionsByQuestionIDQuery, [
      question_id,
    ]);

    const existingOptionTexts = existingOptions.map(
      (option) => option.option_text
    );
    const newOptionTexts = options.map((option) => option.option_text);

    // เปรียบเทียบ options ใหม่กับของเก่า
    if (
      JSON.stringify(existingOptionTexts) !== JSON.stringify(newOptionTexts)
    ) {
      // ลบ options เก่าทั้งหมด
      await pool.query(deleteOptionsByQuestionIDQuery, [question_id]);

      // เพิ่ม options ใหม่
      const insertData = options.map(({ is_correct, option_text }) => [
        question_id,
        is_correct,
        option_text,
      ]);
      await pool.query(createMultipleOptionsQuery, [insertData]);

      return true; // ถ้ามีการเปลี่ยนแปลง options
    }

    return false; // ถ้า options ไม่มีการเปลี่ยนแปลง
  } catch (error) {
    console.log(error);
  }
};
