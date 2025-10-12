// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// PAGES DE BASE
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; 
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/Unauthorized';

// PAGES DU DASHBOARD
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import GeneralDashboard from './pages/GeneralDashboard';
import BuyerMissionsPage from './pages/BuyerMissionsPage'; 

// PAGES DES FLUX MÉTIER
import DeliverWorkPage from './pages/DeliverWorkPage'; 
import CreateMissionPage from './pages/CreateMissionPage'; 


function App() {
    return (
        <Router>
            {/* Le contexte d'authentification enveloppe toute l'application */}
            <AuthProvider>
                <div className="App">
                    <Routes>
                        
                        {/* --------------------------- */}
                        {/* Routes Publiques (Accessibles à tous) */}
                        {/* --------------------------- */}
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
                            
                            {/* ROUTE CRITIQUE : Soumission de la livraison par le Vendeur */}
                            <Route 
                                path="/seller/missions/:missionId/deliver" 
                                element={<DeliverWorkPage />} 
                            />
                        </Route>

                        {/* 3. Accès ACHETEUR (et ACHETEUR/ADMIN pour les pages critiques) */}
                        {/* Note : J'ai gardé ACHETEUR et ADMIN ici pour la flexibilité de test */}
                        <Route element={<ProtectedRoute allowedRoles={["ACHETEUR", "ADMIN"]} />}>
                            <Route path="/buyer/missions" element={<BuyerMissionsPage />} />
                            
                            {/* ROUTE CRITIQUE : Création de la mission et Séquestre des fonds */}
                            <Route 
                                path="/buyer/missions/create" 
                                element={<CreateMissionPage />} 
                            />
                            {/* Ajoutez ici toutes les routes Acheteur spécifiques (gestion des paiements, des commandes) */}
                        </Route>

                        {/* 4. Routes Générales (Nécessite juste d'être connecté) */}
                        {/* AllowedRoles non spécifié = n'importe quel rôle authentifié */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<GeneralDashboard />} />
                            {/* Exemple: Page de profil utilisateur, Messagerie... */}
                            <Route path="/marketplace" element={<h1>Marketplace (produits et missions)</h1>} />
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
            
