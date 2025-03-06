export const createUserQuery = `INSERT INTO user (firstname, lastname, email, DOB, is_verify, verification_code) VALUES (?, ?, ?, ?, ?, ?)`;

export const updateUserQuery = `UPDATE user SET firstname = ?, lastname = ?, email = ?, DOB = ?, update_at = CURRENT_TIMESTAMP WHERE user_id = ?`;

export const getExistUserQuery = `SELECT user_id FROM user WHERE email = ?`;

export const deleteUserQuery = `DELETE FROM user WHERE user_id = ?`;

export const verifyEmailSuccess = `UPDATE user SET is_verify = ? WHERE email = ?`;

export const setPassword = `UPDATE user SET password = ? WHERE email = ?`;
