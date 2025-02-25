-- สร้างฐานข้อมูล
CREATE DATABASE CP24NW1;
USE CP24NW1;

-- ตาราง Role
CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(20)
);

-- ตาราง User
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(150),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- ตาราง Skill
CREATE TABLE skill (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(50)
);

-- ตาราง imagePath
CREATE TABLE imagepath (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_path VARCHAR(200)
);

-- ตาราง Question
CREATE TABLE question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_id INT,
    image_id INT,
    user_id INT,
    question_text VARCHAR(300),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	is_available BOOLEAN DEFAULT TRUE,
    is_report BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id),
    FOREIGN KEY (image_id) REFERENCES imagepath(image_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- ตาราง Option
CREATE TABLE choiceoption (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    is_correct BOOLEAN,
    option_text VARCHAR(300),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);

-- ตาราง ExamTesting
CREATE TABLE examtesting (
    exam_question_id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT,
    question_id INT,
    user_id INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attempt_at TIMESTAMP NULL,
    finish_at TIMESTAMP NULL,
    time_taken INT,
    is_correct BOOLEAN,
    selected_option_id INT,
    FOREIGN KEY (question_id) REFERENCES question(question_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

