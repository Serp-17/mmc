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

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100),
        email VARCHAR(255) NOT NULL UNIQUE,
        address TEXT,
        password VARCHAR(255) NOT NULL,
        date_of_birth DATE,
        phone_number VARCHAR(15),
        start_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
`;

connection.query(createUsersTable, (err) => {
    if (err) console.error("Error creating users table:", err.message);
    else console.log("Users table created or already exists");
});

const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles (
     id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
)`;

connection.query(createRolesTable, (err) => {
    if (err) console.error("Error creating roles table:", err.message);
    else console.log("Roles table created or already exists");
});

const createUserRoles = `
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);`;

connection.query(createUserRoles, (err) => {
    if (err) console.error("Error creating user_roles table:", err.message);
    else console.log("User_roles table created or already exists");
});

const createItems = `
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0
);`;

connection.query(createItems, (err) => {
    if (err) console.error("Error creating Items table:", err.message);
    else console.log("Items table created or already exists");
});

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

connection.query(createTransactions, (err) => {
    if (err) console.error("Error creating Transactions table:", err.message);
    else console.log("Transactions table created or already exists");
});

const createVolumesTable = `
    CREATE TABLE IF NOT EXISTS volumes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        panels INT NOT NULL DEFAULT 0,
        progress INT NOT NULL DEFAULT 0,
        link TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

connection.query(createVolumesTable, (err) => {
    if (err) console.error("Error creating volumes table:", err.message);
    else console.log("Volumes table created or already exists");
});

const createPanelsTable = `
    CREATE TABLE IF NOT EXISTS panels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        volume_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        tracking_number VARCHAR(100),
        link JSON,
        status ENUM('null', 'in progress', 'qa', 'done') DEFAULT 'null',
        date_completed DATE,
        date_shipped DATE,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (volume_id) REFERENCES volumes(id) ON DELETE CASCADE
    );
`;

connection.query(createPanelsTable, (err) => {
    if (err) console.error("Error creating panels table:", err.message);
    else console.log("Panels table created or already exists");
});

module.exports = connection;
