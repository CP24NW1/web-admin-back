USE CP24NW1;

INSERT INTO skill (skill_name) VALUES 
('Grammar'),
('Vocabulary'),
('Reading'),
('Listening');

INSERT INTO permission (permission_id, permission) VALUES
(1, 'READ_PROFILE_WEB_ADMIN'),
(2, 'READ_PROFILE_WEB_USER'),
(3, 'READ_SKILL'),
(4, 'READ_QUESTION'),
(5, 'CREATE_QUESTION'),
(6, 'UPDATE_QUESTION'),
(7, 'READ_USER'),
(8, 'CREATE_USER'),
(9, 'UPDATE_USER'),
-- ('DELETE_USER'),
(10, 'READ_PERMISSION'),
(11, 'GRANT_PERMISSION'),
(12, 'REVOKE_PERMISSION'),
(13, 'READ_EXAM'),
(14, 'CREATE_EXAM_RANDOM'),
(15, 'CREATE_EXAM_CUSTOM'),
-- ('CREATE_EXAM'),
(16, 'DELETE_EXAM'),
(17, 'DO_EXAM');


-- INSERT ADMIN 
INSERT INTO user(firstname, lastname, email, DOB, password, is_verify) values("admin", "cp24nw1", "nw1admin@mailinator.com", "2002-11-28", "$2y$10$G6SlliDc2iqKBo7cb5NUj.dyS4meSKdxgi378vwhNRt3DyIYsWz/C", 1)

