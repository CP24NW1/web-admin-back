import Joi from "joi";
import { pool } from "../db.js";
import {
  createNewQuestionQuery,
  deleteQuestionByIdQuery,
  getAllSkillQuery,
  getQuestionByIdQuery,
  getQuestionByTypeQuery,
  getQuestionTypeByIdQuery,
} from "../queries/oldQuestionQueries.js";
import { getExamTitleQuery } from "../queries/examQuerie.js";

//-------------------
// GET QUESTION BY QUESTION TYPE
//-------------------

export const getQuestionsByType = async (req, res) => {
  const schema = Joi.object({
    examID: Joi.number().required().messages({
      "any.required": "The examID field is required.",
      "number.base": "The examID must be a number.",
    }),
    typeID: Joi.number().required().messages({
      "any.required": "The typeID field is required.",
      "number.base": "The typeID must be a number.",
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

  const { examID, typeID } = value;

  try {
    const [exam] = await pool.query(getExamTitleQuery, [examID]);
    const [qt] = await pool.query(getQuestionTypeByIdQuery, [typeID]);

    if (qt?.length === 0 || exam?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `${
          qt?.length === 0 ? "typeID" : "examID"
        } could not be found.`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    const [result] = await pool.query(getQuestionByTypeQuery, [examID, typeID]);
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      error: error,
      details: error.message,
    });
  }
};

//-------------------
// CREATE QUESTIONS
//-------------------

export const checkExistence = async (table, column, value) => {
  const [result] = await pool.query(
    `SELECT 1 FROM ${table} WHERE ${column} = ?`,
    [value]
  );
  return result.length > 0;
};

export const createQuestion = async (req, res) => {
  const schema = Joi.object({
    examID: Joi.number().required(),
    typeID: Joi.number().required(),
    skillID: Joi.number().required(),
    questionTexts: Joi.string().required(),
    choiceA: Joi.string().required(),
    choiceB: Joi.string().required(),
    choiceC: Joi.string().required(),
    choiceD: Joi.string().required(),
    answer: Joi.string().valid("A", "B", "C", "D").required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  const {
    examID,
    typeID,
    skillID,
    questionTexts,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    answer,
  } = value;

  try {
    const checkExistence = async (table, column, value) => {
      const [result] = await pool.query(
        `SELECT 1 FROM ${table} WHERE ${column} = ?`,
        [value]
      );
      return result.length > 0;
    };

    const checks = [
      { table: "exam", column: "examID", value: examID, name: "Exam ID" },
      {
        table: "questiontype",
        column: "typeID",
        value: typeID,
        name: "Type ID",
      },
      { table: "skill", column: "skillID", value: skillID, name: "Skill ID" },
    ];

    for (const check of checks) {
      if (!(await checkExistence(check.table, check.column, check.value))) {
        return res.status(404).json({
          success: false,
          message: `${check.name} ${check.value} does not exist.`,
        });
      }
    }

    const [result] = await pool.query(createNewQuestionQuery, [
      examID,
      typeID,
      skillID,
      questionTexts,
      choiceA,
      choiceB,
      choiceC,
      choiceD,
      answer,
    ]);

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      questionID: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create question",
      details: error.message,
    });
  }
};

//-------------------
// UPDATE QUESTIONS
//-------------------

export const updateQuestion = async (req, res) => {
  const schema = Joi.object({
    questionID: Joi.number().required(),
    examID: Joi.number().optional(),
    typeID: Joi.number().optional(),
    skillID: Joi.number().optional(),
    questionTexts: Joi.string().optional(),
    choiceA: Joi.string().optional(),
    choiceB: Joi.string().optional(),
    choiceC: Joi.string().optional(),
    choiceD: Joi.string().optional(),
    answer: Joi.string().valid("A", "B", "C", "D").optional(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  const {
    questionID,
    examID,
    typeID,
    skillID,
    questionTexts,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    answer,
  } = value;

  try {
    const fieldsToUpdate = {
      examID,
      typeID,
      skillID,
      questionTexts,
      choiceA,
      choiceB,
      choiceC,
      choiceD,
      answer,
    };

    const updates = Object.entries(fieldsToUpdate)
      .filter(([_, value]) => value !== undefined)
      .map(([field, _]) => `${field} = ?`);

    const values = Object.values(fieldsToUpdate).filter(
      (value) => value !== undefined
    );

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update.",
      });
    }

    // question exists
    const [questionExists] = await pool.query(getQuestionByIdQuery, [
      questionID,
    ]);

    if (questionExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Question ID ${questionID} does not exist.`,
      });
    }

    const checks = [
      { table: "exam", column: "examID", value: examID, name: "Exam ID" },
      {
        table: "questiontype",
        column: "typeID",
        value: typeID,
        name: "Type ID",
      },
      { table: "skill", column: "skillID", value: skillID, name: "Skill ID" },
    ];

    for (const check of checks) {
      if (check.value !== undefined) {
        const exists = await checkExistence(
          check.table,
          check.column,
          check.value
        );
        if (!exists) {
          return res.status(404).json({
            success: false,
            message: `${check.name} ${check.value} does not exist.`,
          });
        }
      }
    }

    // update query
    values.push(questionID);
    const updateQuery = `
      UPDATE question
      SET ${updates.join(", ")}
      WHERE questionID = ?
    `;
    await pool.query(updateQuery, values);

    res.status(200).json({
      success: true,
      message: "Question updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      details: error.message,
    });
  }
};

//-------------------
// DELETE QUESTIONS
//-------------------

export const deleteQuestion = async (req, res) => {
  const questionID = req.params.id;

  try {
    if (!questionID) {
      return res.status(404).json({
        error: "Not Found",
        message: "The question ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    const [question] = await pool.query(getQuestionByIdQuery, [questionID]);

    if (question?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The question ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    await pool.query(deleteQuestionByIdQuery, [questionID]);

    res.status(200).send({
      success: true,
      message: "Question deleted successfully",
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
// SKILL LIST
//-------------------

export const getAllSkill = async (req, res) => {
  try {
    const [result] = await pool.query(getAllSkillQuery);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-------------------
// GET QUESTION BY ID
//-------------------

export const getQuestionById = async (req, res) => {
  const questionID = req.params?.id;
  try {
    if (questionID < 1) {
      return res.status(400).json({
        error: "Invalid questionID Value",
        message: "Question ID value must be a positive integer.",
      });
    }

    const [result] = await pool.query(getQuestionByIdQuery, [questionID]);

    if (result?.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The question ID could not be found.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
