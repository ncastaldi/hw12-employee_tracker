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