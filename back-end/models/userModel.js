const db = require("../config/db");

// Добавление нового пользователя
const createUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(query, [username, password], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, username });
        });
    });
};

// Поиск пользователя по username
const findUserByUsername = async (username) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = { createUser, findUserByUsername };
