const pool = require('../config/db');

// Récupérer une vidéo pour le Player (Page détail)
exports.getVideoDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Vidéo non trouvée" });
        
        res.json(result.rows[0]); // Contient le titre, description et l'URL MinIO
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};