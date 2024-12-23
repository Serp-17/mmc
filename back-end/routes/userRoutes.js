const express = require("express");
const { createUser, findUserByUsername } = require("../models/userModel");

const router = express.Router();

router.get("/profile", require("../middleware/auth"), (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
