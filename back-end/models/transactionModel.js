const db = require('../config/db');

// Функция для создания новой транзакции
const createTransaction = (item_id, user_id, transaction_type, quantity, description) => {
    return new Promise((resolve, reject) => {
        const transactionQuery = `
            INSERT INTO transactions (item_id, user_id, transaction_type, quantity, description)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Выполняем вставку транзакции
        db.query(transactionQuery, [item_id, user_id, transaction_type, quantity, description], (err, result) => {
            if (err) {
                return reject(err);
            }

            // Обновляем количество товара в items
            let updateQuery;
            if (transaction_type === 'add') {
                updateQuery = "UPDATE items SET quantity = quantity + ? WHERE id = ?";
            } else if (transaction_type === 'remove') {
                updateQuery = "UPDATE items SET quantity = quantity - ? WHERE id = ?";
            } else {
                return reject(new Error("Неверный тип транзакции: должен быть 'add' или 'remove'"));
            }

            db.query(updateQuery, [quantity, item_id], (err, updateResult) => {
                if (err) {
                    return reject(err);
                }
                resolve({
                    message: "Транзакция успешно создана и количество товара обновлено",
                    transactionId: result.insertId,
                    updatedRows: updateResult.affectedRows,
                });
            });
        });
    });
};

// Функция для получения всех транзакций
const getAllTransactions = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM transactions';

        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results); // Возвращаем список всех товаров
        });
    });
};

// Функция для получения транзакции по ID
const getTransactionById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM transactions WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err); // Отклоняем промис при ошибке
            }
            if (results.length === 0) {
                return resolve(null); // Если запись не найдена, возвращаем null
            }
            resolve(results[0]); // Возвращаем первую запись, так как ID уникален
        });
    });
};

// Функция для обновления транзакции
const updateTransaction = async (id, item_id, user_id, transaction_type, quantity, description) => {
    const query = `
    UPDATE transactions
    SET item_id = ?, user_id = ?, transaction_type = ?, quantity = ?, description = ?
    WHERE id = ?
  `;
    const [result] = await db.execute(query, [item_id, user_id, transaction_type, quantity, description, id]);
    return result;
};

// Функция для удаления транзакции
const deleteTransaction = async (id) => {
    const query = 'DELETE FROM transactions WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
};

// Функция для получения транзакций по item_id
const getTransactionsByItemId = async (item_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM transactions WHERE item_id = ?';
        db.query(query, [item_id], (err, results) => {
            if (err) {
                return reject(err); // Отклоняем промис при ошибке
            }
            resolve(results); // Возвращаем все записи
        });
    });
};

// Функция для получения транзакций по item_id с пагинацией
const getTransactionsByItemIdWithPagination = async (item_id, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const query = 'SELECT * FROM transactions WHERE item_id = ? LIMIT ? OFFSET ?';
    const [transactions] = await db.execute(query, [item_id, limit, offset]);
    return transactions;
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionsByItemId,
    getTransactionsByItemIdWithPagination
};
