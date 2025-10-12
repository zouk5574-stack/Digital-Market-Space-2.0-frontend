import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
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

// Styles globaux
import './styles/Dashboard.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    {/* Header Global Digital Market Space */}
                    <header className="global-header">
                        <div className="header-content">
                            <h1>Digital Market Space</h1>
                            <p>Votre marché digital tout-en-un</p>
                        </div>
                    </header>

                    <Routes>
                        {/* Routes Publiques */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/unauthorized" element={<UnauthorizedPage />} />
                        
                        {/* Routes Protégées par Rôle */}
                        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles="VENDEUR" />}>
                            <Route path="/seller/dashboard" element={<SellerDashboard />} />
                            <Route path="/seller/missions/:missionId/deliver" element={<DeliverWorkPage />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["ACHETEUR", "ADMIN"]} />}>
                            <Route path="/buyer/missions" element={<BuyerMissionsPage />} />
                            <Route path="/buyer/missions/create" element={<CreateMissionPage />} />
                        </Route>

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<GeneralDashboard />} />
                        </Route>
                        
                        {/* 404 */}
                        <Route path="*" element={<h1>404 - Page Non Trouvée</h1>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
