// frontend/src/components/WithdrawalModal.jsx
import React, { useState } from 'react';
import sellerService from '../services/sellerService';

// Définitions de style pour l'harmonie visuelle (simulant le thème "majestueux")
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fond sombre semi-transparent
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '40px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
    },
    title: {
        fontSize: '1.8rem',
        color: '#007bff', // Couleur Primaire
        borderBottom: '2px solid #FFD700', // Ligne Or élégante
        paddingBottom: '10px',
        marginBottom: '25px',
    },
    balanceInfo: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#212529',
    },
    minInfo: {
        color: '#6c757d',
        marginBottom: '20px',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        marginTop: '30px',
    }
};

const MIN_WITHDRAWAL_AMOUNT = 5000; // Seuil minimal de retrait

function WithdrawalModal({ isVisible, onClose, currentBalance, onSuccess, onError }) {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('mobile_money');
    const [loading, setLoading] = useState(false);

    if (!isVisible) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const withdrawalAmount = parseFloat(amount);

        if (withdrawalAmount < MIN_WITHDRAWAL_AMOUNT) {
            return onError(`Le montant minimum de retrait est de ${MIN_WITHDRAWAL_AMOUNT} XOF.`);
        }
        if (withdrawalAmount > currentBalance) {
            return onError("Le montant demandé dépasse votre solde retirable.");
        }
        
        setLoading(true);

        try {
            await sellerService.requestWithdrawal(withdrawalAmount, paymentMethod);
            onSuccess(withdrawalAmount);
            onClose();
            setAmount('');
        } catch (error) {
            onError(error.message || "Erreur lors de la demande de retrait.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" style={styles.overlay}>
            <div className="modal-content" style={styles.content}>
                <h2 style={styles.title}>Demander un Retrait 💸</h2>
                <p className="balance-info" style={styles.balanceInfo}>Solde Disponible: **{currentBalance.toFixed(2)} XOF**</p>
                <p className="min-info" style={styles.minInfo}>Minimum requis: {MIN_WITHDRAWAL_AMOUNT} XOF</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount">Montant à Retirer</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={MIN_WITHDRAWAL_AMOUNT}
                            max={currentBalance}
                            step="any"
                            required
                            // Note: Les styles d'input (.form-group) doivent venir de votre feuille de style principale
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="method">Méthode de Paiement</label>
                        <select
                            id="method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="mobile_money">Mobile Money (MOMO/Flooz)</option>
                            <option value="bank_transfer">Virement Bancaire</option>
                        </select>
                        <small>Vos informations de paiement sont sécurisées.</small>
                    </div>

                    <div className="modal-actions" style={styles.modalActions}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Traitement...' : 'Confirmer le Retrait'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WithdrawalModal;
          
