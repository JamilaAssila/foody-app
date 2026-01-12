const express = require("express");
const router = express.Router();
const db = require("../models/db");

// POST login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT id, email, role FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            if (results.length === 0)
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });

            const user = results[0];
            res.json({
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                token: "fake-jwt-token" // plus tard remplacer par JWT réel
            });
        }
    );
} );
// POST register
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }

      db.query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, password, "user"], 
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur insertion utilisateur" });
          }

          res.json({ message: "Compte créé avec succès" });
        }
      );
    }
  );
});

module.exports = router;
