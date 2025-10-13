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
