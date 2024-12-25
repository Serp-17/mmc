const db = require("../config/db");

const addStock = async (itemId, userId, amount, description) => {
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE items SET quantity = quantity + ? WHERE id = ?";
        const insertTransaction = `
            INSERT INTO transactions (item_id, user_id, transaction_type, quantity, description)
            VALUES (?, ?, 'add', ?, ?)
        `;

        // Обновление количества
        db.query(updateQuery, [amount, itemId], (err) => {
            if (err) return reject(err);

            // Логирование операции
            db.query(insertTransaction, [itemId, userId, amount, description], (err) => {
                if (err) return reject(err);
                resolve(`Added ${amount} items to stock by user ${userId}`);
            });
        });
    });
};

const addItemIfNotExist = async (name, description, quantity) => {
    return new Promise((resolve, reject) => {
        const checkQuery = "SELECT * FROM items WHERE name = ?";
        db.query(checkQuery, [name], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
                const updateQuery = "UPDATE items SET quantity = quantity + ? WHERE id = ?";
                db.query(updateQuery, [quantity, results[0].id], (err) => {
                    if (err) return reject(err);
                    resolve(`Updated ${quantity} items in stock.`);
                });
            } else {
                const insertQuery = "INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)";
                db.query(insertQuery, [name, description, quantity], (err, result) => {
                    if (err) return reject(err);
                    resolve(`Added new item: ${name} with quantity: ${quantity}`);
                });
            }
        });
    });
}

const getAllStock = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM items";

        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results); // Возвращаем список всех товаров
        });
    });
};

module.exports = { addItemIfNotExist, getAllStock };
