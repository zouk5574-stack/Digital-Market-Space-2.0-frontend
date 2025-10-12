import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading, hasRole } = useAuth();

    if (loading) {
        return <div className="loading-state">Chargement de la session...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
        console.warn(`Accès refusé. Rôle de l'utilisateur (${user?.role}) non autorisé. Rôles requis: ${allowedRoles}`);
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
