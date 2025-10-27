// app/dashboard/freelancer/page.tsx
'use client'

import { useFreelancerStats } from '@/hooks/freelancer/use-freelancer-stats'
import { FreelancerStatsGrid } from '@/components/dashboard/freelancer/freelancer-stats-grid'
import { RecentActivities } from '@/components/dashboard/freelancer/recent-activities'
import { PendingActions } from '@/components/dashboard/freelancer/pending-actions'
import { EarningsChart } from '@/components/dashboard/freelancer/earnings-chart'
import { QuickWithdrawal } from '@/components/dashboard/freelancer/quick-withdrawal'
import { motion } from 'framer-motion'

export default function FreelancerDashboard() {
  const { data: stats, isLoading } = useFreelancerStats()

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
            Tableau de Bord Vendeur
          </h1>
          <p className="text-slate-600 mt-2">
            Gérez vos missions, produits et revenus
          </p>
        </div>
        <QuickWithdrawal balance={stats?.walletBalance || 0} />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FreelancerStatsGrid stats={stats} isLoading={isLoading} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EarningsChart data={stats?.earningsData} isLoading={isLoading} />
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PendingActions />
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RecentActivities />
      </motion.div>
    </div>
  )
}
