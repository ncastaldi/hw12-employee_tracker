USE employeesDB;

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;

-- View Employee By Last Name
SELECT last_name, first_name, role_id, manager_id FROM employees
ORDER BY last_name;

-- View Employee By Manager
SELECT * FROM employees
ORDER BY manager_id;

-- View Departments
SELECT name FROM departments
ORDER BY name;

-- View Roles
SELECT title FROM roles
ORDER BY title;

-- List of managers
SELECT id, first_name, last_name FROM employees
WHERE manager_id != 'NULL'
ORDER BY last_name; 

-- List of managers and roles
SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id, roles.id, roles.title
FROM employees, roles
WHERE manager_id != 'NULL'
ORDER BY last_name; 