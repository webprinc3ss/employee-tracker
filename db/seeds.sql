use employee_db;

INSERT INTO department (name)
VALUES
('The Lair'),
('Security'),
('Onsite Lab'),
('Sales and Marketing'),
('Design and Development');


 INSERT INTO role (title , salary , department_id )
VALUES

('Evil Mastermind',55000,1),
('Evil Robot Designer',72000,5),
('Test Subject',12000,5),
('Henchman',55000,1),
('Scam Manager',28000,4);

 INSERT INTO employee (first_name, last_name, role_id ,manager_id) 
VALUES
 ('Bond','James Bond',2,NULL),
 ('Number','Two',4,Null),
 ('Pika','Chu',3,NULL),
 ('Grogu','Yoda',3,NULL),
 ('Boba','Fett',4,2);

