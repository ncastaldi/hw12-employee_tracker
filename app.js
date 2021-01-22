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

        const queryString = `SELECT * FROM employees, roles WHERE manager_id != 'NULL';`;

        c.query(queryString, (err, data) => {
            if (err) throw err;

            console.table(data);
            console.log("Data length: " + data.length);
            let tempArray1 = [];
            let currentRoles = [];
            let currentManagers = [];
            let managerNames = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].id === 1) {
                    currentManagers.push(
                        {
                            empId: i,
                            firstName: data[i].first_name,
                            lastName: data[i].last_name
                        }
                    )

                }
                if (data[i].role_id === 1) {
                    currentRoles.push(
                        {
                            roleId: i,
                            roleTitle: data[i].title
                        }
                    )
                }
            }

            // for (let i = 0; i < currentManagers; i++) {
            //     console.log(currentManagers[i].empId);
            //     currentRoles[i].roleId.valueOf = i;
            // }

            console.log(currentManagers);
            console.log(currentRoles);

            // for (let i = 0; i < data.length; i++) {
            //     managerNames.push(data[i].first_name + " " + data[i].last_name);
            // }

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
                        choices: managerNames,
                        name: "newManager"
                    },
                ]
            ).then(({ fName, lName, newManager }) => {
                console.log(`Employee: ${fName} ${lName} - Manager: ${newManager}`);

                const mgrId = currentManagers.find(function (currentManagers) {
                    return currentManagers.id;
                });

                const queryString = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

                // c.query(queryString, [fName, lName, ROLE_ID, mgrId], (err, data) => {
                //     if (err) throw err;

                //     console.log(data);
                // });
            })
        })

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
        queryString = `SELECT * FROM employees ORDER BY last_name;`;

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
        // Clear screen before prompting user
        clear();

        // Display sub-level Update menu

        // Query db for list of employees
        // Ask user to select employee from list
        // Query db for list of role titles
        // Ask user to select new title from list


        inquirer.prompt(
            [
                {
                    type: "list",
                    message: "UPDATE MENU | Make a Selection:",
                    choices: ["Departments", "Employees by Last Name", "EXTRA: Employees By Manager", "Roles", "Go to Main Menu"],
                    name: "menuAction"
                }
            ]
        ).then(({ menuAction }) => {
            switch (menuAction) {
                case "Departments":
                    // view departments
                    break;
                case "Employees By Last Name":
                    // view employees by last name
                    break;
                case "EXTRA: Employees By Manager":
                    // view employees by manager
                    break;
                case "Roles":
                    // view roles
                    break;
                default:
                    // Clear screen before prompting user
                    clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        });
    },
    exit: function () {
        process.exit();
    }
}