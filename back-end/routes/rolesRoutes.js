const express = require("express");
const { createRole, getAllRoles, addRoleToUser } = require("../models/rolesModel");

const router = express.Router();

router.post("/create", async (req, res) => {
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newRole = await createRole(role);
        res.status(201).json({ message: "New Role Created", user: newRole });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const newRole = await getAllRoles();
        res.status(201).json({ message: "All Roles:", data: newRole });
    } catch (err) {
        res.status(500).json({ message: "Error fetching roles:", error: err.message });
    }
});

router.post("/connect", async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        const connectRole = await addRoleToUser(userId, roleId);
        res.status(201).json({ message: "Connect role:", data: connectRole });
    } catch (err) {
        res.status(500).json({ message: "Error fetching roles:", error: err.message });
    }
});




module.exports = router;
