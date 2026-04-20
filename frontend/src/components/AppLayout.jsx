import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AppLayout({ children }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="streaming-layout">
      <nav className="navbar">
        <Link to="/" className="auth-logo">
          ▶ StreamNova
        </Link>
        <div className="nav-buttons">
          <Link to="/" className="nav-link-pill">
            Catalogue
          </Link>
          <Link to="/profile" className="nav-link-pill">
            Profil
          </Link>
          <button type="button" onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}
