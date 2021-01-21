DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    -- FOREIGN KEY (deptID) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
--     FOREIGN KEY (role_id) REFERENCES role(id),
--     FOREIGN KEY (manager_id) REFERENCES employee(id)
);