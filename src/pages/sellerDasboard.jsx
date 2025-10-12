// frontend/src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sellerService from '../services/sellerService';
import { useAuth } from '../context/AuthContext';
import WithdrawalModal from '../components/WithdrawalModal';
// Import d'icônes (nécessite l'installation de 'lucide-react' ou similaire)
import { DollarSign, Briefcase, TrendingUp, Store } from 'lucide-react'; 

// --- Composants de Cartes pour le Design Majestueux ---

const WalletCard = ({ balance, onWithdraw }) => (
    <div className="card majestic-card wallet-summary">
        <DollarSign size={24} className="icon-accent" />
        <h3 className="card-title">Solde Net Retirable</h3>
        <p className="balance">{balance} XOF</p> 
        <button onClick={onWithdraw} className="btn btn-primary btn-lg">
            Demander un Retrait
        </button>
    </div>
);

const ShopLimitCard = ({ currentCount, maxLimit, onCreateShop, isDisabled }) => (
    <div className="card majestic-card shop-limit-card">
        <Store size={24} className="icon-primary" />
        <h3 className="card-title">Mes Boutiques (E-commerce)</h3>
        <p className="limit-status">**{currentCount} / {maxLimit}** Boutiques Créées</p>
        <button 
            className="btn btn-secondary" 
            onClick={onCreateShop}
            disabled={isDisabled}
        >
            {isDisabled ? 'Limite Max. Atteinte (3)' : 'Créer une Nouvelle Boutique'}
        </button>
    </div>
);

// ----------------------------------------------------------------------

function SellerDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        wallet: { balance: 0, transactions: [] },
        shops: [],
        freelanceActivity: { assigned_missions: [], applications: [] }
    });
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    
    const MAX_SHOP_LIMIT = 3; 

    const fetchData = async () => {
        setLoading(true);
        try {
            const [wallet, shops, activity] = await Promise.all([
                sellerService.getWalletData(),
                sellerService.getSellerShops(),
                sellerService.getSellerFreelanceActivity()
            ]);

            setDashboardData({
                wallet: wallet || { balance: 0, transactions: [] },
                shops: shops || [],
                freelanceActivity: activity || { assigned_missions: [], applications: [] }
            });
            
        } catch (error) {
            console.error("Erreur lors du chargement du dashboard :", error);
            setAlertMessage({ type: 'error', text: "Impossible de charger les données du tableau de bord." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // Logique de Retrait
    const handleWithdrawal = () => {
        setAlertMessage(null);
        setIsModalVisible(true);
    };

    const handleWithdrawalSuccess = (amount) => {
        setAlertMessage({ type: 'success', text: `Demande de retrait de ${amount} XOF soumise avec succès.` });
        // Mettre à jour les données du portefeuille après le retrait
        fetchData(); 
    };

    // Logique de Création de Boutique
    const handleCreateShop = async () => {
        if (dashboardData.shops.length >= MAX_SHOP_LIMIT) {
            setAlertMessage({ type: 'error', text: "Impossible de créer plus de 3 boutiques. Limite maximale atteinte." });
            return;
        }
        
        // Redirection vers une page de formulaire de création de boutique (Meilleure UX)
        // Vous devez créer la route et la page : /seller/shops/create
        navigate('/seller/shops/create'); 
    };

    // Logique de soumission de livraison
    const handleDeliverClick = (missionId) => {
        navigate(`/seller/missions/${missionId}/deliver`);
    };

    if (loading) {
        return <div className="loading-state">Chargement du Tableau de Bord Majestueux...</div>;
    }
    
    const assignedMissions = dashboardData.freelanceActivity.assigned_missions || [];
    const pendingApplications = dashboardData.freelanceActivity.applications || [];

    return (
        <div className="seller-dashboard majestic-layout">
            {/* Composant de Modale de Retrait */}
            <WithdrawalModal 
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                currentBalance={dashboardData.wallet.balance}
                onSuccess={handleWithdrawalSuccess}
                onError={(msg) => setAlertMessage({ type: 'error', text: msg })}
            />
            
            {/* Affichage des alertes */}
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type || 'info'}`}>{alertMessage.text}</div>
            )}

            <header className="dashboard-header">
                <h1>Tableau de Bord Vendeur 👑</h1>
                <p className="subtitle">Bienvenue, **{user?.email}** ! Gérez vos finances, boutiques et engagements.</p>
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
                    onCreateShop={handleCreateShop}
                    isDisabled={dashboardData.shops.length >= MAX_SHOP_LIMIT}
                />
                
                {/* KPI clé pour la vision Freelance */}
                <div className="card majestic-card kpi-card">
                    <Briefcase size={24} className="icon-primary" />
                    <h3 className="card-title">Missions en Cours</h3>
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
                            <div key={shop.id} className="card shop-card majestic-card">
                                <h4>{shop.name}</h4>
                                <p>Produits actifs: **{shop.product_count || 0}**</p>
                                <p className={`shop-status status-${shop.status || 'open'}`}>{shop.status || 'Ouvert'}</p>
                                <button className="btn btn-sm btn-link" onClick={() => navigate(`/seller/shops/${shop.id}/manage`)}>
                                    Gérer le Catalogue
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">Vous n'avez pas encore de boutique. {dashboardData.shops.length < MAX_SHOP_LIMIT ? 'Créez-en une maintenant !' : ''}</p>
                    )}
                </div>
            </section>

            <div className="majestic-separator" />

            {/* III. Gestion des Missions Freelance */}
            <section className="freelance-management">
                <h2>Missions & Candidatures</h2>
                
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
                                    <td className="text-bold">{mission.final_price} XOF</td>
                                    <td>
                                        <span className={`status-badge status-${mission.status}`}>
                                            {mission.status === 'awaiting_validation' ? 'En Validation' : mission.status}
                                        </span>
                                    </td>
                                    <td>
                                        {mission.status === 'in_progress' && (
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleDeliverClick(mission.id)}
                                            >
                                                Soumettre Livraison
                                            </button>
                                        )}
                                        {mission.status === 'awaiting_validation' && (
                                            <p className="text-warning">En attente de la validation de l'Acheteur.</p>
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
                
                <h3 className="section-subtitle" style={{ marginTop: '30px' }}>Opportunités en Attente ({pendingApplications.length})</h3>
                {pendingApplications.length > 0 ? (
                    <p className="text-info">**{pendingApplications.length}** candidatures sont en attente de la décision de l'acheteur.</p>
                ) : (
                    <p className="text-muted">Explorez la page du marché freelance pour trouver des opportunités !</p>
                )}
            </section>

            <div className="majestic-separator" />

            {/* IV. Historique et Retraits (à développer - Montrer les 5 dernières transactions) */}
            <section className="withdrawal-history">
                <h2>Historique des 5 Dernières Transactions</h2>
                {dashboardData.wallet.transactions.length > 0 ? (
                    <p>Tableau des transactions...</p>
                    // Ici, vous mappez dashboardData.wallet.transactions dans un tableau détaillé.
                ) : (
                    <p className="text-muted">Aucune transaction récente à afficher.</p>
                )}
            </section>

        </div>
    );
}

export default SellerDashboard;
        
