// frontend/src/pages/CreateMissionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import buyerService from '../services/buyerService';
import { Loader2 } from 'lucide-react'; 

// Importation du style majestueux pour la cohérence visuelle
import '../styles/Dashboard.css';

function CreateMissionPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '', // Montant en XOF
        category: 'web_development', // Valeur par défaut
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
            // L'appel au service déclenche la logique d'Escrow (prélèvement)
            const newMission = await buyerService.createMission(missionData);
            
            setAlertMessage({ 
                type: 'success', 
                text: `Mission "${newMission.title}" créée avec succès. ${newMission.escrow_amount.toFixed(2)} XOF ont été mis en séquestre. Redirection...` 
            });
            
            // Rediriger vers la liste des missions après un court délai
            setTimeout(() => {
                navigate('/buyer/missions');
            }, 2500);

        } catch (error) {
            console.error("Erreur de création de mission :", error.response?.data?.message || error.message);
            // On affiche le message d'erreur du backend (ex: "Fonds insuffisants")
            setAlertMessage({ 
                type: 'error', 
                text: error.response?.data?.message || "Échec de la création de la mission. Vérifiez votre solde ou le serveur." 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-mission-page majestic-layout">
            <header className="dashboard-header">
                <h1>Créer une Nouvelle Mission 💰 (Escrow)</h1>
                <p className="subtitle">
                    Le montant sera **séquestré** (Escrow) depuis votre solde et ne sera libéré au Vendeur qu'après votre validation.
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
                    <label htmlFor="price">Montant Séquestré (XOF)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="1"
                        step="100"
                        disabled={loading}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> Séquestre en cours...
                        </>
                    ) : (
                        'Créer la Mission & Séquestrer les Fonds'
                    )}
                </button>
            </form>
        </div>
    );
}

export default CreateMissionPage;
