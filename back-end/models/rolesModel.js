const db = require("../config/db");

// Добавление нового пользователя
const createRole = async (roleName) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO roles (role_name) VALUES (?)";
        db.query(query, [roleName], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, role_name: roleName });
        });
    });
};

const getAllRoles = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT role_name FROM roles";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            const roles = results.map(row => row.role_name); // Преобразуем результат в массив строк
            resolve(roles);
        });
    });
};

const addRoleToUser = async (userId, roleId) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)";
        db.query(query, [userId, roleId], (err, result) => {
            if (err) return reject(err);
            resolve({ userId, roleId });
        });
    });
};


module.exports = { createRole, getAllRoles, addRoleToUser };
