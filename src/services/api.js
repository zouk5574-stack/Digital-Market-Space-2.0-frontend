// frontend/src/services/api.js
import axios from 'axios';

// URL de base du backend Express (modifiez si nécessaire)
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur de Requête : Ajoute le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur de Réponse : Gère les erreurs 401/403 (Token expiré ou Accès refusé)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Si le token est invalide ou expiré (401)
        if (error.response.status === 401 && !originalRequest._retry) {
            // Empêche la boucle infinie de rafraîchissement
            originalRequest._retry = true; 
            
            // Déconnexion automatique et redirection vers la page de connexion
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // NOTE: Dans une application React complète, on utiliserait React Router pour la redirection ici.
            // Pour l'instant, nous laissons la gestion de l'état global s'en charger.
            console.warn('Session expirée ou non autorisée. Déconnexion forcée.');
        }

        return Promise.reject(error);
    }
);

export default api;
