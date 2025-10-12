// frontend/src/pages/DeliverWorkPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sellerService from '../services/sellerService';
import { Send, Loader2 } from 'lucide-react';

// Utilisation du style Majestueux
import '../styles/Dashboard.css';

function DeliverWorkPage() {
    const { missionId } = useParams();
    const navigate = useNavigate();
    
    const [missionDetails, setMissionDetails] = useState(null);
    const [deliverableLink, setDeliverableLink] = useState('');
    const [deliveryNotes, setDeliveryNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    // 1. Récupérer les détails de la mission
    useEffect(() => {
        const fetchMission = async () => {
            try {
                // Utilise la méthode ajoutée à sellerService
                const data = await sellerService.getMissionDetails(missionId);
                setMissionDetails(data);
            } catch (error) {
                setAlertMessage({ type: 'error', text: "Erreur: Impossible de charger les détails de cette mission." });
            } finally {
                setLoading(false);
            }
        };

        if (missionId) {
            fetchMission();
        }
    }, [missionId]);

    // 2. Logique de Soumission de la Livraison
    const handleSubmitDelivery = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setAlertMessage(null);

        if (!deliverableLink && !deliveryNotes) {
            setAlertMessage({ type: 'error', text: "Veuillez fournir un lien de livrable ou des notes de livraison pour l'Acheteur." });
            setSubmitting(false);
            return;
        }

        try {
            const deliveryData = {
                deliverableLink,
                deliveryNotes,
            };

            // Utilise la méthode ajoutée à sellerService
            await sellerService.submitDelivery(missionId, deliveryData);
            
            setAlertMessage({ 
                type: 'success', 
                text: "Livraison soumise avec succès ! L'acheteur a été notifié et doit maintenant valider l'Escrow. Redirection..." 
            });

            // Rediriger vers le dashboard après la soumission réussie
            setTimeout(() => {
                navigate('/seller/dashboard');
            }, 2500);

        } catch (error) {
            console.error("Erreur de soumission de livraison :", error.response?.data?.message || error.message);
            setAlertMessage({ 
                type: 'error', 
                text: error.response?.data?.message || "Échec de la soumission. Vérifiez le statut de la mission ou contactez le support." 
            });
        } finally {
            setSubmitting(false);
        }
    };
    
    // --- Affichages d'état ---
    if (loading) {
        return <div className="loading-state majestic-layout">Chargement des informations de mission...</div>;
    }

    if (!missionDetails) {
        return <div className="error-state majestic-layout alert alert-error">Détails de la mission non trouvés ou erreur de chargement.</div>;
    }
    
    // Vérification stricte du statut avant de permettre la livraison
    if (missionDetails.status !== 'in_progress') {
        const statusText = missionDetails.status === 'awaiting_validation' 
            ? "Déjà livrée et en attente de la validation de l'Acheteur." 
            : `Cette mission a le statut : ${missionDetails.status}`;
            
        return (
            <div className="deliver-work-page majestic-layout">
                <div className="alert alert-warning" style={{ margin: '50px auto', maxWidth: '800px' }}>
                    <h2>Statut Incorrect</h2>
                    <p>{statusText}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/seller/dashboard')} style={{ marginTop: '15px' }}>
                        Retour au Dashboard Vendeur
                    </button>
                </div>
            </div>
        );
    }

    // --- Formulaire de Livraison ---
    return (
        <div className="deliver-work-page majestic-layout">
            <header className="dashboard-header">
                <h1>Soumettre le Livrable pour "{missionDetails.title}"</h1>
                <p className="subtitle">
                    Confirmez la livraison. Ceci notifie l'Acheteur pour qu'il procède à la validation de l'Escrow.
                </p>
                <div style={{ marginTop: '15px' }}>
                    <p className="text-muted">Prix Séquestré : **{missionDetails.final_price.toFixed(2)} XOF**</p>
                </div>
            </header>

            {alertMessage && (
                <div className={`alert alert-${alertMessage.type || 'info'}`}>{alertMessage.text}</div>
            )}

            <form onSubmit={handleSubmitDelivery} className="majestic-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                <div className="form-group">
                    <label htmlFor="deliverableLink">Lien du Livrable (Dossier partagé, URL, etc.)</label>
                    <input
                        type="url"
                        id="deliverableLink"
                        name="deliverableLink"
                        placeholder="Ex: https://votre-travail-final.com"
                        value={deliverableLink}
                        onChange={(e) => setDeliverableLink(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deliveryNotes">Notes de Livraison pour l'Acheteur</label>
                    <textarea
                        id="deliveryNotes"
                        name="deliveryNotes"
                        placeholder="Décrivez les étapes de vérification, les instructions, etc."
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        rows="6"
                        disabled={submitting}
                    />
                </div>
                
                <button type="submit" className="btn btn-success" disabled={submitting}>
                    {submitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> Soumission en cours...
                        </>
                    ) : (
                        <>
                            <Send size={18} /> Confirmer la Livraison et Changer le Statut
                        </>
                    )}
                </button>
                
                <button type="button" onClick={() => navigate('/seller/dashboard')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default DeliverWorkPage;
