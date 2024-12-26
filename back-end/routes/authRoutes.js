const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/userModel");

const router = express.Router();

// Регистрация
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExists = await findUserByUsername(username);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await createUser(username, hashedPassword);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
});

// Логин
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

module.exports = router;
