-- Create the database
CREATE DATABASE cp24nw1;

-- Use the created database
USE cp24nw1;

-- Create Role table
CREATE TABLE role (
    roleID INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(20) NOT NULL
);

-- Create User table
CREATE TABLE user (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    roleID INT,
    FOREIGN KEY (roleID) REFERENCES role(roleID)
);

-- Create Skill table
CREATE TABLE skill (
    skillID INT AUTO_INCREMENT PRIMARY KEY,
    skillName VARCHAR(50) NOT NULL
);

-- Create imagePath table
CREATE TABLE imagepath (
    imageID INT AUTO_INCREMENT PRIMARY KEY,
    imagePath VARCHAR(200) NOT NULL
);

-- Create QuestionType table
CREATE TABLE questiontype (
    typeID INT PRIMARY KEY, 
    sectionName VARCHAR(20) NOT NULL,
    partName VARCHAR(30),
    instruction VARCHAR(200)
);

-- Create Exam table
CREATE TABLE exam (
    examID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    examTitle VARCHAR(30) NOT NULL
);

-- Create Question table
CREATE TABLE question (
    questionID INT AUTO_INCREMENT PRIMARY KEY, 
    examID INT NOT NULL, 
    typeID INT NOT NULL, 
    skillID INT NOT NULL, 
    questionTexts TEXT NOT NULL,  -- Limiting to 300 characters
    choiceA VARCHAR(50) NOT NULL,         -- Limiting to 50 characters
    choiceB VARCHAR(50) NOT NULL,         -- Limiting to 50 characters
    choiceC VARCHAR(50) NOT NULL,         -- Limiting to 50 characters
    choiceD VARCHAR(50) NOT NULL,         -- Limiting to 50 characters
    answer CHAR(1) NOT NULL,              -- Limiting to 1 character
    FOREIGN KEY (examID) REFERENCES exam(examID), 
    FOREIGN KEY (typeID) REFERENCES questiontype(typeID), 
    FOREIGN KEY (skillID) REFERENCES skill(skillID)
);



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