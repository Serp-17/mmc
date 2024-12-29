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

const getPanelById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM panels WHERE id = ?";
        db.query(query, [id], (err, results) => {
            if (err) return reject(err);

            if (results.length === 0) {
                return resolve(null); // Если панель не найдена
            }

            resolve(results[0]); // Возвращаем первую найденную панель
        });
    });
};

const updatePanel = async (id, updates) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        if (updates.status) {
            fields.push('status = ?');
            values.push(updates.status);
        }
        if (updates.date_completed) {
            fields.push('date_completed = ?');
            values.push(updates.date_completed);
        }
        if (updates.date_shipped) {
            fields.push('date_shipped = ?');
            values.push(updates.date_shipped);
        }

        if (fields.length === 0) {
            return reject(new Error('No updates provided.'));
        }

        values.push(id);

        const query = `
            UPDATE panels
            SET ${fields.join(', ')}
            WHERE id = ?
        `;

        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


const getProjectStatistics = async (projectId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                type,
                COUNT(*) AS totalCount,
                SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS doneCount
            FROM panels
            WHERE volume_id = ?
            GROUP BY type WITH ROLLUP
        `;

        db.query(query, [projectId], (err, results) => {
            if (err) return reject(err);

            const statistics = {
                totalPanels: 0,
                panelDone: 0,
                panelTypes: []
            };

            results.forEach((row) => {
                if (row.type === null) {
                    statistics.totalPanels = row.totalCount;
                    statistics.panelDone = row.doneCount || 0;
                } else {
                    statistics.panelTypes.push({
                        type: row.type,
                        count: row.totalCount,
                        panelDone: row.doneCount || 0
                    });
                }
            });

            resolve(statistics);
        });
    });
};

module.exports = { createPanel, getAllPanels, getPanelsByVolumeId, updatePanel, getProjectStatistics, getPanelById };
