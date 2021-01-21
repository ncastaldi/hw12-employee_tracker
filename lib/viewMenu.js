// Include npm dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");

module.exports = {
    viewByLastName: function () {
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
        queryString = `SELECT * FROM employee ORDER BY last_name;`
        connection.query(queryString, (err, data) => {
            if (err) throw err;

            console.table(data);
            //mainMenu();
        });
    }
}