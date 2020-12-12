const mysql = require("mysql2");
const util = require('util');
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //connecting to DataBase
    password: "Kitt3n$!",
    database: "employee_db"
});
// IF (connection) start program
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainMenu();
});

connection.query = util.promisify(connection.query);

// Show All options thru Inquirer
function mainMenu() {
    console.log("\n** Select options **\n");

    inquirer.prompt([
        {
            type: 'list',
            name: 'selectOptions',
            message: 'What would you like to do?',
            choices: [
                'View all the Departments',
                'Add a Department',
                'Delete a Department',
                'View all the Roles',
                'Add a Role',
                'Delete a Role',
                'View all Employees',
                'Add a Employee',
                'Delete a Employee',
                'Update an Employee role',
                `Update an Employee manager's name`,
                'Show Employee by department',
                'Quit'
            ]

        }
    ]).then(options => {
        switch (options.selectOptions) {
            case 'View all the Departments':
                showDepartments();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Delete a Department':
                deleteDepartment();
                break;
            case 'View all the Roles':
                showRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Delete a Role':
                deleteRole();
                break;
            case 'View all Employees':
                showEmployees();
                break;
            case 'Add a Employee':
                addEmployee();
                break;
            case 'Delete a Employee':
                deleteEmployee();
                break;
            case 'Update an Employee role':
                updateRole();
                break;
            case `Update an Employee manager's name`:
                updateManager()
                break;
            case 'Show Employee by Department':
                showEmployeebyDept();
                break;
            default:
                connection.end();
        }
    });

}
