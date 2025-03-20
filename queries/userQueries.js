export const createUserQuery = `INSERT INTO user (firstname, lastname, email, DOB, is_verify, verification_code, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

export const updateUserQuery = `UPDATE user SET firstname = ?, lastname = ?, email = ?, DOB = ?, update_at = CURRENT_TIMESTAMP WHERE user_id = ?`;

export const getExistUserQuery = `SELECT user_id FROM user WHERE email = ?`;

export const getExistUserByIdQuery = `SELECT * FROM user WHERE user_id = ?`;

export const disableEnableUserQuery = `UPDATE user SET is_active = ? WHERE user_id = ?`;

export const verifyEmailSuccess = `UPDATE user SET is_verify = ? WHERE email = ?`;

export const setPasswordQuery = `UPDATE user SET password = ? WHERE email = ?`;

export const getUserDetailQuery = `SELECT user_id, firstname, lastname, email, DOB, is_active, is_verify FROM user WHERE user_id = ?`;

export const fetchMeQuery = `SELECT u.user_id, u.firstname, u.lastname, u.email, u.DOB, u.is_active, u.is_verify, p.permission FROM user u
JOIN user_permission up ON u.user_id = up.user_id
JOIN permission p on up.permission_id = p.permission_id
WHERE u.user_id = ?`;
