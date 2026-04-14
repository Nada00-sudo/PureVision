import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Nécessaire pour le composant <Link>

const Home = () => {
  const [videos, setVideos] = useState([]);

  // Étape cruciale pour la Personne 3 : Récupérer les données de l'API
  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Erreur de connexion au backend:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 style={{ color: 'var(--accent-purple)', marginBottom: '30px' }}>
        Continuer à regarder
      </h2>
      <div className="row">
        {videos.map(video => (
          <div className="col-md-3 mb-4" key={video.id}>
            <div className="card bg-dark text-white border-secondary h-100 shadow">
              <img 
                src={video.photo_couverture} 
                className="card-img-top" 
                alt={video.titre} 
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{video.titre}</h5>
                <Link to={`/watch/${video.id}`} className="btn btn-primary w-100">
                  Regarder
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;