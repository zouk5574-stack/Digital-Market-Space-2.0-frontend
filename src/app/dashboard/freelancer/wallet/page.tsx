// app/dashboard/freelancer/wallet/page.tsx
'use client'

import { useState } from 'react'
import { useFreelancerWallet } from '@/hooks/freelancer/use-freelancer-wallet'
import { WalletOverview } from '@/components/dashboard/freelancer/wallet/wallet-overview'
import { TransactionHistory } from '@/components/dashboard/freelancer/wallet/transaction-history'
import { WithdrawalHistory } from '@/components/dashboard/freelancer/wallet/withdrawal-history'
import { QuickWithdrawalPanel } from '@/components/dashboard/freelancer/wallet/quick-withdrawal-panel'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, History, CreditCard } from 'lucide-react'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { 
    wallet, 
    transactions, 
    withdrawals, 
    isLoading,
    requestWithdrawal 
  } = useFreelancerWallet()

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Wallet },
    { id: 'transactions', name: 'Historique', icon: History },
    { id: 'withdrawals', name: 'Retraits', icon: CreditCard },
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
          <h1 className="text-3xl font-bold bg-gradient-to-br from-purple-900 to-purple-700 bg-clip-text text-transparent">
            Mon Portefeuille
          </h1>
          <p className="text-slate-600 mt-2">
            Gérez vos revenus et demandez des retraits
          </p>
        </div>
      </motion.div>

      {/* Quick Withdrawal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <QuickWithdrawalPanel 
          balance={wallet?.balance || 0}
          onWithdrawal={requestWithdrawal}
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
                  ? 'border-purple-500 text-purple-600'
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
          <WalletOverview 
            wallet={wallet}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionHistory 
            transactions={transactions}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'withdrawals' && (
          <WithdrawalHistory 
            withdrawals={withdrawals}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  )
}
