export const getAllPermissionQuery = `SELECT * FROM permission`;
export const grantPermissionToUserQuery = `INSERT into user_permission (user_id, permission_id) VALUES (?, ?)`;
export const revokeAllPermissionFromUser = `DELETE FROM user_permission WHERE user_id = ?`;

export const getExistUser = `SELECT user_id FROM user WHERE user_id = ?`;
