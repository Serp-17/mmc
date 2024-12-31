const db = require("../config/db");

const createStation = async (user_id, panel_id, name, qa_data) => {
    return new Promise((resolve, reject) => {
        const getVolumeIdQuery = "SELECT volume_id FROM panels WHERE id = ?";
        db.query(getVolumeIdQuery, [panel_id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) {
                return reject(new Error("Panel not found"));
            }
            const volume_id = results[0].volume_id;

            // SQL запрос с использованием ON DUPLICATE KEY UPDATE
            const query = `
                INSERT INTO stations (volume_id, user_id, panel_id, name, qa_data)
                VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                                         user_id = VALUES(user_id),
                                         qa_data = VALUES(qa_data)
            `;
            db.query(query, [volume_id, user_id, panel_id, name, JSON.stringify(qa_data)], (err, result) => {
                if (err) return reject(err);
                resolve({
                    id: result.insertId || result.insertId, // Если вставка, возвращаем insertId, если обновление, возвращаем id обновленной записи
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

const getStationByPanelAndName = async (panel_id, name) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM stations 
            WHERE panel_id = ? AND name = ?
        `;
        db.query(query, [panel_id, name], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
};

module.exports = { createStation, getAllStations, getStationById, getStationByPanelAndName };
