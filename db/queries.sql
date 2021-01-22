USE employeesDB;

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;

-- View Employees with titles and salaries - By Department, By Last Name
SELECT departments.name AS Department, CONCAT (employees.first_name, ' ', employees.last_name) AS Employee, roles.title AS Title, roles.salary AS Salary
FROM employees
LEFT JOIN roles ON roles.id = employees.role_id
LEFT JOIN departments ON departments.id = roles.department_id
ORDER BY departments.name, employees.last_name;

-- View Departments with Budgets
SELECT departments.name AS Departments, SUM(roles.salary) AS "Current Budget"
FROM departments
LEFT JOIN roles ON roles.department_id = departments.id
GROUP BY departments.id;

-- View Roles
SELECT roles.title AS Roles, roles.salary AS Salary FROM roles
ORDER BY roles.title;

-- View of managers
SELECT departments.name AS Department, CONCAT (employees.first_name, ' ', employees.last_name) AS Employee, roles.title AS Title
FROM employees
LEFT JOIN roles ON departments.id = roles.department_id
LEFT JOIN roles ON roles.id = employees.role_id
WHERE employees.manager_id != 'NULL';

-- Update role
UPDATE employees
SET role_id = 4
WHERE employees.id = 13;

-- Delete Roles
DELETE FROM departments
WHERE departments.id =1;