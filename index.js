const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");
const figlet = require("figlet");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Procmi*1",
    database: "employeeDB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id: ${connection.threadId}`);
    init();
});

function init() {
    clear();

    //console.log("Working so far...");

    figlet('Hello World!!', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

}

function exit() {
    connection.end();
}