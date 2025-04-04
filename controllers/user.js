import Joi from "joi";
import { pool } from "../db.js";
import {
  createUserQuery,
  disableEnableUserQuery,
  fetchMeQuery,
  getExistUserByIdQuery,
  getExistUserQuery,
  getUserDetailQuery,
  setPasswordQuery,
  updateUserQuery,
  verifyEmailSuccess,
} from "../queries/userQueries.js";

import {
  generateVerificationCode,
  sendVerificationEmail,
} from "../utils/emailUtils.js";

import { getExistUser } from "../queries/authQueries.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDTO } from "../dtos/user.js";
import { getRoleFromUser } from "../queries/roleQueries.js";

//-------------------
// CREATE USER
//-------------------

export const createUser = async (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string().min(1).max(30).required(),
    lastname: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().max(50).required(),
    role_id: Joi.number().required(),
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
    const { firstname, lastname, email, role_id } = value;

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
      false,
      verificationCode,
      role_id,
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

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email must not be empty",
    });
  }

  try {
    await pool.query(setPasswordQuery, [encryptPassword, email]);
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
    role_id: Joi.number().required(),
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
    const { firstname, lastname, email, role_id } = value;
    const user_id = Number(req.params.user_id);

    const [existingUser] = await pool.query(getExistUserQuery, [email]);

    if (existingUser.length !== 0 && existingUser[0].user_id !== user_id) {
      return res.status(400).json({
        success: false,
        error: "User's email already exists",
      });
    }

    const queryValues = [firstname, lastname, email, role_id, user_id];

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
// DISABLE/ENABLE USER
//-------------------

export const disableEnableUser = async (req, res) => {
  const user_id = req.params.user_id;

  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  try {
    const [existingUser] = await pool.query(getExistUserByIdQuery, [user_id]);

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const [role] = await pool.query(getRoleFromUser, [decoded.user_id]);

    if (role[0].role === "ADMIN" && Number(user_id) === decoded.user_id) {
      return res.status(400).json({
        success: false,
        error: "Unable to change admin status.",
      });
    }

    const is_active = Boolean(existingUser[0]?.is_active);

    await pool.query(disableEnableUserQuery, [!is_active, user_id]);

    return res.status(200).json({
      success: true,
      message: `User ID: ${user_id} is now ${
        !is_active ? "enable" : "disable"
      }`,
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
// GET ALL USER PAGINATION
//-------------------

export const getAllUserPagination = async (req, res) => {
  try {
    const {
      search_filter,
      is_verify,
      is_active,
      start_date,
      end_date,
      role_id,
      page = "1",
      per_page = "10",
    } = req.query;

    const pageNumber = parseInt(page);
    const perPageNumber = parseInt(per_page);

    const offset = (pageNumber - 1) * perPageNumber;

    let query = `
      SELECT 
          u.user_id, 
          u.firstname, 
          u.lastname, 
          u.email, 
          u.update_at,
          u.is_active,
          u.is_verify,
          u.role_id,
          r.role
      FROM 
          user u
      JOIN
          role r ON u.role_id = r.role_id
    `;

    let countQuery = `
    SELECT COUNT(*) as totalItems
    FROM user u
  `;

    let queryParams = [];
    let whereConditions = [];

    if (search_filter) {
      whereConditions.push(`
        (u.firstname LIKE CONCAT('%', ?, '%') 
        OR u.lastname LIKE CONCAT('%', ?, '%') 
        OR u.email LIKE CONCAT('%', ?, '%'))
      `);
      queryParams.push(search_filter, search_filter, search_filter);
    }

    if (is_verify) {
      whereConditions.push(`u.is_verify = ?`);
      queryParams.push(is_verify === "true" ? 1 : 0);
    }

    if (is_active) {
      whereConditions.push(`u.is_active = ?`);
      queryParams.push(is_active === "true" ? 1 : 0);
    }

    if (start_date) {
      whereConditions.push(`DATE(u.update_at) >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      whereConditions.push(`DATE(u.update_at) <= ?`);
      queryParams.push(end_date);
    }

    if (role_id) {
      whereConditions.push(`u.role_id IN (?)`);
      queryParams.push(role_id);
    }

    if (whereConditions.length > 0) {
      query += " WHERE " + whereConditions.join(" AND ");
      countQuery += " WHERE " + whereConditions.join(" AND ");
    }

    //combine with pagination
    query += `
      ORDER BY u.update_at DESC
      LIMIT ? OFFSET ?;
    `;

    queryParams.push(perPageNumber, offset);

    const [rows] = await pool.query(query, queryParams);

    const [countResult] = await pool.query(countQuery, queryParams);

    const totalItems = countResult[0]?.totalItems;
    const totalPages = Math.ceil(totalItems / perPageNumber);

    const formattedUsers = rows.map((user) => new UserDTO(user));

    res.json({
      page: pageNumber,
      per_page: perPageNumber,
      totalItems,
      totalPages,
      data: formattedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

//-------------------
// GET USER DETAIL
//-------------------

export const getUserDetail = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const [result] = await pool.query(getUserDetailQuery, [user_id]);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const userDTO = new UserDTO(result[0]);

    res.status(200).json({
      success: true,
      user_detail: userDTO,
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
// GET USER's OWN DETAIL
//-------------------

export const fetchMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user_id = decoded.user_id;

    const [result] = await pool.query(fetchMeQuery, [user_id]);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const userDTO = new UserDTO(result[0]);

    res.status(200).json({
      success: true,
      user_detail: userDTO,
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
