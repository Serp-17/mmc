const express = require("express");
const { getAllUsers } = require("../models/userModel");

const router = express.Router();

const db = require("../config/db");

router.get("/profile", require("../middleware/auth"), (req, res) => {
    const userId = req.user.id;
    const query = "SELECT * FROM users WHERE id = ?";


    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user profile:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];

        delete user.password;

        res.status(200).json(user);
    });
});

router.get('/', require("../middleware/auth"), async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;
