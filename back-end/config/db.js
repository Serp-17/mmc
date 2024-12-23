const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Создаём таблицу `users`, если её ещё нет
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)`;

// Создаём таблицу `roles`, если её ещё нет
const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles (
     id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
)`;

const createUserRoles = `
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);`;

const createItems = `
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0
);`;

const createTransactions = `
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    transaction_type ENUM('add', 'remove', 'adjust') NOT NULL,
    quantity INT NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

connection.query(createUsersTable, (err) => {
    if (err) console.error("Error creating users table:", err.message);
    else console.log("Users table created or already exists");
});

connection.query(createRolesTable, (err) => {
    if (err) console.error("Error creating roles table:", err.message);
    else console.log("Roles table created or already exists");
});

connection.query(createUserRoles, (err) => {
    if (err) console.error("Error creating user_roles table:", err.message);
    else console.log("User_roles table created or already exists");
});

connection.query(createItems, (err) => {
    if (err) console.error("Error creating Items table:", err.message);
    else console.log("Items table created or already exists");
});

connection.query(createTransactions, (err) => {
    if (err) console.error("Error creating Transactions table:", err.message);
    else console.log("Transactions table created or already exists");
});

module.exports = connection;
