import Joi from "joi";
import { pool } from "../db.js";
import {
  createQuestionQuery,
  editQuestionQuery,
  getAllQuestionQuery,
  getImageByIDQuery,
  getQuestionByIDQuery,
  getSkillByIDQuery,
  getUserByIDQuery,
} from "../queries/questionQueries.js";

//-------------------
// GET ALL QUESTION
//-------------------

export const getAllQuestion = async (req, res) => {
  try {
    // prettier-ignore
    const { skill_id, start_date, end_date, page = 1, per_page = 10 } = req.body;

    let query = getAllQuestionQuery;

    let countQuery = `
    SELECT COUNT(*) AS total FROM question q
    LEFT JOIN skill s ON q.skill_id = s.skill_id
    WHERE 1=1`;

    let queryParams = [];
    let countParams = [];

    // กรอง skill_id หลายค่า
    if (Array.isArray(skill_id) && skill_id.length > 0) {
      const placeholders = skill_id.map(() => "?").join(",");
      query += ` AND q.skill_id IN (${placeholders})`;
      countQuery += ` AND q.skill_id IN (${placeholders})`;
      queryParams.push(...skill_id);
      countParams.push(...skill_id);
    }

    if (start_date) {
      query += " AND DATE(q.create_at) >= ?";
      countQuery += " AND DATE(q.create_at) >= ?";
      queryParams.push(start_date);
      countParams.push(start_date);
    }
    if (end_date) {
      query += " AND DATE(q.create_at) <= ?";
      countQuery += " AND DATE(q.create_at) <= ?";
      queryParams.push(end_date);
      countParams.push(end_date);
    }

    // คำนวณ OFFSET
    const offset = (page - 1) * per_page;
    query += " LIMIT ? OFFSET ?";
    queryParams.push(parseInt(per_page), parseInt(offset));

    // ดึงจำนวนทั้งหมดก่อน
    const [countResult] = await pool.query(countQuery, countParams);
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / per_page);

    // ดึงข้อมูลตามหน้า
    const [result] = await pool.query(query, queryParams);

    console.log(countResult);

    // ส่งข้อมูลที่ดึงมา
    res.json({
      totalPages,
      totalItems,
      page: parseInt(page),
      per_page: parseInt(per_page),
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-------------------
// GET QUESTION BY ID
//-------------------

export const getQuestionByID = async (req, res) => {
  const question_id = req.params.question_id;
  try {
    if (
      question_id === null ||
      question_id === undefined ||
      !question_id.match(/-?\b\d+\b/g)
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: !question_id.match(/-?\b\d+\b/g)
          ? "question_id must be a number"
          : "question_id cannot be null or undefined",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }
    const [result] = await pool.query(getQuestionByIDQuery, [question_id]);

    if (result?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The question ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    res.json({
      question: result[0].question_text,
      skill: {
        skill_id: result[0].skill_id,
        skill_name: result[0].skill_name,
      },
      options: result.map((option) => ({
        option_id: option.option_id,
        option_text: option.option_text,
        is_correct: option.is_correct,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-------------------
// CREATE QUESTION
//-------------------

export const createQuestion = async (req, res) => {
  const schema = Joi.object({
    skill_id: Joi.number().integer().positive().allow(null),
    image_id: Joi.number().integer().positive().allow(null),
    user_id: Joi.number().integer().positive().allow(null),
    question_text: Joi.string().min(5).max(300).required(),
  });

  // Validate
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  const { skill_id, image_id, user_id, question_text } = value;

  try {
    //skill_id not exist
    //image_id not exist
    //user_id not exist

    if (skill_id || image_id || user_id) {
      const queries = {
        skill_id: getSkillByIDQuery,
        image_id: getImageByIDQuery,
        user_id: getUserByIDQuery,
      };

      for (const [key, query] of Object.entries(queries)) {
        if (!eval(key)) continue; // ข้ามถ้า key นั้นไม่มีค่า (null หรือ undefined)

        const [result] = await pool.query(query, [eval(key)]);
        if (result.length === 0) {
          return res
            .status(404)
            .json({ error: `Invalid ${key}: Not found in database` });
        }
      }
    }

    const [result] = await pool.query(createQuestionQuery, [
      skill_id || null,
      image_id || null,
      user_id || null,
      question_text,
    ]);

    const question_id = result.insertId;

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question_id: question_id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message,
    });
  }
};

//-------------------
// EDIT QUESTION
//-------------------

export const editQuestion = async (req, res) => {
  const schema = Joi.object({
    question_id: Joi.number().integer().positive().required(),
    skill_id: Joi.number().integer().positive().allow(null),
    image_id: Joi.number().integer().positive().allow(null),
    user_id: Joi.number().integer().positive().allow(null),
    question_text: Joi.string().min(5).max(300).required(),
  });

  // Validate
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  const { question_id, skill_id, image_id, user_id, question_text } = value;

  try {
    //skill_id not exist
    //image_id not exist
    //user_id not exist

    if (question_id || skill_id || image_id || user_id) {
      const queries = {
        question_id: getQuestionByIDQuery,
        skill_id: getSkillByIDQuery,
        image_id: getImageByIDQuery,
        user_id: getUserByIDQuery,
      };

      for (const [key, query] of Object.entries(queries)) {
        if (!eval(key)) continue; // ข้ามถ้า key นั้นไม่มีค่า (null หรือ undefined)

        const [result] = await pool.query(query, [eval(key)]);
        if (result.length === 0) {
          return res
            .status(404)
            .json({ error: `Invalid ${key}: Not found in database` });
        }
      }
    }

    const [result] = await pool.query(editQuestionQuery, [
      skill_id || null,
      image_id || null,
      user_id || null,
      question_text,
      question_id,
    ]);

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      updatedFields: {
        skill_id,
        image_id,
        user_id,
        question_text,
        question_id,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message,
    });
  }
};
