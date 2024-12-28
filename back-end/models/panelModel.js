const db = require("../config/db");

const createPanel = async (volumeId, name, trackingNumber, link, status, dateCompleted, dateShipped, comment, type) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO panels (volume_id, name, tracking_number, link, status, date_completed, date_shipped, comment, type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [volumeId, name, trackingNumber, JSON.stringify(link), status, dateCompleted, dateShipped, comment, type], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, volumeId, name, trackingNumber, link, status, dateCompleted, dateShipped, comment, type });
        });
    });
};

const getAllPanels = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM panels";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getPanelsByVolumeId = async (volumeId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM panels WHERE volume_id = ?";
        db.query(query, [volumeId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { createPanel, getAllPanels, getPanelsByVolumeId };
