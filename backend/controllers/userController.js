const userModel = require('../models/userModel.js');

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.json({ user });
  } catch (error) {
    console.error("Erreur getProfile:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du profil." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { nom, email } = req.body;
    if (!nom || !email) {
      return res.status(400).json({ message: "Le nom et l'email sont requis." });
    }

    const updatedUser = await userModel.updateUserProfile(req.user.id, nom, email);
    res.json({ 
      message: "Profil mis à jour avec succès",
      user: updatedUser 
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: "Cet email est déjà utilisé par un autre compte." });
    }
    console.error("Erreur updateProfile:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du profil." });
  }
};

module.exports = { getProfile, updateProfile };