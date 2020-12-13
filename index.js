const mysql = require("mysql2");
const util = require('util');
const inquirer = require("inquirer");
var figlet = require('figlet');
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
    init();
});

connection.query = util.promisify(connection.query);

init = () => {
    figlet('Evil Inc. Employee Tracker', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        mainMenu();
    });
}

// Show All options thru Inquirer
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectOptions',
            message: 'What would you like to do?',
            choices: [
                'View all the Departments',
                'Show Employee by Department',
                'Add a Department',
                'Delete a Department',
                new inquirer.Separator(),
                'View all the Roles',
                'Add a Role',
                'Delete a Role',
                new inquirer.Separator(),
                'View all Employees',
                'Add an Employee',
                'Delete an Employee',
                `Update an Employee's role`,
                `Update an Employee's manager`,
                new inquirer.Separator(),
                'Quit',
                new inquirer.Separator(),
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
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Delete an Employee':
                deleteEmployee();
                break;
            case `Update an Employee's role`:
                updateRole();
                break;
            case `Update an Employee's manager`:
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


// show all departments
showDepartments = () => {
    //sql consult select
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        if (res.length > 0) {
            console.log('\n')
            console.log(' ** Departments **')
            console.table(res);
        }
        //callback the mainMenu
        mainMenu();
    });
}

// show all the role info 
showRoles = () => {
    connection.query(`SELECT role.title AS job_title,role.id,department.name AS department_name,role.salary  FROM  role LEFT JOIN department ON role.department_id=department.id`,
        (err, res) => {

            if (err) throw err;

            if (res.length > 0) {
                console.log('\n')
                console.log(' ** Roles **')
                console.log('\n')
                console.table(res);
            }
            //callback the mainMenu
            mainMenu();
        });
}
// show all the employee info
showEmployees = () => {
    //query consult select
    connection.query(`SELECT employee.id AS "ID", employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', role.salary AS 'Salary', employee.manager_id AS 'Manager ID', department.name AS 'Department'
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`, (err, res) => {
        // console.log(res);

        if (err) throw err;

        if (res.length > 0) {
            console.log('\n')
            console.log('** Employees **')
            console.log('\n')
            console.table(res);
        }
        //Call mainMenu
        mainMenu();
    });

}

//select first name, last name  and id from employee table and back a object array
const helperEmpManager = async () => {
    let res = await connection.query(`SELECT CONCAT(employee.first_name," " ,employee.last_name) AS fullName, employee.id FROM employee`)
    let employeeName = [];
    res.forEach(emp => {
        //save on the list a object
        employeeName.push({ name: emp.fullName, value: emp.id })
    })

    return employeeName;

}

//select all from department table and back a object array (department name and id)
const helperArray = async () => {
    let res = await connection.query(`SELECT * FROM department `)
    let deptChoice = [];

    res.forEach(dept => {
        //save on the list a object
        deptChoice.push({ name: dept.name, value: dept.id });
    })

    return deptChoice;

}

//select title and  id from role table and back a object array
const helperEmployee = async () => {
    let res = await connection.query(`SELECT role.title,role.id FROM role `)
    let roleChoice = [];

    res.forEach(roles => {
        //save on the list a object
        roleChoice.push({ name: roles.title, value: roles.id })
    })

    return roleChoice;

}


//add a department to the datebase
const addDepartment = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'nameDept',
            message: 'What is the department name?',
            validate: name => {           //validation the entry
                if (name) {
                    return true;
                } else {
                    console.log('\n Please enter a department name!');
                    return false;
                }
            }
        }
    ])
        .then(answers => {
            let nameDepartment = answers.nameDept;
            //sql consult insert
            connection.query('INSERT INTO department SET name=? ', [nameDepartment], (err, res) => {
                if (err) throw err;

                //print the info tell the user 1 department was inserted
                console.log(nameDepartment + ' Department added!\n');

                //call the mainMenu for show a question again
                mainMenu();
            })
        })
}

//Delete department
const deleteDepartment = async () => {
    //return a list department names
    let roleNames = await helperArray();
    inquirer.prompt([

        {
            type: 'list',
            name: 'deptDelete',
            message: 'Select the department for deletion.',
            choices: roleNames

        }
    ])
        .then(answers => {
            let deleteId = answers.deptDelete;
            //sql consult delete
            connection.query('DELETE FROM department WHERE id=? ', [deleteId], (err, res) => {
                if (err) throw err;

                console.log('Department deleted!\n');
                mainMenu();
            })
        })
}

