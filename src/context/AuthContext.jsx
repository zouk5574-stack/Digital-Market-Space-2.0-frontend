// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // user contient { id, email, role, iat, exp }
    const [user, setUser] = useState(authService.getCurrentUser());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Au chargement, vérifie si un utilisateur est dans le localStorage
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            // Optionnel : Vérifier si le token n'est pas expiré ici pour plus de sécurité
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // Gère la connexion et met à jour l'état
    const login = async (email, password) => {
        setLoading(true);
        try {
            const userData = await authService.login(email, password);
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // Gère la déconnexion et met à jour l'état
    const logout = () => {
        authService.logout();
        setUser(null);
    };
    
    // Vérifie le rôle de l'utilisateur pour les composants sécurisés
    const hasRole = (requiredRoles) => {
        if (!user) return false;
        // requiredRoles peut être un tableau (['ACHETEUR', 'ADMIN']) ou une chaîne ('VENDEUR')
        const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        
        // Le rôle est stocké dans user.role
        return rolesArray.includes(user.role); 
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        isAuthenticated: !!user, // Booleen simple pour vérifier l'état
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour l'utilisation facile dans les composants
export const useAuth = () => {
    return useContext(AuthContext);
};
