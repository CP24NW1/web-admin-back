-- เพิ่มข้อมูลในตาราง Skill
INSERT INTO skill (skill_name) VALUES 
('Grammar'),
('Vocabulary'),
('Reading'),
('Listening');

-- เพิ่มข้อมูลในตาราง imagePath
INSERT INTO imagepath (image_path) VALUES 
('images/question1.png'),
('images/question2.png'),
('images/question3.png');

-- เพิ่มข้อมูลในตาราง Question (user_id เป็น NULL)
INSERT INTO question (skill_id, image_id, user_id, question_text) VALUES 
(1, 1, NULL, 'What is the correct form of the verb in this sentence?'),
(2, NULL, NULL, 'Which word is a synonym for "happy"?'),
(3, 2, NULL, 'What is the main idea of this passage?'),
(4, 3, NULL, 'What does the speaker imply in this audio clip?');

-- เพิ่มข้อมูลในตาราง ChoiceOption
INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES 
(1, FALSE, 'go'),
(1, TRUE, 'goes'),
(1, FALSE, 'gone'),
(1, FALSE, 'going'),

(2, FALSE, 'sad'),
(2, TRUE, 'joyful'),
(2, FALSE, 'angry'),
(2, FALSE, 'tired'),

(3, TRUE, 'The passage is about climate change.'),
(3, FALSE, 'The passage talks about a historical event.'),
(3, FALSE, 'It describes a famous person.'),
(3, FALSE, 'It explains a new technology.'),

(4, FALSE, 'The speaker is excited.'),
(4, FALSE, 'The speaker is indifferent.'),
(4, TRUE, 'The speaker is worried.'),
(4, FALSE, 'The speaker is confused.');