// add role info
const addRole = async () => {
    //the function back a array with all the departments name
    let deptChoiceRes = await helperArray();

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role?',
            validate: name => {           //validation the entry
                if (name) {
                    return true;
                } else {
                    console.log('\n Please enter a title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?',
            validate: salaryInput => {           //validation the entry
                if (salaryInput) {
                    return true;
                } else {
                    console.log('\n Please enter a salary!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'deptId',
            message: 'Select the department for that roll?',
            choices: deptChoiceRes

        }
    ])
        .then(answers => {
            let title = answers.title;
            let salary = answers.salary;
            let id = answers.deptId;

            //query insert a role
            connection.query('INSERT INTO role SET title=?,salary=?,department_id=? ', [title, salary, id], (err, res) => {
                if (err) throw err;
                console.log(title + ' Role added!\n');
                mainMenu();
            })
        })
}

// delete a role from the table 
const deleteRole = async () => {
    let rolesName = await helperEmployee();
    inquirer.prompt([

        {
            type: 'list',
            name: 'roleDelete',
            message: 'Select a role for deletion.',
            choices: rolesName
        }

    ])
        .then(answers => {
            let deleteId = answers.roleDelete;
            //sql consult delete 
            connection.query('DELETE FROM role WHERE id=? ', [deleteId], (err, res) => {
                if (err) throw err;

                console.log('The ' + answers.roleDelete + 'was deleted!\n');
                mainMenu();
            })
        })
}

//add an employee to the date base
const addEmployee = async () => {
    let employeeNames = await helperEmpManager();
    let rolesName = await helperEmployee();

    inquirer.prompt([

        {
            type: 'input',
            name: 'name',
            message: 'What is the employee first name?',
            validate: name => {           //validation the entry
                if (name) {
                    return true;
                } else {
                    console.log('\n Please enter the first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee last name?',
            validate: lastnameInput => {           //validation the entry
                if (lastnameInput) {
                    return true;
                } else {
                    console.log('\n Please enter the last name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'selectRole',
            message: 'Select a role for an employee',
            choices: rolesName
        },
        // Table of Contents
        {
            type: 'confirm',
            name: 'confirmManager',
            message: 'Have a manager?',
            default: false,
        },

        {
            type: 'list',
            name: 'manId',
            message: 'Have a manager?',
            choices: employeeNames,
            when: ({ confirmManager }) => confirmManager
        }

    ])
        .then(answers => {
            //taking the value entry for the prompt
            let name = answers.name;
            let last = answers.lastName;
            let roleIdEmp = answers.selectRole;
            //manager id can be null to
            let managerId = answers.manId || null;

            //insert  an employee
            connection.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=? ', [name, last, roleIdEmp, managerId], (err, res) => {
                if (err) throw err;
                console.log(' Employee ' + name + " added!");
                mainMenu();
            })
        })
}

//delete an employee info from a table used a id
const deleteEmployee = async () => {

    let employees = await helperEmpManager();
    inquirer.prompt([

        {
            type: 'list',
            name: 'empDelete',
            message: 'Select an employee for deletion.',
            choices: employees

        }

    ])
        .then(answers => {
            let deleteId = answers.empDelete;
            //sql consult delete employee
            connection.query('DELETE FROM employee WHERE id=? ', [deleteId], (err, res) => {
                if (err) throw err;

                console.log('Employee deleted!\n');
                mainMenu();
            })
        })
}

//update employee role
const updateRole = async () => {
    //call the functions back an employee names,id and roles names,id
    let employeeNames = await helperEmpManager();
    let rolesName = await helperEmployee();

    inquirer.prompt([

        {   //show a list with array employee names   
            type: 'list',
            name: 'employeeName',
            message: 'Select an employee to update his or her role',
            choices: employeeNames

        },
        { //show a list with the roles names
            type: 'list',
            name: 'selectRole',
            message: 'Select a new role for an employee',
            choices: rolesName
        }

    ])
        .then(answers => {
            let empName = answers.employeeName;
            let newrole = answers.selectRole;
            //query consult update role for an employee
            connection.query('UPDATE employee SET employee.role_id= ? WHERE employee.id=?', [newrole, empName], (err, res) => {
                if (err) throw err;


                console.log(' Employee updated role changed!\n');

                //call the mainMenu for show a question again
                mainMenu();
            })
        })
};


const updateManager = async () => {
    let namesEmpManager = await helperEmpManager();

    inquirer.prompt([

        {   //show a list with array employee names   
            type: 'list',
            name: 'employee',
            message: 'Choose an employee to update his/her manager',
            choices: namesEmpManager

        },
        { //show a list with the roles names
            type: 'list',
            name: 'manager',
            message: 'Select a manager name',
            choices: namesEmpManager
        }

    ])
        .then(answers => {
            let empName = answers.employee;
            let newManager = answers.manager;
            //query consult update role for an employee
            connection.query('UPDATE employee SET employee.manager_id= ? WHERE employee.id=?', [newManager, empName], (err, res) => {
                if (err) throw err;


                console.log("Employee's manager has been updated!");

                //call the mainMenu for show a question again
                mainMenu();
            })
        })
}

//show employees by department
const showEmployeebyDept = async () => {
    //return a list department names
    let deptnames = await helperArray();

    inquirer.prompt([

        {
            type: 'list',
            name: 'ShowED',
            message: 'View all employees in a department!',
            choices: deptnames

        }
    ])
        .then(answers => {
            let deptID = answers.ShowED;
            //query for select from all tables info    
            connection.query('SELECT employee.id, employee.first_name, employee.last_name,role.title FROM employee LEFT JOIN role ON employee.role_id=role.id  LEFT JOIN department department on role.department_id = department.id  WHERE department.id=? ', [deptID], (err, res) => {
                if (err) throw err;
                if (res.length > 0) {

                    console.log('\n')
                    console.log('** Employees by Department **')
                    console.table(res);
                }
                else {
                    //if no employees
                    console.log('\n')
                    console.log('** Employees by Department **')
                    console.log('There are no employees in that department now')
                    console.log('\n')
                }
                mainMenu();
            })
        })
}

