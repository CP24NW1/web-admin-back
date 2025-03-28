export const getExistUser = `SELECT user_id FROM user WHERE user_id = ?`;
export const getExistRole = `SELECT role_id FROM role WHERE role_id = ?`;
export const getAllRoleQuery = `SELECT * FROM role;`;
export const grantRoleToUserQuery = `UPDATE user u SET u.role_id = ? WHERE u.user_id = ? `;
export const getRoleFromUser = `SELECT u.user_id, r.role_id, r.role FROM user u JOIN role r ON u.role_id = r.role_id WHERE u.user_id = ? `;
