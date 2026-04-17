import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Utilisateur non connecté -> Retour au login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vérification de rôle spécifique (bonus admin)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
