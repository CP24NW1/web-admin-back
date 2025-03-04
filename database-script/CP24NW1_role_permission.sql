INSERT INTO permission (permission) VALUES
('READ_PROFILE'),
('READ_QUESTION'),
('CREATE_QUESTION'),
('UPDATE_QUESTION'),
('READ_USER'),
('CREATE_USER'),
('UPDATE_USER'),
('DELETE_USER'),
('GRANT_PERMISSION'),
('REVOKE_PERMISSION'),
('READ_EXAM'),
('READ_EXAM_RANDOM'),
('CREATE_EXAM_CUSTOM'),
('CREATE_EXAM'),
('DELETE_EXAM'),
('DO_EXAM');

INSERT INTO role (role_id, role) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- ADMIN 
INSERT INTO role_permission (role_id, permission_id) VALUES
(1, 1),  -- READ_PROFILE
(1, 2),  -- READ_QUESTION
(1, 3),  -- CREATE_QUESTION
(1, 4),  -- UPDATE_QUESTION
(1, 5),  -- READ_USER
(1, 6),  -- CREATE_USER
(1, 7),  -- UPDATE_USER
(1, 8),  -- DELETE_USER
(1, 9),  -- GRANT_PERMISSION
(1, 10), -- REVOKE_PERMISSION
(1, 11), -- READ_EXAM
(1, 12), -- READ_EXAM_RANDOM
(1, 13), -- CREATE_EXAM_CUSTOM
(1, 14), -- CREATE_EXAM
(1, 15), -- DELETE_EXAM
(1, 16); -- DO_EXAM

-- USER
INSERT INTO role_permission (role_id, permission_id) VALUES
(2, 1),  -- READ_PROFILE
(2, 11), -- READ_EXAM
(2, 12), -- READ_EXAM_RANDOM
(2, 13), -- CREATE_EXAM_CUSTOM
(2, 14), -- CREATE_EXAM
(2, 15), -- DELETE_EXAM
(2, 16); -- DO_EXAM

-- FETCH CHECK
SELECT r.role, p.permission
FROM role_permission rp
JOIN role r ON rp.role_id = r.role_id
JOIN permission p ON rp.permission_id = p.permission_id;

 

