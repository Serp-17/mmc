const express = require("express");
const { addItemIfNotExist } = require("../models/storageModel");

const router = express.Router();

router.post("/add", require("../middleware/auth"), async (req, res) => {
    const { name, description, quantity } = req.body;
    if (!name || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newRole = await addItemIfNotExist(name, description, quantity);
        res.status(201).json({ message: "New Role Created", user: newRole });
    } catch (err) {
        res.status(500).json({ message: "Error store", error: err.message });
    }

});

module.exports = router;
