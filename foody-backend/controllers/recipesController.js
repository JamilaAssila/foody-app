const db = require('../models/db');

const getAllRecipes = (req, res) => {
    db.query('SELECT * FROM recipes', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

module.exports = { getAllRecipes };
