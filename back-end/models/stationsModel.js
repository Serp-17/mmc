const db = require("../config/db");

const createStation = async (user_id, panel_id, name, qa_data) => {
    return new Promise((resolve, reject) => {
        // Шаг 1: Найти volume_id по panel_id
        const getVolumeIdQuery = "SELECT volume_id FROM panels WHERE id = ?";
        db.query(getVolumeIdQuery, [panel_id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) {
                return reject(new Error("Panel not found"));
            }
            const volume_id = results[0].volume_id;

            // Шаг 2: Создать станцию с найденным volume_id
            const query = `
                INSERT INTO stations (volume_id, user_id, panel_id, name, qa_data)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(query, [volume_id, user_id, panel_id, name, JSON.stringify(qa_data)], (err, result) => {
                if (err) return reject(err);
                resolve({
                    id: result.insertId,
                    volume_id,
                    user_id,
                    panel_id,
                    name,
                    qa_data
                });
            });
        });
    });
};

const getAllStations = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM stations";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getStationById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM stations WHERE id = ?";
        db.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = { createStation, getAllStations, getStationById };
