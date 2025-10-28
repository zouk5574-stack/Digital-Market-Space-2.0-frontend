// app/admin/page.tsx
'use client'

import { AdminStatsGrid } from '@/components/admin/admin-stats-grid'
import { RecentActivities } from '@/components/admin/recent-activities'
import { PendingActions } from '@/components/admin/pending-actions'
import { PlatformAnalytics } from '@/components/admin/platform-analytics'
import { QuickActions } from '@/components/admin/quick-actions'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
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
            Tableau de Bord Admin
          </h1>
          <p className="text-slate-600 mt-2">
            Vue d'ensemble et gestion de la plateforme
          </p>
        </div>
        <QuickActions />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AdminStatsGrid />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PlatformAnalytics />
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
