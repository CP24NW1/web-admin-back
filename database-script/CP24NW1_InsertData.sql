USE CP24NW1;

INSERT INTO skill (skill_name) VALUES
('Vocabulary'),
('Tenses'),
('Grammar'),
('Reading Comprehension'),
('Sentence Structure'),
('Phrasal Verbs'),
('Word Formation'),
('Pronunciation & Spelling'),
('Error Identification'),
('Writing Mechanics');

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
INSERT INTO question (skill_id, image_id, user_id, question_text) VALUES
(1, NULL, 1, 'What does "elaborate" mean?'),
(1, NULL, 1, 'What is a synonym for "happy"?'),
(1, NULL, 1, 'What is the opposite of "hot"?'),
(1, NULL, 1, 'What does "eclectic" mean?'),
(1, NULL, 1, 'What is a synonym for "beautiful"?'),
(1, NULL, 1, 'What does "amplify" mean?'),
(1, NULL, 1, 'What is the meaning of "benevolent"?'),
(1, NULL, 1, 'Which word is a synonym for "quick"?'),
(1, NULL, 1, 'What is an antonym of "bright"?'),
(1, NULL, 1, 'Which word means "to explain in detail"?'),

(2, NULL, 1, 'Which sentence is in the present perfect tense?'),
(2, NULL, 1, 'What is the past participle of "write"?'),
(2, NULL, 1, 'Which sentence uses future continuous tense?'),
(2, NULL, 1, 'Identify the correct past simple form: "Yesterday, she _____ (go) to the mall."'),
(2, NULL, 1, 'Choose the correct conditional sentence (Type 2).'),
(2, NULL, 1, 'Which tense is used in this sentence: "I will have finished my work by tomorrow"?'),
(2, NULL, 1, 'Choose the sentence in past perfect tense.'),
(2, NULL, 1, 'Which tense is correct: "I am playing soccer now."'),
(2, NULL, 1, 'Identify the future perfect tense sentence.'),
(2, NULL, 1, 'Which sentence is in present continuous tense?'),

(3, NULL, 1, 'What is the past tense of "go"?'),
(3, NULL, 1, 'Choose the correct article: "___ apple"'),
(3, NULL, 1, 'Which word is a verb? "run" or "tree"?'),
(3, NULL, 1, 'Fill in the blank: "I ____ to the store"'),
(3, NULL, 1, 'Which of the following is an adjective?'),
(3, NULL, 1, 'Identify the subject in the sentence: "She runs every day."'),
(3, NULL, 1, 'Choose the correct preposition: "She is ___ the table."'),
(3, NULL, 1, 'What is the past tense of "eat"?'),
(3, NULL, 1, 'What is the plural form of "child"?'),
(3, NULL, 1, 'Which sentence is correct? "I has a book" or "I have a book"?'),

(4, NULL, 1, 'What is the main idea of the passage?'),
(4, NULL, 1, 'What can be inferred from the last paragraph?'),
(4, NULL, 1, 'What does the word "convey" mean in the context?'),
(4, NULL, 1, 'Which statement best summarizes the passage?'),
(4, NULL, 1, 'What is the author’s purpose in writing this text?'),
(4, NULL, 1, 'Which sentence provides evidence for the main argument?'),
(4, NULL, 1, 'What does the phrase "according to the text" suggest?'),
(4, NULL, 1, 'Which statement is NOT supported by the passage?'),
(4, NULL, 1, 'How does paragraph 2 support the main idea?'),
(4, NULL, 1, 'What is the tone of the passage?'),

(5, NULL, 1, 'Convert this sentence to passive voice.'),
(5, NULL, 1, 'What is the subject in this sentence?'),
(5, NULL, 1, 'Which sentence is in direct speech?'),
(5, NULL, 1, 'How do you change this sentence to reported speech?'),
(5, NULL, 1, 'Identify the object in the given sentence.'),
(5, NULL, 1, 'Which sentence follows proper sentence structure?'),
(5, NULL, 1, 'What type of clause is used in this sentence?'),
(5, NULL, 1, 'What is the main clause in this sentence?'),
(5, NULL, 1, 'Which sentence is grammatically correct?'),
(5, NULL, 1, 'Identify the dependent clause in this sentence.'),

