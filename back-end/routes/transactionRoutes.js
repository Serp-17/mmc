// routes/transactionRoutes.js

const express = require('express');
const {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionsByItemIdWithPagination,
    getTransactionsByItemId
} = require('../models/transactionModel');
const router = express.Router();

// Создание новой транзакции
router.post('/', async (req, res) => {
    try {
        const { item_id, user_id, transaction_type, quantity, description } = req.body;

        if (!['add', 'remove'].includes(transaction_type)) {
            return res.status(400).json({ message: "Некорректный тип транзакции. Используйте 'add' или 'remove'." });
        }

        const result = await createTransaction(item_id, user_id, transaction_type, quantity, description);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании транзакции", error: error.message });
    }
});

// Получение всех транзакций
router.get('/', async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении транзакций' });
    }
});

// Получение транзакции по ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await getTransactionById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Транзакция не найдена' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении транзакции' });
    }
});

// Обновление транзакции
router.put('/:id', async (req, res) => {
    try {
        const { item_id, user_id, transaction_type, quantity, description } = req.body;
        const result = await updateTransaction(req.params.id, item_id, user_id, transaction_type, quantity, description);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Транзакция не найдена' });
        }
        res.status(200).json({ message: 'Транзакция обновлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при обновлении транзакции' });
    }
});

// Удаление транзакции
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteTransaction(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Транзакция не найдена' });
        }
        res.status(200).json({ message: 'Транзакция удалена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удалении транзакции' });
    }
});

// Получение всех транзакций для конкретного item_id
router.get('/item/:item_id', async (req, res) => {
    try {
        const { item_id } = req.params;
        const transactions = await getTransactionsByItemId(item_id);

        if (transactions.length === 0) {
            return res.status(404).json({ message: `Транзакции для item_id ${item_id} не найдены` });
        }

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении транзакций' });
    }
});

// Получение всех транзакций для конкретного item_id с пагинацией
router.get('/item/:item_id/paginated', async (req, res) => {
    try {
        const { item_id } = req.params;
        const { page = 1, limit = 10 } = req.query; // Параметры пагинации

        const transactions = await getTransactionsByItemIdWithPagination(item_id, page, limit);

        if (transactions.length === 0) {
            return res.status(404).json({ message: `Транзакции для item_id ${item_id} не найдены` });
        }

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении транзакций с пагинацией' });
    }
});

module.exports = router;
