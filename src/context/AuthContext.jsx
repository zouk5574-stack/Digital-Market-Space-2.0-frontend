import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getCurrentUser());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (identifier, password) => {
        setLoading(true);
        try {
            const userData = await authService.login(identifier, password);
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const hasRole = (requiredRoles) => {
        if (!user) return false;
        const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        return rolesArray.includes(user.role);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
