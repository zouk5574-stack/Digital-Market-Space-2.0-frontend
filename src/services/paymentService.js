import api from './api';

const paymentService = {
  // Gestion des providers de paiement
  getPaymentProviders: async () => {
    const response = await api.get('/api/payment-providers/active');
    return response.data.provider;
  },

  updateFedapayKeys: async (keys) => {
    const response = await api.post('/api/admin/fedapay-keys', keys);
    return response.data;
  },

  getFedapayKeys: async () => {
    const response = await api.get('/api/admin/fedapay-keys');
    return response.data.fedapay;
  },

  // Transactions
  getTransactions: async (filters = {}) => {
    const response = await api.get('/api/admin/transactions', { params: filters });
    return response.data.transactions;
  },

  // Statistiques paiements
  getPaymentStats: async () => {
    const response = await api.get('/api/admin/payment-stats');
    return response.data.stats;
  }
};

export default paymentService;
