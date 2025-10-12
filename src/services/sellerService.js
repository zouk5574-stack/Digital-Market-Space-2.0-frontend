// frontend/src/services/sellerService.js
import api from './api';

const SELLER_API_URL = '/freelance';
const SHOP_API_URL = '/shops';
const USER_API_URL = '/users';

const sellerService = {

    /** * Récupère le solde du portefeuille et les informations de retrait.
     * Endpoint : GET /api/users/wallet (à créer côté backend)
     */
    getWalletData: async () => {
        // Simulé: Le backend devrait retourner l'objet wallet
        const response = await api.get(`${USER_API_URL}/wallet`); 
        return response.data; 
    },

    /**
     * Demande un retrait de fonds.
     * Endpoint : POST /api/users/withdrawals (à créer côté backend)
     */
    requestWithdrawal: async (amount, paymentMethod) => {
        const response = await api.post(`${USER_API_URL}/withdrawals`, { amount, paymentMethod });
        return response.data;
    },

    /**
     * Récupère les boutiques du vendeur et leurs statistiques.
     * Endpoint : GET /api/shops/my-shops (à créer côté backend)
     */
    getSellerShops: async () => {
        const response = await api.get(`${SHOP_API_URL}/my-shops`);
        return response.data; 
    },

    /**
     * Récupère les activités freelance (missions assignées et candidatures).
     * Endpoint : GET /api/freelance/my-activity (à créer côté backend)
     */
    getSellerFreelanceActivity: async () => {
        const response = await api.get(`${SELLER_API_URL}/my-activity`);
        return response.data;
    },
    
    /**
     * Soumet le travail d'une mission assignée.
     * Endpoint : POST /api/freelance/missions/:missionId/deliver
     */
    submitDelivery: async (missionId, deliveryData) => {
        const response = await api.post(`${SELLER_API_URL}/missions/${missionId}/deliver`, deliveryData);
        return response.data;
    }
};

export default sellerService;
