// Include npm dependencies
const clear = require("clear");
const inquirer = require("inquirer");
const mysql = require("mysql");

// Include local classes
const menuSystem = require("./menuSystem.js");
const viewMenuActions = require("./viewMenuActions.js");

module.exports = {
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
    addDepartment: function () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Enter the new department name:",
                    name: "newDeptName"
                }
            ]
        ).then(({ newDeptName }) => {
            // Make connection to database
            const c = this.makeConnection();

            const queryString = `INSERT INTO departments (name) VALUES (?);`;

            c.query(queryString, [newDeptName], (err, data) => {
                if (err) throw err;

                if (data.affectedRows > 0) {
                    viewMenuActions.viewDepartmentList();

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
    addEmployee: function () {
        // Make connection to database
        const c = this.makeConnection();

        const queryString = `SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id, roles.id, roles.title FROM employees, roles WHERE manager_id != 'NULL' ORDER BY last_name;`;

        c.query(queryString, (err, data) => {
            if (err) throw err;

            let tempArray1 = [];
            let currentRoles = [];
            let currentManagers = [];
            let managerNames = [];

            //console.log(data);

            for (let i = 0; i < data.length; i += 5) {
                currentManagers.push(
                    {
                        empId: i,
                        firstName: data[i].first_name,
                        lastName: data[i].last_name
                    }
                )
                if (i % 5 == 0) {
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

                const queryString = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?);`;

                // c.query(queryString, [fName, lName, ROLE_ID, mgrId], (err, data) => {
                //     if (err) throw err;

                //     console.log(data);
                // });
            })
        })

    }
}