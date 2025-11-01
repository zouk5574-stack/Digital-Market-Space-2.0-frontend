// components/admin/wallet/admin-wallet-overview.tsx
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react'

interface AdminWalletOverviewProps {
  wallet: any
  isLoading: boolean
}

export function AdminWalletOverview({ wallet, isLoading }: AdminWalletOverviewProps) {
  const stats = [
    {
      key: 'totalBalance',
      label: 'Solde Total',
      value: wallet.totalBalance || 0,
      format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      description: 'Tous les fonds plateforme'
    },
    {
      key: 'availableBalance',
      label: 'Disponible',
      value: wallet.availableBalance || 0,
      format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      description: 'Fonds retirables'
    },
    {
      key: 'pendingBalance',
      label: 'En Attente',
      value: wallet.pendingBalance || 0,
      format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      description: 'Fonds en traitement'
    },
    {
      key: 'thisMonthEarnings',
      label: 'Gains Ce Mois',
      value: wallet.thisMonthEarnings || 0,
      format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Revenus du mois en cours'
    }
  ]

  const growth = wallet.thisMonthEarnings && wallet.lastMonthEarnings 
    ? ((wallet.thisMonthEarnings - wallet.lastMonthEarnings) / wallet.lastMonthEarnings) * 100
    : 0

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Stats */}
      <div className="space-y-6">
        {/* Growth Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Croissance mensuelle</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-bold text-slate-900">
                  {Math.abs(growth).toFixed(1)}%
                </p>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {growth >= 0 ? 'Hausse' : 'Baisse'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">vs mois dernier</p>
              <p className="text-lg font-semibold text-slate-900">
                {wallet.lastMonthEarnings ? `${(wallet.lastMonthEarnings / 1000).toFixed(0)}K FCFA` : '--'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-600 truncate">
                    {stat.label}
                  </p>
                  <motion.p
                    key={stat.value}
                    className="text-xl font-bold text-slate-900"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.format(stat.value)}
                  </motion.p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column - Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Transactions Récentes
        </h3>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {wallet.transactions?.slice(0, 8).map((transaction: any, index: number) => (
            <motion.div
              key={transaction._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'commission' ? 'bg-green-100 text-green-600' :
                  transaction.type === 'withdrawal' ? 'bg-blue-100 text-blue-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {transaction.type === 'commission' && <TrendingUp size={14} />}
                  {transaction.type === 'withdrawal' && <DollarSign size={14} />}
                  {transaction.type === 'refund' && <XCircle size={14} />}
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(transaction.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold text-sm ${
                  transaction.type === 'commission' ? 'text-green-600' :
                  transaction.type === 'withdrawal' ? 'text-blue-600' :
                  'text-amber-600'
                }`}>
                  {transaction.type === 'withdrawal' ? '-' : '+'}
                  {transaction.amount.toLocaleString()} FCFA
                </p>
                <p className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status === 'completed' ? 'Terminé' :
                   transaction.status === 'pending' ? 'En attente' : 'Échec'}
                </p>
              </div>
            </motion.div>
          ))}

          {(!wallet.transactions || wallet.transactions.length === 0) && (
            <div className="text-center py-8 text-slate-500">
              <DollarSign size={32} className="mx-auto mb-2 opacity-50" />
              <p>Aucune transaction récente</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
