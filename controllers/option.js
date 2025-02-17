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
  const schema = Joi.array()
    .items(
      Joi.object({
        question_id: Joi.number().integer().positive().required(),
        is_correct: Joi.boolean().required(),
        option_text: Joi.string().min(1).max(300).required(),
      })
    )
    .custom((value, helpers) => {
      // ตรวจสอบว่าใน array มีค่า is_correct ที่เป็น true เพียงแค่ตัวเดียว
      const correctOptions = value.filter(
        (option) => option.is_correct === true
      );
      if (correctOptions.filter((option) => option.is_correct).length === 0) {
        return helpers.message("There must be at least one correct answer");
      } else if (
        correctOptions.filter((option) => option.is_correct).length > 1
      ) {
        return helpers.message("There should only be one correct answer");
      }
      return value;
    }, "is_correct validation");

  // Validate ข้อมูลทั้งหมด
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationError = new Error("Validation Error");
    validationError.details = error.details.map((err) => err.message);
    validationError.status = 400; // กำหนดสถานะที่เหมาะสม
    throw validationError;
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

//-------------------
// EDIT OPTION
//-------------------

export const editOptions = async (req, res) => {
  const { question_id, options } = req.body;

  try {
    const [existingOptions] = await pool.query(getOptionsByQuestionIDQuery, [
      question_id,
    ]);

    const updates = [];

    options.forEach((newOption) => {
      if (existingOptions) {
        const isOptionChanged =
          existingOptions.option_text !== newOption.option_text ||
          existingOptions.is_correct !== newOption.is_correct;

        if (isOptionChanged) {
          updates.push({
            option_text: newOption.option_text,
            is_correct: newOption.is_correct,
          });
        }
      }
    });

    if (updates.length > 0) {
      await pool.query(deleteOptionsByQuestionIDQuery, [question_id]);

      const insertData = options.map(({ is_correct, option_text }) => [
        question_id,
        is_correct,
        option_text,
      ]);

      console.log(insertData);

      await pool.query(createMultipleOptionsQuery, [insertData]);

      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
