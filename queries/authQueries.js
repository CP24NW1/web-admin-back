export const getExistUser = `SELECT * FROM user WHERE email = ?`;
export const saveUser = `INSERT INTO user (firstname, lastname, email, DOB, password) VALUES (?, ?, ?, ?, ?)`;
export const checkAccessTokenQuery = `SELECT 1 FROM user;`;
export const getUserRoleQuery = `SELECT u.user_id, u.role_id, r.role FROM user u JOIN role r on u.role_id = r.role_id WHERE u.user_id = ?;`;
export const getExistUserByID = `SELECT * FROM user WHERE user_id = ?`;
