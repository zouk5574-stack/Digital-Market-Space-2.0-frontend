// components/admin/admin-stats-grid.tsx
'use client'

import { useAdminStats } from '@/hooks/admin/use-admin-stats'
import { HolographicCard } from '@/components/atomic/holographic-card'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react'

const statsConfig = [
  {
    key: 'totalUsers',
    label: 'Utilisateurs Total',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    format: (value: number) => value.toLocaleString()
  },
  {
    key: 'activeMissions',
    label: 'Missions Actives',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500',
    format: (value: number) => value.toLocaleString()
  },
  {
    key: 'totalProducts',
    label: 'Produits Vendus',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    format: (value: number) => value.toLocaleString()
  },
  {
    key: 'totalRevenue',
    label: 'Revenu Total',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-500',
    format: (value: number) => `${(value / 1000000).toFixed(1)}M FCFA`
  },
  {
    key: 'pendingWithdrawals',
    label: 'Retraits En Attente',
    icon: CreditCard,
    color: 'from-red-500 to-rose-500',
    format: (value: number) => value.toLocaleString()
  },
  {
    key: 'reportedIssues',
    label: 'Problèmes Signalés',
    icon: AlertCircle,
    color: 'from-slate-500 to-slate-700',
    format: (value: number) => value.toLocaleString()
  }
]

export function AdminStatsGrid() {
  const { data: stats, isLoading, error } = useAdminStats()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Erreur lors du chargement des statistiques</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HolographicCard className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-600 truncate">
                  {stat.label}
                </p>
                
                {isLoading ? (
                  <div className="h-8 w-20 bg-slate-200 rounded animate-pulse mt-1" />
                ) : (
                  <motion.p
                    key={stats?.[stat.key as keyof typeof stats]}
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.format(stats?.[stat.key as keyof typeof stats] || 0)}
                  </motion.p>
                )}
              </div>

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 ml-4`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </div>

            {/* Progress bar for some stats */}
            {(stat.key === 'activeMissions' || stat.key === 'pendingWithdrawals') && !isLoading && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progression</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r h-1.5 rounded-full transition-all duration-500"
                    style={{ 
                      width: '75%',
                      background: stat.key === 'activeMissions' 
                        ? 'linear-gradient(90deg, #8b5cf6, #ec4899)' 
                        : 'linear-gradient(90deg, #ef4444, #f43f5e)'
                    }}
                  />
                </div>
              </div>
            )}
          </HolographicCard>
        </motion.div>
      ))}
    </div>
  )
}
