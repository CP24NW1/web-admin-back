export const createUserQuery = `INSERT INTO user (firstname, lastname, email, DOB) VALUES (?, ?, ?, ?)`;

export const getExistUser = `SELECT 1 FROM user WHERE email = ?`;
