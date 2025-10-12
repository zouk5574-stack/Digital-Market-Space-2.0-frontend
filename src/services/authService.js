import api from './api';
import jwt from 'jwt-decode';

const authService = {
    login: async (identifier, password) => {
        try {
            const response = await api.post('/auth/login', { identifier, password });
            const token = response.data.token;
            
            if (token) {
                const decodedUser = jwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(decodedUser));
                return decodedUser;
            }
            return null;
        } catch (error) {
            const message = error.response?.data?.error || 'Échec de la connexion';
            throw new Error(message);
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.error || "Échec de l'inscription";
            throw new Error(message);
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};

export default authService;
