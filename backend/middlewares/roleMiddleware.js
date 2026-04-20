const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Accès refusé. Rôle '${req.user ? req.user.role : 'inconnu'}' non autorisé.` 
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };