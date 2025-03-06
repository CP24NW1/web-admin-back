import Joi from "joi";
import { pool } from "../db.js";
import {
  createUserQuery,
  deleteUserQuery,
  getExistUserQuery,
  updateUserQuery,
  verifyEmailSuccess,
} from "../queries/userQueries.js";

import {
  generateVerificationCode,
  sendSetPasswordEmail,
  sendVerificationEmail,
} from "../utils/emailUtils.js";

import { getExistUser } from "../queries/authQueries.js";

import bcrypt from "bcrypt";

//-------------------
// CREATE USER
//-------------------

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

    const [existUser] = await pool.query(getExistUserQuery, [email]);

    if (existUser.length !== 0) {
      return res.status(400).json({
        success: false,
        error: "User's email already exist",
      });
    }

    const verificationCode = generateVerificationCode();

    const queryValues = [
      firstname,
      lastname,
      email,
      dob,
      false,
      verificationCode,
    ];

    await sendVerificationEmail(email, verificationCode);

    const [results] = await pool.query(createUserQuery, queryValues);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user_id: results.insertId,
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

//-------------------
// EMAIL VERIFICATION
//-------------------

export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required.",
      });
    }

    const [user] = await pool.query(getExistUser, [email]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user[0].verification_code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    await pool.query(verifyEmailSuccess, [true, email]);
    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred during email verification. Please try again later.",
    });
  }
};

//-------------------
// SET PASSWORD
//-------------------

export const setPassword = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password, salt);

  try {
    await pool.query(setPassword, [encryptPassword, email]);
    res.status(200).json({
      success: true,
      message: "Set password successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//-------------------
// EDIT USER
//-------------------

export const editUser = async (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string().min(1).max(30),
    lastname: Joi.string().min(1).max(30),
    email: Joi.string().email().max(50),
    dob: Joi.date().iso(),
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
    const user_id = Number(req.params.user_id);

    const [existingUser] = await pool.query(getExistUserQuery, [email]);

    if (existingUser.length !== 0 && existingUser[0].user_id !== user_id) {
      return res.status(400).json({
        success: false,
        error: "User's email already exists",
      });
    }

    const queryValues = [firstname, lastname, email, dob, user_id];

    const [results] = await pool.query(updateUserQuery, queryValues);

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
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

//-------------------
// SOFT DELETE USER
//-------------------

//ยังไม่เสร็จ ลบไม่ได้ติด timestamp
export const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const [existingUser] = await pool.query(getExistUserQuery[user_id]);

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    await pool.query(deleteUserQuery, [user_id]);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