(6, NULL, 1, 'What does "give up" mean?'),
(6, NULL, 1, 'Choose the correct meaning of "turn down".'),
(6, NULL, 1, 'Which sentence correctly uses "break up"?'),
(6, NULL, 1, 'What is the meaning of "run into"?'),
(6, NULL, 1, 'Choose the correct sentence using "take off".'),
(6, NULL, 1, 'Which phrasal verb means "to cancel"?'),
(6, NULL, 1, 'Identify the meaning of "put up with".'),
(6, NULL, 1, 'Which sentence correctly uses "set up"?'),
(6, NULL, 1, 'What does "bring up" mean in this sentence?'),
(6, NULL, 1, 'Choose the correct usage of "call off".'),

(7, NULL, 1, 'What is the noun form of "decide"?'),
(7, NULL, 1, 'Choose the correct prefix to form the opposite of "happy".'),
(7, NULL, 1, 'Which word is formed by adding the suffix "-ment" to "achieve"?'),
(7, NULL, 1, 'What is the adjective form of "beauty"?'),
(7, NULL, 1, 'Which root word does "television" come from?'),
(7, NULL, 1, 'What is the verb form of "success"?'),
(7, NULL, 1, 'Choose the correct suffix to form an adjective from "care".'),
(7, NULL, 1, 'Which of the following words is derived from "educate"?'),
(7, NULL, 1, 'What is the meaning of the prefix "mis-" in "misunderstand"?'),
(7, NULL, 1, 'Identify the word with the suffix "-ion" that forms a noun.'),

(8, NULL, 1, 'Which word is spelled correctly?'),
(8, NULL, 1, 'Which word has a silent letter?'),
(8, NULL, 1, 'Which of the following words is commonly misspelled?'),
(8, NULL, 1, 'How many syllables are in the word "development"?'),
(8, NULL, 1, 'Which of these words has the same pronunciation as "knight"?'),
(8, NULL, 1, 'Which word contains a double consonant?'),
(8, NULL, 1, 'Which word has the correct spelling: "recieve" or "receive"?'),
(8, NULL, 1, 'Identify the word with an irregular pronunciation.'),
(8, NULL, 1, 'Which of these words has a different vowel sound?'),
(8, NULL, 1, 'Which word has the same ending sound as "thought"?'),

(9, NULL, 1, 'Identify the incorrect word in this sentence: "She go to school every day."'),
(9, NULL, 1, 'Which sentence contains a grammar mistake?'),
(9, NULL, 1, 'Find the spelling error in this sentence.'),
(9, NULL, 1, 'Which sentence has a subject-verb agreement error?'),
(9, NULL, 1, 'Which sentence has incorrect word order?'),
(9, NULL, 1, 'Identify the wrong article in this sentence.'),
(9, NULL, 1, 'Which of the following sentences has a punctuation error?'),
(9, NULL, 1, 'Find the incorrect preposition in this sentence.'),
(9, NULL, 1, 'Which sentence contains a verb tense error?'),
(9, NULL, 1, 'Identify the redundant word in this sentence.'),

