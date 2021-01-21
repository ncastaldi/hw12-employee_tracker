// Include npm dependencies
const inquirer = require("inquirer");
//const clear = require("clear");

// Include local classes
const viewMenu = require("./viewMenu.js");

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
                    this.updateSubMenu();
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
                    // create department
                    break;
                case "Employee":
                    // create employee
                    break;
                case "Role":
                    // create role
                    break;
                default:
                    // Clear screen before prompting user
                    //clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        });

    },
    viewSubMenu: function () {
        // Clear screen before prompting user
        //clear();

        // Display sub-level View menu
        inquirer.prompt(
            [
                {
                    type: "list",
                    message: "VIEW MENU | Make a Selection:",
                    choices: ["Departments", "Employees by Last Name", "EXTRA: Employees By Manager", "Roles", "Go to Main Menu"],
                    name: "viewMenuAction"
                }
            ]
        ).then(({ viewMenuAction }) => {
            switch (viewMenuAction) {
                case "Departments":
                    // view departments
                    break;
                case "Employees by Last Name":
                    // view departments
                    viewMenu.viewByLastName();
                    break;
                case "EXTRA: Employees By Manager":
                    // view employees by manager
                    break;
                case "Roles":
                    // view roles
                    break;
                default:
                    // Clear screen before prompting user
                    //clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        });
    },
    updateSubMenu: function () {
        // Clear screen before prompting user
        //clear();

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
                    //clear();

                    // Return user to main menu
                    this.mainMenu();
            }
        });
    },
    exit: function () {
        process.exit();
    }
}