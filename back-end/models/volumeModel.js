const db = require("../config/db");

const createVolume = async (name, panels, progress, link) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO volumes (name, panels, progress, link)
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [name, panels, progress, link], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, name, panels, progress, link });
        });
    });
};

const getAllVolumes = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM volumes";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { createVolume, getAllVolumes };
