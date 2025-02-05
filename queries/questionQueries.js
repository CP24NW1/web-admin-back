export const getAllQuestionQuery = `SELECT * FROM question`;

export const getQuestionByIDQuery = `SELECT * FROM question q WHERE q.question_id = ?`;

export const getQuestionsByIDsQuery = `SELECT question_id FROM question WHERE question_id IN (?);`;

export const createQuestionQuery = `INSERT INTO question (skill_id, image_id, user_id, question_text) VALUES (?, ?, ?, ?)`;

export const getSkillByIDQuery = `SELECT skill_id s FROM skill s WHERE s.skill_id = ?`;

export const getImageByIDQuery = `SELECT image_id FROM imagepath img WHERE img.image_id = ?`;

export const getUserByIDQuery = `SELECT user_id FROM user usr WHERE usr.user_id = ?`;

export const editQuestionQuery = `UPDATE question SET skill_id = ?, image_id = ?,  user_id = ?, question_text = ? WHERE question_id = ?`;

export const createOptionQuery = `INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES (?, ?, ?)`;

export const createMultipleOptionsQuery = `INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES ?`;
