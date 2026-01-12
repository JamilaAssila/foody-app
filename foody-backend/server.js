// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Routes
const recettesRoutes = require("./routes/recettes");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // pour lire le JSON du frontend
app.use(express.urlencoded({ extended: true }));

// Dossier pour les images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/recettes", recettesRoutes);
app.use("/api", authRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend fonctionne !");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
