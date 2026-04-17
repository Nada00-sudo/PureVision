import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_netflix_clone_key';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Vérification du token
      const decoded = jwt.verify(token, JWT_SECRET);

      // On ajoute les informations du token à la requête
      req.user = decoded; // Contient { id, role, iat, exp }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Non autorisé, token invalide ou expiré." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé, aucun token fourni." });
  }
};
