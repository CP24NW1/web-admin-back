import Joi from "joi";
import { pool } from "../db.js";
import {
  createNewExamQuery,
  deleteAllQuestionByExamIdQuery,
  deleteExamByIdQuery,
  editExamQuery,
  getExamAllQuery,
  getExamByPaginationQuery,
  getExamByTitleQuery,
  getExamCountsQeury,
  getExamTitleQuery,
  getQuestionCountsByPartQuery,
} from "../queries/examQuerie.js";

//-------------------
// GET EXAM ALL
//-------------------

export const getExamAll = async (req, res) => {
  const search_word = req.query.search_word || "";
  try {
    const [result] = await pool.query(getExamAllQuery, [search_word]);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-------------------
// GET EXAM PAGINATION
//-------------------

export const getExamPagination = async (req, res) => {
  const search_word = req?.query?.search_word || "";
  const page = req?.query?.page;
  const per_page = req?.query?.per_page;
  const offset = (page - 1) * per_page;

  try {
    if (search_word.length > 255) {
      return res.status(400).json({
        error: "Invalid Search Word",
        message: "Search word must not exceed 255 characters.",
      });
    }

    if (page < 1) {
      return res.status(400).json({
        error: "Invalid Page Number",
        message: "Page number must be a positive integer.",
      });
    }

    if (per_page < 1) {
      return res.status(400).json({
        error: "Invalid Per Page Value",
        message: "Per page value must be a positive integer.",
      });
    }

    const [result] = await pool.query(getExamByPaginationQuery, [
      search_word,
      +per_page,
      +offset,
    ]);

    const [totalPageData] = await pool.query(getExamCountsQeury);
    const totalPage = Math.ceil(totalPageData[0]?.["count(*)"] / per_page);

    if (result.length === 0) {
      res.status(404).json({
        error: "Not Found",
        message: "The requested resource could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    } else {
      return res.json({
        item: result,
        pagination: {
          page: Number(page),
          per_page: Number(per_page),
          totalPages: totalPage,
          totalItems: totalPageData?.[0]?.[`count(*)`],
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//-------------------
// GET PREVIEW EXAM
//-------------------

export const getExamPreview = async (req, res) => {
  const examId = req.params.id;

  try {
    if (!examId) {
      return res.status(404).json({
        error: "Not Found",
        message: `This exam could not be found.`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    const [result] = await pool.query(getQuestionCountsByPartQuery, [examId]);

    if (result?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `This exam could not be found.`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    } else {
      return res.send(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//-------------------
// DELETE EXAM
//-------------------

export const deleteExam = async (req, res) => {
  const examID = req.params.id;

  try {
    if (!examID) {
      return res.status(404).json({
        error: "Not Found",
        message: "The exam ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    const [exam] = await pool.query(getExamTitleQuery, [examID]);

    if (exam?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The exam ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    //Cascade DELETE
    await pool.query(deleteAllQuestionByExamIdQuery, [examID]);

    await pool.query(deleteExamByIdQuery, [examID]);

    res.status(200).send({
      success: true,
      message: "Exam deleted successfully",
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
// CREATE EXAM
//-------------------

export const createExam = async (req, res) => {
  // Validation Schema
  const schema = Joi.object({
    examID: Joi.number().optional(),
    userID: Joi.number().allow(null).optional(),
    examTitle: Joi.string().max(255).required(),
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

  const { examID, userID, examTitle } = value;

  try {
    // examID already exists
    if (examID) {
      const [existingExam] = await pool.query(getExamTitleQuery, [examID]);
      if (existingExam.length > 0) {
        return res.status(409).json({
          success: false,
          message: `Exam with ID ${examID} already exists.`,
        });
      }
    }

    const [result] = await pool.query(createNewExamQuery, [
      examID || null,
      userID || null,
      examTitle,
    ]);

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      examID: result.insertId,
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
// EDIT EXAM
//-------------------

export const editExam = async (req, res) => {
  // Validation Schema
  const schema = Joi.object({
    examID: Joi.number().required(),
    userID: Joi.number().allow(null).optional(),
    examTitle: Joi.string().max(255).required(),
  });

  // Validate input
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  const { examID, userID, examTitle } = value;

  try {
    const [result] = await pool.query(editExamQuery, [
      userID || null,
      examTitle,
      examID,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      updatedFields: {
        examID,
        userID,
        examTitle,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

//-------------------
// GET EXAM BY TITLE
//-------------------
export const getExamByTitle = async (req, res) => {
  const schema = Joi.object({
    examTitle: Joi.string().required().messages({
      "any.required": "The examTitle field is required.",
      "string.base": "The examTitle must be a string.",
    }),
  });

  // Validate
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid request body",
      details: error.details.map((detail) => detail.message),
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }

  const { examTitle } = value;

  try {
    const [result] = await pool.query(getExamByTitleQuery, [examTitle]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      error: error,
      details: error.message,
    });
  }
};
