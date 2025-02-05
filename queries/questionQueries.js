export const getAllQuestionQuery = `SELECT q.question_id, q.skill_id, s.skill_name, q.image_id, i.image_path, q.user_id, u.username, q.question_text, q.create_at
        FROM question q
        LEFT JOIN skill s ON q.skill_id = s.skill_id
        LEFT JOIN imagepath i ON q.image_id = i.image_id
        LEFT JOIN user u ON q.user_id = u.user_id
        WHERE 1 = 1`;

export const getQuestionByIDQuery = `SELECT * FROM question q WHERE q.question_id = ?`;

export const getQuestionsByIDsQuery = `SELECT question_id FROM question WHERE question_id IN (?);`;

export const createQuestionQuery = `INSERT INTO question (skill_id, image_id, user_id, question_text) VALUES (?, ?, ?, ?)`;

export const getSkillByIDQuery = `SELECT skill_id s FROM skill s WHERE s.skill_id = ?`;

export const getImageByIDQuery = `SELECT image_id FROM imagepath img WHERE img.image_id = ?`;

export const getUserByIDQuery = `SELECT user_id FROM user usr WHERE usr.user_id = ?`;

export const editQuestionQuery = `UPDATE question SET skill_id = ?, image_id = ?,  user_id = ?, question_text = ? WHERE question_id = ?`;
