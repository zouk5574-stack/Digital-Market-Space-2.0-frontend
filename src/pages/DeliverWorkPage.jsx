// frontend/src/pages/DeliverWorkPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sellerService from '../services/sellerService';
import { useAuth } from '../context/AuthContext';
// NOTE: Vous aurez besoin d'un hook ou d'un service de gestion de fichiers pour l'upload réel.

function DeliverWorkPage() {
    // missionId est récupéré à partir de l'URL (ex: /seller/missions/:missionId/deliver)
    const { missionId } = useParams(); 
    const navigate = useNavigate();
    const { user } = useAuth();
    
    // État du formulaire
    const [deliveryNote, setDeliveryNote] = useState('');
    const [fileUrl, setFileUrl] = useState(''); // URL du fichier uploadé sur Supabase Storage
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    // Simuler le processus d'upload de fichier
    const handleFileUpload = async (file) => {
        // --- LOGIQUE D'UPLOAD RÉEL ---
        // 1. Appeler un service de fichier (ex: fileService.uploadFileToSupabase(file))
        // 2. Le service renvoie l'URL publique/signée
        
        // Simulé pour l'exemple :
        const simulatedUrl = `https://supabase-bucket.com/deliveries/${user.id}/${file.name}`;
        setFileUrl(simulatedUrl);
        alert(`Fichier simulé chargé. URL: ${simulatedUrl}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!deliveryNote || !fileUrl) {
            setError("Veuillez fournir la note de livraison et le lien du fichier.");
            setLoading(false);
            return;
        }

        try {
            // Appel à l'API du backend (POST /api/freelance/missions/:missionId/deliver)
            const result = await sellerService.submitDelivery(missionId, {
                delivery_note: deliveryNote,
                file_url: fileUrl,
            });

            setSuccess(true);
            setLoading(false);
            
            // Redirection après succès vers le tableau de bord ou la page de mission
            setTimeout(() => {
                navigate('/seller/dashboard'); 
            }, 3000);

        } catch (err) {
            console.error('Erreur de soumission de livraison:', err);
            setError(err.message || "Échec de la soumission du travail. Réessayez.");
            setLoading(false);
        }
    };

    return (
        <div className="delivery-page majestic-layout">
            <header className="page-header">
                <h1>Soumettre la Livraison de la Mission #{missionId.substring(0, 8)}...</h1>
                <p>Confirmez que votre travail est prêt et transmettez-le à l'Acheteur. Les fonds sont en séquestre.</p>
            </header>
            
            <div className="card delivery-form-card">
                <form onSubmit={handleSubmit}>
                    {/* Affichage des messages d'état */}
                    {error && <p className="message-error">{error}</p>}
                    {success && <p className="message-success">Travail soumis ! La mission est maintenant en attente de validation de l'Acheteur. Redirection...</p>}
                    
                    {/* Champ d'Upload (Simulé) */}
                    <div className="form-group">
                        <label htmlFor="file-upload">Fichier de Livraison</label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            disabled={loading}
                        />
                        {fileUrl && <p className="text-success">Lien généré: `{fileUrl.substring(0, 50)}...`</p>}
                    </div>

                    {/* Champ Note de Livraison */}
                    <div className="form-group">
                        <label htmlFor="delivery-note">Note de Livraison (Détails pour l'Acheteur)</label>
                        <textarea
                            id="delivery-note"
                            rows="5"
                            value={deliveryNote}
                            onChange={(e) => setDeliveryNote(e.target.value)}
                            required
                            placeholder="Décrivez les livrables inclus et les instructions si nécessaire."
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn btn-submit" disabled={loading || success || !fileUrl}>
                        {loading ? 'Envoi en cours...' : 'Soumettre le Travail et Notifier l\'Acheteur'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeliverWorkPage;
          
