import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.10:8080/api', // L'URL de notre backend
});

// Intercepteur pour ajouter le token JWT à chaque requête sortante
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
