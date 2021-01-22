// Include npm dependencies
const clear = require("clear");
const figlet = require('figlet');

// Include local classes
const menuSystem = require("./lib/app.js");

// Function to welcome user into app
function init() {
    // Clear screen before prompting user
    clear();

    // Display Welcome Message
    console.log(figlet.textSync('Employee\n    Manager', {
        font: 'banner',
        horizontalLayout: 'controlled smushing',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));

    // Call main menu function
    menuSystem.mainMenu();
}

init();