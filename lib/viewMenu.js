// Include npm dependencies
const mysql = require("mysql");
const clear = require("clear");

// Include local classes
const menuSystem = require("./menuSystem.js");

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
    viewByLastName: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT * FROM employee ORDER BY last_name;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);

            //menuSystem.mainMenu();
        });
    },
    viewDepartmentList: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT name FROM department ORDER BY name;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);

            //menuSystem.mainMenu();
        });
    },
    viewRoleList: function () {
        // Make connection to database
        const c = this.makeConnection();

        // Define query string
        queryString = `SELECT title FROM roles ORDER BY title;`;

        // Make query
        c.query(queryString, (err, data) => {
            if (err) throw err;

            // Display query results
            console.table(data);

            //menuSystem.mainMenu();
        });
    }
}