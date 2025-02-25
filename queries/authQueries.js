export const getExistUser = `SELECT * FROM user WHERE username = ?`;
export const saveUser = `INSERT INTO user (username, password) VALUES (?, ?)`;
