import { pool } from "../db.js";
import { RoleDTO } from "../dtos/role.js";
import {
  getAllRoleQuery,
  getExistRole,
  getExistUser,
  grantRoleToUserQuery,
} from "../queries/roleQueries.js";

export const getAllRole = async (req, res) => {
  try {
    const [roles] = await pool.query(getAllRoleQuery);

    const roleDTO = roles.map((role) => new RoleDTO(role));

    return res.status(200).json({
      success: true,
      roles: roleDTO,
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

export const grantRoleToUser = async (req, res) => {
  const { user_id, role_id } = req.body;

  const [existUser] = await pool.query(getExistUser, [user_id]);
  const [existRole] = await pool.query(getExistRole, [role_id]);

  if (existUser.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (existRole.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Role ID not found",
    });
  }

  try {
    await pool.query(grantRoleToUserQuery, [role_id, user_id]);
    return res.status(200).json({
      success: true,
      message: "Role granted successfully",
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
