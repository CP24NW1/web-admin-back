export const getAllQuestionQuery = `
        SELECT 
        q.question_id, 
        q.question_text, 
        q.skill_id, 
        s.skill_name, 
        q.is_available, 
        q.is_report, 
        q.create_at
        FROM question q
        LEFT JOIN skill s ON q.skill_id = s.skill_id
        WHERE 1=1`;

export const getQuestionByIDQuery = `
        SELECT 
        q.question_id,
        q.question_text, 
        q.skill_id, 
        q.is_available,
        q.is_report,
        s.skill_name, 
        c.option_id, 
        c.option_text, 
        c.is_correct
        FROM question q
        LEFT JOIN skill s ON q.skill_id = s.skill_id
        LEFT JOIN choiceoption c ON q.question_id = c.question_id
        WHERE q.question_id = ?`;

export const getQuestionsByIDsQuery = `SELECT question_id FROM question WHERE question_id IN (?);`;

export const createQuestionQuery = `INSERT INTO question (skill_id, image_id, user_id, question_text) VALUES (?, ?, ?, ?)`;

export const getSkillByIDQuery = `SELECT skill_id s FROM skill s WHERE s.skill_id = ?`;

export const getImageByIDQuery = `SELECT image_id FROM imagepath img WHERE img.image_id = ?`;

export const getUserByIDQuery = `SELECT user_id FROM user usr WHERE usr.user_id = ?`;

export const editQuestionQuery = `UPDATE question SET skill_id = ?, image_id = ?,  user_id = ?, question_text = ? WHERE question_id = ?`;

export const checkQuestionAvailbleQuery = `SELECT is_available FROM question WHERE question_id = ?`;

export const enableDisableQuestionQuery = `UPDATE question SET is_available = ? WHERE question_id = ?`;
