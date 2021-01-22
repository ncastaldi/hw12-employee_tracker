// Include npm dependencies
const inquirer = require("inquirer");
const clear = require("clear");
const mysql = require("mysql");
const table = require("console.table");

module.exports = {
    mainMenu: function () {

        // Display top-level app menu
        inquirer.prompt(
            [
                {
                    type: "list",
                    message: "MAIN MENU | Make a Selection:",
                    choices: ["Add", "View", "Update Roles", "EXTRA: Delete", "EXTRA: View Department Budget Utilization", "Exit"],
                    name: "mainMenuAction"
                }
            ]
        ).then(({ mainMenuAction }) => {
            switch (mainMenuAction) {
                case "Add":
                    this.addSubMenu();
                    break;
                case "View":
                    this.viewSubMenu();
                    break;
                case "Update Roles":
                    this.updateEmployeeRole();
                    break;
                case "EXTRA: Delete":
                    // deleteSubMenu();
                    break;
                case "EXTRA: View Department Budget Utilization":
                    // displayBudgets();
                    break;
                default:
                    this.exit();
            }
        });
    },
    makeConnection: function () {
        const connection = mysql.createConnection({
            // Declare host address
            host: "localhost",

            // Declare port number
            port: 3306,

            // Declare username
            user: "root",

            // Declare password
            password: "Procmi*1",

            // Declare database name
            database: "employeesDB",
        });

        return connection;
    },
    addSubMenu: function () {
        // Clear screen before prompting user
        //clear();

        // Display sub-level Add menu
        inquirer.prompt(
            [
                {
                    type: "list",
                    message: "ADD MENU | Make a Selection:",
                    choices: ["Department", "Employee", "Role", "Go to Main Menu"],
                    name: "menuAction"
                }
            ]
        ).then(({ menuAction }) => {
            switch (menuAction) {
                case "Department":
                    this.addDepartment();
                    break;
                case "Employee":
                    this.addEmployee();
                    break;
                case "Role":
                    this.addRole();
                    break;
                default:
                    // Clear screen before prompting user
                    clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        });

    },
    addDepartment: function () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Enter the new department name:",
                    name: "newDeptName"
                },
            ]
        ).then(({ newDeptName }) => {
            // Make connection to database
            const c = this.makeConnection();

            const queryString = `INSERT INTO departments (name) VALUES (?);`;

            c.query(queryString, [newDeptName], (err, data) => {
                if (err) throw err;

                if (data.affectedRows > 0) {
                    //viewMenuActions.viewDepartmentList();

                    inquirer.prompt(
                        [
                            {
                                type: "list",
                                message: "Please make a selection:",
                                choices: ["Create another department", "Return to ADD Menu", "Return to MAIN Menu"],
                                name: "menuSelection"
                            }
                        ]
                    ).then(({ menuSelection }) => {
                        switch (menuSelection) {
                            case "Create another department":
                                this.addDepartment();
                                break;
                            case "Return to ADD Menu":
                                this.addSubMenu();
                                break;
                            case "Return to MAIN Menu":
                                this.mainMenu();
                                console.log("Return to MAIN Menu");
                                break;
                        }
                    })
                } else {
                    console.log("Update Failed.");
                }
            })
        })
    },
    addEmployee: function () {
        // Make connection to database
        const c = this.makeConnection();

        const employeeQuery = `SELECT * FROM employees;`;
        const roleQuery = `SELECT * FROM roles;`;

        c.query(employeeQuery, (err, data) => {
            if (err) throw err;
            const currentManagers = data.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                };
            });
            c.query(roleQuery, (err, data) => {
                if (err) throw err;
                const currentRoles = data.map((role) => {
                    return { name: role.title, value: role.id };
                });

                inquirer.prompt(
                    [
                        {
                            type: "input",
                            message: "Enter employee's first name: ",
                            name: "fName"
                        },
                        {
                            type: "input",
                            message: "Enter employee's last name: ",
                            name: "lName"
                        },
                        {
                            type: "list",
                            message: "Select employee's manager: ",
                            choices: currentManagers,
                            name: "newManager"
                        },
                        {
                            type: "list",
                            message: "Select employee's title: ",
                            choices: currentRoles,
                            name: "newRole"
                        },
                    ]
                ).then(({ fName, lName, newManager, newRole }) => {
                    console.log(`Employee: ${fName} ${lName} - Role: ${newRole} - Manager: ${newManager}`);

                    const updateString = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

                    c.query(updateString, [fName, lName, newRole, newManager], (err, data) => {
                        if (err) throw err;

                        if (data.affectedRows > 0) {
                            console.log("New Employee Added Successfully!");
                        } else {
                            console.log("ACTION FAILED");
                        }

                        c.end();

                        inquirer.prompt(
                            [
                                {
                                    type: "list",
                                    choices: ["Add another employee", "Return to ADD Menu", "Return to MAIN Menu"],
                                    name: "menuAction"
                                }
                            ]
                        ).then((({ menuAction }) => {

                            console.log(menuAction);
                        }));
                    });
                })
            });
        });
    },
    addRole: function () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Enter the new role title:",
                    name: "newRoleTitle"
                },
                {
                    type: "input",
                    message: "Enter current salary for this role: ",
                    name: "newSalary"
                }
            ]
        ).then(({ newRoleTitle, newSalary }) => {
            // Make connection to database
            const c = this.makeConnection();

            const queryString = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`;

            c.query(queryString, [newRoleTitle, newSalary, 1], (err, data) => {
                if (err) throw err;

                if (data.affectedRows > 0) {
                    viewMenuActions.viewRoleList();

                    inquirer.prompt(
                        [
                            {
                                type: "list",
                                message: "Please make a selection:",
                                choices: ["Create another role", "Return to ADD Menu", "Return to MAIN Menu"],
                                name: "menuSelection"
                            }
                        ]
                    ).then(({ menuSelection }) => {
                        switch (menuSelection) {
                            case "Create another department":
                                this.addRole();
                                break;
                            case "Return to ADD Menu":
                                menuSystem.addSubMenu();
                                break;
                            case "Return to MAIN Menu":
                                menuSystem.mainMenu();
                                console.log("Return to MAIN Menu");
                                break;
                        }
                    })
                } else {
                    console.log("Update Failed.");
                }
            })
        })
    },
    viewSubMenu: function () {
        // Clear screen before prompting user
        clear();

        // Display sub-level View menu
        inquirer.prompt(
            [
                {
                    type: "list",
                    message: "VIEW MENU | Make a Selection:",
                    choices: ["Departments", "Employees", "EXTRA: Employees By Manager", "Roles", "Go to Main Menu"],
                    name: "viewMenuAction"
                }
            ]
        ).then(({ viewMenuAction }) => {
            switch (viewMenuAction) {
                case "Departments":
                    this.viewDepartments();
                    break;
                case "Employees":
                    this.viewEmployees();
                    break;
                case "EXTRA: Employees By Manager":
                    // view employees by manager
                    break;
                case "Roles":
                    this.viewRoles();
                    break;
                default:
                    // Clear screen before prompting user
                    clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        })
    },
    viewDepartments: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT name FROM departments ORDER BY name;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);

            inquirer.prompt(
                [
                    {
                        type: "list",
                        message: "Please make a selection:",
                        choices: ["Return to VIEW Menu", "Return to MAIN Menu"],
                        name: "menuSelection"
                    }
                ]
            ).then(({ menuSelection }) => {
                switch (menuSelection) {
                    case "Return to VIEW Menu":
                        this.viewSubMenu();
                        break;
                    case "Return to MAIN Menu":
                        // Clear screen before prompting user
                        clear();

                        // Return user to main menu
                        this.mainMenu();
                }
            })
        });
    },
    viewEmployees: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT employees.first_name, employees.last_name, roles.title, roles.salary FROM employees LEFT JOIN roles ON roles.id = employees.role_id ORDER BY last_name;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);
            table

            inquirer.prompt(
                [
                    {
                        type: "list",
                        message: "Please make a selection:",
                        choices: ["Return to VIEW Menu", "Return to MAIN Menu"],
                        name: "menuSelection"
                    }
                ]
            ).then(({ menuSelection }) => {
                switch (menuSelection) {
                    case "Return to VIEW Menu":
                        this.viewSubMenu();
                        break;
                    case "Return to MAIN Menu":
                        // Clear screen before prompting user
                        clear();

                        // Return user to main menu
                        this.mainMenu();
                }
            })
        });
    },
    viewRoles: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT title FROM roles ORDER BY title;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);

            inquirer.prompt(
                [
                    {
                        type: "list",
                        message: "Please make a selection:",
                        choices: ["Return to VIEW Menu", "Return to MAIN Menu"],
                        name: "menuSelection"
                    }
                ]
            ).then(({ menuSelection }) => {
                switch (menuSelection) {
                    case "Return to VIEW Menu":
                        this.viewSubMenu();
                        break;
                    case "Return to MAIN Menu":
                        // Clear screen before prompting user
                        clear();

                        // Return user to main menu
                        this.mainMenu();
                }
            })
        });
    },
    updateEmployeeRole: function () {
        // Make connection to database
        const c = this.makeConnection();

        const employeeQuery = `SELECT * FROM employees;`;
        const roleQuery = `SELECT * FROM roles;`;

        c.query(employeeQuery, (err, data) => {
            if (err) throw err;
            const employeeList = data.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                };
            });
            c.query(roleQuery, (err, data) => {
                if (err) throw err;
                const currentRoles = data.map((role) => {
                    return { name: role.title, value: role.id };
                });

                inquirer.prompt(
                    [
                        {
                            type: "list",
                            message: "Select employee to modify: ",
                            choices: employeeList,
                            name: "employeeList"
                        },
                        {
                            type: "list",
                            message: "Select employee's *NEW* title: ",
                            choices: currentRoles,
                            name: "newRole"
                        },
                    ]
                ).then(({ employeeList, newRole }) => {
                    console.log(`Employee: ${employeeList} - New Role: ${newRole}`);

                    const updateString = `UPDATE employees SET role_id = ? WHERE employees.id = ?;`;

                    c.query(updateString, [newRole, employeeList], (err, data) => {
                        if (err) throw err;

                        if (data.affectedRows > 0) {
                            console.log("New Employee Added Successfully!");
                        } else {
                            console.log("ACTION FAILED");
                        }

                        c.end();

                        inquirer.prompt(
                            [
                                {
                                    type: "list",
                                    choices: ["Add another employee", "Return to ADD Menu", "Return to MAIN Menu"],
                                    name: "menuAction"
                                }
                            ]
                        ).then((({ menuAction }) => {

                            console.log(menuAction);
                        }));
                    });
                })
            });
        });
    },
    exit: function () {
        process.exit();
    }
}