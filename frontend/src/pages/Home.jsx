import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { apiUrl } from '../config/apiBase';

function VideoCard({ video }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card-media">
        {video.photo_couverture ? (
          <img src={video.photo_couverture} alt="" className="catalog-card-img" />
        ) : (
          <div className="catalog-card-placeholder" aria-hidden>
            ▶
          </div>
        )}
        {video.categorie && (
          <span className="catalog-card-badge">{video.categorie}</span>
        )}
      </div>
      <div className="catalog-card-body">
        <h3 className="catalog-card-title">{video.titre}</h3>
        {video.description && (
          <p className="catalog-card-desc">{video.description}</p>
        )}
        <Link to={`/watch/${video.id}`} className="catalog-card-cta">
          Lire la vidéo
        </Link>
      </div>
    </article>
  );
}

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(apiUrl('/api/videos'))
      .then((res) => {
        if (!res.ok) throw new Error('Impossible de charger le catalogue');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setVideos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Erreur réseau');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    videos.forEach((v) => {
      if (v.categorie) set.add(v.categorie);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fr'));
  }, [videos]);

  const filtered = useMemo(() => {
    let list = videos;
    if (categoryFilter !== 'all') {
      list = list.filter((v) => v.categorie === categoryFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (v) =>
          (v.titre && v.titre.toLowerCase().includes(q)) ||
          (v.description && v.description.toLowerCase().includes(q)) ||
          (v.categorie && v.categorie.toLowerCase().includes(q))
      );
    }
    return list;
  }, [videos, categoryFilter, search]);

  const groupedByCategory = useMemo(() => {
    if (search.trim() || categoryFilter !== 'all') return null;
    const map = {};
    filtered.forEach((v) => {
      const key = v.categorie || 'Autres';
      if (!map[key]) map[key] = [];
      map[key].push(v);
    });
    return map;
  }, [filtered, search, categoryFilter]);

  return (
    <AppLayout>
      <div className="catalog-page">
        <header className="catalog-hero">
          <h1 className="catalog-hero-title">Catalogue</h1>
          <p className="catalog-hero-sub">
            Parcourez les vidéos disponibles et lancez la lecture en un clic.
          </p>
        </header>

        <div className="catalog-toolbar">
          <label className="catalog-search-wrap">
            <span className="visually-hidden">Rechercher</span>
            <input
              type="search"
              className="catalog-search"
              placeholder="Rechercher par titre, description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </label>
          <div className="catalog-chips" role="group" aria-label="Filtrer par catégorie">
            <button
              type="button"
              className={`catalog-chip ${categoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`catalog-chip ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="catalog-status">Chargement du catalogue…</p>
        )}
        {error && !loading && (
          <p className="catalog-status catalog-status-error">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="catalog-status">Aucune vidéo ne correspond à votre recherche.</p>
        )}

        {!loading && !error && filtered.length > 0 && groupedByCategory && (
          <div className="catalog-sections">
            {Object.keys(groupedByCategory)
              .sort((a, b) => a.localeCompare(b, 'fr'))
              .map((cat) => (
                <section key={cat} className="catalog-section">
                  <h2 className="catalog-section-title">{cat}</h2>
                  <div className="catalog-grid">
                    {groupedByCategory[cat].map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && !groupedByCategory && (
          <div className="catalog-grid catalog-grid-single">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Home;
