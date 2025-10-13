import api from './api';

const adminService = {
  // Statistiques globales
  getAdminStats: async () => {
    const response = await api.get('/api/stats/admin');
    return response.data.stats;
  },

  // Gestion utilisateurs
  getUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data.users;
  },

  toggleUserStatus: async (userId, isActive) => {
    const response = await api.put(`/api/admin/users/${userId}/status`, { is_active: isActive });
    return response.data;
  },

  // Gestion financière
  getPendingWithdrawals: async () => {
    const response = await api.get('/api/admin/withdrawals');
    return response.data.withdrawals;
  },

  approveWithdrawal: async (withdrawalId) => {
    const response = await api.put(`/api/admin/withdrawals/${withdrawalId}/approve`);
    return response.data;
  },

  rejectWithdrawal: async (withdrawalId, reason) => {
    const response = await api.put(`/api/admin/withdrawals/${withdrawalId}/reject`, { reason });
    return response.data;
  },

  // Retrait admin (commissions + ventes personnelles)
  requestWithdrawal: async (withdrawalData) => {
    const response = await api.post('/api/withdrawals', withdrawalData);
    return response.data;
  },

  // Logs système
  getSystemLogs: async () => {
    const response = await api.get('/api/logs');
    return response.data.logs;
  },

  // Export données
  exportData: async (format = 'excel') => {
    const response = await api.get(`/api/stats/export/${format}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default adminService;
