import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buyerService from '../services/buyerService';
import { CheckCircle, XCircle, FileText, Eye, Download, ExternalLink } from 'lucide-react';

function BuyerMissionsPage() {
    const navigate = useNavigate();
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const [selectedMission, setSelectedMission] = useState(null);
    const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
    const [downloading, setDownloading] = useState(null);

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

    const handleValidateDelivery = async (missionId) => {
        if (!window.confirm("Valider cette livraison et libérer les fonds ?")) return;

        try {
            await buyerService.validateDelivery(missionId);
            setAlertMessage({ type: 'success', text: "Livraison validée ! Fonds libérés." });
            fetchData();
            setShowDeliveryDetails(false);
        } catch (error) {
            setAlertMessage({ type: 'error', text: error.message });
        }
    };

    // 🆕 FONCTION DE TÉLÉCHARGEMENT OPTIMISÉE
    const handleDownload = async (mission) => {
        setDownloading(mission.id);
        
        try {
            if (mission.deliverable_link) {
                // ✅ TÉLÉCHARGEMENT DIRECT - Supabase Storage
                const link = document.createElement('a');
                link.href = mission.deliverable_link;
                
                // Extraire le nom du fichier de l'URL ou utiliser un nom par défaut
                const filename = mission.deliverable_link.split('/').pop() || `livrable-mission-${mission.id}`;
                link.download = filename;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setAlertMessage({ type: 'success', text: "Téléchargement du livrable lancé !" });
            } else {
                setAlertMessage({ type: 'warning', text: "Aucun livrable disponible pour le téléchargement." });
            }
        } catch (error) {
            console.error("Erreur téléchargement:", error);
            setAlertMessage({ type: 'error', text: "Erreur lors du téléchargement" });
        } finally {
            setDownloading(null);
        }
    };

    // 🆕 DÉTECTION TYPE DE FICHIER POUR ICÔNE
    const getFileTypeIcon = (fileUrl) => {
        if (!fileUrl) return <FileText size={16} />;
        
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        const fileTypes = {
            'pdf': <FileText size={16} style={{ color: '#e74c3c' }} />,
            'zip': <FileText size={16} style={{ color: '#f39c12' }} />,
            'doc': <FileText size={16} style={{ color: '#2980b9' }} />,
            'docx': <FileText size={16} style={{ color: '#2980b9' }} />,
            'jpg': <FileText size={16} style={{ color: '#27ae60' }} />,
            'png': <FileText size={16} style={{ color: '#27ae60' }} />
        };
        
        return fileTypes[extension] || <FileText size={16} />;
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            'pending_payment': '⏳ Paiement en attente',
            'open': '🔍 Ouverte aux candidatures', 
            'in_progress': '🚧 En cours de réalisation',
            'awaiting_validation': '📦 À valider',
            'completed': '✅ Terminée',
            'cancelled': '❌ Annulée'
        };
        return statusMap[status] || status;
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

            {/* Modal de détails de livraison */}
            {showDeliveryDetails && selectedMission && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="majestic-card" style={{ 
                        maxWidth: '600px', 
                        width: '90%', 
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h3>📦 Détails de la Livraison</h3>
                        
                        <div className="mission-info" style={{ marginBottom: '20px' }}>
                            <h4>{selectedMission.title}</h4>
                            <p><strong>Budget:</strong> {selectedMission.budget} XOF</p>
                            <p><strong>Vendeur:</strong> {selectedMission.seller?.username || 'Non spécifié'}</p>
                        </div>

                        <div className="delivery-content">
                            <div className="form-group">
                                <label><strong>📎 Fichier livrable:</strong></label>
                                {selectedMission.deliverable_link ? (
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            {getFileTypeIcon(selectedMission.deliverable_link)}
                                            <a 
                                                href={selectedMission.deliverable_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="delivery-link"
                                                style={{ 
                                                    wordBreak: 'break-all',
                                                    color: '#007bff',
                                                    textDecoration: 'underline',
                                                }}
                                                title="Ouvrir dans un nouvel onglet"
                                            >
                                                {selectedMission.deliverable_link.split('/').pop() || 'Livrable'}
                                            </a>
                                        </div>
                                        
                                        {/* BOUTON TÉLÉCHARGEMENT */}
                                        <button 
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleDownload(selectedMission)}
                                            disabled={downloading === selectedMission.id}
                                            title="Télécharger le fichier"
                                        >
                                            {downloading === selectedMission.id ? (
                                                <span>Téléch...</span>
                                            ) : (
                                                <Download size={16} />
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-muted">Aucun fichier livrable fourni</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label><strong>📝 Notes du vendeur:</strong></label>
                                <div className="delivery-notes" style={{
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '5px',
                                    marginTop: '5px',
                                    minHeight: '80px'
                                }}>
                                    {selectedMission.delivery_notes || "Aucune note fournie"}
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            marginTop: '20px',
                            justifyContent: 'flex-end'
                        }}>
                            {selectedMission.status === 'awaiting_validation' && (
                                <button 
                                    className="btn btn-success"
                                    onClick={() => handleValidateDelivery(selectedMission.id)}
                                >
                                    <CheckCircle size={18} /> Valider et Libérer les Fonds
                                </button>
                            )}
                            <button 
                                className="btn btn-secondary"
                                onClick={() => setShowDeliveryDetails(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
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
                                <th>Vendeur</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map(mission => (
                                <tr key={mission.id}>
                                    <td>
                                        <strong>{mission.title}</strong>
                                        {mission.deliverable_link && (
                                            <div style={{ fontSize: '0.8em', color: '#666', marginTop: '2px' }}>
                                                📎 Livrable disponible
                                            </div>
                                        )}
                                    </td>
                                    <td>{mission.budget} XOF</td>
                                    <td>
                                        {mission.seller?.username || 'Non attribué'}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${mission.status}`}>
                                            {getStatusLabel(mission.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-group" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                            {/* 👁 Voir les détails de livraison */}
                                            {(mission.status === 'awaiting_validation' || mission.deliverable_link) && (
                                                <button 
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => {
                                                        setSelectedMission(mission);
                                                        setShowDeliveryDetails(true);
                                                    }}
                                                    title="Voir les détails de livraison"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            )}

                                            {/* 🆕 TÉLÉCHARGEMENT DIRECT depuis le tableau */}
                                            {mission.deliverable_link && (
                                                <button 
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleDownload(mission)}
                                                    disabled={downloading === mission.id}
                                                    title="Télécharger le livrable"
                                                >
                                                    {downloading === mission.id ? (
                                                        <span>...</span>
                                                    ) : (
                                                        <Download size={16} />
                                                    )}
                                                </button>
                                            )}

                                            {/* ✅ Validation de livraison */}
                                            {mission.status === 'awaiting_validation' && (
                                                <button 
                                                    className="btn btn-sm btn-success" 
                                                    onClick={() => handleValidateDelivery(mission.id)}
                                                    title="Valider la livraison"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                        </div>
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
