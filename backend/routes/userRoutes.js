const express = require('express');
const router = express.Router();

// Import des contrôleurs et middlewares (Style CommonJS)
const { getProfile, updateProfile } = require('../controllers/userController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const { authorizeRoles } = require('../middlewares/roleMiddleware.js');

// Routes protégées : il faut être connecté
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

// Route Bonus sécurisée uniquement pour les admins
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: "Bienvenue sur la zone admin sécurisée !" });
});

module.exports = router;