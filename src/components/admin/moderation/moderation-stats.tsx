// components/admin/moderation/moderation-stats.tsx
'use client'

import { HolographicCard } from '@/components/atomic/holographic-card'
import { motion } from 'framer-motion'
import { Flag, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

interface ModerationStatsProps {
  stats: {
    pendingReports: number
    inReview: number
    resolvedToday: number
    averageResolutionTime: number
    topReasons: { reason: string; count: number }[]
  }
}

export function ModerationStats({ stats }: ModerationStatsProps) {
  const statsConfig = [
    {
      key: 'pendingReports',
      label: 'Signalements en Attente',
      value: stats.pendingReports,
      icon: Flag,
      color: 'from-red-500 to-pink-500',
      trend: '+2'
    },
    {
      key: 'inReview',
      label: 'En Révision',
      value: stats.inReview,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      trend: '0'
    },
    {
      key: 'resolvedToday',
      label: 'Résolus Aujourd\'hui',
      value: stats.resolvedToday,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      trend: '+5'
    },
    {
      key: 'averageResolutionTime',
      label: 'Temps Moyen (min)',
      value: stats.averageResolutionTime,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      trend: '-3'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div className="flex items-baseline gap-2 mt-1">
                  <motion.p
                    key={stat.value}
                    className="text-2xl font-bold text-slate-900"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                    stat.trend.startsWith('+') 
                      ? 'bg-green-100 text-green-800' 
                      : stat.trend.startsWith('-')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
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
