const pool = require('../config/db');

// Sauvegarder où l'utilisateur s'est arrêté (Historique)
exports.saveProgress = async (req, res) => {
    const { video_id, timestamp } = req.body; // Temps en secondes
    try {
        await pool.query(
            'INSERT INTO historique (video_id, temps_arret) VALUES ($1, $2) ON CONFLICT (video_id) DO UPDATE SET temps_arret = $2',
            [video_id, timestamp]
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: "Erreur historique" });
    }
};