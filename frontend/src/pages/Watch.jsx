import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { apiUrl } from '../config/apiBase';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoadError(null);
    fetch(apiUrl(`/videos/${id}`))
      .then((res) => {
        if (res.status === 404) throw new Error('Vidéo introuvable');
        if (!res.ok) throw new Error('Erreur lors du chargement');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setVideo(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Erreur réseau');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const saveProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      fetch(apiUrl('/api/history'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_id: id,
          timestamp: currentTime,
        }),
      });
    }
  };

  if (loadError) {
    return (
      <AppLayout>
        <div className="watch-page-full">
          <div className="catalog-status catalog-status-error p-4">{loadError}</div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-outline-light m-3"
          >
            ← Retour au catalogue
          </button>
        </div>
      </AppLayout>
    );
  }

  if (!video) {
    return (
      <AppLayout>
        <div className="watch-page-full">
          <p className="text-white p-5">Chargement…</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="watch-page-full">
        <div className="watch-toolbar">
          <button
            type="button"
            onClick={() => {
              saveProgress();
              navigate('/');
            }}
            className="btn btn-outline-light btn-sm"
          >
            ← Retour au catalogue
          </button>
        </div>

        <div className="watch-player-wrap">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="watch-video"
            onPause={saveProgress}
          >
            <source src={video.url_video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>

        <div className="watch-meta">
          <h2 className="watch-meta-title">{video.titre}</h2>
          {video.categorie && (
            <p className="watch-meta-cat">{video.categorie}</p>
          )}
          {video.description && (
            <p className="watch-meta-desc">{video.description}</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Watch;
