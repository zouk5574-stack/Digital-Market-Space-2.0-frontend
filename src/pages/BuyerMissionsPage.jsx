// frontend/src/pages/BuyerMissionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buyerService from '../services/buyerService';
import { CheckCircle, XCircle, FileText } from 'lucide-react'; 

// 🚨 Importation pour l'harmonie visuelle "Majestueuse"
import '../styles/Dashboard.css'; 

function BuyerMissionsPage() {
    const navigate = useNavigate();
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await buyerService.getMyMissions();
            setMissions(data);
        } catch (error) {
            console.error("Erreur lors du chargement des missions :", error);
            setAlertMessage({ type: 'error', text: "Impossible de charger la liste de vos missions." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // LOGIQUE CRITIQUE : VALIDER LA LIVRAISON (Libération de l'Escrow)
    const handleValidateDelivery = async (missionId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir VALIDER cette livraison ? Cette action libérera immédiatement les fonds au Vendeur.")) {
            return;
        }

        try {
            await buyerService.validateDelivery(missionId);
            setAlertMessage({ type: 'success', text: `Mission #${missionId.substring(0, 8)} validée ! Les fonds ont été libérés.` });
            fetchData(); // Actualiser pour voir le statut 'completed'
        } catch (error) {
            setAlertMessage({ type: 'error', text: error.message || "Échec de la validation. Réessayez." });
        }
    };

    // LOGIQUE CRITIQUE : REJETER LA LIVRAISON
    const handleRejectDelivery = async (missionId) => {
        const reason = window.prompt("Veuillez entrer une raison concise pour le rejet :");
        if (!reason) return;
        
        try {
            await buyerService.rejectDelivery(missionId, reason);
            setAlertMessage({ type: 'warning', text: `Mission #${missionId.substring(0, 8)} rejetée. Le Vendeur a été notifié.` });
            fetchData(); // Actualiser pour voir le statut 'in_revision' (ou similaire)
        } catch (error) {
            setAlertMessage({ type: 'error', text: error.message || "Échec du rejet. Réessayez." });
        }
    };

    if (loading) {
        return <div className="loading-state majestic-layout">Chargement de vos missions...</div>;
    }

    // Le conteneur utilise la classe majestueuse pour le style
    return (
        <div className="buyer-missions majestic-layout">
            <header className="dashboard-header">
                <h1>Mes Missions Freelance 📝</h1>
                <p className="subtitle">Suivez vos projets et validez les livraisons pour libérer les fonds séquestrés.</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate('/buyer/missions/create')}
                    style={{ marginTop: '20px' }}
                >
                    Créer une Nouvelle Mission
                </button>
            </header>
            
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type || 'info'}`}>{alertMessage.text}</div>
            )}

            <section className="missions-list">
                <h2 className="section-subtitle">Missions ({missions.length})</h2>

                {missions.length === 0 ? (
                    <p className="text-muted">Vous n'avez pas encore créé de mission.</p>
                ) : (
                    <table className="majestic-table full-width">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Vendeur Assigné</th>
                                <th>Fonds Séquestrés</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map(mission => (
                                <tr key={mission.id}>
                                    <td>{mission.title}</td>
                                    <td>{mission.seller_name || 'En attente d\'attribution'}</td>
                                    <td className="text-bold">{mission.escrow_amount} XOF</td>
                                    <td>
                                        <span className={`status-badge status-${mission.status}`}>
                                            {mission.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Actions Basées sur le Statut */}
                                        {mission.status === 'awaiting_validation' && (
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-info" title="Voir Livraison">
                                                    <FileText size={18} />
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-success" 
                                                    onClick={() => handleValidateDelivery(mission.id)}
                                                    title="Valider et Payer"
                                                >
                                                    <CheckCircle size={18} /> Valider
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleRejectDelivery(mission.id)}
                                                    title="Rejeter"
                                                >
                                                    <XCircle size={18} /> Rejeter
                                                </button>
                                            </div>
                                        )}
                                        {mission.status === 'completed' && (
                                            <p className="text-success">Validée & Payée ✅</p>
                                        )}
                                        {mission.status === 'in_progress' && (
                                            <p className="text-info">Travail en cours...</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default BuyerMissionsPage;
