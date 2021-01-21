USE employeesDB;

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