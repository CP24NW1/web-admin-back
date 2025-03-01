import Joi from "joi";
import { pool } from "../db.js";
import { createUserQuery, getExistUser } from "../queries/userQueries.js";

export const createUser = async (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string().min(1).max(30).required(),
    lastname: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().max(50).required(),
    dob: Joi.date().iso().required(),
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

  try {
    const { firstname, lastname, email, dob } = value;

    const [existUser] = await pool.query(getExistUser, [email]);

    if (existUser.length !== 0) {
      return res.status(400).json({
        success: false,
        error: "User's email already exist",
      });
    }

    const queryValues = [firstname, lastname, email, dob];

    const [results] = await pool.query(createUserQuery, queryValues);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: results.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {};
