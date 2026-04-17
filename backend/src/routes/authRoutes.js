import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Veuillez fournir un email valide'),
    body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Veuillez fournir un email valide'),
    body('mot_de_passe').exists().withMessage('Le mot de passe est requis')
  ],
  login
);

export default router;
