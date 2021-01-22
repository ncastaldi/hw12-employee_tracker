// Include npm dependencies
const clear = require("clear");

// Include local classes
const menuSystem = require("./lib/app.js");

// Function to welcome user into app
function init() {
    // Clear screen before prompting user
    clear();

    // Call main menu function
    menuSystem.mainMenu();
}

init();