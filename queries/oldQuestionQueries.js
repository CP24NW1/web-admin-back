export const getQuestionTypeByIdQuery = `SELECT typeID FROM questiontype WHERE typeID = ?`;

export const getQuestionByTypeQuery = `
SELECT 
e.examID, e.examTitle, 
s.skillID, s.skillName, 
q.questionID, q.questionTexts, q.choiceA, q.choiceB, q.choiceC, q.choiceD, q.answer,
qt.typeID, qt.sectionName, qt.partName, qt.instruction
FROM question q 
JOIN skill s ON q.skillID = s.skillID 
JOIN exam e ON q.examID = e.examID 
JOIN questiontype qt ON q.typeID = qt.typeID
WHERE q.examID = ? AND q.typeID = ?`;

export const createNewQuestionQuery = `
INSERT INTO question (examID, typeID, skillID, questionTexts, choiceA, choiceB, choiceC, choiceD, answer) 
VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const getQuestionByIdQuery = `SELECT * FROM question WHERE questionID = ?`;

export const deleteQuestionByIdQuery = `DELETE FROM question WHERE questionID = ?`;

export const getAllSkillQuery = `SELECT * FROM skill`;
