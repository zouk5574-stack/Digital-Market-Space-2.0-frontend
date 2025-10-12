// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Pages de l'application (à créer)
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import GeneralDashboard from './pages/GeneralDashboard';
import UnauthorizedPage from './pages/Unauthorized';
import RegisterPage from './pages/Register'; 


function App() {
    return (
        <Router>
            {/* Le contexte d'authentification enveloppe toute l'application */}
            <AuthProvider>
                <div className="App">
                    <Routes>
                        {/* Routes Publiques */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/unauthorized" element={<UnauthorizedPage />} />
                        
                        {/* --------------------------- */}
                        {/* Routes Protégées par Rôle */}
                        {/* --------------------------- */}

                        {/* 1. Accès ADMIN seulement */}
                        <Route element={<ProtectedRoute allowedRoles="ADMIN" />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            {/* Ajoutez ici toutes les routes ADMIN (gestion des utilisateurs, configuration) */}
                        </Route>

                        {/* 2. Accès VENDEUR seulement */}
                        <Route element={<ProtectedRoute allowedRoles="VENDEUR" />}>
                            <Route path="/seller/dashboard" element={<SellerDashboard />} />
                            {/* Ajoutez ici toutes les routes VENDEUR (gestion des produits, missions assignées) */}
                        </Route>

                        {/* 3. Accès ACHETEUR (et autres, si nécessaire) */}
                        <Route element={<ProtectedRoute allowedRoles={["ACHETEUR", "VENDEUR", "ADMIN"]} />}>
                            <Route path="/dashboard" element={<GeneralDashboard />} />
                            {/* Les routes de la marketplace (créer mission, détails produit, etc.) */}
                            {/* Pour un ACHETEUR simple, on peut utiliser allowedRoles="ACHETEUR" */}
                        </Route>

                        {/* 4. Routes nécessitant juste une connexion (aucune vérification de rôle spécifique) */}
                        <Route element={<ProtectedRoute />}>
                            {/* Exemple: Page de profil utilisateur, Messagerie... */}
                            {/* <Route path="/profile" element={<ProfilePage />} /> */}
                        </Route>
                        
                        {/* Route 404 - Page non trouvée */}
                        <Route path="*" element={<h1>404 - Page Non Trouvée</h1>} />

                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
                          