(10, NULL, 1, 'Where should the comma be placed in this
 sentence?'),
(10, NULL, 1, 'Which sentence is correctly capitalized?'),
(10, NULL, 1, 'Identify the correct punctuation for this sentence.'),
(10, NULL, 1, 'Which of the following sentences is written in formal English?'),
(10, NULL, 1, 'Where should the apostrophe go in "its"?'),
(10, NULL, 1, 'Which sentence has parallel structure?'),
(10, NULL, 1, 'Choose the correct transition word for this sentence.'),
(10, NULL, 1, 'Identify the sentence with correct sentence structure.'),
(10, NULL, 1, 'Which of the following is a run-on sentence?'),
(10, NULL, 1, 'Choose the correct sentence using quotation marks.');


INSERT INTO choiceoption (question_id, is_correct, option_text) VALUES
(1, 1, 'To explain in more detail'),
(1, 0, 'To disagree with someone'),
(1, 0, 'To confuse'),
(1, 0, 'To make something bigger'),

(2, 1, 'Joyful'),
(2, 0, 'Sad'),
(2, 0, 'Angry'),
(2, 0, 'Excited'),

(3, 1, 'Cold'),
(3, 0, 'Warm'),
(3, 0, 'Bright'),
(3, 0, 'Wet'),

(4, 1, 'Diverse'),
(4, 0, 'Simple'),
(4, 0, 'Common'),
(4, 0, 'Predictable'),

(5, 1, 'Attractive'),
(5, 0, 'Ugly'),
(5, 0, 'Unpleasant'),
(5, 0, 'Common'),

(6, 1, 'Make stronger or more intense'),
(6, 0, 'Reduce'),
(6, 0, 'Simplify'),
(6, 0, 'Ignore'),

(7, 1, 'Kind-hearted'),
(7, 0, 'Selfish'),
(7, 0, 'Indifferent'),
(7, 0, 'Angry'),

(8, 1, 'Fast'),
(8, 0, 'Slow'),
(8, 0, 'Heavy'),
(8, 0, 'Clumsy'),

(9, 1, 'Dim'),
(9, 0, 'Bright'),
(9, 0, 'Colorful'),
(9, 0, 'Flashy'),

(10, 1, 'Elucidate'),
(10, 0, 'Hide'),
(10, 0, 'Guess'),
(10, 0, 'Obscure'),

(11, 1, 'She has finished her homework.'),
(11, 0, 'She finishes her homework.'),
(11, 0, 'She is finishing her homework.'),
(11, 0, 'She will finish her homework.'),

(12, 1, 'Written'),
(12, 0, 'Writing'),
(12, 0, 'Wrote'),
(12, 0, 'Writes'),

(13, 1, 'She will be working at 10 AM tomorrow.'),
(13, 0, 'She is working at 10 AM tomorrow.'),
(13, 0, 'She worked at 10 AM tomorrow.'),
(13, 0, 'She works at 10 AM tomorrow.'),

(14, 1, 'Went'),
(14, 0, 'Go'),
(14, 0, 'Going'),
(14, 0, 'Will go'),

(15, 1, 'If I were you, I would study harder.'),
(15, 0, 'If I am you, I will study harder.'),
(15, 0, 'If I will be you, I would study harder.'),
(15, 0, 'If I was you, I would study harder.'),

(16, 1, 'Future perfect'),
(16, 0, 'Future continuous'),
(16, 0, 'Past perfect'),
(16, 0, 'Present perfect'),

(17, 1, 'I had already eaten when he arrived.'),
(17, 0, 'I will eat when he arrives.'),
(17, 0, 'I am eating when he arrived.'),
(17, 0, 'I was eating when he arrived.'),

(18, 1, 'I am playing soccer now.'),
(18, 0, 'I played soccer now.'),
(18, 0, 'I have played soccer now.'),
(18, 0, 'I will play soccer now.'),

(19, 1, 'I will have finished my project by next week.'),
(19, 0, 'I will finish my project by next week.'),
(19, 0, 'I am finishing my project by next week.'),
(19, 0, 'I finished my project by next week.'),

(20, 1, 'I am studying right now.'),
(20, 0, 'I studied right now.'),
(20, 0, 'I have studied right now.'),
(20, 0, 'I will study right now.'),

(21, 1, 'went'),
(21, 0, 'gone'),
(21, 0, 'goes'),
(21, 0, 'going'),

(22, 0, 'a'),
(22, 1, 'an'),
(22, 0, 'the'),
(22, 0, 'some'),

(23, 1, 'run'),
(23, 0, 'tree'),
(23, 0, 'quickly'),
(23, 0, 'beautiful'),

(24, 1, 'go'),
(24, 0, 'goes'),
(24, 0, 'gone'),
(24, 0, 'went'),

(25, 0, 'run'),
(25, 1, 'running'),
(25, 0, 'ran'),
(25, 0, 'runner'),

(26, 1, 'She'),
(26, 0, 'runs'),
(26, 0, 'every'),
(26, 0, 'day'),

(27, 0, 'on'),
(27, 0, 'to'),
(27, 1, 'under'),
(27, 0, 'by'),

(28, 1, 'ate'),
(28, 0, 'eats'),
(28, 0, 'eaten'),
(28, 0, 'eating'),

(29, 0, 'children'),
(29, 1, 'children'),
(29, 0, 'childs'),
(29, 0, 'childrens'),

(30, 0, 'I has a book'),
(30, 1, 'I have a book'),
(30, 0, 'I am having a book'),
(30, 0, 'I is having a book'),

(31, 1, 'The central idea of the passage'),
(31, 0, 'A minor detail in the passage'),
(31, 0, 'A rhetorical question'),
(31, 0, 'A quote from another source'),

(32, 0, 'The author is happy about the conclusion'),
(32, 1, 'The author believes the conclusion is important'),
(32, 0, 'The author disagrees with the conclusion'),
(32, 0, 'The author presents an alternative view'),

(33, 0, 'To explain a new theory'),
(33, 1, 'To communicate the meaning of a term'),
(33, 0, 'To provide background information'),
(33, 0, 'To describe an event'),

(34, 1, 'The main point of the text'),
(34, 0, 'A description of the setting'),
(34, 0, 'A personal opinion'),
(34, 0, 'A reference to a historical event'),

(35, 0, 'To inform the reader about a fact'),
(35, 1, 'To persuade the reader to think a certain way'),
(35, 0, 'To entertain the reader'),
(35, 0, 'To provide evidence for a theory'),

(36, 0, 'The second paragraph is unrelated'),
(36, 1, 'The second paragraph supports the argument by providing facts'),
(36, 0, 'The second paragraph contains counterarguments'),
(36, 0, 'The second paragraph is a conclusion'),

(37, 1, 'It indicates the text’s source or context'),
(37, 0, 'It introduces a new argument'),
(37, 0, 'It shows a personal opinion'),
(37, 0, 'It points out contradictions in the argument'),

(38, 1, 'It contradicts the main argument'),
(38, 0, 'It reinforces the main argument'),
(38, 0, 'It provides a new perspective on the argument'),
(38, 0, 'It introduces an unrelated topic'),

(39, 1, 'It explains how a specific point strengthens the argument'),
(39, 0, 'It describes a different perspective'),
(39, 0, 'It provides background information about the author'),
(39, 0, 'It concludes the argument without any new information'),

(40, 0, 'Formal and objective'),
(40, 1, 'Neutral and informative'),
(40, 0, 'Friendly and conversational'),
(40, 0, 'Sarcastic and dismissive'),

(41, 1, 'The book was read by him'),
(41, 0, 'He read the book'),
(41, 0, 'The book read by him'),
(41, 0, 'He was read the book'),

(42, 1, 'The teacher'),
(42, 0, 'The book'),
(42, 0, 'The classroom'),
(42, 0, 'The students'),

(43, 1, 'He said, "I will go to the store."'),
(43, 0, 'He said he will go to the store.'),
(43, 0, 'He said, I will go to the store.'),
(43, 0, 'He said that he will go to the store.'),

(44, 1, 'Change it to reported speech: He said that he would go to the store.'),
(44, 0, 'Change it to reported speech: He said, "I will go to the store."'),
(44, 0, 'He said, "I would go to the store."'),
(44, 0, 'He says, "I will go to the store."'),

(45, 0, 'The students'),
(45, 1, 'The book'),
(45, 0, 'The teacher'),
(45, 0, 'The classroom'),

(46, 0, 'She don’t like to play tennis.'),
(46, 1, 'She doesn’t like to play tennis.'),
(46, 0, 'She don’t likes to play tennis.'),
(46, 0, 'She does not likes to play tennis.'),

(47, 0, 'Relative clause'),
(47, 1, 'Adverbial clause'),
(47, 0, 'Noun clause'),
(47, 0, 'Conditional clause'),

(48, 1, 'The main clause is "He went to the store."'),
(48, 0, 'The main clause is "if it rains"'),
(48, 0, 'The main clause is "because it was raining"'),
(48, 0, 'The main clause is "while I was studying"'),

(49, 1, 'She has a cat.'),
(49, 0, 'She has cat.'),
(49, 0, 'Has she a cat?'),
(49, 0, 'She a cat has.'),
(50, 0, 'If it rains and I will stay home.'),
(50, 1, 'If it rains, I will stay home.'),
(50, 0, 'If it will rain, I stay home.'),
(50, 0, 'If it rains, I stay home.'),
(51, 1, 'To quit or surrender'),
(51, 0, 'To start something new'),
(51, 0, 'To give someone a gift'),
(51, 0, 'To make an effort'),

(52, 1, 'To reject or refuse'),
(52, 0, 'To change your mind'),
(52, 0, 'To embrace or accept'),
(52, 0, 'To offer help'),

(53, 1, 'They decided to break up after five years.'),
(53, 0, 'They break up after five years.'),
(53, 0, 'They broke up after five years.'),
(53, 0, 'They breaking up after five years.'),

(54, 1, 'To meet someone unexpectedly'),
(54, 0, 'To start a journey'),
(54, 0, 'To run in a race'),
(54, 0, 'To manage a situation'),

(55, 1, 'She will take off her jacket before the meeting.'),
(55, 0, 'She will taking off her jacket before the meeting.'),
(55, 0, 'She takes off her jacket before the meeting.'),
(55, 0, 'She take off her jacket before the meeting.'),

(56, 1, 'To cancel something'),
(56, 0, 'To delay something'),
(56, 0, 'To approve something'),
(56, 0, 'To arrange something'),

(57, 1, 'To tolerate or endure something unpleasant'),
(57, 0, 'To offer help to someone'),
(57, 0, 'To manage a task'),
(57, 0, 'To express dissatisfaction'),

(58, 1, 'They set up the meeting in the conference room.'),
(58, 0, 'They setting up the meeting in the conference room.'),
(58, 0, 'They sets up the meeting in the conference room.'),
(58, 0, 'They set the meeting up in the conference room.'),

(59, 1, 'To mention or bring something to attention'),
(59, 0, 'To ignore something'),
(59, 0, 'To physically raise something'),
(59, 0, 'To establish something'),

(60, 1, 'They called off the event due to bad weather.'),
(60, 0, 'They call off the event due to bad weather.'),
(60, 0, 'They calling off the event due to bad weather.'),
(60, 0, 'They called the event off due to bad weather.'),

(61, 1, 'decision'),
(61, 0, 'deciding'),
(61, 0, 'decided'),
(61, 0, 'decides'),

(62, 1, 'un-'),
(62, 0, 'dis-'),
(62, 0, 're-'),
(62, 0, 'in-'),

(63, 1, 'achievement'),
(63, 0, 'achiever'),
(63, 0, 'achieving'),
(63, 0, 'achieve'),

(64, 1, 'beautiful'),
(64, 0, 'beautyful'),
(64, 0, 'beautify'),
(64, 0, 'beautified'),

(65, 1, 'tele'),
(65, 0, 'vision'),
(65, 0, 'scope'),
(65, 0, 'phone'),

(66, 1, 'succeed'),
(66, 0, 'successed'),
(66, 0, 'successful'),
(66, 0, 'succeeding'),

(67, 1, 'careful'),
(67, 0, 'carefulness'),
(67, 0, 'careless'),
(67, 0, 'caring'),

(68, 1, 'education'),
(68, 0, 'educative'),
(68, 0, 'educating'),
(68, 0, 'educated'),

(69, 1, 'it suggests something wrong or incorrect'),
(69, 0, 'it suggests something helpful'),
(69, 0, 'it suggests something unknown'),
(69, 0, 'it suggests something new'),

(70, 1, 'decision'),
(70, 0, 'deciding'),
(70, 0, 'decided'),
(70, 0, 'decides'),

(71, 1, 'accommodation'),
(71, 0, 'acommodation'),
(71, 0, 'acomodation'),
(71, 0, 'accomodation'),

(72, 0, 'combination'),
(72, 1, 'knight'),
(72, 0, 'knowledge'),
(72, 0, 'kiwi'),

(73, 1, 'definitely'),
(73, 0, 'definitly'),
(73, 0, 'definitelly'),
(73, 0, 'defintely'),

(74, 0, 'four'),
(74, 0, 'five'),
(74, 1, 'three'),
(74, 0, 'two'),

(75, 1, 'night'),
(75, 0, 'nighty'),
(75, 0, 'knite'),
(75, 0, 'nite'),

(76, 0, 'accident'),
(76, 1, 'successful'),
(76, 0, 'access'),
(76, 0, 'success'),

(77, 1, 'receive'),
(77, 0, 'recieve'),
(77, 0, 'receve'),
(77, 0, 'receave'),

(78, 0, 'scientific'),
(78, 1, 'colonel'),
(78, 0, 'scienctist'),
(78, 0, 'scenario'),

(79, 0, 'cat'),
(79, 1, 'bat'),
(79, 0, 'rat'),
(79, 0, 'hat'),

(80, 1, 'thought'),
(80, 0, 'though'),
(80, 0, 'thaught'),
(80, 0, 'thout'),

(81, 1, 'go'),
(81, 0, 'she'),
(81, 0, 'to'),
(81, 0, 'school'),

(82, 1, 'She go to school every day.'),
(82, 0, 'She goes to school every day.'),
(82, 0, 'She gone to school every day.'),
(82, 0, 'She is going to school every day.'),

(83, 1, 'definitely'),
(83, 0, 'definatly'),
(83, 0, 'defintely'),
(83, 0, 'definitly'),

(84, 1, 'She go to school every day.'),
(84, 0, 'She goes to school every day.'),
(84, 0, 'She gone to school every day.'),
(84, 0, 'She is going to school every day.'),

(85, 1, 'He school goes every day.'),
(85, 0, 'He goes school every day.'),
(85, 0, 'He goes to school every day.'),
(85, 0, 'He every day goes to school.'),

(86, 1, 'a'),
(86, 0, 'an'),
(86, 0, 'the'),
(86, 0, 'none'),

(87, 1, 'There are many people, however, we cannot see them.'),
(87, 0, 'There are many people; however, we cannot see them.'),
(87, 0, 'There are many people however we cannot see them.'),
(87, 0, 'There are many people: however we cannot see them.'),

(88, 1, 'on'),
(88, 0, 'in'),
(88, 0, 'at'),
(88, 0, 'by'),

(89, 1, 'She has gone to the store.'),
(89, 0, 'She go to the store.'),
(89, 0, 'She will go to the store.'),
(89, 0, 'She is going to the store.'),

(90, 1, 'He very likes playing soccer.'),
(90, 0, 'He likes very much playing soccer.'),
(90, 0, 'He likes playing very soccer.'),
(90, 0, 'He likes playing soccer very much.'),

(91, 1, 'After "went"'),
(91, 0, 'Before "went"'),
(91, 0, 'After "to"'),
(91, 0, 'Before "to"'),

(92, 1, 'She went to the store.'),
(92, 0, 'she went to the store.'),
(92, 0, 'She Went to the store.'),
(92, 0, 'she Went to the store.'),

(93, 1, 'We need to buy eggs, milk, and bread.'),
(93, 0, 'We need to buy eggs milk and bread.'),
(93, 0, 'We need to buy eggs, milk and bread.'),
(93, 0, 'We need to buy eggs milk, and bread.'),

(94, 1, 'We have to submit the report by Friday.'),
(94, 0, 'We have to submit the report, by Friday.'),
(94, 0, 'We have to submit the report Friday.'),
(94, 0, 'We have to submit, the report by Friday.'),

(95, 1, 'Its meaning is unclear.'),
(95, 0, 'It’s meaning is unclear.'),
(95, 0, 'It meaning’s is unclear.'),
(95, 0, 'Its’ meaning is unclear.'),

(96, 1, 'She likes to read, write, and play sports.'),
(96, 0, 'She likes to read, write and play sports.'),
(96, 0, 'She likes to read write, and play sports.'),
(96, 0, 'She likes reading, writing, and to play sports.'),

(97, 1, 'Therefore'),
(97, 0, 'However'),
(97, 0, 'Moreover'),
(97, 0, 'For example'),

(98, 1, 'The man is eating dinner.'),
(98, 0, 'Eating dinner the man is.'),
(98, 0, 'The dinner is eating man.'),
(98, 0, 'Dinner the man is eating.'),

(99, 1, 'I am going to the park, and she is going to the store.'),
(99, 0, 'I am going to the park she is going to the store.'),
(99, 0, 'I am going to the park and she is going to the store.'),
(99, 0, 'I am going to the park, she is going to the store.'),

(100, 1, 'He said, "I will call you later."'),
(100, 0, 'He said I will call you later.'),
(100, 0, 'He says, "I will call you later."'),
(100, 0, 'He said I will call you later.');