import { pool } from "../db.js";
import {
  getAllPermissionQuery,
  getExistUser,
  grantPermissionToUserQuery,
  revokeAllPermissionFromUser,
} from "../queries/permissionQueries.js";

//-------------------
// GET ALL PERMISSION
//-------------------

export const getAllPermission = async (req, res) => {
  try {
    const [permissions] = await pool.query(getAllPermissionQuery);
    res.json({
      success: true,
      permissions: permissions,
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
// GRANT PERMISSION
//-------------------

export const grantPermissionToUser = async (req, res) => {
  const { user_id, permission_ids } = req.body;

  const [existUser] = await pool.query(getExistUser, [user_id]);

  if (existUser.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    await pool.query(revokeAllPermissionFromUser, [user_id]);

    const permissionQueries = permission_ids?.map((permission_id) => {
      return pool.query(grantPermissionToUserQuery, [user_id, permission_id]);
    });

    await Promise.all(permissionQueries);

    return res.status(200).json({
      success: true,
      message: "Permissions granted successfully",
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
// REVOKE PERMISSION
//-------------------

// export const revokePermissionFromUser = async (req, res) => {
//   const { user_id, permission_ids } = req.body;

//   const [existUser] = await pool.query(getExistUser, [user_id]);

//   if (existUser.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   try {
//     const permissionQueries = permission_ids.map((permission_id) => {
//       return pool.query(revokePermissionFromUserQuery, [
//         user_id,
//         permission_id,
//       ]);
//     });

//     await Promise.all(permissionQueries);

//     return res.status(200).json({
//       success: true,
//       message: "Permissions revoked successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//       message: error.message,
//     });
//   }
// };
