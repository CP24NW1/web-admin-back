export const getExistUser = `SELECT * FROM user WHERE email = ?`;
export const saveUser = `INSERT INTO user (firstname, lastname, email, DOB, password) VALUES (?, ?, ?, ?, ?)`;
export const getUserPermissionQuery = `SELECT p.permission FROM permission p JOIN user_permission up ON p.permission_id = up.permission_id WHERE up.user_id = ?;`;
