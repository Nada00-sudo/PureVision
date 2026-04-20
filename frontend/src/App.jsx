import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages de ton binôme (Auth)
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Tes pages (Streaming - Personne 3)
import Home from './pages/Home'; 
import Watch from './pages/Watch';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* --- Routes Publiques --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Routes Protégées (Nécessitent d'être connecté) --- */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/catalog" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/watch/:id" 
            element={
              <ProtectedRoute>
                <Watch />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* --- Route Admin (Bonus) --- */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Redirection automatique si la route n'existe pas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;