frontend/src/pages/AdminDashboard.jsx

```jsx
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
