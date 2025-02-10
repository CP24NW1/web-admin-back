export const createMultipleOptionsQuery = `INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES ?`;

export const getOptionsByQuestionIDQuery = `SELECT * FROM choiceoption c WHERE c.question_id = ?`;

export const deleteOptionsByQuestionIDQuery = `DELETE FROM choiceoption c WHERE c.question_id = ?`;
