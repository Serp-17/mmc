const express = require("express");
const { createUser, findUserByUsername, getAllUsers } = require("../models/userModel");

const router = express.Router();

router.get("/profile", require("../middleware/auth"), (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
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
