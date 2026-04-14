import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'; // Ta galerie de vidéos
import Watch from '../src/pages/Watch'; // Ton futur lecteur vidéo
import 'bootstrap/dist/css/bootstrap.min.css'; // Import de Bootstrap
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Tu peux ajouter une Navbar ici plus tard */}
        
        <Routes>
          {/* Route pour la Galerie (Accueil) */}
          <Route path="/" element={<Home />} />
          
          {/* Route pour le Lecteur Vidéo (Détail) */}
          {/* ":id" est un paramètre dynamique pour savoir quel film charger */}
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;