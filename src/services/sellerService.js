import api from './api';

const sellerService = {
    getWalletData: async () => {
        const response = await api.get('/api/wallet');
        return response.data;
    },

    requestWithdrawal: async (amount, paymentMethod) => {
        const response = await api.post('/api/withdrawals', { 
            amount, 
            provider_id: paymentMethod,
            account_number: 'A_COMPLETER' 
        });
        return response.data;
    },

    getSellerShops: async () => {
        const response = await api.get('/api/shops');
        return response.data;
    },

    createShop: async (shopData) => {
        const response = await api.post('/api/shops', shopData);
        return response.data;
    },

    getSellerFreelanceActivity: async () => {
        const response = await api.get('/api/freelance/my-activity');
        return response.data;
    },

    submitDelivery: async (missionId, deliveryData) => {
        const response = await api.post(`/api/freelance/missions/${missionId}/deliver`, deliveryData);
        return response.data;
    },

    getMissionDetails: async (missionId) => {
        const response = await api.get(`/api/freelance/missions/${missionId}`);
        return response.data;
    }
};

export default sellerService;
