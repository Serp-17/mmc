const express = require('express');
const router = express.Router();
const { createStation, getStationByPanelAndName, getAllStations } = require('../models/stationsModel');

router.post('/:panel_id', require("../middleware/auth"), async (req, res) => {
    try {
        const { panel_id } = req.params;
        const { station_name } = req.query;
        const qa_data = req.body;
        const user_id = req.user.id;

        const validNames = [
            'saw1',
            'saw2',
            'wek',
            'b-fly',
            'joist prep',
            'cassettes',
            'window station',
            'internal',
            'parapet',
        ];

        if (!station_name || !validNames.includes(station_name.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid or missing station name.' });
        }

        const stationId = await createStation(
            user_id,
            panel_id,
            station_name,
            qa_data
        );

        return res.status(201).json({
            message: 'Station created successfully',
            station_id: stationId,
        });
    } catch (error) {
        console.error('Error creating station:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/", async (req, res) => {
    try {
        const stations = await getAllStations();
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving stations", error: err.message });
    }
});

router.get("/station/:panel_id/:name", async (req, res) => {
    const { panel_id, name } = req.params;

    try {
        const station = await getStationByPanelAndName(panel_id, name);

        // if (station === null) {
        //     return res.status(404).json({ message: "Station not found" });
        // }

        return res.status(200).json(station);
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving station", error: err.message });
    }
});

module.exports = router;
