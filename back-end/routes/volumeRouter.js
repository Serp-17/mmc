const express = require("express");
const { createVolume, getAllVolumes } = require("../models/volumeModel");

const router = express.Router();

router.post("/volumes", require("../middleware/auth"), async (req, res) => {
    const { name, panels, progress, link } = req.body;

    if (!name || panels == null || progress == null || !link) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const volume = await createVolume(name, panels, progress, link);
        res.status(201).json({ message: "Volume created successfully", volume });
    } catch (err) {
        res.status(500).json({ error: "Failed to create volume", message: err.message });
    }
});

router.get("/volumes", require("../middleware/auth"), async (req, res) => {
    try {
        const volumes = await getAllVolumes();
        res.status(200).json(volumes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch volumes", message: err.message });
    }
});

module.exports = router;
