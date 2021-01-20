// Include npm dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");
const figlet = require("figlet");

// Include local classes


// Create connection to database
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
    database: "employeeDB",
});

// Make connection to database
connection.connect((err) => {
    // Throw error if an error occurs
    if (err) throw err;

    // Alert user app is connected successfully at 'threadId'
    console.log(`connected as id: ${connection.threadId}`);

    // Initialize app
    init();
});

// Function to welcome user into app
function init() {
    // Clear screen before prompting user
    clear();

    // Declare welcome message
    const welcomeMsg = "Employee Manager 9000";

    // Display welcome message in 'Ascii Art'
    // figlet(welcomeMsg, function (err, data) {
    //     // Throw error if an error occurs
    //     if (err) {
    //         console.log('Something went wrong...');
    //         console.dir(err);
    //         return;
    //     }
    //     console.log(data)
    // });

    // Call main menu function
    mainMenu();
}

function mainMenu() {
    // Display top-level app menu
    inquirer.prompt(
        [
            {
                type: "list",
                message: "MAIN MENU | Make a Selection:",
                choices: ["Add", "View", "Update Roles", "EXTRA: Delete", "EXTRA: View Department Budget Utilization", "Exit"],
                name: "menuAction"
            }
        ]
    ).then(({ menuAction }) => {
        switch (menuAction) {
            case "Add":
                addSubMenu();
                break;
            case "View":
                viewSubMenu();
                break;
            case "Update Roles":
                // updateSubMenu();
                break;
            case "EXTRA: Delete":
                // deleteSubMenu();
                break;
            case "EXTRA: View Department Budget Utilization":
                // displayBudgets();
                break;
            default:
                connection.end();
        }
    });
}

function addSubMenu() {
    // Clear screen before prompting user
    clear();

    // Display sub-level Add menu
    inquirer.prompt(
        [
            {
                type: "list",
                message: "ADD | Make a Selection:",
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
                clear();

                // Return user to main menu
                mainMenu();
        }
    });

}

function viewSubMenu() {
    // Clear screen before prompting user
    clear();

    // Display sub-level Add menu
    inquirer.prompt(
        [
            {
                type: "list",
                message: "VIEW | Make a Selection:",
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
                mainMenu();
        }
    });

}


function exit() {
    connection.end();
}