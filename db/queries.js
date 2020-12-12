SELECT * FROM employee INNER JOIN roles on employee.role_id = roles.id;


SELECT * FROM employee INNER JOIN roles on employee.role_id = role.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary AS 'Salary',
    CONCAT(manager.first_name, " ", manager.last_name) AS Manager, department.name AS 'Department'
FROM  employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id

LEFT JOIN employee ON employee.manager_id = employee.manager_id

SELECT employee.id AS "ID", employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', roles.salary AS 'Salary', employee.manager_id AS 'Manager ID', department.name AS 'Department'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;



const employeeTable = () => {
    const query = `
SELECT employee.id AS "ID", employee.first_name AS 'First Name', employee.last_name AS 'Last Name', roles.title AS 'Title', roles.salary AS 'Salary', employee.manager_id AS 'Manager ID', departments.dept_name AS 'Department'
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN departments ON roles.department_id = department.id`;


    SELECT
    supplierid, SUM(unitsinstock)
    FROM
    products
    GROUP BY supplierid;

    SELECT * department.id, department.name, role

    FROM department,


        SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary,
            CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM  employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee  manager ON manager.id = employee.manager_id`