const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

const pool = new Pool({
  host: "db", // Utilise "db" si tu lances via Docker Compose, ou "127.0.0.1" sur Windows
  port: 5432, // Port interne Docker
  user: "postgres",
  password: "1234",
  database: "testdb"
});

app.use(cors());
app.use(express.json());

// --- NOUVELLE ROUTE POUR TES VIDÉOS ---
app.get("/api/videos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROUTE POUR LE DÉTAIL D'UN FILM (Player) ---
app.get("/api/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur StreamNova running sur ${PORT}`);
});