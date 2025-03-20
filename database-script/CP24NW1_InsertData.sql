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


-- INSERT ADMIN 
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("admin", "cp24nw1", "nw1admin@mailinator.com", "2002-11-28", "$2b$10$FLZFnRG6EOnJmT7TA/cNyuVDRZD.wqNODac4HrX1AIa9fA/e4YJm.", 1);


-- INSERT INTO user_permission(user_id, permission_id) values(1,1);
-- INSERT INTO user_permission(user_id, permission_id) values(1,2);
-- INSERT INTO user_permission(user_id, permission_id) values(1,3);
-- INSERT INTO user_permission(user_id, permission_id) values(1,4);
-- INSERT INTO user_permission(user_id, permission_id) values(1,5);
-- INSERT INTO user_permission(user_id, permission_id) values(1,6);
-- INSERT INTO user_permission(user_id, permission_id) values(1,7);
-- INSERT INTO user_permission(user_id, permission_id) values(1,8);
-- INSERT INTO user_permission(user_id, permission_id) values(1,9);
-- INSERT INTO user_permission(user_id, permission_id) values(1,10);
-- INSERT INTO user_permission(user_id, permission_id) values(1,11);
-- INSERT INTO user_permission(user_id, permission_id) values(1,12);
-- INSERT INTO user_permission(user_id, permission_id) values(1,13);
-- INSERT INTO user_permission(user_id, permission_id) values(1,14);
-- INSERT INTO user_permission(user_id, permission_id) values(1,15);
-- INSERT INTO user_permission(user_id, permission_id) values(1,16);
-- INSERT INTO user_permission(user_id, permission_id) values(1,17);

