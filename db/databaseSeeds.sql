USE employeesDB;

INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Finance");
INSERT INTO departments (name)
VALUES ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Howard", 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Bernard", 2, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "California", 4, 7);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jan", "Levinson", 1, 2);