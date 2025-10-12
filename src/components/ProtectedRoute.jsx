// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Composant pour protéger les routes contre les utilisateurs non authentifiés
 * ou ceux n'ayant pas le rôle requis.
 * * @param {string|string[]} allowedRoles - Rôle(s) autorisé(s). Ex: "ADMIN" ou ["VENDEUR", "ADMIN"]
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading, hasRole } = useAuth();

    // 1. En attente du chargement initial de l'état d'authentification
    if (loading) {
        return <div>Chargement de la session...</div>; 
    }

    // 2. Utilisateur non authentifié (doit toujours se connecter)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 3. Vérification du rôle si allowedRoles est spécifié
    if (allowedRoles) {
        if (hasRole(allowedRoles)) {
            // L'utilisateur est connecté et a le bon rôle
            return <Outlet />;
        } else {
            // L'utilisateur est connecté mais n'a pas le bon rôle (Accès refusé)
            // On peut rediriger vers un dashboard par défaut ou une page d'erreur 403.
            console.warn(`Accès refusé. Rôle de l'utilisateur (${user?.role}) non autorisé. Rôles requis: ${allowedRoles}`);
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // 4. Si aucun rôle n'est spécifié, l'utilisateur doit juste être authentifié
    return <Outlet />;
};

export default ProtectedRoute;
