import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  checkAccessTokenQuery,
  getExistUser,
  saveUser,
} from "../queries/authQueries.js";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

//-------------------
// REGISTER (NOT USED)
//-------------------

// export const register = async (req, res) => {
//   const lowerCaseRegex = /[a-z]/;
//   const upperCaseRegex = /[A-Z]/;
//   const numberRegex = /\d/;
//   const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

//   const schema = Joi.object({
//     firstname: Joi.string().min(2).max(50).required(),
//     lastname: Joi.string().min(2).max(50).required(),
//     email: Joi.string().email().required(),
//     dob: Joi.date().required(),
//     password: Joi.string()
//       .min(8)
//       .required()
//       .custom((value, helpers) => {
//         if (!lowerCaseRegex.test(value)) {
//           return helpers.message(
//             "Password must contain at least one lowercase letter"
//           );
//         }
//         if (!upperCaseRegex.test(value)) {
//           return helpers.message(
//             "Password must contain at least one uppercase letter"
//           );
//         }
//         if (!numberRegex.test(value)) {
//           return helpers.message("Password must contain at least one number");
//         }
//         if (!specialCharRegex.test(value)) {
//           return helpers.message(
//             "Password must contain at least one special character"
//           );
//         }
//         return value;
//       }),
//   });
//   try {
//     const { firstname, lastname, email, dob, password } = req.body;

//     const { error } = schema.validate({
//       firstname,
//       lastname,
//       email,
//       dob,
//       password,
//     });
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }

//     const [user] = await pool.query(getExistUser, [email]);
//     if (user.length !== 0) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const encryptPassword = await bcrypt.hash(password, salt);

//     const [result] = await pool.query(saveUser, [
//       firstname,
//       lastname,
//       email,
//       dob,
//       encryptPassword,
//     ]);

//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during registration. Please try again later.",
//     });
//   }
// };

//-------------------
// LOGIN
//-------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await pool.query(getExistUser, [email]);

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

    const user_id = user[0]?.user_id;

    if (!user[0].is_active) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
      });
    }
    if (!user[0].is_verify) {
      return res.status(401).json({
        success: false,
        message:
          "Your account is not verified. Please check your email for verification.",
      });
    }

    const payload = { email, user_id };

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "2h" });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};

//-------------------
// REFRESH ACCESS TOKEN
//-------------------

export const refreshAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const refreshToken = authHeader.split(" ")[1];

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decoded = jwt.verify(refreshToken, refreshSecret);

    const payload = { email: decoded.email, user_id: decoded.user_id };
    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: "2h",
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: `Bearer ${accessToken}`,
    });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

//-------------------
// TEST ACCESS TOKEN VALIDATION
//-------------------

export const checkAccessToken = async (req, res) => {
  try {
    await pool.query(checkAccessTokenQuery);
    res.status(200).json({
      success: true,
      message: "Validate access token successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while refreshing access token",
    });
  }
};
