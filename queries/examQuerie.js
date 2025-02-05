export const getExamAllQuery = ` 
  SELECT *
  FROM exam e
  WHERE LOWER(e.examTitle) LIKE LOWER(CONCAT('%', ?, '%'))`;

export const getExamByPaginationQuery = `
  SELECT * 
  FROM exam e 
  WHERE LOWER(e.examTitle) LIKE LOWER(CONCAT('%', ?, '%')) limit ? offset ?
`;

export const getExamCountsQeury = `SELECT count(*) FROM exam`;

export const getExamTitleQuery = `
  SELECT e.examTitle
  FROM exam e
  WHERE e.examID = ?
`;

export const getQuestionCountsByPartQuery = `
  SELECT e.examTitle, qt.sectionName, qt.typeID, qt.partName, COUNT(q.questionID) AS questionCount
  FROM exam e
  CROSS JOIN questiontype qt
  LEFT JOIN question q ON e.examID = q.examID AND qt.typeID = q.typeID
  WHERE e.examID = ?
  GROUP BY qt.partName, qt.sectionName, qt.typeID
  ORDER BY qt.partName;
`;

export const deleteExamByIdQuery = `DELETE FROM exam e WHERE e.examID = ?`;

export const deleteAllQuestionByExamIdQuery = `DELETE FROM question q WHERE q.examID = ?`;

export const createNewExamQuery = `INSERT INTO exam (examID, userID, examTitle) VALUES (?, ?, ?)`;

export const editExamQuery = `UPDATE exam SET userID = ?, examTitle = ? WHERE examID = ?`;

export const getExamByTitleQuery = `SELECT * FROM exam WHERE examTitle = ?`;
