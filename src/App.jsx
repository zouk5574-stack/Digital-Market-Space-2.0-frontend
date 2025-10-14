import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import InnovativeHeader from './components/InnovativeHeader';
import ThemeToggle from './components/ThemeToggle';

// PAGES EXISTANTES (Backend-compatible)
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; 
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/Unauthorized';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import GeneralDashboard from './pages/GeneralDashboard';
import BuyerMissionsPage from './pages/BuyerMissionsPage'; 
import DeliverWorkPage from './pages/DeliverWorkPage'; 
import CreateMissionPage from './pages/CreateMissionPage';

// PAGES INNOVANTES
import InnovativeMarketplace from './pages/InnovativeMarketplace';
import AnimatedDashboard from './components/AnimatedDashboard';

// 🆕 NOUVELLE PAGE - NOTIFICATIONS ADMIN
import AdminNotificationsPage from './pages/AdminNotificationsPage';

// STYLES
import './styles/Innovation.css';
import './styles/Dashboard.css';

// Client React Query optimisé
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Récupération du thème sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className={`app ${theme}`}>
            {/* Header Innovant avec navigation intelligente */}
            <InnovativeHeader />
            
            {/* Toggle de thème positionné stratégiquement */}
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <main className="main-content">
              <Routes>
                {/* ==================== */}
                {/* ROUTES PUBLIQUES */}
                {/* ==================== */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/marketplace" element={<InnovativeMarketplace />} />
                
                {/* ==================== */}
                {/* ROUTES PROTÉGÉES PAR RÔLE */}
                {/* ==================== */}

                {/* SUPER ADMIN & ADMIN - Gestion complète */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/analytics" element={<AnimatedDashboard />} />
                  <Route path="/admin/users" element={<h1>Gestion Utilisateurs</h1>} />
                  <Route path="/admin/finances" element={<h1>Supervision Financière</h1>} />
                  {/* 🆕 NOUVELLE ROUTE - NOTIFICATIONS ADMIN */}
                  <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
                </Route>

                {/* VENDEUR - E-commerce + Freelance */}
                <Route element={<ProtectedRoute allowedRoles="VENDEUR" />}>
                  <Route path="/seller/dashboard" element={<SellerDashboard />} />
                  <Route path="/seller/missions/:missionId/deliver" element={<DeliverWorkPage />} />
                  <Route path="/seller/products" element={<h1>Mes Produits</h1>} />
                  <Route path="/seller/orders" element={<h1>Mes Commandes</h1>} />
                  <Route path="/seller/wallet" element={<h1>Mon Portefeuille</h1>} />
                  <Route path="/seller/withdrawals" element={<h1>Mes Retraits</h1>} />
                </Route>

                {/* ACHETEUR - Commandes + Missions Freelance */}
                <Route element={<ProtectedRoute allowedRoles={["ACHETEUR", "ADMIN"]} />}>
                  <Route path="/buyer/missions" element={<BuyerMissionsPage />} />
                  <Route path="/buyer/missions/create" element={<CreateMissionPage />} />
                  <Route path="/buyer/orders" element={<h1>Mes Commandes</h1>} />
                  <Route path="/buyer/cart" element={<h1>Mon Panier</h1>} />
                </Route>

                {/* ROUTES GÉNÉRALES AUTHENTIFIÉES */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<GeneralDashboard />} />
                  <Route path="/profile" element={<h1>Mon Profil</h1>} />
                  <Route path="/messages" element={<h1>Messagerie</h1>} />
                  <Route path="/notifications" element={<h1>Notifications</h1>} />
                  <Route path="/settings" element={<h1>Paramètres</h1>} />
                </Route>

                {/* ==================== */}
                {/* ROUTES INNOVANTES */}
                {/* ==================== */}
                <Route path="/discover" element={<InnovativeMarketplace />} />
                <Route path="/trending" element={<h1>Tendances du Marché</h1>} />
                <Route path="/innovations" element={<h1>Nouveautés Technologiques</h1>} />

                {/* ==================== */}
                {/* FALLBACK & ERREURS */}
                {/* ==================== */}
                <Route path="*" element={
                  <div className="error-page majestic-layout">
                    <div className="error-content glass-card">
                      <h1>404 - Page Non Trouvée</h1>
                      <p>La page que vous recherchez n'existe pas dans Digital Market Space.</p>
                      <button 
                        className="holographic-button"
                        onClick={() => window.location.href = '/'}
                      >
                        Retour à l'Accueil
                      </button>
                    </div>
                  </div>
                } />
              </Routes>
            </main>

            {/* Footer Global */}
            <footer className="global-footer">
              <div className="footer-content">
                <div className="footer-brand">
                  <h3>Digital Market Space</h3>
                  <p>Votre marché digital tout-en-un</p>
                  <p>E-commerce • Freelance • Innovation</p>
                </div>
                <div className="footer-links">
                  <div className="footer-section">
                    <h4>Marché</h4>
                    <a href="/marketplace">Produits</a>
                    <a href="/discover">Services</a>
                    <a href="/trending">Tendances</a>
                  </div>
                  <div className="footer-section">
                    <h4>Compte</h4>
                    <a href="/profile">Mon Profil</a>
                    <a href="/dashboard">Tableau de Bord</a>
                    <a href="/settings">Paramètres</a>
                  </div>
                  <div className="footer-section">
                    <h4>Support</h4>
                    <a href="/help">Aide</a>
                    <a href="/contact">Contact</a>
                    <a href="/about">À Propos</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 Digital Market Space. Tous droits réservés.</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </Router>
      
      {/* Outils de développement */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
