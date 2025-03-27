import Joi from "joi";
import { pool } from "../db.js";
import {
  checkQuestionAvailbleQuery,
  createQuestionQuery,
  editQuestionQuery,
  enableDisableQuestionQuery,
  getAllQuestionQuery,
  getImageByIDQuery,
  getQuestionByIDQuery,
  getSkillByIDQuery,
  getUserByIDQuery,
} from "../queries/questionQueries.js";
import { createOptions, editOptions } from "./option.js";

import jwt from "jsonwebtoken";
import { roles } from "../utils/role.js";
import { getUserRoleQuery } from "../queries/authQueries.js";
import { OptionDTO, QuestionDetailDTO, QuestionDTO } from "../dtos/question.js";

//-------------------
// GET ALL QUESTION
//-------------------

export const getAllQuestion = async (req, res) => {
  try {
    let {
      skill_id,
      start_date,
      end_date,
      page = "1",
      per_page = "10",
      search_filter,
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(per_page, 10);

    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user_id = decoded.user_id;

    let query = getAllQuestionQuery;

    let countQuery = `
      SELECT COUNT(*) AS total FROM question q
      JOIN user u ON q.user_id = u.user_id
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
    } else if (skill_id) {
      query += " AND q.skill_id = ?";
      countQuery += " AND q.skill_id = ?";
      queryParams.push(skill_id);
      countParams.push(skill_id);
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

    const [results] = await pool.query(getUserRoleQuery, [user_id]);
    const [userRole] = results.map((result) => result.role);

    if ([roles.QUESTION_CREATOR].includes(userRole)) {
      query += " AND q.user_id = ?";
      countQuery += " AND q.user_id = ?";
      queryParams.push(user_id);
      countParams.push(user_id);
    }

    if (search_filter) {
      search_filter = search_filter.trim();
      if (search_filter.length > 0) {
        const searchPlaceholder = `%${search_filter}%`;
        query += ` AND q.question_text LIKE ? OR CONCAT(u.firstname, " ", u.lastname) LIKE ?`;
        queryParams.push(searchPlaceholder, searchPlaceholder);
        countQuery += ` AND q.question_text LIKE ? OR CONCAT(u.firstname, " ", u.lastname) LIKE ?`;
        countParams.push(searchPlaceholder, searchPlaceholder);
      }
    }

    query += " ORDER BY q.create_at DESC";

    // คำนวณ OFFSET
    const offset = (pageNumber - 1) * perPageNumber;
    query += " LIMIT ? OFFSET ?";
    queryParams.push(perPageNumber, offset);

    // ดึงจำนวนทั้งหมดก่อน
    const [countResult] = await pool.query(countQuery, countParams);
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / perPageNumber);

    console.log(query);

    // ดึงข้อมูลตามหน้า
    const [result] = await pool.query(query, queryParams);

    const formattedQuestions = result.map((item) => new QuestionDTO(item));

    // ส่งข้อมูลที่ดึงมา
    res.json({
      totalPages,
      totalItems,
      page: pageNumber,
      per_page: perPageNumber,
      data: formattedQuestions,
    });
  } catch (error) {
    console.error(error);
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

    const skill = {
      skill_id: result[0].skill_id,
      skill_name: result[0].skill_name,
    };

    const options = result.map((option) => new OptionDTO(option));

    const questionDTO = new QuestionDetailDTO({
      question_id: result[0].question_id,
      question_text: result[0].question_text,
      skill,
      options,
      is_available: result[0].is_available,
      is_report: result[0].is_report,
    });

    res.json(questionDTO);
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
    question_text: Joi.string().min(5).max(300).required(),
    options: Joi.array()
      .items(
        Joi.object({
          is_correct: Joi.boolean().required(),
          option_text: Joi.string().min(1).max(300).required(),
        })
      )
      .min(2)
      .max(6)
      .required(),
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

  const { skill_id, image_id, question_text, options } = value;

  //get create_by user_id from token
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const user_id = decoded.user_id;

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
        if (!eval(key)) continue;

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

    const choiceOption = options?.map((opt) => ({
      ...opt,
      question_id,
    }));

    await createOptions({
      body: choiceOption,
    });

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
    options: Joi.array()
      .items(
        Joi.object({
          is_correct: Joi.boolean().required(),
          option_text: Joi.string().min(1).max(300).required(),
        })
      )
      .min(2)
      .max(6)
      .required(),
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

  //prettier-ignore
  const { question_id, skill_id, image_id, user_id, question_text, options } = value;

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
        if (!eval(key)) continue;

        const [result] = await pool.query(query, [eval(key)]);
        if (result.length === 0) {
          return res
            .status(404)
            .json({ error: `Invalid ${key}: Not found in database` });
        }
      }
    }

    await editOptions(req, res);

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
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

//-------------------
// ENABLE/DISABLE QUESTION
//-------------------

export const enableDisableQuestion = async (req, res) => {
  const { question_id } = req.params;

  try {
    const [rows] = await pool.query(checkQuestionAvailbleQuery, [question_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    const currentStatus = rows[0].is_available;
    const newStatus = !currentStatus;

    await pool.query(enableDisableQuestionQuery, [newStatus, question_id]);

    return res.status(200).json({
      message: `Question status updated to ${
        newStatus ? "enabled" : "disabled"
      }`,
      is_available: newStatus,
      question_id,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
