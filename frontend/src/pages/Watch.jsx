import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Watch = () => {
  const { id } = useParams(); // Récupère l'ID de la vidéo depuis l'URL
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);

  // 1. Charger les détails de la vidéo et l'ancien progrès
  useEffect(() => {
    // Récupérer les infos de la vidéo (Titre + URL MinIO)
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then(res => res.json())
      .then(data => {
        setVideo(data);
        // Bonus : Ici on pourrait aussi charger le timestamp depuis l'historique
      })
      .catch(err => console.error("Erreur chargement vidéo:", err));
  }, [id]);

  // 2. Sauvegarder l'historique (quand l'utilisateur quitte ou met en pause)
  const saveProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      fetch('http://localhost:5000/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_id: id,
          timestamp: currentTime
        })
      });
    }
  };

  if (!video) return <div className="text-white p-5">Chargement...</div>;

  return (
    <div className="container-fluid bg-dark vh-100 p-0 d-flex flex-column">
      {/* Barre de retour */}
      <div className="p-3">
        <button onClick={() => { saveProgress(); navigate('/'); }} className="btn btn-outline-light">
          ← Retour à la galerie
        </button>
      </div>

      {/* Lecteur Vidéo */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-75 shadow-lg"
          style={{ border: '2px solid var(--accent-purple)', borderRadius: '10px' }}
          onPause={saveProgress}
        >
          {/* L'URL provient de ta base de données (ex: http://localhost:9000/...) */}
          <source src={video.url_video} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>

      <div className="p-4 text-white text-center">
        <h2 style={{ color: 'var(--accent-purple)' }}>{video.titre}</h2>
        <p className="text-secondary">{video.categorie}</p>
      </div>
    </div>
  );
};

export default Watch;