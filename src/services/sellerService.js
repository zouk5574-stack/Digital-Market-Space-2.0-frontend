// frontend/src/services/sellerService.js
import api from './api';

// Définition des préfixes d'API (doit être cohérent avec le backend)
const SELLER_API_URL = '/freelance';
const SHOP_API_URL = '/shops';
const USER_API_URL = '/users';

const sellerService = {

    /**
     * Récupère le solde du portefeuille et les informations de retrait.
     * Endpoint : GET /api/users/wallet
     */
    getWalletData: async () => {
        // Le backend doit retourner { balance: number, transactions: [] }
        const response = await api.get(`${USER_API_URL}/wallet`); 
        return response.data; 
    },

    /**
     * Demande un retrait de fonds.
     * Endpoint : POST /api/users/withdrawals 
     */
    requestWithdrawal: async (amount, paymentMethod) => {
        const response = await api.post(`${USER_API_URL}/withdrawals`, { amount, paymentMethod });
        // Le backend doit renvoyer la transaction de retrait créée
        return response.data;
    },

    /**
     * Récupère les boutiques du vendeur et leurs statistiques.
     * Endpoint : GET /api/shops/my-shops
     */
    getSellerShops: async () => {
        // Le backend doit renvoyer [{ id, name, status, product_count }, ...]
        const response = await api.get(`${SHOP_API_URL}/my-shops`);
        return response.data; 
    },
    
    /**
     * Crée une nouvelle boutique. Le backend vérifiera la limite des 3 boutiques.
     * Endpoint : POST /api/shops/create
     */
    createShop: async (shopData) => {
        const response = await api.post(`${SHOP_API_URL}/create`, shopData);
        return response.data;
    },

    /**
     * Récupère les activités freelance (missions assignées et candidatures).
     * Endpoint : GET /api/freelance/my-activity
     */
    getSellerFreelanceActivity: async () => {
        // Le backend doit renvoyer { assigned_missions: [], applications: [] }
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
