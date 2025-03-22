USE CP24NW1;

INSERT INTO skill (skill_name) VALUES 
('Grammar'),
('Vocabulary'),
('Reading'),
('Listening');

INSERT INTO role (role_id, role) VALUES
(1, 'ADMIN'),
(2, 'QUESTION_CREATOR'),
(3, 'TESTER');


-- INSERT USER
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("ADMIN", "CP24NW1", "admin@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("CREATOR 1", "CP24NW1", "creator1@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("CREATOR 2", "CP24NW1", "creator2@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("TESTER 1", "CP24NW1", "tester1@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("TESTER 2", "CP24NW1", "tester2@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);

-- GRANT ROLE 
UPDATE user SET role_id = 1 WHERE user_id = 1;
UPDATE user SET role_id = 2 WHERE user_id = 2;
UPDATE user SET role_id = 2 WHERE user_id = 3;
UPDATE user SET role_id = 3 WHERE user_id = 4;
UPDATE user SET role_id = 3 WHERE user_id = 5;


-- INSERT SAMPLE QUESTIONS
INSERT INTO question (skill_id, image_id, user_id, question_text, create_at, is_available, is_report) VALUES
(1, NULL, 2, 'Which of the following is the correct way to use "their"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Choose the sentence with correct punctuation.', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Select the correct sentence structure.', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Which word correctly completes the sentence: "She ___ a doctor."?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Choose the proper form of the verb: "They ____ the work last week."', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What does the word "adverse" mean?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'Which of the following is closest in meaning to "benevolent"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What is the meaning of "meticulous"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'Which word is a synonym of "diligent"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What does the word "elaborate" mean?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Which sentence is in the passive voice?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Which of the following is a correct question form?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Choose the correct word order: "Has she ever ___ the Eiffel Tower?"', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Which sentence uses the correct article?', CURRENT_TIMESTAMP, TRUE, FALSE),
(1, NULL, 2, 'Select the correct preposition: "She is interested ___ art."', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What does the word "brevity" mean?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What is the definition of "scrutiny"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'Which of the following is closest in meaning to "ambivalent"?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What does the word "facilitate" mean?', CURRENT_TIMESTAMP, TRUE, FALSE),
(2, NULL, 2, 'What does the word "compel" mean?', CURRENT_TIMESTAMP, TRUE, FALSE);

-- INSERT SAMPLE CHOICES
INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES
(1, TRUE, 'Their dog is always happy'),
(1, FALSE, 'There dog is always happy'),
(1, FALSE, 'They’re dog is always happy'),
(1, FALSE, 'Theirs dog is always happy'),
(2, TRUE, 'I can read this book, can you?'),
(2, FALSE, 'I can read this book can you?'),
(2, FALSE, 'Can you I read this book?'),
(2, FALSE, 'Can read this book, you I?'),
(3, TRUE, 'She has completed the assignment.'),
(3, FALSE, 'She completed the assignment has.'),
(3, FALSE, 'The assignment has completed she.'),
(3, FALSE, 'Completed the assignment has she.'),
(4, TRUE, 'is'),
(4, FALSE, 'are'),
(4, FALSE, 'be'),
(4, FALSE, 'being'),
(5, TRUE, 'finished'),
(5, FALSE, 'finish'),
(5, FALSE, 'finishing'),
(5, FALSE, 'to finish'),
(6, TRUE, 'harmful or unfavorable'),
(6, FALSE, 'kind and generous'),
(6, FALSE, 'happy and joyful'),
(6, FALSE, 'calm and peaceful'),
(7, TRUE, 'Kind and generous'),
(7, FALSE, 'Angry and harsh'),
(7, FALSE, 'Sad and pessimistic'),
(7, FALSE, 'Mean and rude'),
(8, TRUE, 'Paying great attention to detail'),
(8, FALSE, 'Ignoring small details'),
(8, FALSE, 'Being careless in work'),
(8, FALSE, 'Lacking effort in tasks'),
(9, TRUE, 'Hardworking'),
(9, FALSE, 'Lazy'),
(9, FALSE, 'Careless'),
(9, FALSE, 'Unfocused'),
(10, TRUE, 'To explain in detail'),
(10, FALSE, 'To ignore completely'),
(10, FALSE, 'To leave something out'),
(10, FALSE, 'To simplify a subject'),
(11, TRUE, 'Force or drive someone to do something'),
(11, FALSE, 'To advise someone against something'),
(11, FALSE, 'To suggest a course of action'),
(11, FALSE, 'To help someone feel at ease'),
(12, TRUE, 'What time does the train leave?'),
(12, FALSE, 'What time the train leave?'),
(12, FALSE, 'What time does leave the train?'),
(12, FALSE, 'What time train does leave?'),
(13, TRUE, 'visited'),
(13, FALSE, 'visit'),
(13, FALSE, 'visiting'),
(13, FALSE, 'has visit'),
(14, TRUE, 'I saw an elephant at the zoo.'),
(14, FALSE, 'I saw a elephant at the zoo.'),
(14, FALSE, 'I saw the elephant at zoo.'),
(14, FALSE, 'I saw elephant at the zoo.'),
(15, TRUE, 'in'),
(15, FALSE, 'on'),
(15, FALSE, 'at'),
(15, FALSE, 'with'),
(16, TRUE, 'Concise and exact use of words'),
(16, FALSE, 'Long and detailed explanation'),
(16, FALSE, 'Confusing and unclear speech'),
(16, FALSE, 'Speaking without thinking'),
(17, TRUE, 'Close examination and inspection'),
(17, FALSE, 'Ignoring details'),
(17, FALSE, 'A quick glance'),
(17, FALSE, 'A careless review'),
(18, TRUE, 'Having mixed feelings'),
(18, FALSE, 'Being very sure of something'),
(18, FALSE, 'Feeling only one way'),
(18, FALSE, 'Being completely indifferent'),
(19, TRUE, 'To make a process easier'),
(19, FALSE, 'To make something harder'),
(19, FALSE, 'To delay progress'),
(19, FALSE, 'To ignore completely'),
(20, TRUE, 'Force or drive someone to do something'),
(20, FALSE, 'To advise someone against something'),
(20, FALSE, 'To suggest a course of action'),
(20, FALSE, 'To help someone feel at ease'); 
