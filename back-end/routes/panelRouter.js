const express = require("express");
const { createPanel, getAllPanels, getPanelsByVolumeId } = require("../models/panelModel");

const router = express.Router();

router.post("/", require("../middleware/auth"), async (req, res) => {
    const { volumeId, name, trackingNumber, link, status, dateCompleted, dateShipped, comment } = req.body;
    const typePanel = name.slice(0, 2);
    console.log(typePanel)
    if (!volumeId || !name) {
        return res.status(400).json({ message: "volumeId and name are required" });
    }

    try {
        const panel = await createPanel(volumeId, name, trackingNumber, link, status, dateCompleted, dateShipped, comment, typePanel);
        res.status(201).json({ message: "Panel created successfully", panel });
    } catch (err) {
        res.status(500).json({ error: "Failed to create panel", message: err.message });
    }
});

router.get("/", require("../middleware/auth"), async (req, res) => {
    try {
        const panels = await getAllPanels();
        res.status(200).json(panels);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch panels", message: err.message });
    }
});

router.get("/volume/:volumeId", require("../middleware/auth"), async (req, res) => {
    const { volumeId } = req.params;

    try {
        const panels = await getPanelsByVolumeId(volumeId);
        res.status(200).json(panels);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch panels by volumeId", message: err.message });
    }
});

module.exports = router;
