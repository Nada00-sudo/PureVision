export const API_BASE = '';

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `/api${p}`;
}