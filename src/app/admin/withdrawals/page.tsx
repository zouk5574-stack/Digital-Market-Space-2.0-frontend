// app/admin/withdrawals/page.tsx
'use client'

import { useState } from 'react'
import { useAdminWithdrawals } from '@/hooks/admin/use-admin-withdrawals'
import { WithdrawalsTable } from '@/components/admin/tables/withdrawals-table'
import { WithdrawalStats } from '@/components/admin/withdrawal-stats'
import { motion } from 'framer-motion'
import { CreditCard, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminWithdrawalsPage() {
  const [filters, setFilters] = useState({
    status: 'pending',
    paymentMethod: '',
    dateRange: ''
  })

  const { data: withdrawals, isLoading, refetch } = useAdminWithdrawals(filters)

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
            Gestion des Retraits
          </h1>
          <p className="text-slate-600 mt-2">
            Traiter et superviser les demandes de retrait
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <WithdrawalStats />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">En Attente</p>
              <p className="text-2xl font-bold text-slate-900">23</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Traité ce mois</p>
              <p className="text-2xl font-bold text-slate-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Rejetés</p>
              <p className="text-2xl font-bold text-slate-900">8</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Withdrawals Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <WithdrawalsTable 
          withdrawals={withdrawals?.data || []}
          isLoading={isLoading}
          onWithdrawalUpdate={refetch}
        />
      </motion.div>
    </div>
  )
}
