const express = require("express");
const { createPanel, getAllPanels, getPanelsByVolumeId, updatePanel, getProjectStatistics, getPanelById } = require("../models/panelModel");

const router = express.Router();

router.post("/", require("../middleware/auth"), async (req, res) => {
    const { volumeId, name, trackingNumber, link, status, dateCompleted, dateShipped, comment } = req.body;
    const typePanel = name.slice(0, 2);
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

router.get("/:volumeId", require("../middleware/auth"), async (req, res) => {
    const { volumeId } = req.params;

    try {
        const panels = await getPanelsByVolumeId(volumeId);
        res.status(200).json(panels);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch panels by volumeId", message: err.message });
    }
});

router.get("/panel/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const panel = await getPanelById(id);

        if (!panel) {
            return res.status(404).json({ message: "Panel not found" });
        }

        res.status(200).json(panel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch panel", details: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, date_completed, date_shipped } = req.body;

    try {
        const result = await updatePanel(id, { status, date_completed, date_shipped });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Panel not found' });
        }
        res.status(200).json({ message: 'Panel updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update panel', details: err.message });
    }
});

router.get('/statistics/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const statistics = await getProjectStatistics(projectId);
        res.status(200).json(statistics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch project statistics', details: err.message });
    }
});

module.exports = router;
