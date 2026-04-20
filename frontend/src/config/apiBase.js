/**
 * URL du backend (navigateur). En Docker, le port 5000 est exposé sur l’hôte.
 * Surcharge possible : VITE_API_URL=http://localhost:5000
 */
export const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
