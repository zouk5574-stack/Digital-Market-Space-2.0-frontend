// frontend/src/pages/SellerDashboard.jsx

import React, { useState, useEffect } => 'react';
import sellerService from '../services/sellerService';
import { useAuth } from '../context/AuthContext';
// import { DollarSign, Briefcase, TrendingUp, Store } from 'lucide-react'; // Icônes pour le design

// --- Composants de Cartes pour le Design Majestueux ---

const WalletCard = ({ balance, onWithdraw }) => (
    <div className="card majestic-card wallet-summary">
        <h3 className="card-title">Solde Net Retirable</h3>
        {/* Affiche le solde en gros et formaté */}
        <p className="balance">{balance} XOF</p> 
        <button onClick={onWithdraw} className="btn btn-primary btn-lg">
            Demander un Retrait
        </button>
    </div>
);

const ShopLimitCard = ({ currentCount, maxLimit }) => (
    <div className="card majestic-card shop-limit-card">
        <h3 className="card-title">Mes Boutiques (E-commerce)</h3>
        {/* Logique des 3 boutiques intégrée */}
        <p className="limit-status">**{currentCount} / {maxLimit}** Boutiques Créées</p>
        <button className="btn btn-secondary" disabled={currentCount >= maxLimit}>
            {currentCount >= maxLimit ? 'Limite Max. Atteinte (3)' : 'Créer une Nouvelle Boutique'}
        </button>
    </div>
);

// ----------------------------------------------------------------------

function SellerDashboard() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        wallet: { balance: 0, transactions: [] },
        shops: [],
        freelanceActivity: { assigned_missions: [], applications: [] }
    });
    const [loading, setLoading] = useState(true);
    const MAX_SHOP_LIMIT = 3; // La règle métier des 3 boutiques

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch parallèle de toutes les données pour la performance
                const [wallet, shops, activity] = await Promise.all([
                    sellerService.getWalletData(),
                    sellerService.getSellerShops(),
                    sellerService.getSellerFreelanceActivity()
                ]);

                setDashboardData({
                    wallet: wallet,
                    shops: shops,
                    freelanceActivity: activity
                });
                
            } catch (error) {
                console.error("Erreur lors du chargement du dashboard :", error);
                // Gérer l'affichage d'une alerte d'erreur utilisateur
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    // Fonctionnalité de retrait (à compléter avec une modale)
    const handleWithdrawal = () => {
        // Ici, on ouvrirait une modale pour saisir le montant et la méthode de paiement
        alert(`Retrait demandé pour ${dashboardData.wallet.balance.toFixed(2)} XOF. Logique à implémenter.`);
        // Exemple: showWithdrawalModal(true);
    };

    if (loading) {
        return <div className="loading-state">Chargement du Tableau de Bord Majestueux...</div>;
    }
    
    const assignedMissions = dashboardData.freelanceActivity.assigned_missions || [];
    const pendingApplications = dashboardData.freelanceActivity.applications || [];

    return (
        <div className="seller-dashboard majestic-layout">
            <header className="dashboard-header">
                <h1>Tableau de Bord Vendeur 👑</h1>
                <p className="subtitle">Bienvenue, {user?.name || user?.email} ! Gérez vos finances, boutiques et engagements.</p>
            </header>

            {/* I. Vue d'Ensemble et Finance (Header) */}
            <section className="financial-overview grid-3">
                <WalletCard 
                    balance={dashboardData.wallet.balance.toFixed(2)}
                    onWithdraw={handleWithdrawal}
                />
                
                <ShopLimitCard
                    currentCount={dashboardData.shops.length}
                    maxLimit={MAX_SHOP_LIMIT}
                />
                
                {/* KPI clé pour la vision Freelance */}
                <div className="card majestic-card kpi-card">
                    <h3 className="card-title">Missions en Cours (In Progress)</h3>
                    <p className="kpi-value">{assignedMissions.filter(m => m.status === 'in_progress').length}</p>
                </div>
            </section>

            <div className="majestic-separator" />

            {/* II. Gestion des Boutiques et Produits */}
            <section className="shop-management">
                <h2>Boutiques E-commerce</h2>
                <div className="shops-list grid-auto">
                    {dashboardData.shops.length > 0 ? (
                        dashboardData.shops.map(shop => (
                            <div key={shop.id} className="card shop-card">
                                <h4>{shop.name}</h4>
                                <p>Produits actifs: **{shop.product_count}**</p>
                                <p className={`shop-status status-${shop.status}`}>{shop.status}</p>
                                <button className="btn btn-sm btn-link">Gérer le Catalogue</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">Vous n'avez pas encore de boutique. Cliquez sur 'Créer une Nouvelle Boutique' pour commencer !</p>
                    )}
                </div>
            </section>

            <div className="majestic-separator" />

            {/* III. Gestion des Missions Freelance */}
            <section className="freelance-management">
                <h2>Missions & Candidatures</h2>
                
                {/* Missions Actives / Assignées (Priorité UX) */}
                <h3 className="section-subtitle">Vos Engagements Actifs ({assignedMissions.length})</h3>
                {assignedMissions.length > 0 ? (
                    <table className="majestic-table full-width">
                        <thead>
                            <tr>
                                <th>Titre Mission</th>
                                <th>Prix Final</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedMissions.map(mission => (
                                <tr key={mission.id}>
                                    <td>{mission.title}</td>
                                    <td>{mission.final_price} XOF</td>
                                    <td>
                                        <span className={`status-badge status-${mission.status}`}>
                                            {mission.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Action clé pour le flux de validation */}
                                        {mission.status === 'in_progress' && (
                                            <button className="btn btn-success btn-sm">Soumettre Livraison</button>
                                        )}
                                        {mission.status === 'awaiting_validation' && (
                                            <p className="text-warning">En attente validation...</p>
                                        )}
                                        {mission.status === 'completed' && (
                                            <p className="text-success">Paiement Libéré ✅</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">Aucune mission ne vous a encore été attribuée.</p>
                )}
                
                {/* Candidatures en attente (Opportunités) */}
                <h3 className="section-subtitle" style={{ marginTop: '30px' }}>Opportunités en Attente ({pendingApplications.length})</h3>
                {pendingApplications.length > 0 ? (
                    <p className="text-info">**{pendingApplications.length}** candidatures sont en attente de la décision de l'acheteur.</p>
                ) : (
                    <p className="text-muted">Explorez la page du marché freelance pour trouver des opportunités !</p>
                )}
            </section>

            {/* IV. Historique et Retraits (à développer) */}
            <section className="withdrawal-history">
                <h2>Historique des Transactions</h2>
                {/* Ici serait un tableau des dernières transactions (débit/crédit/commission) */}
                <p className="text-muted">L'historique détaillé sera affiché ici...</p>
            </section>

        </div>
    );
}

export default SellerDashboard;
                                          
