-- Insert a sample exam in the Exam table
INSERT INTO exam (examID, userID, examTitle)
VALUES (1, NULL, 'Sample TOEIC Exam');

-- Insert sample question types (assuming basic TOEIC sections like Reading and Listening)
-- Insert all parts of TOEIC into QuestionType
INSERT INTO questiontype (typeID, sectionName, partName, instruction)
VALUES 
    -- Listening Section
    (1, 'Listening', 'Part 1: Photographs', 'Look at the photograph and listen to the four statements. Choose the statement that best describes the photograph.'),
    (2, 'Listening', 'Part 2: Question-Response', 'Listen to a question or statement and choose the most appropriate response.'),
    (3, 'Listening', 'Part 3: Conversations', 'Listen to conversations and answer questions based on the information provided.'),
    (4, 'Listening', 'Part 4: Talks', 'Listen to talks and answer questions based on the information provided.'),

    -- Reading Section
    (5, 'Reading', 'Part 5: Incomplete Sentences', 'Choose the best word or phrase to complete the sentence.'),
    (6, 'Reading', 'Part 6: Text Completion', 'Choose the correct word or phrase to fill in each blank in the given text.'),
    (7, 'Reading', 'Part 7: Reading Comprehension', 'Read the passages and answer the questions based on the content provided.');


-- Insert sample skills for categorizing questions
INSERT INTO skill (skillID, skillName)
VALUES 
    (1, 'Grammar'),
    (2, 'Vocabulary');

-- Insert sample questions for the exam in the Question table
INSERT INTO question (questionID, examID, typeID, skillID, questionTexts, choiceA, choiceB, choiceC, choiceD, answer)
VALUES 
    (1, 1, 5, 1, 'She _____ to the office every day.', 'walk', 'walks', 'walking', 'walked', 'B'),
    (2, 1, 5, 1, 'The meeting has been postponed _____ further notice.', 'until', 'since', 'for', 'by', 'A'),
    (3, 1, 5, 2, 'This job requires excellent _____ skills.', 'communicate', 'communication', 'communicated', 'communicating', 'B'),
    (4, 1, 5, 2, 'We will need to _____ additional staff for the project.', 'hire', 'hiring', 'hired', 'hires', 'A'),
    (5, 1, 5, 1, 'The CEO will give a presentation _____ the company\'s future plans.', 'on', 'at', 'to', 'of', 'A'),
    (6, 1, 6, 2, 'Please be _____ when filling out the form.', 'care', 'careful', 'carefully', 'caring', 'B'),
    (7, 1, 6, 1, 'They _____ for the results since last week.', 'are waiting', 'waited', 'have been waiting', 'wait', 'C'),
    (8, 1, 6, 1, 'She quickly finished the project, _____ impressed her manager.', 'who', 'which', 'where', 'what', 'B'),
    (9, 1, 5, 2, 'Our team has _____ all expectations this quarter.', 'exceed', 'exceeded', 'exceeds', 'exceeding', 'B'),
    (10, 1, 5, 2, 'The software update includes several _____ features.', 'addition', 'additional', 'additionally', 'add', 'B');
