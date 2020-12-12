use employee_db;

INSERT INTO department (name)
VALUES
('Human Resources'),
('Sales'),
('On Air'),
('IT');


 INSERT INTO role (title , salary , department_id )
VALUES

('Sales Manager',55000,2),
('Web Guru',48000,4),
('Part-time host',32000,3),
('IT Manager',55000,4),
('HR admin',28000,1);

 INSERT INTO employee (first_name, last_name, role_id ,manager_id) 
VALUES
 ('Mariyn','Monroe',2,NULL),
 ('Abraham','Lincoln',2,1),
 ('Pika','Chu',1,NULL),
 ('Grogu','Yoda',3,NULL),
 ('Bruce','Lee',4,NULL);

