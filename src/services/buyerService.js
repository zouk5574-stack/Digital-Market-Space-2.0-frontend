import api from './api';

const buyerService = {
    getMyMissions: async () => {
        const response = await api.get('/api/freelance/missions');
        return response.data;
    },

    createMission: async (missionData) => {
        const response = await api.post('/api/freelance/missions', missionData);
        return response.data;
    },

    validateDelivery: async (deliveryId) => {
        const response = await api.post('/api/freelance/validate', { delivery_id: deliveryId });
        return response.data;
    },

    getMissionDetails: async (missionId) => {
        const response = await api.get(`/api/freelance/missions/${missionId}`);
        return response.data;
    }
};

export default buyerService;
