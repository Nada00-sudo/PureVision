import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import * as userModel from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_netflix_clone_key';
const JWT_EXPIRES_IN = '24h';

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nom, email, mot_de_passe, role } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);
    const userRole = (role === 'admin') ? 'admin' : 'user';

    const newUser = await userModel.createUser(nom, email, hashedPassword, userRole);
    const token = generateToken(newUser.id, newUser.role);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: newUser
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, mot_de_passe } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};
