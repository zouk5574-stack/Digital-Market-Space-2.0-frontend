// frontend/src/services/authService.js
import api from './api';
import jwt from 'jwt-decode'; // Nécessite l'installation: npm install jwt-decode

const authService = {
    
    // ========================
    // Connexion
    // ========================
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // Le backend renvoie le token, l'ID de l'utilisateur, et le rôle (dans le payload du JWT)
            const token = response.data.token; 
            
            if (token) {
                // Décode le token pour extraire les infos utilisateur (ID, rôle)
                const decodedUser = jwt(token);
                
                // Stockage dans localStorage
                localStorage.setItem('token', token);
                // Stockage des infos utilisateur pour l'état global du Frontend (ID, rôle, etc.)
                localStorage.setItem('user', JSON.stringify(decodedUser)); 
                
                return decodedUser;
            }
            return null;

        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Échec de la connexion.';
            throw new Error(message);
        }
    },

    // ========================
    // Inscription
    // ========================
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            
            // Le backend devrait renvoyer une confirmation d'inscription
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Échec de l'inscription.";
            throw new Error(message);
        }
    },

    // ========================
    // Déconnexion
    // ========================
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    // ========================
    // Récupère l'utilisateur actuellement connecté
    // ========================
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};

export default authService;
