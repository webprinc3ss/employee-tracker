DROP DATABASE IF EXISTS employee_db;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS manager;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL UNIQUE,
  salary DECIMAL NOT NULL,
  department_id INTEGER(11),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(11),
  manager_id INTEGER(11),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES manager(id)
);

CREATE TABLE manager (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INTEGER(11),
    CONSTRAINT fk_employee_id FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE SET NULL
);



