const express = require("express");
const router = express.Router();
const db = require("../models/db");
const multer = require("multer");
const path = require("path");

// CONFIG UPLOAD IMAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET toutes les recettes
router.get("/", (req, res) => {
  db.query("SELECT * FROM recettes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET une recette par ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM recettes WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) return res.status(404).json({ message: "Recette introuvable !" });
  
      const recette = results[0];
  
      res.json(recette);
    });
  });

// POST ajouter recette
router.post("/", upload.single("image"), (req, res) => {
  const { nom, description, ingredients, instructions } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `INSERT INTO recettes (nom, description, ingredients, instructions, image)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nom, description, ingredients, instructions, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Recette ajoutée !" });
  });
});

// DELETE recette
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM recettes WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Recette supprimée" });
  });
});
// UPDATE recette
router.put("/:id", upload.single("image"), (req, res) => {
  const { nom, description, ingredients, instructions } = req.body;
  const { id } = req.params;

  let sql;
  let values;

  if (req.file) {
    // avec nouvelle image
    sql = `
      UPDATE recettes 
      SET nom=?, description=?, ingredients=?, instructions=?, image=?
      WHERE id=?
    `;
    values = [
      nom,
      description,
      ingredients,
      instructions,
      req.file.filename,
      id,
    ];
  } else {
    // sans image
    sql = `
      UPDATE recettes 
      SET nom=?, description=?, ingredients=?, instructions=?
      WHERE id=?
    `;
    values = [nom, description, ingredients, instructions, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ message: "Erreur modification" });
    res.json({ message: "Recette modifiée avec succès" });
  });
});
module.exports = router;
