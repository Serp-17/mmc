const express = require('express');
const router = express.Router();
const { createStation } = require('../models/stationsModel');

// Создание новой станции
router.post('/:panel_id', require("../middleware/auth"), async (req, res) => {
    try {
        const { panel_id } = req.params; // ID панели из URL
        const { station_name } = req.query; // Название станции из query-параметра
        const qa_data = req.body; // Данные из тела запроса
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

module.exports = router;
