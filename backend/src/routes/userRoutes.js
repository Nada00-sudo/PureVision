import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Routes protégées : il faut être connecté
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

// Route Bonus protégée uniquement pour les admins
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: "Bienvenue sur la zone admin sécurisée !" });
});

export default router;
