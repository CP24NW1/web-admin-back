import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getExistUser, saveUser } from "../queries/authQueries.js";

//-------------------
// REGISTER
//-------------------

export const register = async (req, res) => {
  try {
    // 1. check user
    const { username, password } = req.body;
    const [user] = await pool.query(getExistUser, [username]);
    if (user.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. Encrypt
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);

    // 3. save
    await pool.query(saveUser, [username, encryptPassword]);
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

//-------------------
// LOGIN
//-------------------

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await pool.query(getExistUser, [username]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = { username };

    jwt.sign(payload, "cp24nw1secret", { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Failed to generate token. Please try again later.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
        token: `Bearer ${token}`, // ใส่ Bearer token ใน response
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};
