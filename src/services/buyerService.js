// frontend/src/services/buyerService.js
import api from './api';

const BUYER_API_URL = '/buyer';

const buyerService = {
    
    /**
     * Récupère la liste des missions créées par l'Acheteur.
     * Endpoint : GET /api/buyer/missions/my-missions
     */
    getMyMissions: async () => {
        const response = await api.get(`${BUYER_API_URL}/missions/my-missions`);
        return response.data; 
    },

    /**
     * Valide la livraison d'une mission et libère les fonds séquestrés vers le Vendeur.
     * Endpoint : POST /api/buyer/missions/:missionId/validate-delivery
     * C'est le point API CRITIQUE qui exécute la transaction Escrow sur le backend.
     */
    validateDelivery: async (missionId) => {
        const response = await api.post(`${BUYER_API_URL}/missions/${missionId}/validate-delivery`);
        return response.data;
    },

    /**
     * Rejette la livraison d'une mission (nécessite une justification).
     * Endpoint : POST /api/buyer/missions/:missionId/reject-delivery
     */
    rejectDelivery: async (missionId, reason) => {
        const response = await api.post(`${BUYER_API_URL}/missions/${missionId}/reject-delivery`, { reason });
        return response.data;
    },

    /**
     * Crée une nouvelle mission (qui déclenchera la demande de séquestre des fonds).
     * Endpoint : POST /api/buyer/missions/create
     */
    createMission: async (missionData) => {
        const response = await api.post(`${BUYER_API_URL}/missions/create`, missionData);
        return response.data;
    }
};

export default buyerService;
