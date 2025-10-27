// components/dashboard/freelancer/freelancer-stats-grid.tsx
'use client'

import { HolographicCard } from '@/components/atomic/holographic-card'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  Briefcase, 
  ShoppingCart, 
  TrendingUp,
  Star,
  Clock
} from 'lucide-react'

interface FreelancerStats {
  walletBalance: number
  totalEarnings: number
  activeMissions: number
  completedMissions: number
  productsSold: number
  averageRating: number
  responseTime: number
  pendingWithdrawals: number
}

interface FreelancerStatsGridProps {
  stats?: FreelancerStats
  isLoading: boolean
}

const statsConfig = [
  {
    key: 'walletBalance',
    label: 'Solde Actuel',
    icon: Wallet,
    color: 'from-green-500 to-emerald-500',
    format: (value: number) => `${value.toLocaleString()} FCFA`,
    description: 'Disponible pour retrait'
  },
  {
    key: 'totalEarnings',
    label: 'Revenus Totaux',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    format: (value: number) => `${value.toLocaleString()} FCFA`,
    description: 'Tous les temps'
  },
  {
    key: 'activeMissions',
    label: 'Missions Actives',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-500',
    format: (value: number) => value.toString(),
    description: 'En cours de réalisation'
  },
  {
    key: 'productsSold',
    label: 'Produits Vendus',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    format: (value: number) => value.toString(),
    description: 'Ce mois'
  },
  {
    key: 'averageRating',
    label: 'Note Moyenne',
    icon: Star,
    color: 'from-yellow-500 to-amber-500',
    format: (value: number) => value.toFixed(1),
    description: 'Sur 5 étoiles'
  },
  {
    key: 'responseTime',
    label: 'Temps de Réponse',
    icon: Clock,
    color: 'from-slate-500 to-slate-700',
    format: (value: number) => `${value}h`,
    description: 'Moyenne'
  }
]

export function FreelancerStatsGrid({ stats, isLoading }: FreelancerStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                  <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mt-1" />
                ) : (
                  <motion.p
                    key={stats?.[stat.key as keyof FreelancerStats]}
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.format(stats?.[stat.key as keyof FreelancerStats] || 0)}
                  </motion.p>
                )}

                <p className="text-xs text-slate-500 mt-1 truncate">
                  {stat.description}
                </p>
              </div>

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 ml-4`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      ))}
    </div>
  )
}
