// frontend/src/pages/CreateMissionPage.jsx
import React, { useState } from 'react';
import buyerService from '../services/buyerService'; 
import { Loader2 } from 'lucide-react'; 

import '../styles/Dashboard.css';

function CreateMissionPage() {
    // Note: Pas besoin de useNavigate ici, car nous redirigeons l'utilisateur vers FedaPay
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '', 
        category: 'web_development', 
    });
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlertMessage(null);

        // Validation front-end
        const price = parseFloat(formData.price);
        if (!formData.title || !formData.description || isNaN(price) || price <= 0) {
            setAlertMessage({ type: 'error', text: "Veuillez remplir tous les champs correctement. Le prix doit être un nombre positif." });
            setLoading(false);
            return;
        }

        const missionData = {
            title: formData.title,
            description: formData.description,
            price: price, 
            category: formData.category,
        };

        try {
            // 🚨 1. Appel Backend pour Créer la Mission et l'URL FedaPay
            // Le Backend crée la mission en statut 'pending_payment' et initialise la transaction FedaPay.
            const response = await buyerService.createMission(missionData);
            
            if (response.redirect_url) {
                
                setAlertMessage({ 
                    type: 'info', 
                    text: "Mission initialisée. Redirection vers la page de paiement FedaPay pour séquestrer les fonds..."
                });
                
                // 🚨 2. Redirection vers l'URL de paiement
                window.location.href = response.redirect_url;
                
                // Le composant s'arrête ici, l'utilisateur est sur FedaPay.
                return; 
            } else {
                 throw new Error("Le serveur n'a pas fourni d'URL de redirection de paiement FedaPay. Vérifiez la configuration.");
            }

        } catch (error) {
            console.error("Erreur de création de mission ou de paiement :", error.response?.data?.message || error.message);
            setAlertMessage({ 
                type: 'error', 
                text: error.response?.data?.message || "Échec de l'initialisation du paiement. Vérifiez le serveur." 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-mission-page majestic-layout">
            <header className="dashboard-header">
                <h1>Créer une Nouvelle Mission 💳 (Paiement FedaPay)</h1>
                <p className="subtitle">
                    Le paiement sera effectué sur FedaPay et les fonds seront **séquestrés** (Escrow) jusqu'à validation de la livraison.
                </p>
            </header>

            {alertMessage && (
                <div className={`alert alert-${alertMessage.type || 'info'}`}>{alertMessage.text}</div>
            )}

            <form onSubmit={handleSubmit} className="majestic-card" style={{ maxWidth: '800px', margin: '0 auto' }}>

                <div className="form-group">
                    <label htmlFor="title">Titre de la Mission</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description Détaillée</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Catégorie de Service</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="web_development">Développement Web</option>
                        <option value="graphic_design">Design Graphique</option>
                        <option value="writing_translation">Rédaction & Traduction</option>
                        <option value="marketing">Marketing Digital</option>
                        <option value="other">Autre</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Montant à Payer (XOF)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="100" 
                        step="100"
                        disabled={loading}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> Préparation du paiement...
                        </>
                    ) : (
                        'Procéder au Paiement via FedaPay'
                    )}
                </button>
            </form>
        </div>
    );
}

export default CreateMissionPage;
