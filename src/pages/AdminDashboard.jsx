//frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  Settings, Users, DollarSign, ShoppingCart, Briefcase, 
  TrendingUp, Shield, Key, Download, Eye, Edit, Trash2,
  CreditCard, Wallet, BarChart3, Globe, Server
} from 'lucide-react';
import adminService from '../services/adminService';
import paymentService from '../services/paymentService';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [fedapayKeys, setFedapayKeys] = useState({ public_key: '', secret_key: '' });

  // Queries pour les données admin
  const { data: stats, isLoading: statsLoading } = useQuery(
    'adminStats',
    () => adminService.getAdminStats(),
    { refetchInterval: 30000 } // Actualisation toutes les 30s
  );

  const { data: users, isLoading: usersLoading } = useQuery(
    'adminUsers',
    () => adminService.getUsers(),
    { staleTime: 60000 }
  );

  const { data: withdrawals, isLoading: withdrawalsLoading } = useQuery(
    'pendingWithdrawals',
    () => adminService.getPendingWithdrawals()
  );

  const { data: paymentProviders, isLoading: providersLoading } = useQuery(
    'paymentProviders',
    () => paymentService.getPaymentProviders()
  );

  // Mutations
  const withdrawalMutation = useMutation(adminService.requestWithdrawal, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminStats');
      alert('Demande de retrait envoyée avec succès!');
      setWithdrawalAmount('');
    }
  });

  const updateFedapayMutation = useMutation(paymentService.updateFedapayKeys, {
    onSuccess: () => {
      alert('Clés Fedapay mises à jour avec succès!');
      queryClient.invalidateQueries('paymentProviders');
    }
  });

  const handleWithdrawal = () => {
    if (!withdrawalAmount || withdrawalAmount <= 0) {
      alert('Montant invalide');
      return;
    }
    withdrawalMutation.mutate({ amount: parseFloat(withdrawalAmount) });
  };

  const handleUpdateFedapay = () => {
    if (!fedapayKeys.public_key || !fedapayKeys.secret_key) {
      alert('Les deux clés sont requises');
      return;
    }
    updateFedapayMutation.mutate(fedapayKeys);
  };

  // Statistiques en temps réel
  const realTimeStats = [
    { 
      icon: Users, 
      value: stats?.users || 0, 
      label: 'Utilisateurs', 
      change: '+12%', 
      color: 'blue' 
    },
    { 
      icon: DollarSign, 
      value: `${(stats?.totalRevenue || 0).toLocaleString()} XOF`, 
      label: 'Revenus Totaux', 
      change: '+24%', 
      color: 'green' 
    },
    { 
      icon: ShoppingCart, 
      value: stats?.orders || 0, 
      label: 'Commandes', 
      change: '+8%', 
      color: 'purple' 
    },
    { 
      icon: Briefcase, 
      value: stats?.missions || 0, 
      label: 'Missions', 
      change: '+15%', 
      color: 'orange' 
    },
  ];

  if (statsLoading) {
    return (
      <div className="admin-dashboard majestic-layout">
        <div className="loading-state">Chargement du tableau de bord admin...</div>
      </div>
    );
  }
 return (
    <div className="admin-dashboard majestic-layout">
      {/* Header Admin */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-main">
          <h1>👑 Administration Digital Market Space</h1>
          <p className="subtitle">Supervision complète de la plateforme</p>
        </div>
        <div className="admin-badge">
          <Shield size={24} />
          <span>Super Admin</span>
        </div>
      </motion.header>

      {/* Navigation par onglets */}
      <nav className="admin-tabs">
        {[
          { id: 'overview', label: 'Vue Globale', icon: BarChart3 },
          { id: 'finance', label: 'Finances', icon: DollarSign },
          { id: 'users', label: 'Utilisateurs', icon: Users },
          { id: 'payments', label: 'Paiements', icon: CreditCard },
          { id: 'system', label: 'Système', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenu des onglets */}
      <div className="admin-content">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content"
            >
              {/* Statistiques en temps réel */}
              <div className="stats-grid grid-4">
                {realTimeStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="stat-header">
                      <stat.icon size={24} className={`icon-${stat.color}`} />
                      <span className="change-badge">{stat.change}</span>
                    </div>
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Actions rapides */}
              <div className="quick-actions">
                <h3>Actions Rapides</h3>
                <div className="actions-grid">
                  <button className="action-card" onClick={() => setActiveTab('finance')}>
                    <Wallet size={24} />
                    <span>Retrait Commissions</span>
                  </button>
                  <button className="action-card" onClick={() => setActiveTab('payments')}>
                    <Key size={24} />
                    <span>Clés API Fedapay</span>
                  </button>
                  <button className="action-card" onClick={() => setActiveTab('users')}>
                    <Users size={24} />
                    <span>Gestion Utilisateurs</span>
                  </button>
                  <button className="action-card">
                    <Download size={24} />
                    <span>Exporter Données</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
         {activeTab === 'finance' && (
            <motion.div
              key="finance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content"
            >
              <div className="finance-section">
                <div className="finance-card glass-card">
                  <h3>💰 Mes Revenus Administrateur</h3>
                  
                  <div className="revenue-breakdown">
                    <div className="revenue-item">
                      <span>Commissions Plateforme:</span>
                      <strong>{(stats?.platformRevenue || 0).toLocaleString()} XOF</strong>
                    </div>
                    <div className="revenue-item">
                      <span>Ventes Personnelles:</span>
                      <strong>{(stats?.personalSales || 0).toLocaleString()} XOF</strong>
                    </div>
                    <div className="revenue-item total">
                      <span>Solde Total:</span>
                      <strong className="total-amount">
                        {(stats?.totalRevenue || 0).toLocaleString()} XOF
                      </strong>
                    </div>
                  </div>

                  {/* Formulaire de retrait */}
                  <div className="withdrawal-form">
                    <h4>Demande de Retrait</h4>
                    <div className="form-row">
                      <input
                        type="number"
                        placeholder="Montant à retirer"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        min="1000"
                        max={stats?.totalRevenue || 0}
                      />
                      <button 
                        className="btn btn-primary"
                        onClick={handleWithdrawal}
                        disabled={withdrawalMutation.isLoading}
                      >
                        {withdrawalMutation.isLoading ? 'Traitement...' : 'Demander Retrait'}
                      </button>
                    </div>
                    <small>Solde disponible: {(stats?.totalRevenue || 0).toLocaleString()} XOF</small>
                  </div>
                </div>

                {/* Retraits en attente */}
                <div className="pending-withdrawals glass-card">
                  <h3>⏳ Retraits en Attente de Validation</h3>
                  {withdrawalsLoading ? (
                    <div className="loading">Chargement...</div>
                  ) : withdrawals?.length > 0 ? (
                    <div className="withdrawals-list">
                      {withdrawals.map((withdrawal) => (
                        <div key={withdrawal.id} className="withdrawal-item">
                          <div className="withdrawal-info">
                            <span className="user">User: {withdrawal.user_id}</span>
                            <span className="amount">{withdrawal.amount} XOF</span>
                            <span className="date">
                              {new Date(withdrawal.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="withdrawal-actions">
                            <button className="btn btn-success btn-sm">Approuver</button>
                            <button className="btn btn-danger btn-sm">Rejeter</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">Aucun retrait en attente</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
           {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content"
            >
              <div className="payment-settings">
                {/* Configuration Fedapay */}
                <div className="fedapay-config glass-card">
                  <h3>🔐 Configuration Fedapay</h3>
                  <p className="description">
                    Gestion des clés API Fedapay pour les paiements et l'escrow
                  </p>

                  <div className="key-fields">
                    <div className="form-group">
                      <label>Clé Publique Fedapay</label>
                      <input
                        type="text"
                        placeholder="pk_live_..."
                        value={fedapayKeys.public_key}
                        onChange={(e) => setFedapayKeys(prev => ({
                          ...prev,
                          public_key: e.target.value
                        }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Clé Secrète Fedapay</label>
                      <input
                        type="password"
                        placeholder="sk_live_..."
                        value={fedapayKeys.secret_key}
                        onChange={(e) => setFedapayKeys(prev => ({
                          ...prev,
                          secret_key: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="key-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={handleUpdateFedapay}
                      disabled={updateFedapayMutation.isLoading}
                    >
                      {updateFedapayMutation.isLoading ? 'Mise à jour...' : 'Mettre à jour les Clés'}
                    </button>
                    <button className="btn btn-secondary">
                      Tester la Connexion
                    </button>
                  </div>

                  {/* Statut du provider */}
                  {paymentProviders && (
                    <div className="provider-status">
                      <h4>Statut Actuel</h4>
                      <div className="status-item">
                        <span>Provider:</span>
                        <span className="status-active">Fedapay - Actif</span>
                      </div>
                      <div className="status-item">
                        <span>Environnement:</span>
                        <span>{process.env.NODE_ENV === 'production' ? 'Production' : 'Sandbox'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistiques de paiement */}
                <div className="payment-stats glass-card">
                  <h3>📊 Statistiques de Paiement</h3>
                  <div className="stats-grid">
                    <div className="stat">
                      <span>Transactions Total</span>
                      <strong>{stats?.totalTransactions || 0}</strong>
                    </div>
                    <div className="stat">
                      <span>Taux de Réussite</span>
                      <strong>98.5%</strong>
                    </div>
                    <div className="stat">
                      <span>Montant Total</span>
                      <strong>{(stats?.totalRevenue || 0).toLocaleString()} XOF</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content"
            >
              <div className="users-management">
                <div className="users-header">
                  <h3>👥 Gestion des Utilisateurs</h3>
                  <div className="users-stats">
                    <span>Total: {users?.length || 0} utilisateurs</span>
                  </div>
                </div>

                {usersLoading ? (
                  <div className="loading">Chargement des utilisateurs...</div>
                ) : (
                  <div className="users-table-container">
                    <table className="majestic-table">
                      <thead>
                        <tr>
                          <th>Utilisateur</th>
                          <th>Email/Téléphone</th>
                          <th>Rôle</th>
                          <th>Inscription</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <div className="user-info">
                                <strong>{user.username}</strong>
                                {user.is_super_admin && (
                                  <span className="super-admin-badge">👑 Super Admin</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div>{user.email}</div>
                                <small>{user.phone}</small>
                              </div>
                            </td>
                            <td>
                              <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              <span className={`status-badge ${user.is_active ? 'status-active' : 'status-inactive'}`}>
                                {user.is_active ? 'Actif' : 'Inactif'}
                              </span>
                            </td>
                            <td>
                              <div className="user-actions">
                                <button className="btn-icon" title="Voir">
                                  <Eye size={16} />
                                </button>
                                <button className="btn-icon" title="Modifier">
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className="btn-icon danger" 
                                  title={user.is_active ? 'Désactiver' : 'Activer'}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
            {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content"
            >
              <div className="system-settings">
                <div className="system-card glass-card">
                  <h3>⚙️ Paramètres Système</h3>
                  
                  <div className="setting-group">
                    <h4>Configuration Générale</h4>
                    <div className="settings-grid">
                      <div className="setting-item">
                        <label>Commission Plateforme</label>
                        <div className="setting-value">10%</div>
                        <button className="btn btn-sm">Modifier</button>
                      </div>
                      <div className="setting-item">
                        <label>Limite Boutiques/Vendeur</label>
                        <div className="setting-value">3 boutiques</div>
                        <button className="btn btn-sm">Modifier</button>
                      </div>
                      <div className="setting-item">
                        <label>Auto-validation Commandes</label>
                        <div className="setting-value">7 jours</div>
                        <button className="btn btn-sm">Modifier</button>
                      </div>
                    </div>
                  </div>

                  <div className="setting-group">
                    <h4>Maintenance</h4>
                    <div className="maintenance-actions">
                      <button className="btn btn-warning">
                        Mode Maintenance
                      </button>
                      <button className="btn btn-secondary">
                        Vider le Cache
                      </button>
                      <button className="btn btn-danger">
                        Regénérer Logs
                      </button>
                    </div>
                  </div>
                </div>

                {/* Informations système */}
                <div className="system-info glass-card">
                  <h3>📊 Informations Système</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Server size={20} />
                      <div>
                        <strong>Statut API</strong>
                        <span className="status-online">En ligne</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Globe size={20} />
                      <div>
                        <strong>Environnement</strong>
                        <span>{process.env.NODE_ENV}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <BarChart3 size={20} />
                      <div>
                        <strong>Performance</strong>
                        <span>98.7% uptime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
