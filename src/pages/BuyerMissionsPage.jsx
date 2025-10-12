import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buyerService from '../services/buyerService';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

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
            setAlertMessage({ type: 'error', text: "Impossible de charger vos missions" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleValidateDelivery = async (deliveryId) => {
        if (!window.confirm("Valider cette livraison et libérer les fonds ?")) return;

        try {
            await buyerService.validateDelivery(deliveryId);
            setAlertMessage({ type: 'success', text: "Livraison validée ! Fonds libérés." });
            fetchData();
        } catch (error) {
            setAlertMessage({ type: 'error', text: error.message });
        }
    };

    if (loading) return <div className="loading-state majestic-layout">Chargement...</div>;

    return (
        <div className="buyer-missions majestic-layout">
            <header className="dashboard-header">
                <h1>Mes Missions Digital Market Space</h1>
                <p className="subtitle">Suivez vos projets freelance</p>
                <button className="btn btn-primary" onClick={() => navigate('/buyer/missions/create')}>
                    Créer une Nouvelle Mission
                </button>
            </header>
            
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type}`}>{alertMessage.text}</div>
            )}

            <section className="missions-list">
                <h2>Missions ({missions.length})</h2>

                {missions.length === 0 ? (
                    <p className="text-muted">Aucune mission créée</p>
                ) : (
                    <table className="majestic-table full-width">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Budget</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map(mission => (
                                <tr key={mission.id}>
                                    <td>{mission.title}</td>
                                    <td>{mission.budget} XOF</td>
                                    <td>
                                        <span className={`status-badge status-${mission.status}`}>
                                            {mission.status}
                                        </span>
                                    </td>
                                    <td>
                                        {mission.status === 'awaiting_validation' && (
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-success" 
                                                    onClick={() => handleValidateDelivery(mission.id)}>
                                                    <CheckCircle size={18} /> Valider
                                                </button>
                                            </div>
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
