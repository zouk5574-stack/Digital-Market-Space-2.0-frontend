// app/admin/wallet/page.tsx
'use client'

import { useState } from 'react'
import { useAdminWallet } from '@/hooks/admin/use-admin-wallet'
import { AdminWalletOverview } from '@/components/admin/wallet/admin-wallet-overview'
import { PlatformEarnings } from '@/components/admin/wallet/platform-earnings'
import { AdminWithdrawalPanel } from '@/components/admin/wallet/admin-withdrawal-panel'
import { RevenueBreakdown } from '@/components/admin/wallet/revenue-breakdown'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, PieChart, Download } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminWalletPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { 
    wallet, 
    platformEarnings,
    isLoading,
    withdrawPlatformEarnings 
  } = useAdminWallet()

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Wallet },
    { id: 'earnings', name: 'Revenus Plateforme', icon: TrendingUp },
    { id: 'breakdown', name: 'Répartition', icon: PieChart },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Portefeuille Admin
          </h1>
          <p className="text-slate-600 mt-2">
            Gestion des revenus plateforme et retraits administrateur
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <MagneticButton variant="outline" size="sm">
            <Download size={16} />
            Exporter rapport
          </MagneticButton>
        </div>
      </motion.div>

      {/* Admin Withdrawal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AdminWithdrawalPanel 
          platformEarnings={platformEarnings}
          onWithdraw={withdrawPlatformEarnings}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-slate-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {activeTab === 'overview' && (
          <AdminWalletOverview 
            wallet={wallet}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'earnings' && (
          <PlatformEarnings 
            earnings={platformEarnings}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'breakdown' && (
          <RevenueBreakdown 
            wallet={wallet}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  )
}
