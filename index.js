// Include npm dependencies
const mysql = require("mysql");
const clear = require("clear");

// Include local classes
const menuSystem = require("./app.js");

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
    database: "employeesDB",
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

    // Call main menu function
    menuSystem.mainMenu();
}