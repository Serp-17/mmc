const db = require("../config/db");

// Добавление нового пользователя
const createUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(query, [email, password], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, email });
        });
    });
};

// Поиск пользователя по username
const findUserByUsername = async (email) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { createUser, findUserByUsername, getAllUsers };
