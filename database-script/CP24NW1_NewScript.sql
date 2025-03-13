CREATE DATABASE CP24NW1;
USE CP24NW1;

CREATE TABLE permission (
    permission_id INT PRIMARY KEY auto_increment,
    permission VARCHAR(50) NOT NULL
);

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(50) UNIQUE,
    DOB DATETIME,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    password VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    is_verify BOOLEAN,
    verification_code VARCHAR(10)
);

CREATE TABLE user_permission (
    user_id INT,
    permission_id INT,
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);

CREATE TABLE skill (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(50)
);

CREATE TABLE imagepath (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_path VARCHAR(200)
);

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

CREATE TABLE choiceoption (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    is_correct BOOLEAN,
    option_text VARCHAR(300),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);

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



