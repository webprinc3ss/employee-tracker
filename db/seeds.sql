INSERT INTO department (names)
VALUES 
    ('On Air'), 
    ('IT'),
    ('Marketing'),
    ('Sales'),
    ('Development'),
    ('HR'),
    ('Art');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Marketing Manager', 55000, 3),
    ('Producer', 42000, 1),
    ('IT Manager', 62000, 2),
    ('Salesperson', 35000, 4),
    ('Web Guru', 45000, 2),
    ('HR Manager', 42000, 6),
    ('Development Assistant', 37000, 5),
    ('Director of Development', 58000, 4),
    ('Art Director', 52000, 7),
    ('Director of Broadcast Ops', 72000, 2);

-- INSERT INTO manager (employee_id)
-- VALUES 
--     (3),
--     (4),
--     (5),
--     (6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Danny', 'Brandon', 5, 3),
    ('Casey', 'Brenner', 7,  4),
    ('Chris', 'Johnson', 9, Null),
    ('Marco', 'Beerer', 3, 3),
    ('Phil', 'Hotdog', 10, Null),
    ('Lilah', 'Kelsey', 5, Null);